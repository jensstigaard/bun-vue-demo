<template>
  <v-app id="inspire">
    <!-- <v-navigation-drawer v-model="drawer">
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6">Navigation</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/home">
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->

    <v-app-bar>
      <!-- <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon> -->

      <v-app-bar-title>Min app</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-list-item to="/">Hjem</v-list-item>
      <v-list-item to="/map">Kort</v-list-item>
      <v-list-item to="/list">Liste</v-list-item>
      <!-- <router-link to="/home">
        <v-btn text>Home</v-btn>
      </router-link>
      <router-link to="/list">
        <v-btn text>List</v-btn>
      </router-link> -->
    </v-app-bar>

    <v-main>
      <!--  -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue"

const drawer = ref<boolean | null>(null)
</script>
