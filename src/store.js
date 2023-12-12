import { reactive } from 'vue';

import axios from 'axios';

export const store = reactive({

    baseUrl: 'http://127.0.0.1:8000/', // URL BASE DI laravel_api
    apartmentApi: 'api/apartments',

    apartmentsSearchApi: 'http://127.0.0.1:8000/api/apartments/search',
    TomTomBaseUrl: 'https://api.tomtom.com/search/2/geometryFilter.json?key=QTQljhHM9rS4d2vJLMcDX9qzl8tyGA43&geometryList=',

    apartmentApiId: 'api/apartments-id',

    geometry: [{
        "position": "45.3967794,11.9139147",
        "radius": 20000,
        "type": "CIRCLE"
    }],

    apartmentsIndex: '',

    apartsPositionJson: '',
    searchResult: '',
    searchIDs: [],
    filteredApartments: [],

    getApartments() {

        axios.get(this.baseUrl + this.apartmentApi)
            .then(response => {

                this.apartmentsIndex = response.data.result;
                console.log("Apartments Index:", this.apartmentsIndex);

            })
            .catch(err => {
                console.error(err);
            })

    },

    getApartsPosition() {
        axios.get(this.apartmentsSearchApi)
            .then(response => {
                this.apartsPositionJson = response.data;
            })
            .catch(err => console.log(err.message));
    },

    async filterApartmentsByRadius() {

        await axios.get(this.TomTomBaseUrl + JSON.stringify(this.geometry) + '&poiList=' + JSON.stringify(this.apartsPositionJson))
            .then(response => {
                //console.log('1')
                //console.log(response)
                console.log('geometry', this.geometry)
                this.searchResult = response.data.results
                this.searchIDs = [];
                this.searchResult.forEach(result => {
                    this.searchIDs.push(result['id']);
                });
            })
            .catch(err => {
                console.log(err.message)
            });

        await axios.post('http://127.0.0.1:8000/api/apartments', this.searchIDs)
            .then(response => {
                //console.log('2', response)
                console.log('appartamenti', response.data.result)
                this.filteredApartments = response.data.result;
            })
            .catch(err => {
                console.log(err.message)
            });

    },

})