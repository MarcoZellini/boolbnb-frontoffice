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
import { faMapPin } from '@fortawesome/free-solid-svg-icons'
import { faBed } from '@fortawesome/free-solid-svg-icons'
import { faPeopleRoof } from '@fortawesome/free-solid-svg-icons'
import { faRestroom } from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faBars, faMapPin, faBed, faPeopleRoof, faRestroom, faPaperPlane, faCheck, faChevronCircleLeft, faChevronCircleRight, faCircle)

createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
