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
    ],

    setup(props) {


        let map = null;
        onMounted(() => {
            const lngLat = new tt.LngLat(props.longitude, props.latitude);
            /*  console.log(lngLat); */
            map = tt.map({
                key: 'vPuUkOEvt9S93r8E98XRbrHJJG1Mz6Tr',
                container: 'map',
                center: lngLat,
                zoom: 15,
                language: 'it-IT'
            });

            new tt.Marker().setLngLat(lngLat).addTo(map);
            map.addControl(new tt.NavigationControl());

        });

        return { map };
    },

    mounted() {

    },
}
</script>

<template>
    <div id="map" style="height: 500px;width: 100%;"></div>
</template>

<style lang="scss" scoped>
/*  */
</style>


