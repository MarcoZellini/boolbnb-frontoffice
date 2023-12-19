<script>
import { onMounted } from 'vue'
import tt from "@tomtom-international/web-sdk-maps";
import '@tomtom-international/web-sdk-maps/dist/maps.css';

export default {

    name: 'Map',
    data() {
        return {
        }
    },
    props: [
        'latitude',
        'longitude',
        'apartments'
    ],
    setup(props) {
        let map = null;
        let lngLat = null;
        let centerLngLat = null;
        let zoomMap = null

        onMounted(() => {

            document.getElementById('map').style.height = '500px';
            document.getElementById('map').style.width = '100%';

            if (props.apartments) {
                centerLngLat = new tt.LngLat(props.apartments[0].longitude, props.apartments[0].latitude);
                zoomMap = 7
            } else {
                centerLngLat = new tt.LngLat(props.longitude, props.latitude);
                zoomMap = 12
            }

            map = tt.map({
                key: 'vPuUkOEvt9S93r8E98XRbrHJJG1Mz6Tr',
                container: 'map',
                center: centerLngLat,
                zoom: zoomMap,
                language: 'it-IT',
            });

            if (props.apartments) {
                props.apartments.forEach((apartment) => {
                    lngLat = new tt.LngLat(apartment.longitude, apartment.latitude);
                    new tt.Marker({ color: '#E00B41' }).setLngLat(lngLat).addTo(map);

                });
            } else {
                lngLat = new tt.LngLat(props.longitude, props.latitude);
                new tt.Marker({ color: '#E00B41' }).setLngLat(lngLat).addTo(map);
            }

            map.addControl(new tt.NavigationControl());

        });

        return { map };
    },

}
</script>

<template>
    <div id="map" class=" rounded bnb-shadow"></div>
</template>

<style lang="scss" scoped>
/*  */
</style>


