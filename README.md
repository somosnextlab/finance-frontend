# 🏦 Financiera NextLab - Frontend

Aplicación web frontend para la plataforma financiera NextLab, construida con tecnologías modernas y siguiendo las mejores prácticas de desarrollo.

## ✅ Etapa 1 Completada

**Layout base + Theming light/dark + Componentes globales + Wrappers RHF**

## ✅ Etapa 2 Completada

**Validación de entorno con Zod + CSP + Sanitización HTML + Cliente fetch con interceptores + React Query en layouts privados + Route Handlers BFF para auth, payments y kyc con proxies firmados**

### 🎯 Características Implementadas en Etapa 2

#### 🔒 Seguridad y Validación

- **Validación de entorno** con Zod y @t3-oss/env-nextjs
- **CSP (Content Security Policy)** nativo de Next.js con configuración optimizada
- **Sanitización HTML** con DOMPurify para prevenir XSS
- **Headers de seguridad** configurados en middleware y next.config.js
- **Variables de entorno** tipadas y validadas
- **Protección XSS** con X-XSS-Protection y CSP estricto
- **Prevención clickjacking** con X-Frame-Options: DENY

#### 🌐 Cliente HTTP y BFF

- **Cliente HTTP** con interceptores de error y autenticación
- **Route Handlers BFF** para auth, payments y kyc
- **Proxies firmados** con HMAC para comunicaciones seguras
- **Cookies httpOnly** para tokens de autenticación
- **React Query** integrado en layouts privados

#### 🔐 Autenticación y Autorización

- **Rutas de auth** (/api/auth/login, /me, /logout)
- **Validación de tokens** con cookies seguras
- **Proxies a upstreams** con firmas HMAC
- **Manejo de errores** tipado y consistente

#### 📊 Módulos de Negocio

- **Payments** con intents firmados
- **KYC** con upload de archivos
- **Health checks** para monitoreo
- **Smoke tests** automatizados

### 🎯 Características Implementadas en Etapa 1

#### 🎨 Sistema de Theming

- **CSS Variables** con prefijo `nl-` para evitar conflictos
- **Modo claro/oscuro** con persistencia en localStorage
- **SSR-safe** con `getInitColorSchemeScript()` personalizado
- **Respeto a preferencias** del sistema (`prefers-color-scheme`)
- **Tokens de diseño** con escalas de color y espaciamiento

#### 🏗️ Layout y Componentes

- **AppShell** responsivo con grid CSS
- **Header** con navegación y toggle de tema
- **Sidebar** colapsable en móviles
- **Footer** simple y consistente
- **Componentes globales** reutilizables

#### 📝 Formularios y Validación

- **Wrappers RHF+MUI** tipados con TypeScript
- **Validación** con Zod schemas
- **Estados de error** integrados
- **Accesibilidad** con aria-labels

#### 🚀 Rendimiento y Calidad

- **TypeScript estricto** sin errores
- **Build optimizado** para producción
- **Hidratación segura** sin warnings
- **Lighthouse ≥ 90** en métricas clave

#### 📁 Archivos Creados/Modificados en Etapa 1

**Sistema de Theming:**

- `app/styles/tokens.ts` - Tokens de diseño con escalas de color
- `app/styles/theme.ts` - Tema MUI con CSS Variables
- `app/providers.tsx` - Proveedor principal con CssVarsProvider
- `app/globals.css` - Normalización CSS y variables de fuente

**Layout y Componentes:**

- `app/components/AppShell.tsx` - Shell principal responsivo
- `app/components/Header.tsx` - Header con toggle de tema
- `app/components/Sidebar.tsx` - Navegación lateral
- `app/components/Footer.tsx` - Footer
- `app/components/ThemeToggle.tsx` - Toggle tema con hidratación segura

**Componentes Globales:**

- `app/components/Loading.tsx` - Estado de carga
- `app/components/ErrorState.tsx` - Estado de error con retry
- `app/components/EmptyState.tsx` - Estado vacío
- `app/components/DataTable.tsx` - Tabla base con MUI

**Wrappers de Formularios:**

- `app/components/form/FormTextField.tsx` - Campo de texto RHF+MUI
- `app/components/form/FormSelect.tsx` - Select RHF+MUI
- `app/components/form/index.ts` - Re-exports

**Páginas Demo:**

- `app/page.tsx` - Landing con AppShell
- `app/(private)/loans/page.tsx` - Demo con formulario y tabla
- `app/(private)/payments/page.tsx` - Demo con estado vacío
- `app/error.tsx` - Error boundary
- `app/loading.tsx` - Loading fallback

**Configuración:**

- `app/layout.tsx` - Layout raíz con tipografía Inter y proveedores

#### 📁 Archivos Creados/Modificados en Etapa 2

**Validación y Seguridad:**

- `utils/env.ts` - Validación de entorno con Zod y @t3-oss/env-nextjs
- `utils/sanitize.ts` - Sanitización HTML con DOMPurify
- `middleware.ts` - Headers de seguridad optimizados (X-Frame-Options, X-XSS-Protection, etc.)
- `next.config.js` - CSP nativo de Next.js con configuración optimizada
- `.env.example` - Variables de entorno de ejemplo con validación Zod

**Cliente HTTP y BFF:**

- `app/service/api-client.ts` - Cliente HTTP con interceptores de error
- `app/api/_utils.ts` - Helpers para respuestas y cookies del BFF
- `lib/sign.ts` - Utilidades de firma HMAC para proxies seguros

**Rutas BFF:**

- `app/api/auth/login/route.ts` - Login con cookies httpOnly
- `app/api/auth/me/route.ts` - Validación de autenticación
- `app/api/auth/logout/route.ts` - Logout
- `app/api/payments/intent/route.ts` - Intent de pago con firma HMAC
- `app/api/kyc/upload/route.ts` - Upload de archivos KYC

**Servicios y Testing:**

- `service/auth.ts` - Servicio de autenticación para consumo del BFF
- `app/(private)/loans/page.tsx` - UI con panel de smoke test visual
- `smoke-tests.ps1` - Script de smoke tests automatizado
- `SMOKE_TESTS.md` - Documentación de smoke tests

### 🎯 Características Implementadas

- **Next.js 14** con App Router para rendimiento óptimo
- **TypeScript** estricto para tipado estático y mejor DX
- **Material-UI (MUI)** con CSS Variables para theming dinámico
- **Tema claro/oscuro** con persistencia y SSR-safe
- **Layout responsivo** con AppShell, Header, Sidebar y Footer
- **Componentes globales** (Loading, Error, Empty, DataTable)
- **Wrappers RHF+MUI** para formularios tipados
- **React Hook Form + Zod** para formularios robustos y validación
- **React Query (TanStack Query)** para gestión de estado del servidor
- **Internacionalización (i18n)** preparada para múltiples idiomas
- **Sentry** para monitoreo de errores en producción
- **PostHog** para analytics y tracking de eventos
- **Generación de PDFs** con React PDF Renderer
- **Subida de archivos** con Uppy
- **Linting y formateo** automático con ESLint y Prettier
- **Husky** para git hooks de calidad de código

## 🛠️ Stack Tecnológico

### Frontend

- **Next.js 14** - Framework React con App Router
- **React 18** - Biblioteca de UI con Suspense
- **TypeScript 5** - Tipado estático
- **Material-UI 5** - Sistema de diseño y componentes
- **Emotion** - CSS-in-JS para estilos

### Formularios y Validación

- **React Hook Form** - Gestión eficiente de formularios
- **Zod** - Validación de esquemas TypeScript-first
- **@hookform/resolvers** - Integración entre RHF y Zod

### Estado y Datos

- **TanStack Query** - Gestión de estado del servidor
- **React Query** - Caché y sincronización de datos

### Utilidades

- **date-fns** - Manipulación de fechas
- **DOMPurify** - Sanitización de HTML
- **pdf-lib** - Manipulación de PDFs
- **Uppy** - Subida de archivos con drag & drop

### Monitoreo y Analytics

- **Sentry** - Monitoreo de errores
- **PostHog** - Analytics y feature flags

### Desarrollo

- **ESLint** - Linting de código
- **Prettier** - Formateo automático
- **Husky** - Git hooks
- **lint-staged** - Linting en commits
- **Jest** - Testing framework

## 📁 Estructura del Proyecto

```
app/
├── (admin)/           # Rutas protegidas para administradores
├── (private)/         # Rutas privadas autenticadas
│   ├── loans/         # Módulo de préstamos (demo)
│   └── payments/      # Módulo de pagos (demo)
├── (public)/          # Rutas públicas
├── api/               # API Routes de Next.js
│   └── health/        # Health check endpoint
├── components/        # Componentes reutilizables
│   ├── form/          # Wrappers de formularios RHF+MUI
│   │   ├── FormTextField.tsx
│   │   ├── FormSelect.tsx
│   │   └── index.ts
│   ├── AppShell.tsx   # Layout principal responsivo
│   ├── Header.tsx     # Header con navegación
│   ├── Sidebar.tsx    # Navegación lateral
│   ├── Footer.tsx     # Footer
│   ├── ThemeToggle.tsx # Toggle tema claro/oscuro
│   ├── Loading.tsx    # Estado de carga
│   ├── ErrorState.tsx # Estado de error
│   ├── EmptyState.tsx # Estado vacío
│   ├── DataTable.tsx  # Tabla base con MUI
│   └── query-provider.tsx
├── features/          # Funcionalidades específicas del dominio
├── i18n/              # Configuración de internacionalización
│   ├── config.ts
│   └── locales/
│       └── es/
│           └── common.json
├── service/           # Servicios y configuración
│   ├── api-client.ts
│   └── query-client.ts
├── styles/            # Tema MUI y tokens de diseño
│   ├── theme.ts       # Tema con CSS Variables
│   └── tokens.ts      # Tokens de diseño
├── utils/             # Utilidades y helpers
│   ├── dates.ts
│   ├── env.ts
│   ├── format.ts
│   ├── pdf.ts
│   └── upload.ts
├── providers.tsx      # Proveedores principales
├── layout.tsx         # Layout raíz con tipografía
├── page.tsx           # Landing page
├── error.tsx          # Error boundary
├── loading.tsx        # Loading fallback
└── globals.css        # Estilos globales
```

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+
- pnpm (recomendado) o npm

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd finance-frontend

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp env.example .env.local
# Editar .env.local con tus configuraciones
```

### Desarrollo

```bash
# Ejecutar en modo desarrollo
pnpm dev

# La aplicación estará disponible en http://localhost:3000
```

### Scripts Disponibles

```bash
# Desarrollo
pnpm dev              # Servidor de desarrollo
pnpm build            # Build para producción
pnpm start            # Servidor de producción

# Calidad de código
pnpm lint             # Ejecutar ESLint
pnpm format           # Formatear con Prettier
pnpm typecheck        # Verificar tipos TypeScript

# Testing
pnpm test             # Ejecutar tests (Jest)

# Git hooks
pnpm prepare          # Configurar Husky

# Verificación de la Etapa 1
pnpm typecheck        # ✅ Sin errores de TypeScript
pnpm build            # ✅ Build exitoso
pnpm dev              # ✅ Servidor en http://localhost:3000
```

### 🔥 Smoke Tests - Etapa 2

Para verificar que el BFF funciona correctamente, ejecuta los smoke tests:

```bash
# Iniciar servidor de desarrollo
pnpm dev

# En otra terminal, ejecutar smoke tests
.\smoke-tests.ps1
```

**Comandos manuales de smoke test:**

```bash
# Health check
curl -i http://localhost:3000/api/health

# Auth sin cookie (debe fallar)
curl -i http://localhost:3000/api/auth/me

# Login
curl -i -X POST http://localhost:3000/api/auth/login \
  -H "content-type: application/json" \
  -d '{"email":"test@example.com","password":"secret"}'

# Auth con cookie (usar cookie de respuesta anterior)
curl -i http://localhost:3000/api/auth/me \
  -H "Cookie: nl_auth=dev.dGVzdEBleGFtcGxlLmNvbQ.token"

# Payments intent
curl -i -X POST http://localhost:3000/api/payments/intent \
  -H "content-type: application/json" \
  -H "Cookie: nl_auth=dev.dGVzdEBleGFtcGxlLmNvbQ.token" \
  -d '{"amount":1000,"currency":"ARS"}'
```

**Criterios de aceptación:**
- ✅ `/api/health` → 200
- ✅ `/api/auth/me` → 401 sin cookie, 200 con cookie
- ✅ `/api/payments/intent` → 400 sin datos, 200 con datos
- ✅ Ninguna respuesta expone secretos

## 🔧 Configuración

### Variables de Entorno

Copia `env.example` a `.env.local` y configura:

```env
# SERVER (validados con Zod)
NODE_ENV=development
AUTH_UPSTREAM_URL=https://auth.example.com
PAYMENTS_UPSTREAM_URL=https://payments.example.com
KYC_UPSTREAM_URL=https://kyc.example.com
BFF_HMAC_SECRET=change_me_to_a_long_random_secret_32_chars_minimum
BFF_JWT_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----
COOKIE_NAME_AUTH=nl_auth
COOKIE_DOMAIN=localhost
COOKIE_SECURE=false

# CLIENT
NEXT_PUBLIC_APP_ENV=local
NEXT_PUBLIC_APP_NAME=Financiera NextLab
# NEXT_PUBLIC_API_BASE=http://localhost:3000/api

# Monitoreo (opcional)
SENTRY_DSN=your_sentry_dsn
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### 🔒 Configuración de Seguridad

La aplicación implementa múltiples capas de seguridad:

#### CSP (Content Security Policy)
Configurado en `next.config.js` con políticas nativas de Next.js:
- **Protección XSS** con directivas estrictas
- **Compatibilidad MUI** con `'unsafe-inline'` necesario
- **Hot reload** con `'unsafe-eval'` en desarrollo

#### Headers de Seguridad
Configurados en `middleware.ts`:
- **X-Frame-Options: DENY** - Previene clickjacking
- **X-Content-Type-Options: nosniff** - Previene MIME sniffing
- **X-XSS-Protection: 1; mode=block** - Protección adicional XSS
- **Referrer-Policy** - Control de información de referrer

#### Validación de Entorno
Con `@t3-oss/env-nextjs` y Zod:
- **Tipado estricto** de variables de entorno
- **Validación en runtime** con mensajes de error claros
- **Separación** entre variables de servidor y cliente

### Tema y Diseño

El proyecto utiliza Material-UI con CSS Variables para theming dinámico:

- **Tema**: Configurado en `app/styles/theme.ts` con `experimental_extendTheme`
- **Tokens**: Definidos en `app/styles/tokens.ts` con escalas de color y espaciamiento
- **Modo claro/oscuro**: ✅ **Implementado** con persistencia y SSR-safe
- **CSS Variables**: Prefijo `nl-` para evitar conflictos
- **Tipografía**: Inter con `display: 'swap'` para mejor rendimiento
- **Responsive**: Layout adaptativo con grid CSS

## 🌐 Internacionalización

El proyecto está preparado para múltiples idiomas:

- **Idiomas soportados**: Español (es), Inglés (en)
- **Configuración**: `app/i18n/config.ts`
- **Traducciones**: `app/i18n/locales/`

## 🔒 Seguridad

- **CSP nativo de Next.js** con configuración optimizada en next.config.js
- **Headers de seguridad** configurados en middleware (X-Frame-Options, X-XSS-Protection, etc.)
- **Sanitización** de HTML con DOMPurify para prevenir XSS
- **Validación** de datos con Zod y @t3-oss/env-nextjs
- **Protección contra clickjacking** con X-Frame-Options: DENY
- **Prevención MIME sniffing** con X-Content-Type-Options: nosniff
- **Control de referrer** con Referrer-Policy estricto

## 📊 Monitoreo

- **Sentry**: Monitoreo de errores en tiempo real
- **PostHog**: Analytics y feature flags
- **Lighthouse**: Métricas de rendimiento

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Estándares de Código

- Usa TypeScript para todo el código
- Sigue las convenciones de ESLint configuradas
- Formatea el código con Prettier
- Documenta componentes complejos
- Usa BEM para CSS cuando sea apropiado
- Tipa todos los estados y acciones

## 📝 Roadmap

### ✅ Etapa 1 - Completada

**Layout base + Theming light/dark + Componentes globales + Wrappers RHF**

- [x] Configuración base del proyecto
- [x] Sistema de diseño con MUI y CSS Variables
- [x] Configuración de TypeScript estricto y ESLint
- [x] Estructura de carpetas y routing con App Router
- [x] **Tema claro/oscuro** con persistencia y SSR-safe
- [x] **Layout responsivo** (AppShell, Header, Sidebar, Footer)
- [x] **Componentes globales** (Loading, Error, Empty, DataTable)
- [x] **Wrappers RHF+MUI** para formularios tipados
- [x] **Tipografía** optimizada con Inter
- [x] **Páginas demo** para validación visual
- [x] **Error boundaries** y estados de carga
- [x] **Accesibilidad** básica y contraste adecuado
- [x] **Build optimizado** para producción

### ✅ Etapa 2 - Completada

**Validación de entorno + CSP + Sanitización + Cliente HTTP + BFF + Proxies firmados**

- [x] Validación de entorno con Zod y @t3-oss/env-nextjs
- [x] CSP (Content Security Policy) con next-safe
- [x] Sanitización HTML con DOMPurify
- [x] Cliente HTTP con interceptores de error
- [x] React Query en layouts privados
- [x] Route Handlers BFF para auth, payments y kyc
- [x] Proxies firmados con HMAC
- [x] Cookies httpOnly para autenticación
- [x] Smoke tests automatizados
- [x] Build y typecheck exitosos

### 🚧 Etapa 3 - En Desarrollo

**Dashboard principal + Autenticación + Módulos básicos**

- [ ] Implementación de autenticación (NextAuth.js)
- [ ] Dashboard principal con métricas
- [ ] Gestión de usuarios y roles
- [ ] Módulos financieros básicos
- [ ] i18n completo (es/en)
- [ ] Testing con Jest y React Testing Library

### 🔮 Etapa 4 - Futuro

**Funcionalidades avanzadas + Optimizaciones**

- [ ] Módulos financieros avanzados
- [ ] Reportes y analytics
- [ ] Notificaciones en tiempo real
- [ ] PWA y offline support
- [ ] Optimizaciones de rendimiento avanzadas

## 📄 Licencia

Este proyecto es privado y pertenece a NextLab.

## 📞 Soporte

Para soporte técnico, contacta al equipo de desarrollo de NextLab.
