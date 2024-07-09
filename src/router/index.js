import { createRouter,createWebHashHistory} from "vue-router"
import WelcomePage from '../components/main_page.vue'
import SuperUser from '../components/super_user.vue'
import NormalUser from '../components/normal_user.vue'
import RegisterPage from '../components/register.vue'
import ForgotPassword from '../components/forget_code.vue'
import FeedbackPage from '../components/user_feedback.vue'
import AlumniPage from '../components/schoolmate_network.vue'
import LocationPage from '../components/location_change.vue'
import HistoryPage from '../components/history_point.vue'
import ComplexPage from '../components/complex_change.vue'
import CesiumPage from '../components/cesiumMap.vue'
import SkyPage  from "../utils/skyline"
import FlyPage from '../components/fly_line.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: WelcomePage,
  },
  {
    path: '/earth',
    name: 'earth',
    component: CesiumPage,
  },
  {
    path: '/superuser',
    name: 'SuperUser',
    component: SuperUser,
  },
  {
    path: '/normaluser',
    name: 'NormalUser',
    component: NormalUser,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
  },
  {
    path: '/forget',
    name: 'ForgetPassword',
    component: ForgotPassword,
  },
  {
    path: '/feedback',
    name: 'FeedbackPage',
    component: FeedbackPage,
  },
  {
    path: '/schoolmate',
    name: 'SchoolMate',
    component: AlumniPage,
  },
  {
    path: '/location',
    name: 'LocationChange',
    component: LocationPage,
  },
  {
    path: '/history',
    name: 'HistoryPage',
    component: HistoryPage,
  },
  {
    path: '/complex',
    name: 'ComplexPage',
    component: ComplexPage,
  },
  {
    path: '/skyline',
    name: 'SkyLine',
    component:SkyPage,
  },
  {
    path: '/flyline',
    name: 'FlyPage',
    component:FlyPage,
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router