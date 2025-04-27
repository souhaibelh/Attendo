import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import SessionsView from '../views/SessionsView.vue'
import SessionView from '../components/SessionView.vue'
import UeView from '@/components/UeView.vue'
import EventView from '@/components/EventView.vue'
import ExaminationRoomView from '@/components/ExaminationRoomView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/sessions',
      name: 'sessions',
      component: SessionsView,
    },
    {
      path: '/session/:id',
      name: 'session',
      props: true,
      component: SessionView,
    },
    {
      path: '/session/:sId/ue/:ue',
      name: 'session_ue',
      props: true,
      component: UeView
    },
    {
      path: '/session/:sId/ue/:ue/event/:eId',
      name: 'session_ue_event',
      props: true,
      component: EventView
    },
    {
      path: '/session/:sId/ue/:ue/event/:eId/examination/:exId',
      name: 's_u_e_examination',
      props: true,
      component: ExaminationRoomView
    }
  ],
})

export default router