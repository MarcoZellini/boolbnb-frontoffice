<script >
import { store } from '../store';

export default {
    name: 'PageChange',
    data() {

        return {
            store,
        }

    },
    methods: {
        nextPage() {
            if (store.currentPage < store.totalPages) {
                store.currentPage++;
                console.log(store.currentPage)
                this.$emit('fetchData');
            }
        },

        prevPage() {
            if (store.currentPage > 1) {
                store.currentPage--;
                console.log(store.currentPage)
                this.$emit('fetchData');

            }
        },

        goToPage(page) {
            store.currentPage = page
            console.log(store.currentPage)
            this.$emit('fetchData');

        },

    }

}

</script>

<template>
    <div class="d-flex justify-content-end align-items-center px-4 my-2 gap-3  ">

        <ul class="d-flex align-items-center list-unstyled  rounded-pill">

            <li class="btn_pagination border rounded-start-4 py-1 px-2 " @click="this.prevPage()"
                :disabled="store.currentPage === 1">

                <span>
                    Precedente
                </span>
            </li>

            <li class="border p-1 cursor-pointer" v-for="(page, i) in store.totalPages"
                :class="store.currentPage === i + 1 ? 'current_page' : ''" @click="this.goToPage(i + 1)">
                <span class="px-1">
                    {{ i + 1 }}
                </span>
            </li>

            <li class="btn_pagination border py-1 px-2 rounded-end-4" @click="this.nextPage()"
                :disabled="store.currentPage === store.totalPages">

                <span>
                    Successivo
                </span>
            </li>
        </ul>

    </div>
</template>

<style lang="scss" scoped></style>