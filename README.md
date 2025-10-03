# 🏦 Financiera NextLab - Frontend

Aplicación web frontend para la plataforma financiera NextLab, construida con Next.js 14 y tecnologías modernas.

## ✨ Características Principales

### 🎨 Sistema de Diseño
- **Tema claro/oscuro** con persistencia y SSR-safe
- **Material-UI** con CSS Variables para theming dinámico
- **Layout responsivo** con AppShell, Header, Sidebar y Footer
- **Componentes globales** reutilizables (Loading, Error, Empty, DataTable)

### 🧙‍♂️ Wizard de Onboarding
- **5 pasos secuenciales** con navegación fluida
- **Validaciones exhaustivas** con Zod en cada paso
- **Formularios accesibles** con React Hook Form + Material-UI
- **Máscaras argentinas** (CUIL, CBU, teléfono, código postal)
- **Carga de documentos KYC** con Uppy (webcam + compresión)
- **Persistencia de datos** con localStorage

### 🔒 Seguridad y Validación
- **CSP nativo** de Next.js con configuración optimizada
- **Headers de seguridad** (X-Frame-Options, X-XSS-Protection, etc.)
- **Sanitización HTML** con DOMPurify
- **Validación de entorno** con Zod y @t3-oss/env-nextjs
- **Proxies firmados** con HMAC para comunicaciones seguras

### 🌐 Internacionalización
- **i18n base** en español con estructura preparada para múltiples idiomas
- **Traducciones** para todos los textos del wizard
- **Formateo** de fechas y números argentinos

## 🛠️ Stack Tecnológico

### Frontend
- **Next.js 14** - Framework React con App Router
- **React 18** - Biblioteca de UI con Suspense
- **TypeScript 5** - Tipado estático estricto
- **Material-UI 5** - Sistema de diseño y componentes

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
- **Uppy** - Subida de archivos con drag & drop
- **libphonenumber-js** - Validación de teléfonos argentinos

## 📁 Estructura del Proyecto

```
app/
├── (admin)/           # Rutas protegidas para administradores
├── (private)/         # Rutas privadas autenticadas
│   ├── loans/         # Módulo de préstamos
│   └── payments/      # Módulo de pagos
├── (public)/          # Rutas públicas
│   └── onboarding/    # Wizard de onboarding (5 pasos)
├── api/               # API Routes de Next.js
│   ├── auth/          # Autenticación
│   ├── kyc/           # Know Your Customer
│   ├── payments/      # Pagos
│   └── health/        # Health check
├── components/        # Componentes reutilizables
│   ├── form/          # Wrappers RHF+MUI
│   ├── AppShell.tsx   # Layout principal
│   ├── Header.tsx     # Header con navegación
│   ├── Sidebar.tsx    # Navegación lateral
│   └── ...
├── features/          # Funcionalidades específicas
│   └── onboarding/    # Módulo de onboarding
│       ├── schemas/   # Schemas Zod por paso
│       ├── components/ # Componentes del wizard
│       ├── hooks/     # Hooks personalizados
│       └── ui/        # Componentes UI específicos
├── i18n/              # Configuración de internacionalización
├── service/           # Servicios y configuración
├── styles/            # Tema MUI y tokens de diseño
└── utils/             # Utilidades y helpers
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
# Wizard de onboarding: http://localhost:3000/onboarding
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
pnpm test             # Ejecutar tests
pnpm test:coverage    # Tests con cobertura
pnpm test:single      # Tests una sola vez
```

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

# CLIENT
NEXT_PUBLIC_APP_ENV=local
NEXT_PUBLIC_APP_NAME=Financiera NextLab

# Monitoreo (opcional)
SENTRY_DSN=your_sentry_dsn
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

## 🔥 Smoke Tests

Para verificar que el BFF funciona correctamente:

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

# Login
curl -i -X POST http://localhost:3000/api/auth/login \
  -H "content-type: application/json" \
  -d '{"email":"test@example.com","password":"secret"}'

# Auth con cookie (usar cookie de respuesta anterior)
curl -i http://localhost:3000/api/auth/me \
  -H "Cookie: nl_auth=dev.dGVzdEBleGFtcGxlLmNvbQ.token"
```

## 📊 Roadmap

### ✅ Etapa 1 - Completada
**Layout base + Theming light/dark + Componentes globales + Wrappers RHF**

### ✅ Etapa 2 - Completada
**Validación de entorno + CSP + Sanitización + Cliente HTTP + BFF + Proxies firmados**

### ✅ Etapa 3 - Completada
**Wizard de Onboarding + Validaciones AR + Carga de Documentos KYC**

### 🚧 Etapa 4 - En Desarrollo
**Dashboard principal + Autenticación + Módulos básicos**

- [ ] Implementación de autenticación (NextAuth.js)
- [ ] Dashboard principal con métricas
- [ ] Gestión de usuarios y roles
- [ ] Módulos financieros básicos
- [ ] i18n completo (es/en)
- [ ] Testing con Jest y React Testing Library

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

## 📄 Licencia

Este proyecto es privado y pertenece a NextLab.

## 📞 Soporte

Para soporte técnico, contacta al equipo de desarrollo de NextLab somosnextlab@gmail.com.