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
    <footer class="">
        <div class="container">
            <div class="row h-100 py-4">
                <div class="col-3 h-100">
                    <h5 class="mb-0">Lasciati Ispirare</h5>
                    <p class="text-muted mb-1">Le mete di tendenza:</p>
                    <!-- PLACEHOLDERS -->
                    <li class="list-unstyled">
                        <ul class="p-0">
                            <a href="#" class="ms-1 focusable-bnb">Bolzano</a>
                        </ul>

                        <ul class="p-0 ">
                            <a href="#" class="ms-1 focusable-bnb">Palermo</a>
                        </ul>

                        <ul class="p-0">
                            <a href="#" class="ms-1 focusable-bnb">Pesaro</a>
                        </ul>

                        <ul class="p-0 ">
                            <a href="#" class="ms-1 focusable-bnb">Venezia</a>
                        </ul>
                    </li>
                </div>

                <div class="col-3 h-100">
                    <h5 class="mb-0">Lasciati Ispirare</h5>
                    <p class="text-muted mb-1">Le mete di tendenza:</p>
                    <!-- PLACEHOLDERS -->
                    <li class="list-unstyled">
                        <ul class="p-0">
                            <a href="#" class="ms-1 focusable-bnb">Bolzano</a>
                        </ul>

                        <ul class="p-0 ">
                            <a href="#" class="ms-1 focusable-bnb">Palermo</a>
                        </ul>

                        <ul class="p-0">
                            <a href="#" class="ms-1 focusable-bnb">Pesaro</a>
                        </ul>

                        <ul class="p-0 ">
                            <a href="#" class="ms-1 focusable-bnb">Venezia</a>
                        </ul>
                    </li>
                </div>

                <div class="col-3 h-100">
                    <h5 class="mb-0">Lasciati Ispirare</h5>
                    <p class="text-muted mb-1">Le mete di tendenza:</p>
                    <!-- PLACEHOLDERS -->
                    <li class="list-unstyled">
                        <ul class="p-0">
                            <a href="#" class="ms-1 focusable-bnb">Bolzano</a>
                        </ul>

                        <ul class="p-0 ">
                            <a href="#" class="ms-1 focusable-bnb">Palermo</a>
                        </ul>

                        <ul class="p-0">
                            <a href="#" class="ms-1 focusable-bnb">Pesaro</a>
                        </ul>

                        <ul class="p-0 ">
                            <a href="#" class="ms-1 focusable-bnb">Venezia</a>
                        </ul>
                    </li>
                </div>

                <div class="col-3 h-100">
                    <h5 class="mb-0">Lasciati Ispirare</h5>
                    <p class="text-muted mb-1">Le mete di tendenza:</p>
                    <!-- PLACEHOLDERS -->
                    <li class="list-unstyled">
                        <ul class="p-0">
                            <a href="#" class="ms-1 focusable-bnb">Bolzano</a>
                        </ul>

                        <ul class="p-0 ">
                            <a href="#" class="ms-1 focusable-bnb">Palermo</a>
                        </ul>

                        <ul class="p-0">
                            <a href="#" class="ms-1 focusable-bnb">Pesaro</a>
                        </ul>

                        <ul class="p-0 ">
                            <a href="#" class="ms-1 focusable-bnb">Venezia</a>
                        </ul>
                    </li>
                </div>

            </div>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
@use '../scss/partials/Footer.scss';
</style>