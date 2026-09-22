<template>
  <section class="not-found"><span>404</span><h2>No encontramos esta página</h2><p>El enlace puede haber cambiado o la dirección no es correcta.</p><RouterLink :to="{ name: 'dashboard' }">Volver al dashboard</RouterLink></section>
</template>
<style scoped>
.not-found { display: grid; place-items: center; min-height: 60vh; padding: 30px; text-align: center; }.not-found span { color: var(--color-primary); font-size: clamp(4rem, 12vw, 8rem); font-weight: 600; }.not-found h2 { margin: 0; color: var(--color-dark); }.not-found p { color: var(--color-muted); }.not-found a { margin-top: 15px; padding: 12px 17px; border-radius: 7px; background: var(--color-primary); color: white; text-decoration: none; }
</style>
