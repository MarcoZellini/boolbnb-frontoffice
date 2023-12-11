<script >

export default {
    name: 'HomeView',

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

    mounted() {

    },

}

</script>

<template>
    <section id="home" class="">
        <div class="container">

            <!-- WELCOME -->
            <div class="row">

                <div class="col">
                    <h1 class="">HOME VIEW</h1>
                </div>

            </div>

        </div>
    </section>
</template>

<style lang="scss" scoped></style>