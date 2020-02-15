<template>
  <div id="land">
    <v-container>
      <v-row>
        <v-col cols="12">
          <p class="text-center font-weight-bold">ตารางใบเสร็จ</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <BillTable :bill="$store.getters.bill" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import BillTable from "../components/bill/BillTable";

export default {
  name: "Bill",
  components: {
    BillTable
  },
  mounted() {
    this.$store.dispatch("getAllBill");
  }
};
</script>

<style scoped>
</style>