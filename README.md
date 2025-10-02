# 🏦 Financiera NextLab - Frontend

Aplicación web frontend para la plataforma financiera NextLab, construida con tecnologías modernas y siguiendo las mejores prácticas de desarrollo.

## ✅ Etapa 1 Completada

**Layout base + Theming light/dark + Componentes globales + Wrappers RHF**

### 🎯 Características Implementadas

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

## 🔧 Configuración

### Variables de Entorno

Copia `env.example` a `.env.local` y configura:

```env
# API
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Sentry
SENTRY_DSN=your_sentry_dsn

# PostHog
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

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

- **Headers de seguridad** configurados en middleware
- **Sanitización** de HTML con DOMPurify
- **Validación** de datos con Zod
- **Autenticación** preparada para implementación

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

### 🚧 Etapa 2 - En Desarrollo

**Dashboard principal + Autenticación + Módulos básicos**

- [ ] Implementación de autenticación (NextAuth.js)
- [ ] Dashboard principal con métricas
- [ ] Gestión de usuarios y roles
- [ ] Módulos financieros básicos
- [ ] i18n completo (es/en)
- [ ] Testing con Jest y React Testing Library

### 🔮 Etapa 3 - Futuro

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
