import PageIndex from './pages/Index'
import Login from './pages/Login.vue';
import TranslateView from './pages/TranslateView.vue'

export default [
  {
    path: '/',
    component: Login
  },
  {
    path: "/translateView",
    component: TranslateView
  }
]
