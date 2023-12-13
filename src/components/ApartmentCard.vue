<script >
import { store } from '../store';

export default {
    name: 'ApartmentCard',

    props: {
        apartment: Object,
    },

    data() {

        return {
            store
        }

    },

    methods: {

        // TRASFORMA IL PERCORSO DELL'IMMAGINE LOCALE IN UN URL
        getPlaceholderImg(url) {
            return new URL(`${url}`, import.meta.url).href
        },

        getMainImagePath(images) {

            if (images.length > 0) {
                const mainImage = images.find(image => image.is_main);
                if (mainImage) {
                    return store.baseUrl + 'storage/' + mainImage.path;
                }
            } else {
                return this.getPlaceholderImg('../assets/img/placeholders/placeholder.jpg');
            }
        }

    },

}

</script>

<template>
    <!-- CARD -->
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3" v-if="apartment.is_visible">

        <router-link :to="{
            name: 'apartment',
            params: { id: apartment.id }
        }">

            <div class="card border-0 m-0 h-100 bnb-apartment-card">

                <img class="card-img-top rounded bnb-shadow bnb-apt-thumb" :src="getMainImagePath(apartment.images)"
                    alt="Title" />

                <div class="card-body p-0 py-1">

                    <p class="my-1 px-1 d-inline-flex justify-content-around w-100" style="font-size: 1.10rem;">

                        <span>
                            <font-awesome-icon icon="fa-solid fa-people-roof" style="color: #e00b41;" class="me-1" />{{
                                apartment.rooms }}
                        </span>

                        <span>
                            <font-awesome-icon icon="fa-solid fa-bed" style="color: #e00b41;" class="me-1" />{{
                                apartment.beds
                            }}
                        </span>

                        <span>
                            <font-awesome-icon icon="fa-solid fa-restroom" style="color: #e00b41;" class="me-1" />{{
                                apartment.bathrooms }}
                        </span>

                    </p>

                    <h6 class="card-title fw-bold m-0">{{ apartment.title }}</h6>

                    <p class="m-0">
                        <font-awesome-icon icon="fa-solid fa-map-pin" style="color: #e00b41;" class="me-1" />{{
                            apartment.address }}
                    </p>

                </div>
            </div>
        </router-link>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/apartmentCard.scss';
</style>