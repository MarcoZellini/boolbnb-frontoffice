<script >

import { store } from '../store.js'

export default {
    name: 'Jumbotron',
    data() {
        return {
            store
        }
    },
    methods: {

        // TRASFORMA IL PERCORSO DELL'IMMAGINE LOCALE IN UN URL
        getPlaceholderImg(url) {
            return new URL(`${url}`, import.meta.url).href
        },

        search() {
            store.minRooms = 1;
            store.minBeds = 1;
            store.maxRadius = 20;
            store.searchApartments();
            this.$router.push('search')
        }

    },
}

</script>

<template>
    <div class="container-fluid bnb-jumbotron mb-3">
        <div class="row justify-content-center align-items-center h-100">

            <div class="col-8">
                <h1 class="text-light text-center">BnBenuti</h1>
                <input type="search" @keydown.enter="this.search()" v-model="store.inputAddress"
                    placeholder="Cerca su BoolBnb..." class="w-100 rounded-pill border-1 shadow">
            </div>

        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/jumbotron.scss';
</style>