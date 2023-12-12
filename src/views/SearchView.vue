<script >

import axios from 'axios';
import { store } from '../store.js'

export default {
    name: 'SearchView',
    data() {
        return {
            store
        }
    },
    methods: {

    },
    mounted() {
        store.getApartments();
    }
}

</script>

<template>
    <div class="container">

        <div class="row justify-content-center align-items-center">

            <div class="col-8 py-4">
                <input type="search" @keydown.enter="store.filterApartments()" v-model="store.inputAddress"
                    placeholder="Cerca su BoolBnb..." class="w-100 rounded-pill border-1 shadow">
            </div>

        </div>

        <div class="row row-cols-1 row-cols-md-3 py-4 g-2">
            <div class="col" v-for="apartment in store.filteredApartments">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">
                            {{ apartment.title }}
                        </h5>
                        <p class="card-text">
                            {{ apartment.description }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>