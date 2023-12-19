<script >

import { store } from '../store.js'

import ApartmentCard from '../components/ApartmentCard.vue';
import Map from '../components/Map.vue';
import PageChange from '../components/PageChange.vue';
import SearchFilters from '../components/SearchFilters.vue';

export default {
    name: 'SearchView',
    components: {
        ApartmentCard,
        Map,
        PageChange,
        SearchFilters
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
        onChange(condition) {
            clearTimeout(store.changeTimeout)
            console.log(store.inputAddress.length)
            if (condition) {
                if (store.inputAddress.length > 0) {
                    store.changeTimeout = setTimeout(() => {
                        store.searchAddress()
                    }, 500);
                }
            } else {
                store.searchApartments();
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

                <!-- BARRA RICERCA -->
                <div class="w-100 d-flex ">
                    <div class="w-100">
                        <input @change="onChange(false)" type="search" v-model="store.inputAddress"
                            placeholder="Cerca su BoolBnb..." class="form-control border-0 w-100 rounded-start-5  py-2"
                            id="address" list="suggested_address" @input="onChange(true)" @keyup.enter="onChange(false)"
                            autocomplete="off" form="searchForm">
                        <!-- per la searchbox v2 rounded-end-5 -->

                        <datalist id="suggested_address" v-if="store.isAddressListVisible">
                            <option v-for="suggestedAddress in store.suggestedAddress" :value="suggestedAddress">
                                {{ suggestedAddress }}
                            </option>
                        </datalist>

                    </div>

                    <div class="bottoni d-flex align-items-center  rounded-end-5  bg-white" role="group">

                        <!-- BOTTONE INVIO RICERCA -->
                        <button type="button"
                            class="d-flex bnb-searchbox-elements reset_btn align-items-center h-100 px-4 py-2 rounded rounded-circle bg-white bo"
                            data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                            <font-awesome-icon :icon="['fas', 'sliders']" />
                        </button>

                        <!-- BOTTONE FILTRI -->
                        <button type="submit"
                            class="d-flex align-items-center bnb-searchbox-elements reset_btn px-4 py-2  rounded-circle bg-white  me-2"
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

            <SearchFilters />

        </div>

    </form>

    <div class="container">

        <h2 v-if="store.apartmentLoaded && store.apartmentsFound.length > 0" class="mt-2">Risultati della ricerca:</h2>
        <div v-if="store.apartmentLoaded && store.apartmentsFound.length > 0" class="rounded bnb-shadow my-3"
            style="height: 500px;width: 100%;">
            <Map :apartments="store.apartmentsFound" />
        </div>

        <!-- <hr> -->

        <!-- PAGINATION -->
        <PageChange @fetchData="store.searchApartments()" />

        <!-- CARD -->
        <div class="container mt-2">
            <div v-if="store.inputAddress != '' || store.apartmentsFound.length >= 0">
                <div class="row gx-5 gy-2" v-if="store.apartmentsFound.length > 0">
                    <ApartmentCard :apartment="apartment" v-for="apartment in store.apartmentsFound" />
                </div>
                <div v-else-if="store.apartmentLoaded && store.apartmentsFound.length === 0" class="mb-4">
                    La ricerca non ha restituito risultati
                </div>
                <div v-else class="mb-4">
                    Digitare un indirizzo o il nome di una città e premere invio pper iniziare la ricerca
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