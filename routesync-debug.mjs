#!/usr/bin/env node
/**
 * RouteSync Debug Script
 * Jalanin dari folder Laravel: node routesync-debug.mjs
 * Ini akan nunjukin persis apa yang PHP output sebelum JSON.parse
 */
import { spawnSync } from 'child_process'
import { writeFileSync, unlinkSync, existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const cwd = process.cwd()
console.log('CWD:', cwd)
console.log('Checking vendor/autoload.php:', existsSync(path.join(cwd, 'vendor/autoload.php')))
console.log('Checking bootstrap/app.php:', existsSync(path.join(cwd, 'bootstrap/app.php')))
console.log('Checking routes/api.php:', existsSync(path.join(cwd, 'routes/api.php')))
console.log('')

// Step 1: test bare PHP JSON output
console.log('=== STEP 1: bare PHP json_encode test ===')
const bare = spawnSync('php', ['-r', "echo json_encode(['routes'=>[],'models'=>[]]);"], {
  cwd, encoding: 'utf-8'
})
console.log('stdout:', JSON.stringify(bare.stdout))
console.log('stderr:', JSON.stringify(bare.stderr))
console.log('error:', bare.error)
console.log('')

// Step 2: test Laravel bootstrap
console.log('=== STEP 2: Laravel bootstrap test ===')
const bootstrapScript = `<?php
error_reporting(E_ALL);
ini_set('display_errors', 'stderr');
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\\Contracts\\Console\\Kernel::class);
$kernel->bootstrap();
echo json_encode(['bootstrapped' => true, 'phpVersion' => PHP_VERSION]);
`
writeFileSync(path.join(cwd, 'rs-debug-bootstrap.php'), bootstrapScript)
const boot = spawnSync('php', ['rs-debug-bootstrap.php'], { cwd, encoding: 'utf-8' })
unlinkSync(path.join(cwd, 'rs-debug-bootstrap.php'))
console.log('stdout repr:', JSON.stringify(boot.stdout))
console.log('stdout hex (first 50 bytes):', Buffer.from(boot.stdout, 'utf-8').slice(0, 50).toString('hex'))
console.log('stderr (first 500):', boot.stderr?.slice(0, 500))
console.log('error:', boot.error)
console.log('')

// Step 3: test route extraction
console.log('=== STEP 3: route count test ===')
const routeScript = `<?php
error_reporting(E_ALL);
ini_set('display_errors', 'stderr');
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\\Contracts\\Console\\Kernel::class);
$kernel->bootstrap();
$routes = app('router')->getRoutes();
$apiRoutes = [];
foreach ($routes as $r) {
  if (str_starts_with($r->uri(), 'api/')) {
    $apiRoutes[] = $r->uri();
  }
}
echo json_encode(['count' => count($apiRoutes), 'routes' => $apiRoutes]);
`
writeFileSync(path.join(cwd, 'rs-debug-routes.php'), routeScript)
const routes = spawnSync('php', ['rs-debug-routes.php'], { cwd, encoding: 'utf-8' })
unlinkSync(path.join(cwd, 'rs-debug-routes.php'))
console.log('stdout repr:', JSON.stringify(routes.stdout))
console.log('stdout hex (first 50 bytes):', Buffer.from(routes.stdout, 'utf-8').slice(0, 50).toString('hex'))
console.log('stderr (first 500):', routes.stderr?.slice(0, 500))
console.log('error:', routes.error)
