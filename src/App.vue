<script>
import Navbar from './assets/components/Navbar.vue'

import Footer from './assets/components/Footer.vue'

import { store } from './store'

export default {
    name: "App",

    components: {

        Navbar,
        Footer,

    },

    data() {

        return {

            store,

        }

    },

    methods: {

        // TRASFORMA IL PERCORSO DELL'IMMAGINE LOCALE IN UN URL
        getPlaceholderImg(url) {
            return new URL(`${url}`, import.meta.url).href
        },

    },

    mounted() {

    },

}

</script>

<template>
    <header>
        <Navbar />
    </header>

    <main class="main-container">

        <!-- VIEW -->
        <router-view></router-view>

    </main>

    <Footer />
</template>

<style lang="scss">
@use './assets/scss/partials/variables.scss' as *;
</style>
