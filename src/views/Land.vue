<template>
  <div id="land">
    <v-container>
      <DialogAddLand @colseAdd="handleCloseOnAdd" :add="add" />
      <v-row>
        <v-col cols="12">
          <p class="text-center font-weight-bold">ตารางที่ดิน</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <LnTable :land="$store.getters.land" @handleAdd="handleAdd" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import LnTable from "../components/land/LnTable";
import DialogAddLand from "../components/land/lComponent/DialogAddLand";

export default {
  name: "Land",
  components: {
    LnTable,
    DialogAddLand
  },
  data() {
    return {
      add: false
    };
  },
  mounted() {
    this.$store.dispatch("getAllLand");
  },
  methods: {
    handleCloseOnAdd() {
      this.add = false;
      this.$store.dispatch("getAllLand");
    },
    handleAdd() {
      this.add = true;
    }
  }
};
</script>

<style scoped>
</style>