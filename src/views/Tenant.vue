<template>
  <div id="tenant">
    <v-container>
      <v-row>
        <v-col cols="12">
          <p class="text-center font-weight-bold">ตารางรายชื่อผู้เช่า</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <TnTable :tenant="$store.getters.tenant" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import TnTable from "../components/tenant/TnTable";

export default {
  name: "Tenant",
  components: {
    TnTable
  },
  mounted() {
    this.$store.dispatch("getAllTenant");
  },
  updated(){
    this.$store.dispatch("getAllTenant");
  }
};
</script>

<style>
</style>