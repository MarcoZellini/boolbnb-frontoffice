<script >

import { store } from '../store'

import ApartmentCard from "../components/ApartmentCard.vue"
import Jumbotron from "../components/Jumbotron.vue"
import PageChange from "../components/PageChange.vue"

export default {
    name: 'HomeView',
    components: {
        ApartmentCard,
        Jumbotron,
        PageChange
    },
    emits: [
        'fetchData'
    ],
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

    },
    mounted() {
        store.inputAddress = '';
        store.currentPage = 1;
        store.getApartments();
    },
}

</script>

<template>
    <section id="home">

        <!-- JUMBOTRON & SEARCH INPUT -->
        <Jumbotron />
        <div class="container">

            <div class="row gx-sm-5 gy-2">

                <PageChange @fetchData="store.getApartments()" />

                <!-- CARD COMPONENT -->
                <ApartmentCard :apartment="apartment" v-for="apartment in store.apartmentsIndex" />

            </div>
        </div>

    </section>
</template>

<style lang="scss" scoped></style>