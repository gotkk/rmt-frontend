<template>
  <div id="SelectContract">
      <v-row>
        <v-col>
          <v-overflow-btn :items="contractlist" label="เลือกสัญญาเช่า" target="#dropdown-contract" v-model="contractselected"></v-overflow-btn>
        </v-col>
      </v-row>
  </div>
</template>

<script>
export default {
  name: "SelectContract",
  props: ["contract"],
  data() {
    return {
      contractlist: [],
      contractselected: ""
    };
  },
  mounted() {
    this.contract && this.initialContract();
  },
  updated(){
      if(this.contractselected){
          this.$emit('setContractSelect', this.contractselected);
      }
  },
  methods: {
    initialContract() {
      for (let i = 0, arri = this.contract.length; i < arri; ++i) {
        this.contractlist.push(this.contract[i].name);
      }
    }
  }
};
</script>

<style>
</style>