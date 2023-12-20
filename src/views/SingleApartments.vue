<script>
import axios from 'axios';
import { store } from '../store';
import ContactForm from '../components/ContactForm.vue';

import tt from "@tomtom-international/web-sdk-maps";
import '@tomtom-international/web-sdk-maps/dist/maps.css';

export default {

    data() {
        return {
            store,
            apartment: {
                user: [],
                images: []
            },
            latitude: 0.0,
            longitude: 0.0,
            styleClasses: ['bnb-mid-img', 'bnb-tr-img', 'bnb-mid-img', 'bnb-br-img'],
            filteredImg: [],
        }
    },

    components: {
        ContactForm,
    },
    methods: {
        getSingleApartment() {
            axios.get(store.baseUrl + store.apartmentApi + `/${this.$route.params.id}`)
                .then(response => {
                    this.apartment = response.data.result
                    this.latitude = this.apartment.latitude
                    this.longitude = this.apartment.longitude
                    this.address = this.apartment.address

                    this.filteredImg = this.apartment.images.filter(image => image.is_main === 0)
                    this.createMap();

                }).catch(error => {
                    console.error(error);
                })

        },
        getIcon(icon) {
            return store.baseUrl + icon;
        },
        getPlaceholderImg(url) {
            return new URL(`${url}`, import.meta.url).href
        },

        async getVisitorData() {
            axios.get('https://api.ipify.org?format=json')
                .then(response => {
                    const visitorIP = response.data.ip;

                    const visitDate = new Date().toISOString().slice(0, 19).replace('T', ' ');;

                    const payload = {
                        apartment_id: this.apartment.id,
                        ip_address: visitorIP,
                        date: visitDate
                    }

                    axios.post(this.store.baseUrl + this.store.viewsAPI, payload)
                        .then(response => {
                            // console.log(response.data.message);
                        })

                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },

        createMap() {


            const mapContainer = this.$refs.mapContainer;
            document.getElementById('map').style.height = '500px';
            document.getElementById('map').style.width = '100%';
            if (mapContainer) {
                const lngLat = new tt.LngLat(this.longitude, this.latitude);
                // console.log('test', this.longitude, this.latitude);
                // console.log('lngLat', lngLat);

                const map = tt.map({
                    key: 'vPuUkOEvt9S93r8E98XRbrHJJG1Mz6Tr',
                    container: mapContainer,
                    center: lngLat,
                    zoom: 11,
                    language: 'it-IT',
                });

                new tt.Marker({ color: '#E00B41' }).setLngLat(lngLat).addTo(map);
                map.addControl(new tt.NavigationControl());

                // console.log('Map:', map);

            }
        }
    },


    async mounted() {
        await this.getSingleApartment();
        window.scrollTo(0, 0);
        store.inputAddress = '';
    },

    updated() {
        this.getVisitorData();
    },

}
</script>

<template>
    <div class="container my-4">
        <div class="mt-4 row p-2 flex-column flex-sm-row">

            <div class="m-0 p-0 " :class="apartment.images.length == 5 ? 'col-12 col-sm-8' : 'col-12'">

                <!-- immagine se non trova immagini -->
                <img class="w-100 object-fit-cover rounded-start bnb-main-img shaodw-custom "
                    :src="getPlaceholderImg('../assets/img/placeholders/placeholder.jpg')"
                    v-if="this.apartment.images.length === 0" alt="Placeholder" style="border-radius: 0.375rem">
                <!-- MAIN IMAGE -->
                <div class="wrapper_images" v-for="image in apartment.images">
                    <div class="wrappper" v-if="image.is_main === 1">
                        <img class="w-100 object-fit-cover rounded-start bnb-main-img shaodw-custom "
                            :src="store.baseUrl + 'storage/' + image.path" :alt="apartment.title"
                            :style="apartment.images.length < 5 ? 'border-radius: 0.375rem' : ''"
                            @error="$event.target.src = getPlaceholderImg('../assets/img/placeholders/placeholder.jpg')">
                    </div>
                </div>
            </div>

            <!-- other images -->
            <template v-if="apartment.images && apartment.images.length > 1 && apartment.images.length === 5">
                <div class="col col-sm-4 row align-items-center m-0 p-0 bnb-img-row">
                    <template v-for="(image, i) in this.filteredImg" :key="i">
                        <template v-if="!image.is_main">
                            <div class="col-6 m-0 p-0 h-100 bnb-extra-img-5">
                                <img class="w-100 h-100 img-fluid object-fit-cover rounded shaodw-custom"
                                    :class="styleClasses[i]" :src="store.baseUrl + 'storage/' + image.path"
                                    :alt="apartment.title"
                                    @error="$event.target.src = getPlaceholderImg('../assets/img/placeholders/placeholder.jpg')">
                            </div>
                        </template>
                        <div v-else class="d-none"></div>
                    </template>
                </div>
            </template>

            <!-- meno di 5 img  -->
            <div class="col row align-items-center m-0 p-0" v-if="apartment.images.length < 5">

                <template v-for="image in apartment.images">
                    <div class="col m-0 p-0" v-if="image.is_main == false">
                        <img class="w-100 img-fluid object-fit-cover shaodw-custom bnb-extra-img"
                            :src="store.baseUrl + 'storage/' + image.path" :alt="image.title"
                            style="border-radius: 0.375rem;"
                            @error="$event.target.src = getPlaceholderImg('../assets/img/placeholders/placeholder.jpg')">
                    </div>
                </template>

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
                    <p v-if="apartment.description" class="w-100 text-break">
                        {{ apartment.description }}
                    </p>
                    <p v-else>
                        Il proprietario non ha ancora inserito una descrizione dell'appartamento. Puoi contattarlo via
                        messaggio per ulteriori informazioni.
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
                            <strong>Proprietario:</strong> {{ apartment.user.name + ' ' + apartment.user.lastname }}
                        </li>
                        <li class="mt-1">
                            <strong>Numero di stanze:</strong> {{ apartment.rooms }}
                        </li>

                        <li class="mt-1">
                            <strong>Numero di letti:</strong> {{ apartment.beds }}
                        </li>

                        <li class="mt-1">
                            <strong>Numero di bagni:</strong> {{ apartment.bathrooms }}
                        </li>

                        <li class="mt-1">
                            <span v-if="apartment.square_meters"><strong>Superficie:</strong> {{ apartment.square_meters }}
                                mq</span>
                            <span v-else><strong>Superficie:</strong> non ancora inserita</span>
                        </li>

                        <li class="mt-1">
                            <strong>Indirizzo</strong>:
                            <span v-if="this.apartment.address != null"> {{ apartment.address }} </span>
                            <span v-else> Nessun indirizzo inserito</span>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- servizi -->
            <div class="col">
                <div class="mt-3">
                    <h3>Servizi</h3>
                    <div class="row">
                        <ul class=" list-unstyled d-flex justify-content-center flex-wrap gap-2 g-3">
                            <li v-for="service in apartment.services">
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
            <h3 class=" border-top pt-2">Dove ti troverai</h3>
            <p>{{ apartment.address }}</p>
            <div id="map" ref="mapContainer" class="rounded bnb-shadow"></div>

            <!-- form contatto -->
            <ContactForm class="py-5" />

        </div>
    </div>
</template>

<style lang="scss" scoped></style>
