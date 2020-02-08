<template>
  <div id="land">
    <v-container>
      <v-row>
        <v-col cols="12">
          <p class="text-center font-weight-bold">ตารางหม้อน้ำประปา</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <WtTable :water="$store.getters.water"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import WtTable from "../components/water/WtTable";

export default {
  name: "Water",
  components: {
    WtTable
  },
  mounted() {
    this.$store.dispatch("getAllWater");
  }
};
</script>

<style scoped>
</style>