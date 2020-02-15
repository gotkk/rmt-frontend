<template>
  <div id="land">
    <v-container>
      <DialogAddWater @colseAdd="handleCloseOnAdd" :add="add" />
      <v-row>
        <v-col cols="12">
          <p class="text-center font-weight-bold">ตารางหม้อน้ำประปา</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <WtTable :water="$store.getters.water" @handleAdd="handleAdd" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import WtTable from "../components/water/WtTable";
import DialogAddWater from "../components/water/wtComponent/DialogAddWater";

export default {
  name: "Water",
  components: {
    WtTable,
    DialogAddWater
  },
  data() {
    return {
      add: false
    };
  },
  mounted() {
    this.$store.dispatch("getAllWater");
  },
  methods: {
    handleCloseOnAdd() {
      this.add = false;
      this.$store.dispatch("getAllWater");
    },
    handleAdd() {
      this.add = true;
    }
  }
};
</script>

<style scoped>
</style>