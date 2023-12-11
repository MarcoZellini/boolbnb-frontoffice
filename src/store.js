import { reactive } from 'vue';

import axios from 'axios';

export const store = reactive({

    baseUrl: 'http://127.0.0.1:8000/', // URL BASE DI laravel_api
    apartmentApi: 'api/apartments',

    urlApiAparts: 'http://127.0.0.1:8000/api/apartments/search',

    url: 'https://api.tomtom.com/search/2/geometryFilter.json?key=QTQljhHM9rS4d2vJLMcDX9qzl8tyGA43&geometryList=[{"position": "45.3967794,11.9139147","radius": 40000,"type": "CIRCLE"}]&poiList=',

    apartsPosition: '',

    test() {
        axios.get(this.urlApiAparts)
            .then(response => {
                this.apartsPosition = response.data;
                //console.log(this.apartsPosition);
            })
            .catch(err => console.log(err.message));

        return this.apartsPosition;
        //console.log(this.apartsPosition)

    },
    test2() {
        if (this.apartsPosition) {
            console.log(this.apartsPosition)
            axios.get(this.url + JSON.stringify(this.apartsPosition))
                .then(response => {
                    console.log(response.data)
                })
                .catch(err => console.log(err.message));
        } else {
            console.log('ciao')
        }

    }


})