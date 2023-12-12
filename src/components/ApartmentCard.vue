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
                return this.getPlaceholderImg('../img/placeholders/placeholder.jpg');
            }
        }

    },

}

</script>

<template>
    <!-- CARD -->
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
        <div class="card border-0 m-0 bnb-apartment-card">

            <!-- https://picsum.photos/1200 -->

            <!--             <img class="card-img-top border border rounded bnb-shadow"
                :src="getPlaceholderImg('../img/placeholders/placeholder.jpg')" alt="Title" /> -->

            <img class="card-img-top border border rounded bnb-shadow" :src="getMainImagePath(apartment.images)"
                alt="Title" />


            <div class="card-body p-0 py-1">

                <p class="my-1 px-1 d-inline-flex justify-content-around w-100" style="font-size: 1.10rem;">

                    <span>
                        <font-awesome-icon icon="fa-solid fa-people-roof" style="color: #e00b41;" class="me-1" />{{
                            apartment.rooms }}
                    </span>

                    <span>
                        <font-awesome-icon icon="fa-solid fa-bed" style="color: #e00b41;" class="me-1" />{{ apartment.beds
                        }}
                    </span>

                    <span>
                        <font-awesome-icon icon="fa-solid fa-restroom" style="color: #e00b41;" class="me-1" />{{
                            apartment.bathrooms }}
                    </span>

                </p>

                <h6 class="card-title fw-bold m-0">{{ apartment.title }}</h6>

                <!-- <router-link :to="{
                    name: 'apartment',
                    params: { slug: apartment.slug }
                }">View</router-link> -->

                <p class="m-0">
                    <font-awesome-icon icon="fa-solid fa-map-pin" style="color: #e00b41;" class="me-1" />{{
                        apartment.address }}
                </p>



            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/apartmentCard.scss';
</style>