<script >

import { store } from '../store'

import ApartmentCard from "../assets/components/ApartmentCard.vue"
import Jumbotron from "../assets/components/Jumbotron.vue"

export default {
    name: 'HomeView',
    components: {
        ApartmentCard,
        Jumbotron,
    },
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
        store.getApartments();
    },
}

</script>

<template>
    <section id="home">

        <!-- JUMBOTRON & SEARCH INPUT -->
        <Jumbotron />

        <div class="container">

            <div class="row">

                <!-- CARD COMPONENT -->
                <ApartmentCard :apartment="apartment" v-for="apartment in store.apartmentsIndex" />

            </div>
        </div>

    </section>
</template>

<style lang="scss" scoped></style>