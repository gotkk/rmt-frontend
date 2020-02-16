<template>
  <div id="electricitydetail">
    <MnElectDetail @onSelect="handleSelectElectricity" :active="menuactive" />
    <ElectInfo v-if="menuactive===0" :electinfo="electricity" />
  </div>
</template>

<script>
import MnElectDetail from '../components/electricityDetail/MnElectDetail';
import ElectInfo from '../components/electricityDetail/ElectInfo';

export default {
  name: "ElectricityDetail",
  components: {
    MnElectDetail,
    ElectInfo
  },
  data() {
    return {
      menuactive: 0,
      electricity: {}
    };
  },
  mounted() {
    this.initialElectricityInfo();
  },
  methods: {
    handleSelectElectricity(index) {
      this.menuactive = index;
    },
    initialElectricityInfo() {
      let allelect = this.$store.getters.electricity;
      if (!allelect) {
        this.$router.push({ path: "/electricity" });
      }
      for (let i = 0, arri = allelect.length; i < arri; ++i) {
        if (allelect[i]._id === this.$route.params.id) {
          this.electricity = allelect[i];
          break;
        }
      }
    }
  }
};
</script>

<style>
</style>