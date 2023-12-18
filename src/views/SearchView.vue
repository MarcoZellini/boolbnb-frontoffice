<script >

import { store } from '../store.js'

import ApartmentCard from '../components/ApartmentCard.vue';
import Map from '../components/Map.vue';
import PageChange from '../components/PageChange.vue';

export default {
    name: 'SearchView',
    components: {
        ApartmentCard,
        Map,
        PageChange
    },
    emits: [
        'fetchData'
    ],
    data() {
        return {
            store,
        }
    },
    methods: {

        onChange() {
            clearTimeout(store.changeTimeout)
            if (store.inputAddress.length > 0) {
                store.changeTimeout = setTimeout(() => {
                    store.searchAddress()
                }, 500);
            }
        },

    },
    mounted() {
        store.currentPage = 1;
        store.getServices();
    }
}
</script>

<template>
    <form action="" class=" bnb-jumbotron" @submit.stop.prevent="store.searchApartments()">

        <div class="h-100 d-flex justify-content-center align-items-center ">
            <div class="col-11 col-sm-10 col-lg-8 h-100 d-flex justify-content-center align-items-center">

                <!-- BARRA RICERCA E FILTRI -->
                <div class="w-100 d-flex ">
                    <div class="w-100">
                        <input @change="store.searchApartments()" type="search" v-model="store.inputAddress"
                            placeholder="Cerca su BoolBnb..." class="form-control border-0 w-100 rounded-start-5  py-2"
                            id="address" list="suggested_address" @input="onChange()"
                            @keyup.enter="store.searchApartments()" autocomplete="off"
                            form="searchForm"><!-- per la searchbox v2 rounded-end-5 -->

                        <datalist id="suggested_address" v-if="store.isAddressListVisible">
                            <option v-for="suggestedAddress in store.suggestedAddress" :value="suggestedAddress">
                                {{ suggestedAddress }}
                            </option>
                        </datalist>

                    </div>

                    <div class="bottoni d-flex align-items-center  rounded-end-5  bg-white" role="group">
                        <button
                            class="d-flex bnb-searchbox-elements reset_btn align-items-center  h-100 px-4 p-2 rounded rounded-circle bg-white"
                            data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                            <font-awesome-icon :icon="['fas', 'sliders']" />
                        </button>

                        <button type="submit"
                            class="d-flex align-items-center bnb-searchbox-elements reset_btn px-4 p-2 rounded-circle bg-white  mx-2"
                            data-bs-dismiss="offcanvas" aria-label="Close">
                            <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                        </button>
                    </div>

                    <!-- 
                        searchbox v2   da rivedere in caso
                         <div class="bottoni d-flex align-items-center ms-2" role="group">
                        <button
                            class="d-flex reset_btn align-items-center justify-content-center h-100 p-2 rounded-circle bnb-bg-color-important text-white me-2"
                            data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"
                            style="width: 40px; height: 40px;">
                            <font-awesome-icon :icon="['fas', 'sliders']" />
                        </button>
                        <button
                            class="d-flex reset_btn align-items-center justify-content-center h-100 p-2 rounded-circle bnb-bg-color-important text-white"
                            data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"
                            style="width: 40px; height: 40px;">
                            <font-awesome-icon :icon="['fas', 'magnifying-glass']" />

                        </button>
                    </div>
                     -->
                </div>


            </div>

            <!-- OFF-CANVAS FILTRI -->
            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasRightLabel">Filtri di ricerca</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">

                    <div class="row row-cols-1 gy-3">

                        <!-- STANZE -->
                        <div class="col">
                            <label for="rooms" class="form-label text-capitalize">Camere: </label>
                            <output id="amount_rooms" name="amount_rooms" for="rooms">1</output>

                            <div class="d-flex align-items-center gap-2">
                                <span>1</span>
                                <input type="range" class="slider" id="rooms" name="rooms" min="1" max="10"
                                    value="{{ old('rooms', 1) }}" oninput="amount_rooms.value=rooms.value"
                                    v-model="store.minRooms">
                                <span>10</span>
                            </div>
                            <div class="d-flex justify-content-between">
                                <small id="helpId" class="form-text text-muted">Inserisci il numero di
                                    stanze</small>
                            </div>
                        </div>

                        <!-- LETTI -->
                        <div class="col">
                            <label for="beds" class="form-label text-capitalize">Letti:</label>
                            <output id="amount_beds" name="amount_beds" for="beds">1</output>

                            <div class="d-flex align-items-center gap-2">
                                <span>1</span>
                                <input type="range" class="slider" id="beds" name="beds" min="1" max="10"
                                    value="{{ old('beds', 1) }}" oninput="amount_beds.value=beds.value"
                                    v-model="store.minBeds">
                                <span>10</span>
                            </div>
                            <div class="d-flex justify-content-between">
                                <small id="helpId" class="form-text text-muted">Inserisci il numero di letti</small>
                            </div>

                        </div>

                        <!-- raggio -->
                        <div class="col">
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
                                <small id="helpId" class="form-text text-muted">Inserisci il raggio di
                                    ricerca</small>
                            </div>

                        </div>

                        <!-- SERVIZI -->
                        <div class="col">

                            <h6 class="fs-5">Seleziona i servizi</h6>

                            <div class="row justify-content-center px-3 px-md-1">
                                <div class="col-4 form-check form-check-inline my-2 d-flex-inline flex-grow-1 bnb-service-col position-relative"
                                    v-for="service in store.services">

                                    <input class="form-check-input me-2 services rounded-pill" type="checkbox"
                                        :id="service.id" v-model="store.minServices" :value="service.id" />

                                    <div class="services_icons d-flex align-items-center">
                                        <img style="height:20px" :src="store.baseUrl + service.icon" alt="">
                                        <label class="form-check-label me-2" :for="service.id">
                                            {{ service.name }}
                                        </label>
                                    </div>

                                </div>
                            </div>

                        </div>

                        <div class="col">
                            <!-- BOTTONE RICERCA -->
                            <button type="submit"
                                class="d-flex align-items-center btn btn-bnb rounded-pill text-capitalize px-4 ms-3"
                                data-bs-dismiss="offcanvas" aria-label="Close">
                                Cerca
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </div>

    </form>

    <div class="container">

        <div v-if="store.apartmentLoaded && store.apartmentsFound.length > 0" class="rounded bnb-shadow my-3"
            style="height: 500px;width: 100%;">
            <Map :apartments="store.apartmentsFound" />
        </div>

        <hr>

        <!-- PAGINATION -->
        <PageChange @fetchData="store.searchApartments()" />

        <!-- CARD -->
        <div class="container mt-4">
            <div v-if="store.inputAddress != '' || store.apartmentsFound.length >= 0">
                <div class="row gx-5 gy-2" v-if="store.apartmentsFound.length > 0">
                    <ApartmentCard :apartment="apartment" v-for="apartment in store.apartmentsFound" />
                </div>
                <div v-else-if="store.apartmentLoaded && store.apartmentsFound.length === 0" class="mb-4">
                    La ricerca non ha restituito risultati
                </div>
                <div v-else class="mb-4">
                    Digitare un indirizzo o il nome di una città e premere invio
                </div>
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.bnb-jumbotron {
    height: 500px;
    /* guaradate le foto e poi ditemi se ne trovate una migliore oos volete usare una di quelle cho trovato */
    background-image: url('../assets/img/placeholders/jumbo4.jpg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}
</style>