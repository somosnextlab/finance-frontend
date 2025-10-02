# Guía de Contribución

## Flujo de trabajo

### Ramas principales
- `main`: Rama de producción
- `develop`: Rama de desarrollo

### Flujo de ramas
1. Crear una rama feature desde `develop`
2. Realizar los cambios necesarios
3. Crear un Pull Request hacia `develop`
4. Una vez aprobado, mergear a `develop`
5. Para releases, crear PR de `develop` a `main`

## Estándares de código

### TypeScript
- Usar tipos estrictos
- Preferir interfaces sobre types cuando sea posible
- Documentar funciones complejas

### React
- Usar componentes funcionales con hooks
- Preferir composición sobre herencia
- Usar Suspense para componentes async

### Estilos
- Usar Material-UI como sistema de diseño
- Seguir convenciones BEM cuando ayude a la claridad
- Usar tokens de diseño del archivo `styles/tokens.ts`

## Comandos de desarrollo

```bash
# Instalar dependencias
pnpm install

# Desarrollo
pnpm dev

# Linting
pnpm lint

# Type checking
pnpm typecheck

# Build
pnpm build

# Tests
pnpm test
```

## Proceso de PR

1. Asegúrate de que todos los checks pasen
2. Solicita review de al menos un miembro del equipo
3. Resuelve los comentarios de review
4. Una vez aprobado, el PR será mergeado
