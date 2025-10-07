import { createApp } from "vue"

// Vuetify
import "vuetify/styles"
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"

// Leaflet
import L from "leaflet"
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet"
import "leaflet/dist/leaflet.css"

import router from "./router"

// Leaflet components global registration
const leafletComponents = {
  LMap,
  LTileLayer,
  LMarker,
}

// Components
import App from "./App.vue"

const vuetify = createVuetify({
  // Register components globally, including Vuetify and Leaflet
  components: {
    ...components,
    ...leafletComponents,
  },
  directives,
  icons: {
    defaultSet: "mdi",
  },
})

createApp(App).use(vuetify).use(router).mount("#app")
