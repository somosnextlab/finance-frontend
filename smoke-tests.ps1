# Smoke Tests Script para Etapa 2 BFF
# Ejecutar: .\smoke-tests.ps1

Write-Host "🔥 Iniciando Smoke Tests - Etapa 2 BFF" -ForegroundColor Yellow
Write-Host ""

$baseUrl = "http://localhost:3000"
$cookie = ""

# Test 1: Health Check
Write-Host "1. Testing /api/health..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/api/health" -Method GET
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Health check OK (200)" -ForegroundColor Green
        Write-Host "Response: $($response.Content)" -ForegroundColor Gray
    } else {
        Write-Host "❌ Health check failed: $($response.StatusCode)" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Health check error: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 2: Auth /me sin cookie (debe fallar)
Write-Host "2. Testing /api/auth/me sin cookie..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "$baseUrl/api/auth/me" -Method GET
    Write-Host "❌ Debería haber fallado: $($response.StatusCode)" -ForegroundColor Red
} catch {
    if ($_.Exception.Response.StatusCode -eq 401) {
        Write-Host "✅ Auth /me sin cookie OK (401)" -ForegroundColor Green
    } else {
        Write-Host "❌ Auth /me sin cookie error: $($_.Exception.Response.StatusCode)" -ForegroundColor Red
    }
}
Write-Host ""

# Test 3: Login
Write-Host "3. Testing /api/auth/login..." -ForegroundColor Cyan
try {
    $body = @{
        email = "test@example.com"
        password = "secret"
    } | ConvertTo-Json

    $response = Invoke-WebRequest -Uri "$baseUrl/api/auth/login" -Method POST -Body $body -ContentType "application/json"
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Login OK (200)" -ForegroundColor Green
        Write-Host "Response: $($response.Content)" -ForegroundColor Gray
        
        # Extraer cookie
        $setCookie = $response.Headers["Set-Cookie"]
        if ($setCookie) {
            $cookie = ($setCookie -split ";")[0]
            Write-Host "Cookie extraída: $cookie" -ForegroundColor Gray
        }
    } else {
        Write-Host "❌ Login failed: $($response.StatusCode)" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Login error: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 4: Auth /me con cookie
Write-Host "4. Testing /api/auth/me con cookie..." -ForegroundColor Cyan
if ($cookie) {
    try {
        $headers = @{
            "Cookie" = $cookie
        }
        $response = Invoke-WebRequest -Uri "$baseUrl/api/auth/me" -Method GET -Headers $headers
        if ($response.StatusCode -eq 200) {
            Write-Host "✅ Auth /me con cookie OK (200)" -ForegroundColor Green
            Write-Host "Response: $($response.Content)" -ForegroundColor Gray
        } else {
            Write-Host "❌ Auth /me con cookie failed: $($response.StatusCode)" -ForegroundColor Red
        }
    } catch {
        Write-Host "❌ Auth /me con cookie error: $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host "⚠️ Saltando test - no hay cookie" -ForegroundColor Yellow
}
Write-Host ""

# Test 5: Payments intent sin datos (debe fallar)
Write-Host "5. Testing /api/payments/intent sin datos..." -ForegroundColor Cyan
if ($cookie) {
    try {
        $headers = @{
            "Cookie" = $cookie
            "Content-Type" = "application/json"
        }
        $response = Invoke-WebRequest -Uri "$baseUrl/api/payments/intent" -Method POST -Headers $headers -Body "{}"
        Write-Host "❌ Debería haber fallado: $($response.StatusCode)" -ForegroundColor Red
    } catch {
        if ($_.Exception.Response.StatusCode -eq 400) {
            Write-Host "✅ Payments intent sin datos OK (400)" -ForegroundColor Green
        } else {
            Write-Host "❌ Payments intent sin datos error: $($_.Exception.Response.StatusCode)" -ForegroundColor Red
        }
    }
} else {
    Write-Host "⚠️ Saltando test - no hay cookie" -ForegroundColor Yellow
}
Write-Host ""

# Test 6: Payments intent con datos
Write-Host "6. Testing /api/payments/intent con datos..." -ForegroundColor Cyan
if ($cookie) {
    try {
        $headers = @{
            "Cookie" = $cookie
            "Content-Type" = "application/json"
        }
        $body = @{
            amount = 1000
            currency = "ARS"
        } | ConvertTo-Json

        $response = Invoke-WebRequest -Uri "$baseUrl/api/payments/intent" -Method POST -Headers $headers -Body $body
        if ($response.StatusCode -eq 200) {
            Write-Host "✅ Payments intent con datos OK (200)" -ForegroundColor Green
            Write-Host "Response: $($response.Content)" -ForegroundColor Gray
        } else {
            Write-Host "❌ Payments intent con datos failed: $($response.StatusCode)" -ForegroundColor Red
        }
    } catch {
        Write-Host "❌ Payments intent con datos error: $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host "⚠️ Saltando test - no hay cookie" -ForegroundColor Yellow
}
Write-Host ""

Write-Host "🔥 Smoke Tests completados" -ForegroundColor Yellow
Write-Host "Verificar que no se expongan secretos en las respuestas" -ForegroundColor Gray
