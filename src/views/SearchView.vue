<script >

import axios from 'axios';
import { store } from '../store.js'

export default {
    name: 'SearchView',

    data() {
        return {
            store,
            searchIDs: null,
            filteredApartments: null
        }

    },
    methods: {
        test() {
            if (!store.apartsPositionJson) {
                store.getApartsPosition();
            }
        }

    },
    mounted() {
        this.test();
        store.filterApartmentsByRadius();

    }

}

</script>

<template>
    <div class="container">
        <div class="py-4 w-25">
            <input type="number" @keydown.enter="store.filterApartmentsByRadius()" v-model="store.geometry[0]['radius']"
                class="form-control">
        </div>
        <div class="py-2">
            {{ store.geometry }} <br>
            ID Appartamenti filtrati: {{ store.searchIDs }}
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