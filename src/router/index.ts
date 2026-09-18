import { createRouter, createWebHistory } from 'vue-router'
import DocsLayout from '../layouts/DocsLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DocsLayout,
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../views/DashboardView.vue'),
        },
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
        {
          path: 'tabs',
          name: 'tabs',
          component: () => import('../views/TabsView.vue'),
        },
        {
          path: 'accordion',
          name: 'accordion',
          component: () => import('../views/AccordionView.vue'),
        },
        {
          path: 'badges',
          name: 'badges',
          component: () => import('../views/BadgesView.vue'),
        },
        {
          path: 'avatars',
          name: 'avatars',
          component: () => import('../views/AvatarsView.vue'),
        },
        {
          path: 'progress',
          name: 'progress',
          component: () => import('../views/ProgressView.vue'),
        },
        {
          path: 'pagination',
          name: 'pagination',
          component: () => import('../views/PaginationView.vue'),
        },
        {
          path: 'tooltips',
          name: 'tooltips',
          component: () => import('../views/TooltipsView.vue'),
        },
        {
          path: 'popovers',
          name: 'popovers',
          component: () => import('../views/PopoversView.vue'),
        },
        {
          path: 'timeline',
          name: 'timeline',
          component: () => import('../views/TimelineView.vue'),
        },
        {
          path: 'spinners',
          name: 'spinners',
          component: () => import('../views/SpinnersView.vue'),
        },
        {
          path: 'datepicker',
          name: 'datepicker',
          component: () => import('../views/DatePickerView.vue'),
        },
        {
          path: 'timepicker',
          name: 'timepicker',
          component: () => import('../views/TimePickerView.vue'),
        },
        {
          path: 'autocomplete',
          name: 'autocomplete',
          component: () => import('../views/AutocompleteView.vue'),
        },
        {
          path: 'input-mask',
          name: 'input-mask',
          component: () => import('../views/InputMaskView.vue'),
        },
        {
          path: 'select2',
          name: 'select2',
          component: () => import('../views/AdvancedSelectView.vue'),
        },
        {
          path: 'sweetalert2',
          name: 'sweetalert2',
          component: () => import('../views/SweetAlertView.vue'),
        },
      ],
    },
  ],
})

export default router
