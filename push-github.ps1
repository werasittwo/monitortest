$possiblePaths = @(
  "$env:LOCALAPPDATA\Programs\Git\cmd\git.exe",
  "C:\Program Files\Git\cmd\git.exe",
  "C:\Program Files (x86)\Git\cmd\git.exe"
)

$gitExe = $null
foreach ($p in $possiblePaths) {
  if (Test-Path $p) {
    $gitExe = $p
    break
  }
}

if (-not $gitExe) {
  $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
  $cmd = Get-Command git -ErrorAction SilentlyContinue
  if ($cmd) { $gitExe = $cmd.Source }
}

Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host "  กำลังอัปโหลดขึ้น GitHub: werasittwo/monitortest" -ForegroundColor Green
Write-Host "  หากมีหน้าต่าง Sign in to GitHub เด้งขึ้นมา" -ForegroundColor Yellow
Write-Host "  ให้คลิกปุ่ม 'Sign in with your browser' ได้เลยครับ" -ForegroundColor Yellow
Write-Host "=====================================================" -ForegroundColor Cyan

Set-Location $PSScriptRoot

& $gitExe init
& $gitExe config user.name "werasittwo"
& $gitExe config user.email "werasittwo@users.noreply.github.com"
& $gitExe branch -M main
& $gitExe remote remove origin 2>$null
& $gitExe remote add origin https://github.com/werasittwo/monitortest.git
& $gitExe add .
& $gitExe commit -m "Update KPI 2570 Monitoring System" 2>$null
& $gitExe push -u origin main

Write-Host ""
Write-Host "✅ อัปโหลดขึ้น https://github.com/werasittwo/monitortest เรียบร้อยแล้ว!" -ForegroundColor Green
Start-Process "https://github.com/werasittwo/monitortest"
