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
        <div class="container">
            <router-link class="navbar-brand d-flex align-items-center" to="/">
                <div class="logo" style="width: 250px">

                    <img class="img-fluid" :src="getPlaceholderImg('../img/logos/logo-desktop.png')" alt="BoolBnb">

                </div>
            </router-link>

            <button class="navbar-toggler dropdown-bnb" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <font-awesome-icon icon="fa-solid fa-bars" style="color: #e00b41;" />
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">

                <!-- Left Side Of Navbar DELETE IF NOT USED-->
                <ul class="navbar-nav me-auto">

                    <li class="nav-item">
                        <!-- <router-link class="nav-link nav-link-bnb" to="/">Home</router-link> -->
                    </li>

                </ul>

                <!-- Right Side Of Navbar -->
                <ul class="navbar-nav ml-auto">

                    <li class="nav-item">
                        <router-link class="nav-link nav-link-bnb" to="/">Home</router-link>
                    </li>

                    <!-- DASHBOARD LINK -->
                    <li class="nav-item">
                        <a class="nav-link nav-link-bnb" href="http://127.0.0.1:8000/">Vai alla Dashboard</a>
                    </li>


                </ul>
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
@use '../scss/partials/Navbar.scss';
</style>