<script >

export default {
    name: 'ApartmentCard',

    props: {
        apartment: Object,
    },

    methods: {

        // TRASFORMA IL PERCORSO DELL'IMMAGINE LOCALE IN UN URL
        getPlaceholderImg(url) {
            return new URL(`${url}`, import.meta.url).href
        },

    },

}

</script>

<template>
    <!-- CARD -->
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
        <div class="card border-0 m-0 bnb-apartment-card">
            <img class="card-img-top border border rounded bnb-shadow" src="https://picsum.photos/1200" alt="Title" />
            <div class="card-body p-0 py-1">
                <h6 class="card-title fw-bold m-0">{{ apartment.title }}</h6>
                <p class="m-0"><strong>Indirizzo: </strong>{{ apartment.address }}</p>
                <p class="m-0"><strong>Posti letto: </strong> {{ apartment.beds }}</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../scss/partials/apartmentCard.scss';
</style>