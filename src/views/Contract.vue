<template>
  <div id="land">
    <v-container>
      <DialogAddContract @colseAdd="handleCloseOnAdd" :add="add" />
      <v-row>
        <v-col cols="12">
          <p class="text-center font-weight-bold">ตารางสัญญาเช่า</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <CtTable :contract="$store.getters.contract" @handleAdd="handleAdd" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CtTable from "../components/contract/CtTable";
import DialogAddContract from "../components/contract/ctComponent/DialogAddContract";

export default {
  name: "Contract",
  components: {
    CtTable,
    DialogAddContract
  },
  data() {
    return {
      add: false
    };
  },
  mounted() {
    this.$store.dispatch("getAllContract");
  },
  methods: {
    handleCloseOnAdd() {
      this.add = false;
      this.$store.dispatch("getAllContract");
    },
    handleAdd() {
      this.add = true;
    }
  }
};
</script>

<style scoped>
</style>