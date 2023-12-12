<script >

export default {
    name: 'Navbar',

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
    <nav class="navbar navbar-expand-md navbar-light bg-white">
        <div class="container d-flex justify-content-between align-items-center">

            <!-- LOGOS -->
            <router-link class="navbar-brand d-flex align-items-center pb-2" to="/">
                <div class="logo d-sm-none" style="width: 50px">

                    <img class="img-fluid " :src="getPlaceholderImg('../assets/img/logos/logo-sm.png')" alt="BoolBnb">

                </div>

                <div class="logo" style="width: 180px">

                    <img class="img-fluid " :src="getPlaceholderImg('../assets/img/logos/logo-desktop.png')" alt="BoolBnb">

                </div>

            </router-link>

            <!-- TOGGLER -->
            <button class="navbar-toggler dropdown-bnb" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <font-awesome-icon icon="fa-solid fa-bars" style="color: #e00b41;" />
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <!-- Right Side Of Navbar -->

                <div class="d-flex align-items-center ms-auto">
                    <router-link class="nav-link nav-link-bnb" to="/">Home</router-link>
                    <a class="nav-link nav-link-bnb" href="http://127.0.0.1:8000/">Vai alla Dashboard</a>
                </div>

            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/Navbar.scss';
</style>