$possiblePaths = @(
  "C:\Program Files\Git\cmd\git.exe",
  "C:\Program Files (x86)\Git\cmd\git.exe",
  "$env:LOCALAPPDATA\Programs\Git\cmd\git.exe",
  "$env:USERPROFILE\AppData\Local\Programs\Git\cmd\git.exe"
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

if (-not $gitExe) {
  Write-Error "Git executable not found."
  exit 1
}

Write-Host "Using Git at: $gitExe" -ForegroundColor Cyan

& $gitExe init
& $gitExe config user.name "werasittwo"
& $gitExe config user.email "werasittwo@users.noreply.github.com"
& $gitExe branch -M main
& $gitExe remote remove origin 2>$null
& $gitExe remote add origin https://github.com/werasittwo/monitortest.git
& $gitExe add .
& $gitExe commit -m "Initial commit: KPI 2570 Monitoring System"
& $gitExe push -u origin main
