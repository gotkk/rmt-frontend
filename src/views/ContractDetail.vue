<template>
  <div id="contractdetail">
    <MnContractDetail @onSelect="handleSelectContract" :active="menuactive" />
    <ContractInfo v-if="menuactive===0" :contractinfo="contract" />
  </div>
</template>

<script>
import MnContractDetail from "../components/contractDetail/MnContractDetail";
import ContractInfo from '../components/contractDetail/ContractInfo';

export default {
  name: "ContractDetail",
  components: {
    MnContractDetail,
    ContractInfo
  },
  data() {
    return {
      menuactive: 0,
      contract: {}
    };
  },
  mounted() {
    this.initialContractInfo();
  },
  methods: {
    handleSelectContract(index) {
      this.menuactive = index;
    },
    initialContractInfo() {
      let allcontract = this.$store.getters.contract;
      if (!allcontract) {
        this.$router.push({ path: "/contract" });
      }
      for (let i = 0, arri = allcontract.length; i < arri; ++i) {
        if (allcontract[i]._id === this.$route.params.id) {
          this.contract = allcontract[i];
          break;
        }
      }
    }
  }
};
</script>

<style>
</style>