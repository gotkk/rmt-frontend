<template>
  <div id="land">
    <v-container>
      <v-row>
        <v-col cols="12">
          <p class="text-center font-weight-bold">ตารางที่ดิน</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <LnTable :land="$store.getters.land"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import LnTable from "../components/land/LnTable";

export default {
  name: "Land",
  components: {
    LnTable
  },
  mounted() {
    this.$store.dispatch("getAllLand");
  },
};
</script>

<style scoped>
</style>