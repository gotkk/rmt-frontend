<template>
  <div id="land">
    <v-container>
    <DialogAddElect @colseAdd="handleCloseOnAdd" :add="add" />
      <v-row>
        <v-col cols="12">
          <p class="text-center font-weight-bold">ตารางหม้อไฟฟ้า</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <EtcTable :electricity="$store.getters.electricity" @handleAdd="handleAdd"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import EtcTable from "../components/electricity/EtcTable";
import DialogAddElect from "../components/electricity/etComponent/DialogAddElect";

export default {
  name: "Electricity",
  components: {
    EtcTable,
    DialogAddElect
  },
  data() {
    return {
      add: false
    };
  },
  mounted() {
    this.$store.dispatch("getAllElectricity");
  },
  methods: {
    handleCloseOnAdd() {
      this.add = false;
      this.$store.dispatch("getAllElectricity");
    },
    handleAdd() {
      this.add = true;
    }
  }
};
</script>

<style scoped>
</style>