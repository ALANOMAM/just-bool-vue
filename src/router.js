import { createRouter, createWebHistory } from "vue-router";
import HomePage from './pages/HomePage.vue';

import SingleRestaurant from "./pages/SingleRestaurant.vue";

import CardPage from "./pages/CardPage.vue"

import PaymentStatus from "./pages/PaymentStatus.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/restaurant/:id',
            name: 'single-restaurant',
            component: SingleRestaurant,
        },

        {
            path: '/restaurant/:id/checkout',
            name: 'checkout',
            component: CardPage,
        },
        //Rotta per la pagina di conferma del pagamento
        {
            path: '/payment-status',
            name: 'payment-status',
            component: PaymentStatus,
        }
    ]
});

export { router };