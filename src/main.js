import { createApp } from 'vue'
import './assets/scss/style.scss'
import 'bootstrap/js/index.esm.js'
import App from './App.vue'

// IMPORT DI router.js
import { router } from './router.js'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faShieldHalved } from '@fortawesome/free-solid-svg-icons'


/* add icons to the library */
library.add(faBars, faShieldHalved)

createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
