import { reactive } from 'vue';

import axios from 'axios';

export const store = reactive({

    // URL base di laravel api
    baseUrl: 'http://127.0.0.1:8000/',
    apartmentApi: 'api/apartments',
    searchAPI: 'api/search',
    servicesAPI: 'api/services',

    // Variabili per TomTom
    TomTomKey: 'QTQljhHM9rS4d2vJLMcDX9qzl8tyGA43',
    TomTomGeocodingUrl: 'https://api.tomtom.com/search/2/geocode/',
    TomTomSearchUrl: 'https://api.tomtom.com/search/2/search/',

    // indirizzo da convertire in lat e long tramite TomTom
    // esempi: 'via venezia 5 padova', 'Viale Luigi Sturzo, 20154 Milano MI'
    inputAddress: '',

    // filtri ricerca
    inputAddressLat: null,
    inputAddressLong: null,
    maxRadius: 20,
    minRooms: 1,
    minBeds: 1,
    minServices: [],

    // array dei suggerimenti di indirizzo
    changeTimeout: null,
    suggestedAddress: [],
    isAddressListVisible: false,

    // array degli appartamenti
    apartmentsIndex: '',

    //array dei servizi
    services: [],

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

    async getServices() {

        await axios.get(this.baseUrl + this.servicesAPI)
            .then(response => {
                this.services = response.data.result;
            })
            .catch(err => {
                console.error(err);
            })
        //console.log("Servizi", this.services);

    },

    // chiamata AJAX a TomTom per indirizzi suggeriti
    searchAddress() {

        store.isAddressListVisible = true
        this.suggestedAddress = [];

        axios.get(this.TomTomSearchUrl + this.inputAddress + '.json?countrySet=IT&key=' + this.TomTomKey)
            .then(response => {
                console.log(response.data.results)
                const results = response.data.results;
                results.forEach(result => {
                    if (result.address.freeformAddress) {
                        this.suggestedAddress.push(result.address.freeformAddress)
                    } else if (result.address.municipality) {
                        this.suggestedAddress.push(result.address.municipality + ',' + result.address.country)
                    } else {
                        this.suggestedAddress.push(result.address.countrySecondarySubdivision + ',' + result.address.country)
                    }
                })
                console.log(this.suggestedAddress)
            })
    },

    async searchApartments() {

        this.isAddressListVisible = false;

        if (this.inputAddress != '') {

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
                        //'services': this.services,
                    }
                }
            )
                .then(response => {
                    this.apartmentsFound = response.data.result;
                })
                .catch(err => {
                    console.log(err.message)
                });
            //console.log('Appartamenti filtrati', this.apartmentsFound)

            console.log(this.minServices)

            //filtraggio appartamenti per servizi
            this.apartmentsFound = this.apartmentsFound.filter(apartment => {
                let counter = 0;
                apartment.services.forEach(service => {
                    if (this.minServices.includes(service.id)) {
                        counter++;
                    }
                });
                return counter == this.minServices.length
            })
            console.log('Appartamenti filtrati', this.apartmentsFound)
        }

    },

})