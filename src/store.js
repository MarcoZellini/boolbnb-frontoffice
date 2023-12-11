import { reactive } from 'vue';

import axios from 'axios';

export const store = reactive({

    baseUrl: 'http://127.0.0.1:8000/', // URL BASE DI laravel_api
    apartmentApi: 'api/apartments',

})