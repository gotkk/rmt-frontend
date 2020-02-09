<template>
  <div id="land">
    <v-container>
      <v-row>
        <v-col cols="12">
          <p class="text-center font-weight-bold">ตารางสัญญาเช่า</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <CtTable :contract="$store.getters.contract"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CtTable from "../components/contract/CtTable";

export default {
  name: "Contract",
  components: {
    CtTable
  },
  mounted() {
    this.$store.dispatch("getAllContract");
  },
};
</script>

<style scoped>
</style>