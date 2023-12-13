import { reactive } from 'vue';

import axios from 'axios';

export const store = reactive({

    // URL base di laravel api
    baseUrl: 'http://127.0.0.1:8000/',
    apartmentApi: 'api/apartments',
    searchAPI: 'api/search',

    // Variabili per TomTom
    TomTomKey: 'QTQljhHM9rS4d2vJLMcDX9qzl8tyGA43',
    TomTomGeocodingUrl: 'https://api.tomtom.com/search/2/geocode/',

    // indirizzo da convertire in lat e long tramite TomTom
    // esempi: 'via venezia 5 padova', 'Viale Luigi Sturzo, 20154 Milano MI'
    inputAddress: '',

    // filtri ricerca
    inputAddressLat: null,
    inputAddressLong: null,
    maxRadius: 20,
    minRooms: 1,
    minBeds: 1,

    // array degli appartamenti
    apartmentsIndex: '',

    // array degli appartamenti filtrati
    apartmentsFound: [],

    async getApartments() {

        await axios.get(this.baseUrl + this.apartmentApi)
            .then(response => {
                this.apartmentsIndex = response.data.result.data;
                console.log("Apartments Index:", this.apartmentsIndex);

            })
            .catch(err => {
                console.error(err);
            })
    },

    async searchApartments() {

        // Chiamata AJAX a Geocoding API di Tom Tom per convertire indirizzo in lat e long
        await axios.get(this.TomTomGeocodingUrl + this.inputAddress + '.json?key=' + this.TomTomKey)
            .then(response => {
                this.inputAddressLat = response.data.results[0].position.lat;
                this.inputAddressLong = response.data.results[0].position.lon;
            })
            .catch(err => {
                console.log(err.message)
            });

        // chiamata AJAX al backend per filtrare gli appartamenti
        await axios.get(this.baseUrl + this.searchAPI,
            {
                params:
                {
                    'inputAddressLat': this.inputAddressLat,
                    'inputAddressLong': this.inputAddressLong,
                    'maxRadius': this.maxRadius,
                    'minRooms': this.minRooms,
                    'minBeds': this.minBeds,
                }
            }
        )
            .then(response => {
                this.apartmentsFound = response.data.result;
                //console.log(response)
            })
            .catch(err => {
                console.log(err.message)
            });
        console.log('Appartamenti filtrati', this.apartmentsFound)

    },

})