<template>
  <div id="tenantdetail">
    <Menu @onSelect="handleSelectTenant" :active="menuactive" />
    <Personalinfo v-if="menuactive===0" :personinfo="tenant" />
    <RentDetail v-else-if="menuactive===1" />
    <Electronic v-else-if="menuactive===2" />
    <Water v-else-if="menuactive===3" />
  </div>
</template>

<script>
import Personalinfo from '../components/tenantDetail/Personalinfo';
import Electronic from '../components/tenantDetail/Electronic';
import Water from '../components/tenantDetail/Water';
import Menu from '../components/tenantDetail/Menu';
import RentDetail from '../components/tenantDetail/RentDetail';

export default {
  name: "TenantDetail",
  components: {
    Personalinfo,
    Electronic,
    Water,
    Menu,
    RentDetail
  },
  data() {
    return {
      menuactive: 0,
      tenant: {
        fname: "ไก่",
        lname: "ไข่",
        mname: "ก",
        tel: "081-7774569"
      }
    };
  },
  methods: {
    handleSelectTenant(index) {
      this.menuactive = index;
    }
  }
};
</script>

<style scoped>
</style>