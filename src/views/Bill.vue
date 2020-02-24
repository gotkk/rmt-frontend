<template>
  <div id="land">
    <v-container>
      <DialogAddBill @colseAdd="handleCloseOnAdd" :add="add" />
      <v-row>
        <v-col cols="12">
          <p class="text-center font-weight-bold">ตารางใบเสร็จ</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <BillTable :bill="$store.getters.bill" @handleAdd="handleAdd"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import BillTable from "../components/bill/BillTable";
import DialogAddBill from "../components/bill/blComponent/DialogAddBill";

export default {
  name: "Bill",
  components: {
    BillTable,
    DialogAddBill
  },
  data() {
    return {
      add: false
    };
  },
  mounted() {
    this.$store.dispatch("getAllBill");
  },
  methods: {
    handleCloseOnAdd() {
      this.add = false;
    },
    handleAdd() {
      this.add = true;
    }
  }
};
</script>

<style scoped>
</style>