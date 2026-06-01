#!/usr/bin/env node
/**
 * Dump the relevant section of cli.js so we can see exact compiled format
 * Jalanin dari folder Laravel: node routesync-inspect.mjs
 */
import { readFileSync } from 'fs'
import path from 'path'

const cliPath = path.join(process.cwd(), 'node_modules/routesync/dist/cli.js')
const src = readFileSync(cliPath, 'utf-8')

// Find and dump around the key areas
const markers = [
  'routesync-extractor-temp.php',
  'projectRoot',
  'JSON.parse(stdout)',
  'extractModels',
  'Failed to parse Laravel'
]

for (const marker of markers) {
  const idx = src.indexOf(marker)
  if (idx === -1) { console.log(`NOT FOUND: ${marker}\n`); continue }
  console.log(`\n=== "${marker}" at pos ${idx} ===`)
  console.log(src.slice(Math.max(0, idx - 120), idx + 200))
  console.log('---')
}
