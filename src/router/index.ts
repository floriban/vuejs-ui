import { createRouter, createWebHistory } from 'vue-router'
import DocsLayout from '../layouts/DocsLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DocsLayout,
      redirect: '/buttons',
      children: [
        {
          path: 'buttons',
          name: 'buttons',
          component: () => import('../views/ButtonsView.vue'),
        },
        {
          path: 'forms',
          name: 'forms',
          component: () => import('../views/FormsView.vue'),
        },
        {
          path: 'alerts',
          name: 'alerts',
          component: () => import('../views/AlertsView.vue'),
        },
        {
          path: 'cards',
          name: 'cards',
          component: () => import('../views/CardsView.vue'),
        },
        {
          path: 'tables',
          name: 'tables',
          component: () => import('../views/TablesView.vue'),
        },
        {
          path: 'modals',
          name: 'modals',
          component: () => import('../views/ModalsView.vue'),
        },
        {
          path: 'toasts',
          name: 'toasts',
          component: () => import('../views/ToastsView.vue'),
        },
        {
          path: 'dropdowns',
          name: 'dropdowns',
          component: () => import('../views/DropdownsView.vue'),
        },
      ],
    },
  ],
})

export default router
