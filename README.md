# 🏦 Financiera NextLab - Frontend

Aplicación web frontend para la plataforma financiera NextLab, construida con tecnologías modernas y siguiendo las mejores prácticas de desarrollo.

## 🚀 Características

- **Next.js 14** con App Router para rendimiento óptimo
- **TypeScript** para tipado estático y mejor DX
- **Material-UI (MUI)** para componentes UI consistentes
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
├── (public)/          # Rutas públicas
├── api/               # API Routes de Next.js
├── components/        # Componentes reutilizables
│   ├── query-provider.tsx
│   └── theme-provider.tsx
├── features/          # Funcionalidades específicas del dominio
├── i18n/              # Configuración de internacionalización
│   ├── config.ts
│   └── locales/
├── service/           # Servicios y configuración
│   ├── api-client.ts
│   └── query-client.ts
├── styles/            # Tema MUI y tokens de diseño
│   ├── theme.ts
│   └── tokens.ts
└── utils/             # Utilidades y helpers
    ├── dates.ts
    ├── env.ts
    ├── format.ts
    ├── pdf.ts
    └── upload.ts
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

El proyecto utiliza Material-UI con un sistema de tokens personalizado:

- **Tema**: Configurado en `app/styles/theme.ts`
- **Tokens**: Definidos en `app/styles/tokens.ts`
- **Modo oscuro**: Preparado para implementación futura

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

### Etapa 1 (Actual)

- [x] Configuración base del proyecto
- [x] Sistema de diseño con MUI
- [x] Configuración de TypeScript y ESLint
- [x] Estructura de carpetas y routing
- [ ] Implementación de autenticación
- [ ] Tema oscuro
- [ ] i18n completo

### Etapa 2 (Próxima)

- [ ] Dashboard principal
- [ ] Gestión de usuarios
- [ ] Módulos financieros básicos

## 📄 Licencia

Este proyecto es privado y pertenece a NextLab.

## 📞 Soporte

Para soporte técnico, contacta al equipo de desarrollo de NextLab.
