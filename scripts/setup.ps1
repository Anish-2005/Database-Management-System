# Quick Start Script for Dynamic System Setup
# Run this after cloning the repository

Write-Host "🚀 QuantumDB Dynamic System Setup" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "✓ Checking Node.js installation..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($nodeVersion) {
    Write-Host "  ✅ Node.js $nodeVersion installed" -ForegroundColor Green
} else {
    Write-Host "  ❌ Node.js not found. Please install Node.js 18+ from https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Check if MongoDB is running
Write-Host ""
Write-Host "✓ Checking MongoDB..." -ForegroundColor Yellow
$mongoRunning = mongod --version 2>$null
if ($mongoRunning) {
    Write-Host "  ✅ MongoDB is installed" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  MongoDB not found locally" -ForegroundColor Yellow
    Write-Host "  You can use MongoDB Atlas (cloud) instead" -ForegroundColor Yellow
}

# Create .env.local if it doesn't exist
Write-Host ""
Write-Host "✓ Setting up environment variables..." -ForegroundColor Yellow
if (!(Test-Path ".env.local")) {
    Copy-Item ".env.local.example" ".env.local"
    Write-Host "  ✅ Created .env.local from example" -ForegroundColor Green
    Write-Host "  📝 Please edit .env.local with your MongoDB URI" -ForegroundColor Cyan
} else {
    Write-Host "  ✅ .env.local already exists" -ForegroundColor Green
}

# Install dependencies
Write-Host ""
Write-Host "✓ Installing dependencies..." -ForegroundColor Yellow
npm install
Write-Host "  ✅ Dependencies installed" -ForegroundColor Green

# Ask about data migration
Write-Host ""
Write-Host "Do you want to migrate sample data to MongoDB now? (Y/N)" -ForegroundColor Cyan
$migrate = Read-Host
if ($migrate -eq "Y" -or $migrate -eq "y") {
    Write-Host ""
    Write-Host "✓ Migrating data to MongoDB..." -ForegroundColor Yellow
    npx tsx scripts/migrate-data.ts
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✅ Data migration completed" -ForegroundColor Green
    } else {
        Write-Host "  ❌ Migration failed. Check your MongoDB connection" -ForegroundColor Red
    }
}

# Final instructions
Write-Host ""
Write-Host "🎉 Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Make sure MongoDB is running" -ForegroundColor White
Write-Host "2. Edit .env.local with your MongoDB URI and passcode" -ForegroundColor White
Write-Host "3. Run: npm run dev" -ForegroundColor White
Write-Host "4. Visit: http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "📖 Read DYNAMIC_SYSTEM.md for complete documentation" -ForegroundColor Cyan
Write-Host "📖 Read IMPLEMENTATION_SUMMARY.md for implementation details" -ForegroundColor Cyan
Write-Host ""
Write-Host "Default passcode: admin123" -ForegroundColor Yellow
Write-Host "⚠️  Change this in production!" -ForegroundColor Red
Write-Host ""
