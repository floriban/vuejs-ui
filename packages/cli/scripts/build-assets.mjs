import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const cliRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = path.resolve(cliRoot, '../..')
const uiRoot = path.join(repoRoot, 'src/components/ui')
const outputRoot = path.join(cliRoot, 'assets/registry')
const packageJson = JSON.parse(await readFile(path.join(repoRoot, 'package.json'), 'utf8'))
const availableVersions = { ...packageJson.dependencies, ...packageJson.devDependencies }

await cp(path.join(cliRoot, 'assets/core'), path.join(cliRoot, 'assets/template'), { recursive: true, force: true })

const styleMap = {
  accordion: 'accordions.css',
  'advanced-select': 'advanced-forms.css',
  alert: 'alerts.css',
  autocomplete: 'advanced-forms.css',
  avatar: 'avatars.css',
  'avatar-group': 'avatars.css',
  badge: 'badges.css',
  breadcrumbs: 'navigation-feedback.css',
  button: 'buttons.css',
  'button-group': 'buttons.css',
  card: 'cards.css',
  chart: 'editor-charts.css',
  checkbox: 'forms.css',
  'date-picker': 'advanced-forms.css',
  drawer: 'drawer-utilities.css',
  dropdown: 'dropdowns.css',
  'dropdown-item': 'dropdowns.css',
  'dropdown-separator': 'dropdowns.css',
  editor: 'editor-charts.css',
  field: 'forms.css',
  'file-upload': 'file-upload.css',
  input: 'forms.css',
  'input-group': 'input-groups.css',
  'input-mask': 'advanced-forms.css',
  modal: 'modals.css',
  pagination: 'pagination.css',
  popover: 'popovers.css',
  progress: 'progress.css',
  'radio-group': 'forms.css',
  select: 'forms.css',
  skeleton: 'states.css',
  sortable: 'sortable.css',
  spinner: 'timeline-spinners.css',
  state: 'states.css',
  stepper: 'navigation-feedback.css',
  switch: 'forms.css',
  'sweet-alert': 'sweetalert.css',
  table: 'tables.css',
  tabs: 'tabs.css',
  textarea: 'forms.css',
  timeline: 'timeline-spinners.css',
  'time-picker': 'advanced-forms.css',
  toast: 'toasts.css',
  'toast-viewport': 'toasts.css',
  tooltip: 'tooltips.css'
}

const dependencyOverrides = {
  'input-group': ['input', 'select', 'button'],
  'avatar-group': ['avatar'],
  'button-group': ['button'],
  'toast-viewport': ['toast']
}

// Components that accept icons through slots or Component props do not import an
// icon library themselves. Their documented examples use Lucide, so keep those
// examples ready to copy after running add.
const documentedDependencyOverrides = {
  button: ['@lucide/vue'],
  card: ['@lucide/vue'],
  'input-group': ['@lucide/vue'],
  table: ['@lucide/vue'],
  tabs: ['@lucide/vue'],
  timeline: ['@lucide/vue'],
  tooltip: ['@lucide/vue']
}

const externalStyles = {
  'date-picker': ['flatpickr/dist/flatpickr.min.css'],
  'time-picker': ['flatpickr/dist/flatpickr.min.css']
}

function kebab(value) {
  return value
    .replace(/^App/, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
}

function packageName(specifier) {
  if (specifier.startsWith('@')) return specifier.split('/').slice(0, 2).join('/')
  return specifier.split('/')[0]
}

async function addSupportFiles(source, files) {
  const supportPattern = /from\s+['"](\.\.\/\.\.\/(?:composables|types|config)\/[^'"]+)['"]/g
  for (const match of source.matchAll(supportPattern)) {
    const resolved = path.resolve(uiRoot, match[1])
    const withExtension = path.extname(resolved) ? resolved : `${resolved}.ts`
    const relative = path.relative(repoRoot, withExtension).replaceAll('\\', '/')
    files.set(relative, relative.replace(/^src\//, 'src/'))
  }
}

await rm(outputRoot, { recursive: true, force: true })
await mkdir(path.join(outputRoot, 'files'), { recursive: true })

const components = []
for (const filename of (await readdir(uiRoot)).filter(name => name.endsWith('.vue')).sort()) {
  const name = kebab(path.basename(filename, '.vue'))
  const sourcePath = path.join(uiRoot, filename)
  const source = await readFile(sourcePath, 'utf8')
  const files = new Map([[path.relative(repoRoot, sourcePath).replaceAll('\\', '/'), `src/components/ui/${filename}`]])
  await addSupportFiles(source, files)

  const registryDependencies = new Set(dependencyOverrides[name] ?? [])
  for (const match of source.matchAll(/from\s+['"]\.\/(App[^'"]+)\.vue['"]/g)) registryDependencies.add(kebab(match[1]))

  const npmDependencies = {}
  for (const match of source.matchAll(/from\s+['"]([^.'"][^'"]*)['"]/g)) {
    const dependency = packageName(match[1])
    if (dependency !== 'vue' && availableVersions[dependency]) npmDependencies[dependency] = availableVersions[dependency]
  }
  for (const dependency of documentedDependencyOverrides[name] ?? []) {
    if (availableVersions[dependency]) npmDependencies[dependency] = availableVersions[dependency]
  }

  components.push({
    name,
    type: name === 'http-scene' ? 'internal' : 'component',
    description: `Instala ${path.basename(filename, '.vue')}.`,
    files: [...files].map(([sourceFile, target]) => ({ source: sourceFile, target })),
    registryDependencies: [...registryDependencies],
    npmDependencies,
    styles: styleMap[name] ? [styleMap[name]] : [],
    externalStyles: externalStyles[name] ?? []
  })
}

const presets = [
  { name: 'forms', type: 'preset', description: 'Controles esenciales para formularios.', registryDependencies: ['field', 'input', 'textarea', 'select', 'checkbox', 'radio-group', 'switch', 'input-group', 'button-group'] },
  { name: 'data-table', type: 'preset', description: 'Tabla, paginación y estados de contenido.', registryDependencies: ['table', 'pagination', 'state', 'spinner'] },
  { name: 'feedback', type: 'preset', description: 'Alertas, modales, notificaciones y estados.', registryDependencies: ['alert', 'modal', 'toast', 'toast-viewport', 'state'] },
  { name: 'flatpickr', type: 'preset', description: 'Selectores de fecha y hora con Flatpickr.', registryDependencies: ['date-picker', 'time-picker'] }
].map(item => ({ ...item, files: [], npmDependencies: {}, styles: [], externalStyles: [] }))

for (const component of components) {
  for (const file of component.files) {
    const source = path.join(repoRoot, file.source)
    const destination = path.join(outputRoot, 'files', file.source)
    await mkdir(path.dirname(destination), { recursive: true })
    await cp(source, destination)
  }
  for (const stylesheet of component.styles) {
    const source = path.join(repoRoot, 'src/assets/styles/components', stylesheet)
    const relative = `src/assets/styles/components/${stylesheet}`
    const destination = path.join(outputRoot, 'files', relative)
    await mkdir(path.dirname(destination), { recursive: true })
    await cp(source, destination)
  }
}

const registry = {
  schemaVersion: 1,
  items: [...components, ...presets]
}
await writeFile(path.join(outputRoot, 'index.json'), JSON.stringify(registry, null, 2) + '\n')
await mkdir(path.join(repoRoot, 'registry'), { recursive: true })
await writeFile(path.join(repoRoot, 'registry/index.json'), JSON.stringify(registry, null, 2) + '\n')
console.log(`Registro generado: ${components.length} componentes y ${presets.length} presets.`)
