import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from './views/HomeView.vue';

const routes = [

    {
        path: '/',
        name: 'home',
        component: HomeView
    },

];

// router E' UNA ISTANZA di createRouter() CHE USA LE ROTTE DICHIARATE NELLA const routes
const router = createRouter(
    {
        // HYSTORY E' UN'ISTANZA DI createWebHashHistory()
        history: createWebHashHistory(),
        routes
    }
)

// EXPORT DI router.js
export { router }