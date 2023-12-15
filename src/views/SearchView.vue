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

        onChange() {
            clearTimeout(store.changeTimeout)
            if (store.inputAddress.length > 0) {
                store.changeTimeout = setTimeout(() => {
                    store.searchAddress()
                }, 500);
            }
        },
        test() {
            console.log('ciao')
        }

    },
    mounted() {
        store.getServices();
    }
}

</script>

<template>
    <div class="container">

        <form action="" class="py-4" @submit.stop.prevent="store.searchApartments()">

            <!-- BARRA RICERCA E FILTRI -->
            <div class="row row-cols-1 gx-5 gy-5 justify-content-center">

                <!-- BARRA RICERCA -->
                <div class="col-6 d-flex justify-content-between align-items-center rounded shadow pe-0">
                    <input type="search" v-model="store.inputAddress" placeholder="Cerca su BoolBnb..."
                        class="form-control border-0" id="address" list="suggested_address" @input="onChange()"
                        autocomplete="off">

                    <datalist id="suggested_address" v-if="store.isAddressListVisible">
                        <option v-for="suggestedAddress in store.suggestedAddress" :value="suggestedAddress">
                            {{ suggestedAddress }}
                        </option>
                    </datalist>

                    <div class="btn-group" role="group">
                        <!-- BOTTONE RICERCA -->
                        <button type="submit" class="d-flex align-items-center btn btn-bnb text-capitalize px-4 rounded-0">
                            Cerca
                        </button>

                        <!-- BOTTONE OFF CANVAS FILTRI -->
                        <button class="d-flex align-items-center btn btn-bnb text-capitalize px-4" type="button"
                            data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                            Filtri
                        </button>
                    </div>

                </div>

                <!-- TEST SUGGERIMENTI INDIRIZZO
                <div class="col d-flex justify-content-center dropdown">
                    <input type="search" v-model="store.inputAddress" placeholder="Cerca su BoolBnb..."
                        class="w-50 rounded-pill border-1 shadow" id="address" list="suggested_address" @input="onChange()"
                        autocomplete="off" data-bs-toggle="dropdown" aria-expanded="false">
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>

                </div>

                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        Dropdown button
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </div>
                -->

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

        </form>

        <hr>

        <!-- CARD -->
        <div class="container mt-4">
            <div v-if="store.inputAddress != '' || store.apartmentsFound.length >= 0">
                <div class="row gx-5 gy-2" v-if="store.apartmentsFound.length > 0">
                    <ApartmentCard :apartment="apartment" v-for="apartment in store.apartmentsFound" />
                </div>
                <div v-else class="mb-4">
                    La ricerca non ha restituito risultati
                </div>
            </div>
            <div v-else>
                Digitare un indirizzo o il nome di una città e premere invio
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped></style>