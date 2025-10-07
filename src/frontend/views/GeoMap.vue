<script setup lang="ts">
// Vue
import { nextTick, onMounted, ref, useTemplateRef } from "vue"
// Leaflet
import { DragEndEvent, LatLng, LatLngLiteral, PointTuple, latLngBounds } from "leaflet"

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

// PMTiles
import { PMTiles, leafletRasterLayer } from "pmtiles"
import { leafletLayer, sourcesToViews } from "protomaps-leaflet"

// Leaflet marker icons
import iconUrl from "leaflet/dist/images/marker-icon.png"
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png"
import shadowUrl from "leaflet/dist/images/marker-shadow.png"
import { pf } from "../utility"

// @ts-ignore
const map = useTemplateRef<LMap | null>("geo-map")

const newMarkerForm = ref<LatLngLiteral>({ lat: 55.65, lng: 12.12 })

/**
 * Current zoom level of map
 */
const zoomLevel = ref<number>(8)

// const url = `https://pmtiles.io/stamen_toner(raster)CC-BY+ODbL_z3.pmtiles`
// const url = `https://demo-bucket.protomaps.com/v4.pmtiles`
const url = `${location.protocol}//${location.host}/maps.pmtiles`

const markers = ref<LatLngLiteral[]>([
  { lat: 55.66, lng: 12.34 },
  { lat: 55.67, lng: 12.35 },
  { lat: 55.68, lng: 12.36 },
])

/**
 * Function called when map is ready
 * Initializes the PMTiles layer
 */
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

/**
 * Add marker to map
 */
async function addMarker() {
  // Spread new marker form values
  const { lat, lng } = newMarkerForm.value

  // Guard against existing marker at same location
  if (markers.value.find((m) => m.lat === lat && m.lng === lng)) {
    console.warn("Marker already exists at this location: Lat=", lat, "Lng=", lng)
    return
  }

  markers.value.push({
    lat,
    lng,
  })

  newMarkerForm.value.lng += 0.04
}

/**
 * New marker drag end event
 */
async function newMarkedDragEnd(event: DragEndEvent) {
  const marker = event.target
  const { lat, lng } = marker.getLatLng()

  // Update new marker form position
  newMarkerForm.value = {
    lat: pf(lat),
    lng: pf(lng),
  }
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
    style="height:calc(80dvh - 120px)"
    :min-zoom="4",
    :max-zoom="20",
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

    // Markers
    l-marker(
      v-for="point in markers"
      :lat-lng="point",
      :key="`marker${point.lat + ',' + point.lng}`"
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

      l-tooltip
        slot(name="tooltip")
          div {{ point.lat }} {{ point.lng }}

    // New Marker
    l-marker(
      :lat-lng="newMarkerForm",
      :key="`marker_new_${newMarkerForm.lat + ',' + newMarkerForm.lng}`"
      :rise-on-hover="true"
      :draggable="true"
      @dragend="newMarkedDragEnd"
        @hover="() => { console.log('Hovered over new marker') }"
    )
      //- :options="{StyleSheet:'opacity:0.5'}"
      //- @click="emit('click', $event, point)"
      l-icon(
        :icon-url="iconUrl"
        :icon-retina-url="iconRetinaUrl"
        :icon-size="[20,30]"
        class-name="new-marker"
      )
        //- :shadow-url="shadowUrl"
        //- :shadow-size="[24,36]"
        //- :shadow-anchor="[10,10]"
        //- :shadow-retina-url="shadowRetinaUrl"
      l-tooltip
        slot(name="tooltip")
          div New Marker: {{ newMarkerForm.lat }} {{ newMarkerForm.lng }}

  div
    h3.text-h5 Add new marker
    v-row
      v-col(cols="5")
        v-text-field(v-model="newMarkerForm.lat", label="Latitude" type="number" step="0.01")
      v-col(cols="5")
        v-text-field(v-model="newMarkerForm.lng", label="Longitude" type="number" step="0.01")
      v-col(cols="2")
        v-btn(@click="addMarker") Add marker
</template>
