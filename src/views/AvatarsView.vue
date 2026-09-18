<script setup lang="ts">
import { ref } from 'vue'
import DocsCodeBlock from '../components/docs/DocsCodeBlock.vue'
import DocsPageHeader from '../components/docs/DocsPageHeader.vue'
import AppAvatar from '../components/ui/AppAvatar.vue'
import AppAvatarGroup from '../components/ui/AppAvatarGroup.vue'
import AppCard from '../components/ui/AppCard.vue'
import AppField from '../components/ui/AppField.vue'
import AppTable from '../components/ui/AppTable.vue'
import { avatarExamples } from '../docs/avatarExamples'

type AvatarSize = NonNullable<InstanceType<typeof AppAvatar>['$props']['size']>
type AvatarShape = NonNullable<InstanceType<typeof AppAvatar>['$props']['shape']>
type AvatarColor = NonNullable<InstanceType<typeof AppAvatar>['$props']['color']>
type AvatarStatus = NonNullable<InstanceType<typeof AppAvatar>['$props']['status']>

const size = ref<AvatarSize>('lg')
const shape = ref<AvatarShape>('circle')
const color = ref<AvatarColor>('primary')
const status = ref<AvatarStatus>('online')
const imageSource = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><rect width="120" height="120" fill="#e1f0ff"/><circle cx="60" cy="43" r="22" fill="#3699ff"/><path d="M22 112c4-27 19-40 38-40s34 13 38 40" fill="#3699ff"/></svg>')

const properties = [
  ['src', 'string', 'undefined', 'URL opcional de la imagen.'],
  ['alt', 'string', 'name o Avatar', 'Texto alternativo de la imagen.'],
  ['name', 'string', 'undefined', 'Nombre usado para generar iniciales.'],
  ['size', 'xs | sm | md | lg | xl', 'md', 'Dimensión del avatar.'],
  ['shape', 'circle | rounded | square', 'circle', 'Forma exterior.'],
  ['color', 'color semántico', 'primary', 'Color del fallback.'],
  ['status', 'online | offline | away | busy', 'undefined', 'Indicador de presencia.'],
  ['statusLabel', 'string', 'texto automático', 'Nombre accesible del estado.'],
]
</script>

<template>
  <DocsPageHeader eyebrow="Componentes / Avatar" title="Avatares"
    description="Representaciones de personas o entidades con imagen, iniciales y presencia." />

  <section class="component-section">
    <div class="section-heading"><div><span>01</span><h2>Tamaños y formas</h2></div><p>Desde indicadores compactos hasta perfiles destacados.</p></div>
    <AppCard title="Escala">
      <div class="component-row docs-avatar-row">
        <AppAvatar name="Ana Torres" size="xs" /><AppAvatar name="Luis Vega" size="sm" color="info" />
        <AppAvatar name="María Paz" size="md" color="success" /><AppAvatar name="Carlos Ruiz" size="lg" color="warning" shape="rounded" />
        <AppAvatar name="Elena Soto" size="xl" color="danger" shape="square" />
      </div>
    </AppCard>
    <DocsCodeBlock :code="avatarExamples.sizes" />
  </section>

  <section class="component-section">
    <div class="section-heading"><div><span>02</span><h2>Imagen, presencia y grupos</h2></div><p>Fallback automático y composición de equipos.</p></div>
    <div class="card-grid">
      <AppCard title="Estados">
        <div class="component-row docs-avatar-row">
          <AppAvatar :src="imageSource" name="Perfil ilustrado" size="lg" status="online" />
          <AppAvatar name="Luis Vega" size="lg" color="info" status="away" />
          <AppAvatar name="María Paz" size="lg" color="success" status="busy" />
          <AppAvatar name="Sin conexión" size="lg" color="neutral" status="offline" />
        </div>
      </AppCard>
      <AppCard title="Equipo">
        <AppAvatarGroup label="Equipo del proyecto">
          <AppAvatar name="Ana Torres" color="primary" /><AppAvatar name="Luis Vega" color="info" />
          <AppAvatar name="María Paz" color="success" /><AppAvatar name="Carlos Ruiz" color="warning" />
        </AppAvatarGroup>
      </AppCard>
    </div>
    <DocsCodeBlock :code="avatarExamples.group" />
  </section>

  <section class="component-section">
    <div class="section-heading"><div><span>03</span><h2>Prueba interactiva</h2></div><p>Configura tamaño, forma, color y presencia.</p></div>
    <div class="showcase-panel docs-avatar-controls">
      <div class="form-showcase">
        <AppField label="Tamaño" for-id="avatar-size"><select id="avatar-size" v-model="size" class="app-control app-control--md"><option>xs</option><option>sm</option><option>md</option><option>lg</option><option>xl</option></select></AppField>
        <AppField label="Forma" for-id="avatar-shape"><select id="avatar-shape" v-model="shape" class="app-control app-control--md"><option>circle</option><option>rounded</option><option>square</option></select></AppField>
        <AppField label="Color" for-id="avatar-color"><select id="avatar-color" v-model="color" class="app-control app-control--md"><option>primary</option><option>neutral</option><option>info</option><option>success</option><option>warning</option><option>danger</option></select></AppField>
        <AppField label="Estado" for-id="avatar-status"><select id="avatar-status" v-model="status" class="app-control app-control--md"><option>online</option><option>offline</option><option>away</option><option>busy</option></select></AppField>
      </div>
      <AppAvatar name="Ana Torres" :size="size" :shape="shape" :color="color" :status="status" />
    </div>
    <DocsCodeBlock :code="avatarExamples.interactive" />
  </section>

  <section class="component-section">
    <div class="section-heading"><div><span>04</span><h2>Referencia de AppAvatar</h2></div><p>Propiedades de imagen, fallback y presencia.</p></div>
    <AppCard title="API del componente"><AppTable label="Propiedades de AppAvatar" compact>
      <thead><tr><th>Propiedad</th><th>Tipo</th><th>Por defecto</th><th>Descripción</th></tr></thead>
      <tbody><tr v-for="item in properties" :key="item[0]"><td><code>{{ item[0] }}</code></td><td><code>{{ item[1] }}</code></td><td><code>{{ item[2] }}</code></td><td>{{ item[3] }}</td></tr></tbody>
    </AppTable><p class="docs-reference-note"><code>AppAvatarGroup</code> recibe un slot por defecto y una propiedad <code>label</code> para nombrar el grupo.</p></AppCard>
  </section>
</template>
