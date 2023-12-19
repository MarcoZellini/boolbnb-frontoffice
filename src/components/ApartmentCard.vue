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

    }

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

                <div :id="'carousel-' + apartment.slug" class="carousel slide carousel-fade"
                    v-if="apartment.images.length > 1">

                    <div class="carousel-inner">

                        <!-- IMAGES -->
                        <template v-for="image in apartment.images">
                            <div class="carousel-item active bnb-thumb-wrapper" v-if="image.is_main">
                                <img :src="store.baseUrl + 'storage/' + image.path"
                                    class="d-block rounded bnb-shadow bnb-apt-thumb"
                                    :alt="'img-' + apartment.slug + '-' + image.id">

                                <!-- SPONSORSHIP RIBBON -->
                                <template v-if="apartment.sponsorships.length > 0">
                                    <span class="bnb-sponsor">Sponsorizzato</span>
                                </template>
                            </div>

                            <div class="carousel-item bnb-thumb-wrapper" v-else>
                                <img :src="store.baseUrl + 'storage/' + image.path"
                                    class="d-block rounded bnb-shadow bnb-apt-thumb"
                                    :alt="'img-' + apartment.slug + '-' + image.id">

                                <template v-if="apartment.sponsorships.length > 0">
                                    <div class="box">
                                        <div class="bnb-sponsor">Sponsorizzato</div>
                                    </div>
                                </template>

                            </div>

                        </template>

                    </div>

                    <!-- INDICATORS -->
                    <div class="carousel-indicators">
                        <template v-for="(image, i) in apartment.images">
                            <button type="button" :data-bs-target="'#carousel-' + apartment.slug" :data-bs-slide-to="(i)"
                                :class="image.is_main === 1 ? 'active' : ''" aria-current="true"
                                :aria-label="'Slide ' + (i)">
                            </button>
                        </template>
                    </div>

                    <!-- CAROUSEL CONTROLS -->
                    <button class="carousel-control-prev" type="button" :data-bs-target="'#carousel-' + apartment.slug"
                        data-bs-slide="prev">

                        <span class="carousel-control-prev-icon fs-2 d-flex align-items-center ms-2"
                            aria-hidden="true"><font-awesome-icon icon="fa-solid fa-circle-chevron-left"
                                style="color: #fffffff1;" /></span>
                        <span class="visually-hidden">Precedente</span>

                    </button>

                    <button class="carousel-control-next" type="button" :data-bs-target="'#carousel-' + apartment.slug"
                        data-bs-slide="next">

                        <span class="carousel-control-next-icon fs-2 d-flex align-items-center me-2"
                            aria-hidden="true"><font-awesome-icon icon="fa-solid fa-circle-chevron-right"
                                style="color: #fffffff1;" /></span>

                        <span class="visually-hidden">Successiva</span>
                    </button>

                </div>

                <!-- PLACEHOLDER -->
                <div class="bnb-thumb-wrapper" v-else>
                    <img :src="getMainImagePath(apartment.images)" class="d-block rounded bnb-shadow bnb-apt-thumb"
                        :alt="'img-' + apartment.slug + '-' + apartment.id">


                    <!-- SPONSORSHIP RIBBON -->
                    <template v-if="apartment.sponsorships.length > 0">
                        <div class="box">
                            <div class="bnb-sponsor">Sponsorizzato</div>
                        </div>
                    </template>

                </div>

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