<template>
  <div id="tenant">
    <v-container>
      <DialogAddTenant @colseAdd="handleCloseOnAdd" :add="add" />
      <v-row>
        <v-col cols="12">
          <p class="text-center font-weight-bold">ตารางรายชื่อผู้เช่า</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <TenTable :tenant="$store.getters.tenant" @handleAdd="handleAdd"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import TenTable from "../components/tenant/TenTable";
import DialogAddTenant from "../components/tenant/tnComponent/DialogAddTenant"

export default {
  name: "Tenant",
  components: {
    TenTable,
    DialogAddTenant
  },
  data() {
    return {
      add: false
    }
  },
  mounted() {
    this.$store.dispatch("getAllTenant");
  },
  update(){
    alert('x')
    if(!this.add){
      this.$store.dispatch("getAllTenant");
    }
  },

  methods: {
    handleCloseOnAdd(){
      this.$store.dispatch("getAllTenant");
      this.add = false;
    },
    handleAdd(){
      this.add = true;
    }
  },

};
</script>

<style>
</style>