<script setup lang="ts">
import { nextTick, onMounted, ref, useTemplateRef } from "vue"
// Leaflet
import { LatLng, LatLngLiteral, PointTuple, latLngBounds } from "leaflet"

// Views - Leaflet
import {
  //
  LMap,
  LControl,
  LControlZoom,
  LControlAttribution,
  LControlScale,
  LTileLayer,
  LMarker,
  LTooltip,
  LIcon,
} from "@vue-leaflet/vue-leaflet"

import { PMTiles, leafletRasterLayer } from "pmtiles"
import { leafletLayer, sourcesToViews } from "protomaps-leaflet"

import iconUrl from "leaflet/dist/images/marker-icon.png"
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png"
import shadowUrl from "leaflet/dist/images/marker-shadow.png"

// @ts-ignore
const map = useTemplateRef<LMap | null>("geo-map")

const newPoint = ref<LatLngLiteral>({ lat: 55.66, lng: 12.34 })

/**
 * Current zoom level of map
 */
const zoomLevel = ref(8)

// const url = `https://pmtiles.io/stamen_toner(raster)CC-BY+ODbL_z3.pmtiles`
// const url = `https://demo-bucket.protomaps.com/v4.pmtiles`
const url = `${location.protocol}//${location.host}/maps.pmtiles`

const markers = ref<LatLngLiteral[]>([
  { lat: 55.66, lng: 12.34 },
  { lat: 55.67, lng: 12.35 },
  { lat: 55.68, lng: 12.36 },
])

async function mapReady() {
  // console.log("Map is ready")

  if (!map.value) return
  // console.log("Map", map.value)
  // console.log("Map obj", map.value.leafletObject)
  // console.log("Url:", url)

  const mapObj = map.value.leafletObject

  const p = new PMTiles(url)

  if (!p) {
    console.log("No PMTiles")
    return
  }

  // leafletRasterLayer(p, {}).addTo(mapObj)
  // console.log("Added layer", p, "to map", mapObj)

  // console.log(sourcesToViews({ url: url }))
  const layer = leafletLayer({ url: url, flavor: "light" })

  layer.addTo(mapObj)
  // console.log("Added layer", layer, "to map", mapObj)
}
async function addMarker() {
  markers.value.push({ lat: newPoint.value.lat, lng: newPoint.value.lng })
}
</script>

<template lang="pug">
  v-container(fluid)
    // Map
    l-map(
      ref="geo-map"
      v-model:zoom="zoomLevel"
      :center="[56, 12]"
      @ready="mapReady"
      style="height:400px!important;width:100%"
      :min-zoom="2",
      :max-zoom="14",
    )
      //- l-tile-layer(
      //-   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      //- )
      //- :center="[56.41322, 12.219482]"
      // Attribution Control
      //- l-control-attribution(position="bottomright")

      //- // Circle displaying presition for center marker
      //- l-circle(v-if="centerMarker", :lat-lng="centerMarker.location", :radius="centerMarker.precision")

      // Control scale (this length is X km)
      //- l-control-scale(position="bottomright", :metric="true", :imperial="false")

      // Zoom control
      //- l-control-zoom(position="topleft")
      l-marker(
        v-for="point in markers"
        :lat-lng="point",
      )
        //- @click="emit('click', $event, point)"
        //- :options="{StyleSheet:'opacity:0.5'}"
        l-icon(
          :icon-url="iconUrl"
          :icon-retina-url="iconRetinaUrl"
          :icon-size="[20,30]"
        )
          //- :shadow-url="shadowUrl"
          //- :shadow-size="[24,36]"
          //- :shadow-anchor="[10,10]"
          //- :shadow-retina-url="shadowRetinaUrl"

        // Tooltip with all timestamps (for this marker)

        l-tooltip
          slot(name="tooltip")
            div {{ point.lat }} {{ point.lng }}

  v-row
    v-col(cols="5")
      v-text-field(v-model="newPoint.lat", label="Latitude" type="number" step="0.01")
    v-col(cols="5")
      v-text-field(v-model="newPoint.lng", label="Longitude" type="number" step="0.01")
    v-col(cols="2")
      v-btn(@click="addMarker") Add marker
</template>
