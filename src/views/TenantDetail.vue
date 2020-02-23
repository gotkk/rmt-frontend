<template>
  <div id="tenantdetail">
    <MnTenantDetail @onSelect="handleSelectTenant" :active="menuactive" />
    <Personalinfo v-if="menuactive===0" :personinfo="tenant" :tid="tenant._id" />
    <Contract v-else-if="menuactive===1" :tid="tenant._id" />
    <RentDetail v-else-if="menuactive===2" :tid="tenant._id" />
    <Electricity v-else-if="menuactive===3" :tid="tenant._id" />
    <Water v-else-if="menuactive===4" :tid="tenant._id" />
  </div>
</template>

<script>
import Personalinfo from "../components/tenantDetail/Personalinfo";
import Electricity from "../components/tenantDetail/Electricity";
import Water from "../components/tenantDetail/Water";
import MnTenantDetail from "../components/tenantDetail/MnTenantDetail";
import RentDetail from "../components/tenantDetail/RentDetail";
import Contract from "../components/tenantDetail/Contract";

export default {
  name: "TenantDetail",
  components: {
    Personalinfo,
    Electricity,
    Water,
    MnTenantDetail,
    RentDetail,
    Contract
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

<style>
.block-cn {
  margin-top: 16px;
  border-radius: 16px;
  border-width: 2px;
  border-style: solid;
  box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.2),
    0 6px 20px 0 rgba(255, 255, 255, 0.19);
}
</style>