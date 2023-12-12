import { reactive } from 'vue';

import axios from 'axios';

export const store = reactive({

    baseUrl: 'http://127.0.0.1:8000/', // URL BASE DI laravel_api
    apartmentApi: 'api/apartments',

    // Variabili per TomTom
    TomTomKey: 'QTQljhHM9rS4d2vJLMcDX9qzl8tyGA43',
    TomTomGeocodingUrl: 'https://api.tomtom.com/search/2/geocode/',
    TomTomGeometryFilterUrl: 'https://api.tomtom.com/search/2/geometryFilter.json?key=',

    // Array con ID e posizione degli appartamenti da dare in input a Tom Tom
    inputApartments: [],

    // indirizzo da convertire in lat e long e dare in input a Tom Tom
    inputAddress: '', //'via venezia 5 padova',//'Viale Luigi Sturzo, 20154 Milano MI',

    // cerchio per il filtraggio degli apartamenti
    inputGeometry: [{
        "position": "",
        "radius": 20000,
        "type": "CIRCLE"
    }],

    // array degli appartamenti
    apartmentsIndex: '',

    // variabili che salvano risultati filtraggio
    searchResult: '',
    filteredIDs: [],
    filteredApartments: [],

    //filtri
    minRooms: 1,
    minBeds: 1,
    maxRadius: 20,

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

    async filterApartments() {

        // creo array con ID e posizione di tutti gli appartamenti
        this.apartmentsIndex.forEach(apartment => {
            this.inputApartments.push({
                "id": apartment.id,
                "position": {
                    "lat": apartment.latitude,
                    "lon": apartment.longitude
                }
            });
        });
        //console.log(JSON.stringify(this.inputApartments));

        //console.log(encodeURIComponent(this.inputAddress))

        // Chiamata AJAX a Geocoding API di Tom Tom per convertire indirizzo in lat e long
        await axios.get(this.TomTomGeocodingUrl + this.inputAddress + '.json?key=' + this.TomTomKey)
            .then(response => {
                const lat = response.data.results[0].position.lat;
                const lon = response.data.results[0].position.lon;
                this.inputGeometry[0].position = lat + ',' + lon;
            })
            .catch(err => {
                console.log(err.message)
            });
        // Aggiorno il raggio di ricerca
        this.inputGeometry[0].radius = this.maxRadius * 1000;
        console.log('geometry', this.inputGeometry);

        //chiamata AJAX a Geometry Filter API di Tom Tom per filtrare gli appartamenti per raggio
        await axios.get(this.TomTomGeometryFilterUrl + this.TomTomKey + '&geometryList=' + JSON.stringify(this.inputGeometry) + '&poiList=' + JSON.stringify(this.inputApartments))
            .then(response => {
                this.searchResult = response.data.results
                this.filteredIDs = [];
                this.filteredIDs = this.searchResult.map(result => {
                    return result.id;
                });
            })
            .catch(err => {
                console.log(err.message)
            });
        console.log('ID filtrati', this.filteredIDs)

        this.filteredApartments = this.apartmentsIndex.filter(apartment => {
            return this.filteredIDs.includes(apartment.id)
        })
        //console.log('Appartamenti filtrati', this.filteredApartments)

        //filtro appartamenti per numero stanze
        this.filteredApartments = this.filteredApartments.filter(apartment => {
            return apartment.rooms >= this.minRooms
        })
        //console.log('Appartamenti filtrati', this.filteredApartments)

        //filtro appartamenti per numero letti
        this.filteredApartments = this.filteredApartments.filter(apartment => {
            return apartment.beds >= this.minBeds
        })
        console.log('Appartamenti filtrati', this.filteredApartments)

    },

})