import { createApp } from "vue"

// Vuetify
import "vuetify/styles"
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"

import L from "leaflet"
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet"
import "leaflet/dist/leaflet.css"

import router from "./router"

// Components
import App from "./App.vue"

const vuetify = createVuetify({
  components: {
    ...components,
    LMap,
    LTileLayer,
    LMarker,
  },
  directives,
  icons: {
    defaultSet: "mdi",
  },
})

createApp(App).use(vuetify).use(router).mount("#app")
