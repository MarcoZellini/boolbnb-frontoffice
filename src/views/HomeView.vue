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
        store.getApartsPosition();

    },

}

</script>

<template>
    <section id="home">

        <!-- JUMBOTRON & SEARCH INPUT -->
        <Jumbotron />

        <div class="container">

            <div class="row">

                <div class="col">
                    <h1 class="">HOME VIEW</h1>

                    <div class="py-4 w-25">
                        <input type="number" @keydown.enter="this.$router.push('search')"
                            v-model="store.geometry[0]['radius']" class="form-control">
                    </div>

                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid facere perspiciatis quam harum ipsa
                        molestiae nihil doloribus? Iure, illo sunt! Asperiores magnam odit id veniam enim eius aliquid
                        dolorem fuga maiores minima quos autem, dignissimos porro non maxime dolores voluptatibus impedit ad
                        ipsa corporis! Voluptate distinctio dolore fugiat facere repellat similique ullam. Animi commodi
                        magni temporibus tenetur nobis, amet officiis similique voluptatem hic consectetur voluptas ipsa
                        odit tempora totam vitae neque sed aliquid ut quibusdam itaque aperiam reprehenderit? Accusantium
                        cum sunt, rem dolor natus saepe ipsum exercitationem soluta blanditiis error cupiditate deleniti
                        unde at iste animi ipsam est, repudiandae quibusdam ea et sint minima! Ad maxime, eligendi porro eos
                        necessitatibus modi dignissimos omnis, aspernatur quas esse et enim consequuntur fugiat sint illo,
                        nesciunt fuga rerum neque repudiandae? Doloribus et tempore illum? Quis ut nesciunt tenetur, sit,
                        consectetur et alias voluptates quidem natus culpa laudantium veniam temporibus vitae accusantium
                        nam dicta necessitatibus ex! Alias iusto dolores praesentium quae porro blanditiis beatae fuga
                        impedit sequi error est eligendi, rem, deserunt aspernatur nemo adipisci dignissimos eum corporis.
                        Dignissimos dolor ipsam quam similique in exercitationem iure ea, minus voluptatum? Non cupiditate
                        vitae tenetur? Temporibus ex aliquid reprehenderit, doloremque tempora vitae voluptate ipsa dicta
                        minus.</p>

                </div>

                <!-- CARD COMPONENT -->
                <ApartmentCard :apartment="apartment" v-for="apartment in store.apartmentsIndex" />

            </div>

        </div>
    </section>
</template>

<style lang="scss" scoped></style>