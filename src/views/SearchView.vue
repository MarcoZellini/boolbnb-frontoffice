<script >

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
    }
}

</script>

<template>
    <div class="container">

        <form action="" class="py-4" @submit.stop.prevent="store.searchApartments()">

            <!-- RANGES ROOMS & BADS -->
            <div class="row row-cols-1 gx-5 gy-5 justify-content-between">

                <!-- BARRA RICERCA -->
                <div class="col-md-12 d-flex justify-content-center">
                    <input type="search" v-model="store.inputAddress" placeholder="Cerca su BoolBnb..."
                        class="w-50 rounded-pill border-1 shadow">
                </div>

                <!-- STANZE -->
                <div class="col-md-3">
                    <label for="rooms" class="form-label text-capitalize">Camere: </label>
                    <output id="amount_rooms" name="amount_rooms" for="rooms">1</output>

                    <div class="d-flex align-items-center gap-2">
                        <span>1</span>
                        <input type="range" class="slider" id="rooms" name="rooms" min="1" max="10"
                            value="{{ old('rooms', 1) }}" oninput="amount_rooms.value=rooms.value" v-model="store.minRooms">
                        <span>10</span>
                    </div>
                    <div class="d-flex justify-content-between">
                        <small id="helpId" class="form-text text-muted">Inserisci il numero di stanze</small>
                    </div>
                </div>

                <!-- LETTI -->
                <div class="col-md-3">
                    <label for="beds" class="form-label text-capitalize">Letti:</label>
                    <output id="amount_beds" name="amount_beds" for="beds">1</output>

                    <div class="d-flex align-items-center gap-2">
                        <span>1</span>
                        <input type="range" class="slider" id="beds" name="beds" min="1" max="10"
                            value="{{ old('beds', 1) }}" oninput="amount_beds.value=beds.value" v-model="store.minBeds">
                        <span>10</span>
                    </div>
                    <div class="d-flex justify-content-between">
                        <small id="helpId" class="form-text text-muted">Inserisci il numero di letti</small>
                    </div>

                </div>

                <!-- raggio -->
                <div class="col-md-3">
                    <label for="radius" class="form-label text-capitalize">Raggio:</label>
                    <output id="amount_radius" name="amount_radius" for="radius">20</output>

                    <div class="d-flex align-items-center gap-2">
                        <span>20km</span>
                        <input type="range" class="slider" id="radius" name="radius" min="20" max="300"
                            value="{{ old('radius', 1) }}" oninput="amount_radius.value=radius.value"
                            v-model="store.maxRadius">
                        <span>300km</span>
                    </div>
                    <div class="d-flex justify-content-between">
                        <small id="helpId" class="form-text text-muted">Inserisci il raggio di ricerca</small>
                    </div>

                </div>
            </div>

        </form>

        <hr>

        <!-- CARD -->
        <div class="container mt-4">
            <div class="row gx-5 gy-2" v-if="store.apartmentsFound.length > 0">
                <ApartmentCard :apartment="apartment" v-for="apartment in store.apartmentsFound" />
            </div>
            <div v-else>
                La ricerca non ha restituito risultati
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped></style>