<script >

import { store } from '../store'

import ApartmentCard from "../components/ApartmentCard.vue"
import Jumbotron from "../components/Jumbotron.vue"

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

            <div class="row gx-sm-5 gy-2">
                <div class="d-flex justify-content-end align-items-center px-4 my-2 gap-3  ">

                    <ul class="d-flex align-items-center list-unstyled  rounded-pill">

                        <li class="btn_pagination border rounded-start-4 py-1 px-2 " @click="store.prevPage()"
                            :disabled="store.currentPage === 1">

                            <span>
                                Precedente
                            </span>
                        </li>

                        <li class="border p-1 cursor-pointer" v-for="(page, i) in store.totalPages"
                            :class="store.currentPage === i + 1 ? 'current_page' : ''" @click="store.goToPage(i + 1)">
                            <span class="px-1">
                                {{ i + 1 }}
                            </span>
                        </li>

                        <li class="btn_pagination border py-1 px-2 rounded-end-4" @click="store.nextPage()"
                            :disabled="store.currentPage === store.totalPages">

                            <span>
                                Successivo
                            </span>
                        </li>
                    </ul>

                </div>

                <!-- CARD COMPONENT -->
                <ApartmentCard :apartment="apartment" v-for="apartment in store.apartmentsIndex" />

            </div>
        </div>

    </section>
</template>

<style lang="scss" scoped></style>