import CarDetails from '@/views/details/CarDetails.vue';
import CustomerDetails from '@/views/details/CustomerDetails.vue';
import DeliveryDetails from '@/views/details/DeliveryDetails.vue';
import EmployeeDetails from '@/views/details/EmployeeDetails.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Cart from '../views/Cart.vue';
import Contact from '../views/Contact.vue';
import Home from '../views/Home.vue';
import Menu from '../views/Menu.vue';
import Us from '../views/Us.vue';
import ProductDetails from '../views/details/ProductDetails.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/menu',
    name: 'menu',
    component: Menu
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path: '/us',
    name: 'us',
    component: Us
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact
  },
  {
    path: '/product/:id',
    name: 'productDetails',
    component: ProductDetails
  },
  {
    path: '/delivery/:id',
    name: 'deliveryDetails',
    component: DeliveryDetails
  },
  {
    path: '/car/:id',
    name: 'carDetails',
    component: CarDetails
  },
  {
    path: '/employee/:id',
    name: 'employeeDetails',
    component: EmployeeDetails
  },
  {
    path: '/customer/:id',
    name: 'customerDetails',
    component: CustomerDetails
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
