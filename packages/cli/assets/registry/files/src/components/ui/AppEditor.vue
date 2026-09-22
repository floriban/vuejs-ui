<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import { TableKit } from '@tiptap/extension-table'
import { Bold, Italic, Underline, Strikethrough, Undo2, Redo2, List, ListOrdered, Quote, AlignLeft, AlignCenter, AlignRight, AlignJustify, Link, Unlink, RemoveFormatting, Table, Columns3, Rows3, Trash2 } from '@lucide/vue'
const props = withDefaults(defineProps<{ modelValue: string; disabled?: boolean; placeholder?: string; label?: string }>(), { disabled: false, placeholder: 'Escribe aquí…', label: 'Editor de texto' })
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const linkOpen = ref(false)
const linkUrl = ref('')
const linkError = ref('')
const editor = useEditor({
  content: props.modelValue,
  editable: !props.disabled,
  extensions: [StarterKit.configure({ heading: { levels: [1, 2, 3] }, link: { openOnClick: false, protocols: ['https', 'http', 'mailto'] } }), TextAlign.configure({ types: ['heading', 'paragraph'] }), Placeholder.configure({ placeholder: props.placeholder }), TableKit],
  editorProps: { attributes: { role: 'textbox', 'aria-multiline': 'true', 'aria-label': props.label } },
  onUpdate: ({ editor }) => emit('update:modelValue', editor.getHTML()),
})
watch(() => props.modelValue, value => {
  if (editor.value && value !== editor.value.getHTML()) editor.value.commands.setContent(value, { emitUpdate: false })
})
watch(() => props.disabled, value => editor.value?.setEditable(!value))
// useEditor destroys the editor automatically on unmount.
const groups = computed(() => {
  const e = editor.value
  if (!e) return []
  return [
    [
      { label: 'Deshacer', icon: Undo2, run: () => e.chain().focus().undo().run(), disabled: !e.can().undo(), active: false },
      { label: 'Rehacer', icon: Redo2, run: () => e.chain().focus().redo().run(), disabled: !e.can().redo(), active: false },
    ],
    [
      { label: 'Negrita', icon: Bold, run: () => e.chain().focus().toggleBold().run(), active: e.isActive('bold') },
      { label: 'Cursiva', icon: Italic, run: () => e.chain().focus().toggleItalic().run(), active: e.isActive('italic') },
      { label: 'Subrayado', icon: Underline, run: () => e.chain().focus().toggleUnderline().run(), active: e.isActive('underline') },
      { label: 'Tachado', icon: Strikethrough, run: () => e.chain().focus().toggleStrike().run(), active: e.isActive('strike') },
    ],
    [
      { label: 'Alinear a la izquierda', icon: AlignLeft, run: () => e.chain().focus().setTextAlign('left').run(), active: e.isActive({ textAlign: 'left' }) },
      { label: 'Centrar', icon: AlignCenter, run: () => e.chain().focus().setTextAlign('center').run(), active: e.isActive({ textAlign: 'center' }) },
      { label: 'Alinear a la derecha', icon: AlignRight, run: () => e.chain().focus().setTextAlign('right').run(), active: e.isActive({ textAlign: 'right' }) },
      { label: 'Justificar', icon: AlignJustify, run: () => e.chain().focus().setTextAlign('justify').run(), active: e.isActive({ textAlign: 'justify' }) },
    ],
    [
      { label: 'Lista con viñetas', icon: List, run: () => e.chain().focus().toggleBulletList().run(), active: e.isActive('bulletList') },
      { label: 'Lista numerada', icon: ListOrdered, run: () => e.chain().focus().toggleOrderedList().run(), active: e.isActive('orderedList') },
      { label: 'Cita', icon: Quote, run: () => e.chain().focus().toggleBlockquote().run(), active: e.isActive('blockquote') },
    ],
    [
      { label: 'Insertar enlace', icon: Link, run: () => { linkUrl.value = e.getAttributes('link').href || ''; linkError.value = ''; linkOpen.value = !linkOpen.value }, active: e.isActive('link') },
      { label: 'Quitar enlace', icon: Unlink, run: () => e.chain().focus().extendMarkRange('link').unsetLink().run(), disabled: !e.isActive('link'), active: false },
      { label: 'Insertar tabla', icon: Table, run: () => e.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(), disabled: e.isActive('table'), active: e.isActive('table') },
      { label: 'Quitar formato', icon: RemoveFormatting, run: () => e.chain().focus().unsetAllMarks().clearNodes().run(), active: false },
    ],
  ]
})
function setHeading(event: Event) {
  const level = Number((event.target as HTMLSelectElement).value)
  if (level) editor.value?.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 }).run()
  else editor.value?.chain().focus().setParagraph().run()
}
function saveLink() {
  const url = linkUrl.value.trim()
  if (!/^(https?:\/\/|mailto:)/i.test(url)) { linkError.value = 'Usa una URL https://, http:// o mailto:.'; return }
  editor.value?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  linkOpen.value = false
}
</script>
<template>
  <div class="app-editor" :class="{ 'app-editor--disabled': disabled }">
    <div v-if="editor" class="app-editor__toolbar" role="group" aria-label="Herramientas de edición">
      <select aria-label="Estilo de párrafo" :disabled="disabled" :value="editor.isActive('heading') ? editor.getAttributes('heading').level : 0" @change="setHeading">
        <option :value="0">Párrafo</option><option :value="1">Título 1</option><option :value="2">Título 2</option><option :value="3">Título 3</option>
      </select>
      <div v-for="(group, index) in groups" :key="index" class="app-editor__group">
        <button v-for="action in group" :key="action.label" type="button" :title="action.label" :aria-label="action.label" :aria-pressed="action.active" :class="{ 'is-active': action.active }" :disabled="disabled || action.disabled" @mousedown.prevent @click="action.run()"><component :is="action.icon" :size="17" aria-hidden="true" /></button>
      </div>
    </div>
    <form v-if="linkOpen && !disabled" class="app-editor__link" @submit.prevent="saveLink">
      <label>Dirección del enlace<input v-model="linkUrl" type="text" placeholder="https://ejemplo.com" aria-label="Dirección del enlace" /></label>
      <button type="submit">Aplicar</button><button type="button" @click="linkOpen = false; editor?.commands.focus()">Cancelar</button>
      <span v-if="linkError" role="alert">{{ linkError }}</span>
    </form>
    <div v-if="editor?.isActive('table') && !disabled" class="app-editor__toolbar" role="group" aria-label="Herramientas de tabla">
      <button type="button" title="Añadir fila" aria-label="Añadir fila" @mousedown.prevent @click="editor.chain().focus().addRowAfter().run()"><Rows3 :size="17" /></button>
      <button type="button" title="Añadir columna" aria-label="Añadir columna" @mousedown.prevent @click="editor.chain().focus().addColumnAfter().run()"><Columns3 :size="17" /></button>
      <button type="button" title="Eliminar fila" aria-label="Eliminar fila" @mousedown.prevent @click="editor.chain().focus().deleteRow().run()"><Rows3 :size="17" /><span>−</span></button>
      <button type="button" title="Eliminar columna" aria-label="Eliminar columna" @mousedown.prevent @click="editor.chain().focus().deleteColumn().run()"><Columns3 :size="17" /><span>−</span></button>
      <button type="button" title="Eliminar tabla" aria-label="Eliminar tabla" @mousedown.prevent @click="editor.chain().focus().deleteTable().run()"><Trash2 :size="17" /></button>
    </div>
    <EditorContent :editor="editor" />
    <div class="app-editor__footer">{{ disabled ? 'Solo lectura' : 'Editor de texto' }}<span>{{ editor?.getText().length ?? 0 }} caracteres</span></div>
  </div>
</template>
