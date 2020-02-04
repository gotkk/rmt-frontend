<template>
  <div id="tenantdetail">
    <Personalinfo :personinfo="tenant"/>
    <Electronic/>
    <Water/>
  </div>
</template>

<script>
import Personalinfo from '../components/tenantDetail/Personalinfo.vue';
import Electronic from '../components/tenantDetail/Electronic';
import Water from '../components/tenantDetail/Water';

export default {
  name: "TenantDetail",
  components: {
    Personalinfo,
    Electronic,
    Water
  },
  data() {
    return {
      tenant:{
        fname: "ไก่",
        lname: "ไข่",
        mname: "ก",
        tel: "081-7774569"
      }
    };
  }
};
</script>

<style scoped>
</style>