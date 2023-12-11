<script >

export default {
    name: 'Footer',

    data() {

        return {

        }

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
    <div class="container">
        <div class="row h-100">
            <div class="col h-100">
                <h1 class="">FOOTER</h1>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../scss/partials/Footer.scss';
</style>