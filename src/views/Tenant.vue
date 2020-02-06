<template>
  <div id="tenant">
    <v-container>
      <v-row>
        <v-col cols="12">
          <p class="text-center font-weight-bold">ตารางรายชื่อผู้เช่า</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <Tntable />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Tntable from "../components/tenant/Tntable.vue";

export default {
  name: "Tenant",
  components: {
    Tntable
  }
};
</script>

<style>
</style>