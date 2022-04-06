import { createRouter, createWebHistory } from 'vue-router'
import Connexion from '../views/Connexion/Connexion.vue'
import Home from '../views/Home/Home.vue'
import User from '../views/User/User.vue'

const routes = [
  {
    path: '/',
    name: 'Connexion',
    component: Connexion
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/user/:id',
    name: 'User',
    component: User
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {

  if(
      localStorage.getItem('headers') == null &&
      to.path != '/'
    ){
      window.location.href = "/"
  } else if(
    localStorage.getItem('headers') != null &&
    to.path == '/'
  ) {
    window.location.href = "/home"
  }

})

export default router
