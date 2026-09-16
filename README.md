# App UI

Catálogo de componentes reutilizables con Vue 3, TypeScript, Vite y Tailwind CSS 4.
Las rutas actuales son `/buttons`, `/forms`, `/alerts`, `/cards`, `/tables` y `/modals`.

## Desarrollo

Node: `^22.18.0 || >=24.12.0`. El gestor declarado es `pnpm@12.3.4`;
las versiones de dependencias se guardan en `pnpm-lock.yaml`.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm build
```

Si las dependencias ya están instaladas y el lanzador local de pnpm falla,
puedes ejecutar `npm run dev` y `npm run build`. No hace falta reinstalar.
`build` comprueba TypeScript y genera `dist/`. `pnpm preview` sirve esa compilación.

## Estructura

- `src/components/ui/`: componentes reutilizables.
- `src/components/docs/`: header, bloques de código y documentación del catálogo.
- `src/docs/`: ejemplos de uso.
- `src/views/`: páginas de demostración.
- `src/layouts/`: estructura general y navegación lateral.
- `src/assets/main.css`: punto de entrada e importaciones de estilos.
- `src/assets/styles/theme.css`: colores, fuentes, radios y sombras.
- `src/assets/styles/base.css`: estilos globales del documento.
- `src/assets/styles/layout.css`: menú, header y distribución responsive.
- `src/assets/styles/components/`: CSS de botones, formularios, alertas, tarjetas, tablas y modales.
- `src/assets/styles/docs.css`: presentación de ejemplos y documentación.
- `src/assets/styles/accessibility.css`: utilidades accesibles y reducción de movimiento.

## Convenciones de estilos

1. Define colores y valores compartidos en `theme.css`. Reutiliza variables con `var(--color-primary)`.
2. Conserva CSS propio para variantes, estados y selectores de componentes.
3. Usa utilidades de Tailwind para composiciones sencillas. `@apply` es opcional.
4. Mantén las reglas responsive junto a los estilos que modifican.
5. No mezcles estilos exclusivos de ejemplos con los de los componentes UI.
6. `accessibility.css` se importa al final para que la reducción de movimiento prevalezca.

Los aliases del tema conservan nombres semánticos y apuntan a un valor compartido.
Las variables locales como `--button-color` seleccionan los colores de cada variante.

## Documentar un componente

Las seis rutas `/buttons`, `/forms`, `/alerts`, `/cards`, `/tables` y `/modals` incluyen documentación de uso:
- Ejemplos visuales y código desplegable que se puede copiar.
- Botones: demostración interactiva de carga, deshabilitado y clics.
- Formularios: campos, selección, validación, mensajes asociados y envío.
- Alertas: estados, variantes, título opcional, cierre y restauración.
- Tarjetas: iconos de Lucide, título, subtítulo, toolbar y encabezados personalizados.
- Tablas: composición dentro de AppCard, filas compactas/alternadas, hover y estado vacío.
- Modales: tamaños, posición, fondo estático, scroll, confirmación y control accesible del foco.
- Tabla de propiedades con tipos y valores predeterminados.
- Eventos nativos, atributos heredados, slots y notas de accesibilidad.

Usa `DocsCodeBlock` para el código; el contenido se muestra como texto, sin ejecutar HTML.
Los fragmentos cortos presuponen que el componente correspondiente está importado; los ejemplos completos incluyen el import.

## Estado de esta etapa

- CSS organizado y colores centralizados.
- AppButton, AppAlert, AppCard, AppTable, AppModal y los controles de formulario están documentados con ejemplos copiables, API y pruebas interactivas.
- Git iniciado con una versión anterior a la reorganización.
- Las seis páginas del catálogo incluyen documentación y demostraciones interactivas.
- Los controles de acciones del header son visuales, sin operaciones conectadas.

Próximas etapas: añadir Dropdown, Tabs y Toast, y construir una pantalla funcional que los combine.

No hay backend ni autenticación. Los datos actuales son ejemplos.
