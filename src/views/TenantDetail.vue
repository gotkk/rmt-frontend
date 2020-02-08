<template>
  <div id="tenantdetail">
    <MnTenantDetail @onSelect="handleSelectTenant" :active="menuactive" />
    <Personalinfo v-if="menuactive===0" :personinfo="tenant" />
    <RentDetail v-else-if="menuactive===1" />
    <Electronic v-else-if="menuactive===2" />
    <Water v-else-if="menuactive===3" />
  </div>
</template>

<script>
import Personalinfo from "../components/tenantDetail/Personalinfo";
import Electronic from "../components/tenantDetail/Electronic";
import Water from "../components/tenantDetail/Water";
import MnTenantDetail from "../components/tenantDetail/MnTenantDetail";
import RentDetail from "../components/tenantDetail/RentDetail";

export default {
  name: "TenantDetail",
  components: {
    Personalinfo,
    Electronic,
    Water,
    MnTenantDetail,
    RentDetail
  },
  data() {
    return {
      menuactive: 0,
      tenant: {}
    };
  },
  methods: {
    handleSelectTenant(index) {
      this.menuactive = index;
    },
    initialPersonalInfo() {
      let alltenant = this.$store.getters.tenant;
      if (!alltenant) {
        this.$router.push({ path: "/tenant" });
      }
      for (let i = 0, arri = alltenant.length; i < arri; ++i) {
        if (alltenant[i]._id === this.$route.params.id) {
          this.tenant = alltenant[i];
          break;
        }
      }
    }
  },
  mounted() {
    this.initialPersonalInfo();
  }
};
</script>

<style scoped>
</style>