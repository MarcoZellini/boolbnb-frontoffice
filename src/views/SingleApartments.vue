<script>
import axios from 'axios';
import { store } from '../store';
import ContactForm from '../components/ContactForm.vue'
import Map from '../components/Map.vue'

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
            loading: false,
            styleClasses: ['bnb-mid-img', 'bnb-tr-img', 'bnb-mid-img', 'bnb-br-img'],
            filteredImg: [],
        }
    },
    components: {
        ContactForm,
        Map
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

                    this.loading = true
                    console.log('lat' + this.latitude, 'lon' + this.longitude);
                    console.log(this.apartment);

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

                    // console.log("Visitor IP:", visitorIP, "Visit Date:", visitDate);

                    const payload = {
                        apartment_id: this.apartment.id,
                        ip_address: visitorIP,
                        date: visitDate
                    }

                    // console.log("Payload", payload);

                    axios.post(this.store.baseUrl + this.store.viewsAPI, payload).then(response => {

                        // console.log(response.data.message);

                    })

                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    },

    mounted() {
        store.inputAddress = '';
        this.getSingleApartment()

    },

    updated() {
        this.getVisitorData()
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
                            :style="apartment.images.length < 5 ? 'border-radius: 0.375rem' : ''">
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
                                    :alt="apartment.title">
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
                            style="border-radius: 0.375rem;">
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
                        nessuna descrizione attualmente disponibile
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
                            <strong>Proprietario</strong>: {{ apartment.user.name + ' ' + apartment.user.lastname }}
                        </li>
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
                    </ul>
                </div>
            </div>

            <!-- servizi -->
            <div class="col">
                <div class="mt-3">
                    <h3>Servizi</h3>
                    <div class="row">
                        <ul class=" list-unstyled d-flex flex-wrap gap-2 g-3">
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
            <div class="col">
                <h3 class=" border-top pt-2">dove ti troverai</h3>
                <p>{{ apartment.address }}</p>
                <Map v-if="this.loading" :latitude="this.latitude" :longitude="this.longitude" />
                <div v-else>loading...</div>
            </div>
            <!-- form contatto -->

            <ContactForm class="py-5" />

        </div>
    </div>
</template>

<style lang="scss" scoped></style>