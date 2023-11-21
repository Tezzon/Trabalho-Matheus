import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Clientes.vue') // Update to use Clientes.vue instead of Profissoes.vue
    },
    {
      path: '/cliente', // Update path for the new client form
      name: 'formularioNovoCliente',
      component: () => import('../views/Cliente.vue') // Update to use Cliente.vue instead of Profissao.vue
    },
    {
      path: '/cliente/:codigoCliente', // Update path for the client form with ID
      name: 'formularioAlterarCliente',
      component: () => import('../views/Cliente.vue') // Update to use Cliente.vue instead of Profissao.vue
    }
  ]
})

export default router
