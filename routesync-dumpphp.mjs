#!/usr/bin/env node
/**
 * Dump exact PHP script yang ditulis routesync ke disk, lalu jalanin manual
 * supaya bisa lihat raw output-nya.
 * Jalanin dari folder Laravel: node routesync-dumpphp.mjs
 */
import { spawnSync } from 'child_process'
import { writeFileSync, readFileSync, existsSync } from 'fs'
import path from 'path'

const cwd = process.cwd()
const cliPath = path.join(cwd, 'node_modules/routesync/dist/cli.js')
const src = readFileSync(cliPath, 'utf-8')

// Extract the phpScript template literal from cli.js
// It starts after `const phpScript = \`` and ends before the closing `\`;`
const phpScriptStart = src.indexOf('const phpScript = `')
if (phpScriptStart === -1) { console.error('phpScript not found'); process.exit(1) }

const literalStart = phpScriptStart + 'const phpScript = `'.length
const literalEnd = src.indexOf('`;\n    const scriptPath', literalStart)
if (literalEnd === -1) { console.error('end of phpScript not found'); process.exit(1) }

// The raw template literal — we need to evaluate it with the actual options
// Simulate: options.extractModels = true
const templateSrc = src.slice(literalStart, literalEnd)

// The only JS interpolation in the PHP script is: ${extractModels}
// which in compiled form is ${options.extractModels ? "true" : "false"}
// Let's check what interpolations exist
const interpolations = [...templateSrc.matchAll(/\$\{[^}]+\}/g)]
console.log('Interpolations found in phpScript template:')
interpolations.forEach(m => console.log(' ', m[0], 'at offset', m.index))
console.log('')

// Evaluate the template with extractModels = true
const options = { extractModels: true }
const extractModels = options.extractModels ? "true" : "false"
// Use Function constructor to evaluate the template safely
let phpScript
try {
  phpScript = new Function('extractModels', 'options', 'return `' + templateSrc + '`')(extractModels, options)
} catch(e) {
  console.error('Template eval error:', e.message)
  // Dump raw template around the error
  console.error('Raw template (first 500):', JSON.stringify(templateSrc.slice(0, 500)))
  process.exit(1)
}

// Write and run the PHP script
const scriptPath = path.join(cwd, 'routesync-test-dump.php')
writeFileSync(scriptPath, phpScript, 'utf-8')
console.log('PHP script written to routesync-test-dump.php')
console.log('Script size:', phpScript.length, 'bytes')
console.log('')

const result = spawnSync('php', ['routesync-test-dump.php'], {
  cwd,
  encoding: 'utf-8',
  maxBuffer: 1024 * 1024 * 10
})

console.log('=== PHP stdout (first 300 chars) ===')
console.log(JSON.stringify(result.stdout.slice(0, 300)))
console.log('')
console.log('=== PHP stdout hex (first 80 bytes) ===')
console.log(Buffer.from(result.stdout, 'utf-8').slice(0, 80).toString('hex'))
console.log('')
console.log('=== PHP stderr (first 500) ===')
console.log(result.stderr?.slice(0, 500) || '(empty)')
console.log('')
console.log('=== error ===')
console.log(result.error)

// Try to parse
const raw = (result.stdout ?? '').replace(/^\uFEFF/, '').replace(/\r\n/g, '\n').trim()
const jsonStart = raw.indexOf('{')
console.log('\n=== jsonStart ===', jsonStart)
if (jsonStart > 0) {
  console.log('=== chars BEFORE { ===')
  console.log(JSON.stringify(raw.slice(0, jsonStart)))
  console.log('hex:', Buffer.from(raw.slice(0, jsonStart), 'utf-8').toString('hex'))
}
if (jsonStart !== -1) {
  try {
    JSON.parse(raw.slice(jsonStart))
    console.log('✓ JSON.parse SUCCESS')
  } catch(e) {
    console.log('✗ JSON.parse FAILED:', e.message)
    console.log('JSON snippet around error:')
    const pos = parseInt(e.message.match(/position (\d+)/)?.[1] ?? '0')
    console.log(JSON.stringify(raw.slice(jsonStart + Math.max(0,pos-20), jsonStart + pos + 50)))
  }
}

// Cleanup
import_cleanup()
async function import_cleanup() {
  const { unlinkSync } = await import('fs')
  try { unlinkSync(scriptPath) } catch(e) {}
  console.log('\nroutesync-test-dump.php deleted')
}
