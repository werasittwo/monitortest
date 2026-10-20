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
Write-Host "  กำลังอัปโหลดการเปลี่ยนแปลงขึ้น GitHub: werasittwo/monitortest" -ForegroundColor Green
Write-Host "=====================================================" -ForegroundColor Cyan

Set-Location $PSScriptRoot

& $gitExe add .
& $gitExe commit -m "Update KPI 70: Soft blue theme, 2 KPIs, Strategy Checklist page" 2>$null
& $gitExe push origin main

Write-Host ""
Write-Host "✅ อัปเดตขึ้น https://github.com/werasittwo/monitortest เรียบร้อยแล้ว!" -ForegroundColor Green
Start-Process "https://github.com/werasittwo/monitortest"
