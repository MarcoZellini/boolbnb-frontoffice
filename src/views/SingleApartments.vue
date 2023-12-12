<script>
import axios from 'axios';
import { store } from '../store';

export default {
    data() {
        return {
            store,
            apartment: {}

        }
    },
    methods: {
        getSingleApartment() {
            axios.get(store.baseUrl + store.apartmentApi + `/${this.$route.params.id}`)
                .then(response => {
                    this.apartment = response.data.result
                    console.log(this.apartment);
                }).catch(error => {
                    console.error(error);
                })
        }, getIcon(icon) {
            return store.baseUrl + icon;
        },
    },
    created() {
    },
    mounted() {
        console.log(store.baseUrl + store.apartmentApi + `/${this.$route.params.id}`);
        this.getSingleApartment()
    },

}
</script>

<template>
    <div class="container my-4">
        <div class="mt-4 row p-2 flex-column flex-sm-row">
            <div class="m-0 p-1 " :class="apartment.images == 5 ? 'col-12 col-sm-8' : 'col-12'">

                <!--  MAIN IMAGE -->

                <!-- SHOWS PLACEHOLDER IMAGE IF THE DB ENTRY IS EMPTY-->

                <div class="img_wrapper" v-if="apartment.images === 0">
                    <img class="w-100 object-fit-cover rounded-start bnb-main-img shadow"
                        src="https://picsum.photos/200/300" alt="Placeholder" style="border-radius: 0.375rem">
                </div>

                <!-- FIND is_main IMAGE  -->

                <!-- IF THERE ARE LESS THAN 5 IMAGES THE is_main IMAGE TAKES THE ENTIRE AVAIABLE SPACE AND GETS ROUNDED
                CORNERS -->

                <div class="wrapper_images" v-for="image in apartment.images">
                    <div class="wrappper" v-if="image.is_main === 1">
                        <img class="w-100 object-fit-cover rounded-start bnb-main-img shadow"
                            :src="store.baseUrl + 'storage/' + image.path" :alt="apartment.title"
                            :style="{ 'border-radius': apartment.images.length < 5 ? '0.375rem' : '' }">
                    </div>
                </div>
                <!-- OTHER IMAGES -->

                <!-- IF THERE ARE 5 IMAGES APPLIES STYLE BASED ON THE POSITION THE IMAGE SHOULD TAKE ON THE PAGE -->
                <div class="col col-sm-4 row align-items-center m-0 p-0"
                    v-if="apartment.images.length > 1 && apartment.images.length === 5">

                    <!-- LOOPS THE IMAGES...  -->
                    <!-- FIND THE IMAGES THAT ARE NOT is_main -->
                    <!-- AND APPLIES STYLE -->

                    <!-- INCREASES THE STYLE INDEX FOR THE NEX ITERATION -->

                    <!-- APPLIES PADDING CLASSES BASED ON THE LOOP ITERATION -->
                    <div class="col-6 m-0 p-1 h-50">
                        <!-- <img class="h-100 img-fluid object-fit-cover rounded {{ $styleClass }} shadow" src="path    image"
                            alt="titolo apartamento"> -->
                    </div>
                </div>
            </div>

            <div class="row row-cols-1">
                <h1>{{ apartment.title }}</h1>


                <!-- descrizione -->
                <div class="col col-md-6">
                    <div class="mt-3">
                        <h3>
                            Descrizione
                        </h3>
                        <p>
                            {{ apartment.description }}
                        </p>

                    </div>
                </div>

                <!-- informazioni -->
                <div class="col col-md-6">
                    <div class="ms-md-4 mt-3">
                        <h3>
                            Informazioni
                        </h3>
                        <ul class="list-unstyled">
                            <li class="mt-1">
                                <strong>Numero stanze</strong>: {{ apartment.rooms }}
                            </li>

                            <li class="mt-1">
                                <strong>Numero letti</strong>: {{ apartment.beds }}
                            </li>

                            <li class="mt-1">
                                <strong>Numero bagni</strong>: {{ apartment.bathrooms }}
                            </li>

                            <li class="mt-1">
                                <strong>Superficie</strong>: {{ apartment.square_meters }} mq
                            </li>

                            <li class="mt-1">
                                <strong>Indirizzo</strong>:
                                <span v-if="this.apartment.address != null"> {{ apartment.address }} </span>
                                <span v-else> Nessun indirizzo inserito </span>
                            </li>

                            <!-- <li>
                                <strong>Pubblicato su BoolBnB</strong>:
                            </li> -->
                        </ul>
                    </div>
                </div>

                <!-- servizi -->
                <div class="col">
                    <div class="mt-3">
                        <h3>Servizi</h3>
                        <div class="row">
                            <ul class=" list-unstyled d-flex">
                                <li v-for="       service        in        apartment.services       ">
                                    <span class="badge rounded-pill me-1 border text-black">
                                        <img style="width: 20px;" :src="getIcon(service.icon)" :alt="service.name">
                                        {{ service.name }}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- mappa -->
                <div class="col">
                    <h3>mappa</h3>
                    <div id="map-div"></div>
                </div>

                <!-- form contatto -->
                <div class="col">
                    <h3>form contatto</h3>
                    <form action="">
                        <div class="row">
                            <div class="col-12 col-md-6">
                                <input class="w-100 mt-2 form-control" type="text" name="name"
                                    placeholder="inserisci il tuo nome">
                            </div>
                            <div class="col-12 col-md-6">
                                <input class="w-100 mt-2 form-control" type="text" name="lastname"
                                    placeholder="inserisci il tuo cognome">
                            </div>
                            <div class="col-12">
                                <input class="w-100 mt-2 form-control" type="email" name="email"
                                    placeholder="inserisci la tuo indirizzo email">
                            </div>
                            <div class="col-12">
                                <input class="w-100 mt-2 form-control" type="tel" name="phone"
                                    placeholder="inserisci il tuo numero di tefelono">
                            </div>
                            <div class="col-12">
                                <input class="w-100 mt-2 form-control" type="text" name="subject"
                                    placeholder="inserisci l'oggetto del messaggio">
                            </div>
                            <div class="col-12">
                                <textarea class="w-100 mt-2 form-control" name="message" id="message" cols="30" rows="10"
                                    placeholder="inserisci il tuo messaggio"></textarea>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-bnb rounded-pill mt-2">
                            conferma
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>