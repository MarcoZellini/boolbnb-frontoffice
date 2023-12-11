import { reactive } from 'vue';

import axios from 'axios';

export const store = reactive({

    baseUrl: 'http://127.0.0.1:8000/', // URL BASE DI laravel_api
    apartmentApi: 'api/apartments',

    apartmentsIndex: '',



    getApartments() {

        axios.get(this.baseUrl + this.apartmentApi)
            .then(response => {

                this.apartmentsIndex = response.data.result;
                console.log("Apartments Index:", this.apartmentsIndex);

            })
            .catch(err => {
                console.error(err);
            })

    }

})