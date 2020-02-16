<template>
  <div id="landdetail">
    <MnLandDetail @onSelect="handleSelectLand" :active="menuactive" />
    <LandInfo v-if="menuactive===0" :landinfo="land" />
  </div>
</template>

<script>
import MnLandDetail from '../components/landDetail/MnLandDetail';
import LandInfo from '../components/landDetail/LandInfo';

export default {
  name: "LandDetail",
  components: {
    MnLandDetail,
    LandInfo
  },
  data() {
    return {
      menuactive: 0,
      land: {}
    };
  },
  mounted() {
    this.initialLandInfo();
  },
  methods: {
    handleSelectLand(index) {
      this.menuactive = index;
    },
    initialLandInfo() {
      let allland = this.$store.getters.land;
      if (!allland) {
        this.$router.push({ path: "/land" });
      }
      for (let i = 0, arri = allland.length; i < arri; ++i) {
        if (allland[i]._id === this.$route.params.id) {
          this.land = allland[i];
          break;
        }
      }
    }
  }
};
</script>

<style>
</style>