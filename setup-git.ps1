# Git & GitHub Initialization and Version Control Helper
# Run this script once Git is installed or available in PATH.

Write-Host "Checking Git availability..." -ForegroundColor Cyan

if (Get-Command git -ErrorAction SilentlyContinue) {
    Write-Host "Git detected: $(git --version)" -ForegroundColor Green

    if (-not (Test-Path .git)) {
        Write-Host "Initializing new Git repository..." -ForegroundColor Yellow
        git init
        git add .
        git commit -m "feat: initial release of Retail Inventory Dashboard with 500+ items and sub-200ms SLA"
        Write-Host "Repository initialized with initial commit!" -ForegroundColor Green
    } else {
        Write-Host "Git repository already initialized. Current status:" -ForegroundColor Yellow
        git status
    }

    Write-Host "`nTo link and push this project to GitHub:" -ForegroundColor Cyan
    Write-Host "1. Create a new repository on GitHub: https://github.com/new" -ForegroundColor White
    Write-Host "2. Run:" -ForegroundColor White
    Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/inventory-dashboard.git" -ForegroundColor Gray
    Write-Host "   git branch -M main" -ForegroundColor Gray
    Write-Host "   git push -u origin main" -ForegroundColor Gray
} else {
    Write-Host "Git is not currently installed or not in PATH." -ForegroundColor Yellow
    Write-Host "You can install Git by running in PowerShell (as Administrator):" -ForegroundColor White
    Write-Host "   winget install Git.Git" -ForegroundColor Cyan
    Write-Host "Or download Git from: https://git-scm.com/download/win" -ForegroundColor White
}
