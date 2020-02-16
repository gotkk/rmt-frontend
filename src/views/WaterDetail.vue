<template>
  <div id="waterdetail">
    <MnWaterDetail @onSelect="handleSelectWater" :active="menuactive" />
    <WaterInfo v-if="menuactive===0" :waterinfo="water" />
  </div>
</template>

<script>
import MnWaterDetail from '../components/waterDetail/MnWaterDetail';
import WaterInfo from '../components/waterDetail/WaterInfo';

export default {
  name: "WaterDetail",
  components: {
    MnWaterDetail,
    WaterInfo
  },
  data() {
    return {
      menuactive: 0,
      water: {}
    };
  },
  mounted() {
    this.initialWaterInfo();
  },
  methods: {
    handleSelectWater(index) {
      this.menuactive = index;
    },
    initialWaterInfo() {
      let allwater = this.$store.getters.water;
      if (!allwater) {
        this.$router.push({ path: "/water" });
      }
      for (let i = 0, arri = allwater.length; i < arri; ++i) {
        if (allwater[i]._id === this.$route.params.id) {
          this.water = allwater[i];
          break;
        }
      }
    }
  }
};
</script>

<style>
</style>