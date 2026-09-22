import assert from 'node:assert/strict'
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const cli = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src/index.js')

function run(args) {
  const result = spawnSync(process.execPath, [cli, ...args], { encoding: 'utf8' })
  assert.equal(result.status, 0, result.stderr || result.stdout)
  return result.stdout
}

test('create genera un dashboard mínimo sin instalar paquetes', async () => {
  const temporary = await mkdtemp(path.join(os.tmpdir(), 'app-ui-create-'))
  try {
    run(['create', 'demo', '--cwd', temporary, '--skip-install'])
    const project = path.join(temporary, 'demo')
    assert.equal(existsSync(path.join(project, 'src/layouts/AppDashboardLayout.vue')), true)
    assert.equal(existsSync(path.join(project, 'src/assets/app-ui/theme.css')), true)
    assert.equal(JSON.parse(await readFile(path.join(project, 'package.json'), 'utf8')).name, 'demo')
  } finally {
    await rm(temporary, { recursive: true, force: true })
  }
})

test('init y add copian únicamente el componente y sus dependencias', async () => {
  const temporary = await mkdtemp(path.join(os.tmpdir(), 'app-ui-add-'))
  try {
    await mkdir(path.join(temporary, 'src'), { recursive: true })
    await writeFile(path.join(temporary, 'package.json'), JSON.stringify({ name: 'fixture', private: true, dependencies: { vue: '^3.5.0' } }))
    await writeFile(path.join(temporary, 'src/main.ts'), "import { createApp } from 'vue'\n")
    run(['init', '--cwd', temporary, '--skip-install'])
    run(['add', 'input-group', '--cwd', temporary, '--skip-install'])

    for (const filename of ['AppInputGroup.vue', 'AppInput.vue', 'AppSelect.vue', 'AppButton.vue']) {
      assert.equal(existsSync(path.join(temporary, 'src/components/ui', filename)), true, filename)
    }
    assert.equal(existsSync(path.join(temporary, 'src/components/ui/AppTable.vue')), false)
    const styles = await readFile(path.join(temporary, 'src/assets/app-ui-components.css'), 'utf8')
    assert.match(styles, /input-groups\.css/)
    assert.match(styles, /forms\.css/)
    assert.match(styles, /buttons\.css/)
  } finally {
    await rm(temporary, { recursive: true, force: true })
  }
})

test('forms incluye el grupo de botones y las dependencias de los ejemplos', async () => {
  const temporary = await mkdtemp(path.join(os.tmpdir(), 'app-ui-forms-'))
  try {
    await mkdir(path.join(temporary, 'src'), { recursive: true })
    await writeFile(path.join(temporary, 'package.json'), JSON.stringify({ name: 'fixture', private: true, dependencies: { vue: '^3.5.0' } }))
    await writeFile(path.join(temporary, 'src/main.ts'), "import { createApp } from 'vue'\n")
    run(['init', '--cwd', temporary, '--skip-install'])
    const output = run(['add', 'forms', '--cwd', temporary, '--skip-install'])

    for (const filename of ['AppButton.vue', 'AppButtonGroup.vue', 'AppInput.vue', 'AppInputGroup.vue']) {
      assert.equal(existsSync(path.join(temporary, 'src/components/ui', filename)), true, filename)
    }
    assert.match(output, /@lucide\/vue@\^1\.42\.0/)
    const config = JSON.parse(await readFile(path.join(temporary, 'app-ui.json'), 'utf8'))
    assert.equal(typeof config.installed['button-group'], 'string')
  } finally {
    await rm(temporary, { recursive: true, force: true })
  }
})

test('instala wrappers y presets de integraciones', async () => {
  const temporary = await mkdtemp(path.join(os.tmpdir(), 'app-ui-integrations-'))
  try {
    await mkdir(path.join(temporary, 'src'), { recursive: true })
    await writeFile(path.join(temporary, 'package.json'), JSON.stringify({ name: 'fixture', private: true, dependencies: { vue: '^3.5.0' } }))
    await writeFile(path.join(temporary, 'src/main.ts'), "import { createApp } from 'vue'\n")
    run(['init', '--cwd', temporary, '--skip-install'])
    const output = run(['add', 'sweet-alert', 'sortable', 'flatpickr', '--cwd', temporary, '--skip-install'])

    for (const filename of ['AppSweetAlert.vue', 'AppSortable.vue', 'AppDatePicker.vue', 'AppTimePicker.vue']) {
      assert.equal(existsSync(path.join(temporary, 'src/components/ui', filename)), true, filename)
    }
    assert.equal(existsSync(path.join(temporary, 'src/composables/useSweetAlert.ts')), true)
    assert.match(output, /sweetalert2/)
    assert.match(output, /sortablejs/)
    assert.match(output, /flatpickr/)

    const styles = await readFile(path.join(temporary, 'src/assets/app-ui-components.css'), 'utf8')
    assert.match(styles, /sweetalert\.css/)
    assert.match(styles, /sortable\.css/)
    assert.match(styles, /flatpickr\/dist\/flatpickr\.min\.css/)
  } finally {
    await rm(temporary, { recursive: true, force: true })
  }
})

