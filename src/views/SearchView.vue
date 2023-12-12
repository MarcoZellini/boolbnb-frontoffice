<script >

import axios from 'axios';
import { store } from '../store.js'

import ApartmentCard from '../components/ApartmentCard.vue';

export default {
    name: 'SearchView',
    components: {
        ApartmentCard,
    },

    data() {
        return {
            store,
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

        <form action="" @keydown.enter="store.filterApartmentsByRadius()">

            <!-- RANGES ROOMS & BADS -->
            <div class="row">
                <!-- STANZE -->
                <div class="col-sm-6 mb-3">
                    <label for="rooms" class="form-label text-capitalize">Camere: </label>
                    <output id="amount_rooms" name="amount_rooms" for="rooms">1</output>

                    <div class="d-flex align-items-center gap-2">
                        <span>1</span>
                        <input type="range" class="slider" id="rooms" name="rooms" min="1" max="10"
                            value="{{ old('rooms', 1) }}" oninput="amount_rooms.value=rooms.value">
                        <span>10</span>
                    </div>
                    <div class="d-flex justify-content-between">
                        <small id="helpId" class="form-text text-muted">Inserisci il numero di stanze</small>

                    </div>
                </div>

                <!-- LETTI -->
                <div class="col-sm-6 mb-3">
                    <label for="beds" class="form-label text-capitalize">Letti:</label>
                    <output id="amount_beds" name="amount_beds" for="beds">1</output>

                    <div class="d-flex align-items-center gap-2">
                        <span>1</span>
                        <input type="range" class="slider" id="beds" name="beds" min="1" max="10"
                            value="{{ old('beds', 1) }}" oninput="amount_beds.value=beds.value">
                        <span>10</span>
                    </div>
                    <div class="d-flex justify-content-between">
                        <small id="helpId" class="form-text text-muted">Inserisci il numero di letti</small>
                    </div>

                </div>
            </div>

        </form>

        <hr>

        <!-- CARD -->
        <div class="container mt-4">
            <div class="row" v-if="store.filteredApartments.length > 0">
                <ApartmentCard :apartment="apartment" v-for="apartment in store.filteredApartments" />
            </div>
            <div v-else>
                La ricerca non ha restituito risultati
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped></style>