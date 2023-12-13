import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from './views/HomeView.vue';
import SingleApartments from './views/SingleApartments.vue';
import SearchView from './views/SearchView.vue';
import NotFound from './views/NotFound.vue';

const routes = [

    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/apartment/:id',
        name: 'apartment',
        component: SingleApartments
    },
    {
        path: '/search',
        name: 'search',
        component: SearchView
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    },

];

// router E' UNA ISTANZA di createRouter() CHE USA LE ROTTE DICHIARATE NELLA const routes
const router = createRouter(
    {
        // HYSTORY E' UN'ISTANZA DI createWebHashHistory()
        history: createWebHashHistory(),
        routes
    }
);

// EXPORT DI router.js
export { router };