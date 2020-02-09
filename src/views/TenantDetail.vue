<template>
  <div id="tenantdetail">
    <MnTenantDetail @onSelect="handleSelectTenant" :active="menuactive" />
    <Personalinfo v-if="menuactive===0" :personinfo="tenant" />
    <Contract v-else-if="menuactive===1" :contract="tenant.contract" />
    <RentDetail
      v-else-if="menuactive===2"
      :bill="tenant.bill[tenant.bill.length-1]"
      :contract="tenant.contract"
      :electricity="tenant.contract[0].electricity"
      :water="tenant.contract[0].water"
    />
    <Electricity
      v-else-if="menuactive===3"
      :contract="tenant.contract"
      :electricity="tenant.contract[0].electricity"
      :bill="tenant.bill[tenant.bill.length-1]"
    />
    <Water
      v-else-if="menuactive===4"
      :contract="tenant.contract"
      :water="tenant.contract[0].water"
      :bill="tenant.bill[tenant.bill.length-1]"
    />
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