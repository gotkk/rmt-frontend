<template>
  <div id="land">
    <v-container>
      <v-row>
        <v-col cols="12">
          <p class="text-center font-weight-bold">ตารางหม้อไฟฟ้า</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <EtcTable :electricity="$store.getters.electricity"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import EtcTable from "../components/electricity/EtcTable";

export default {
  name: "Electricity",
  components: {
    EtcTable
  },
  mounted() {
    this.$store.dispatch("getAllElectricity");
  }
};
</script>

<style scoped>
</style>