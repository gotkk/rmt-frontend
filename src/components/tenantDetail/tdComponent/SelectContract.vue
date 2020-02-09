<template>
  <div id="SelectContract">
    <v-container class="block-cn" v-animate-css="'fadeIn'">
      <v-row>
        <v-col>
          <p class="text-center">เลือกสัญญาเช่า</p>
          <v-overflow-btn :items="contractlist" label="เลือกสัญญาเช่า" target="#dropdown-contract" v-model="contractselected"></v-overflow-btn>
        </v-col>
      </v-row>
    </v-container>
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
    this.initialContract();
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