@echo off
setlocal enabledelayedexpansion

REM Research Project Manager - Start Script for Windows
REM This script starts the development server and opens the app in your browser

cd /d "%~dp0"

echo.
echo ========================================
echo Research Project Manager Launcher
echo ========================================
echo.

REM Check if Node.js is installed
echo Checking for Node.js...
node --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Node.js is not installed or not in your PATH
    echo.
    echo Please download and install Node.js from:
    echo https://nodejs.org/
    echo.
    echo After installing Node.js, run this script again.
    echo.
    pause
    exit /b 1
)
echo Node.js found: 
node --version
echo.

REM Check if pnpm is installed
echo Checking for pnpm...
pnpm --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Installing pnpm globally (required once)...
    call npm install -g pnpm
    if %ERRORLEVEL% NEQ 0 (
        echo ERROR: Failed to install pnpm
        pause
        exit /b 1
    )
)
echo pnpm found: 
pnpm --version
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing project dependencies (this may take 1-2 minutes)...
    echo.
    call pnpm install
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo ERROR: Failed to install dependencies
        echo Please check your internet connection and try again
        pause
        exit /b 1
    )
    echo.
    echo Dependencies installed successfully!
    echo.
)

REM Start the development server
echo Starting development server...
echo.
echo The app will open in your browser at: http://localhost:5173/
echo.
echo Press Ctrl+C in this window to stop the server
echo.

timeout /t 2 /nobreak

REM Try to open browser
start http://localhost:5173/

REM Start pnpm dev
call pnpm dev

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Failed to start the development server
    echo.
)

pause
