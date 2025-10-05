<template>
  <v-container fluid>
    <h4 class="text-h4">Liste</h4>
    <v-list>
      <v-list-item v-for="n in 10" :key="n">Element {{ n }}</v-list-item>
    </v-list>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue"
</script>
