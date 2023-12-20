<script >

import { store } from '../store.js'

export default {
    name: 'Jumbotron',
    data() {
        return {
            store,
        }
    },
    methods: {

        // TRASFORMA IL PERCORSO DELL'IMMAGINE LOCALE IN UN URL
        getPlaceholderImg(url) {
            return new URL(`${url}`, import.meta.url).href
        },

        search() {
            store.minRooms = 1;
            store.minBeds = 1;
            store.maxRadius = 20;
            store.minServices = [];
            store.searchApartments();
            this.$router.push('search')
        },

        onChange(condition) {
            clearTimeout(store.changeTimeout)
            /*        console.log(store.inputAddress.length) */
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

    updated() {
        /*     console.log(store.apartmentsFound[0]); */
    },

}

</script>

<template>
    <div class="container-fluid bnb-jumbotron mb-3">
        <div class="row justify-content-center align-items-center h-100">

            <div class="col-11 col-sm-10 col-lg-8 d-flex flex-column">
                <h1 class="text-center text-light bnb-text-shadow">Dove passerai le vacanze?</h1>
                <div class="d-flex">
                    <input type="search" @change="search()" @keydown.enter="this.search()" v-model="store.inputAddress"
                        placeholder="Cerca su BoolBnb..." class="w-100 rounded-start-5 border-0 shadow outline-none"
                        id="address" list="suggested_address" @input="onChange(true)">

                    <datalist id="suggested_address" v-if="store.isAddressListVisible">
                        <option v-for="suggestedAddress in store.suggestedAddress" :value="suggestedAddress">
                            {{ suggestedAddress }}
                        </option>
                    </datalist>
                    <div class="bottoni d-flex align-items-center  rounded-end-5  bg-white" role="group">

                        <!-- BOTTONE INVIO RICERCA -->
                        <button type="submit"
                            class="d-flex align-items-center bnb-searchbox-elements reset_btn px-4 py-2  rounded-circle bg-white  me-2"
                            data-bs-dismiss="offcanvas" aria-label="Close">
                            <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                        </button>
                    </div>

                </div>
            </div>


        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/jumbotron.scss';
</style>