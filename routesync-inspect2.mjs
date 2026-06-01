#!/usr/bin/env node
import { readFileSync } from 'fs'
import path from 'path'

const cliPath = path.join(process.cwd(), 'node_modules/routesync/dist/cli.js')
const src = readFileSync(cliPath, 'utf-8')

// Dump the full parse() method — from scriptPath to end of catch block
const start = src.indexOf('const scriptPath = import_path')
const end = src.indexOf('// packages/cli/src/generators/ManifestGenerator')
console.log(src.slice(start, end))
