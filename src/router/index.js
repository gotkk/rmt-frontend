import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Tenant from '@/views/Tenant.vue'
import TenantDetail from '@/views/TenantDetail.vue'
import Management from '@/views/Management.vue'
import Land from '@/views/Land.vue'
import Electricity from '@/views/Electricity.vue'
import Water from '@/views/Water.vue'
import Contract from '../views/Contract.vue'
import Bill from '../views/Bill.vue'
import ContractDetail from '../views/ContractDetail.vue'
import LandDetail from '../views/LandDetail.vue'
import ElectricityDetail from '../views/ElectricityDetail.vue'
import WaterDetail from '../views/WaterDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/tenant',
    name: 'tenant',
    component: Tenant,
  },
  {
    path: '/tenant/:id',
    name: 'tenantDetail',
    component: TenantDetail,
  },
  {
    path: '/management',
    name: 'management',
    component: Management,
  },
  {
    path: '/land',
    name: 'land',
    component: Land,
  },
  {
    path: '/land/:id',
    name: 'landDetail',
    component: LandDetail,
  },
  {
    path: '/electricity',
    name: 'electricity',
    component: Electricity,
  },
  {
    path: '/electricity/:id',
    name: 'electricityDetail',
    component: ElectricityDetail,
  },
  {
    path: '/water',
    name: 'water',
    component: Water,
  },
  {
    path: '/water/:id',
    name: 'waterDetail',
    component: WaterDetail,
  },
  {
    path: '/contract',
    name: 'contract',
    component: Contract,
  },
  {
    path: '/contract/:id',
    name: 'contractDetail',
    component: ContractDetail,
  },
  {
    path: '/bill',
    name: 'bill',
    component: Bill,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
