<script >

import axios from 'axios';
import { shallowReactive } from 'vue';
import { store } from '../store.js'

export default {
    name: 'SearchView',

    data() {
        return {
            store,
            apartsPosition: '',

        }

    },
    methods: {

    },
    mounted() {
        this.apartsPosition = store.test();
        console.log(this.apartsPosition)

    }


    /* 
}, mounted() {
    console.log(this.url + this.apartsPosition)
}
    */
}


</script>

<template>
    <div class="container">
        Hello
    </div>
</template>

<style lang="scss" scoped></style>