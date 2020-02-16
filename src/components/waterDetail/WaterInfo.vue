<template>
  <div id="waterinfo">
    <DialogConfirm
      :confirm="confirm"
      @colseConfirm="handleResConfirm"
      :title="c_title"
      :text="c_txt"
    />
    <DialogConfirm
      :confirm="confirm2"
      @colseConfirm="handleResConfirm2"
      :title="c_title2"
      :text="c_txt2"
    />
    <v-form v-if="waterinfo">
      <v-container class="block-cn" v-animate-css="'fadeIn'">
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model="water_update.watername"
              label="ชื่อหม้อน้ำประปา"
              :disabled="disabled.name"
              ref="name"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="water_update.waterppunit"
              label="ราคาน้ำประปาต่อหน่วย"
              type="number"
              :disabled="disabled.ppunit"
              ref="ppunit"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-switch
              v-model="water_update.waterstatus"
              :label="`สถานะการใช้งานหม้อน้ำประปา: ${water_update.waterstatus}`"
              :disabled="disabled.status"
              ref="status"
            ></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-select
              v-model="contractselected"
              :items="contractitems"
              label="เลือกสัญญาเช่า"
              color="light-blue darken-2"
              :disabled="disabled.contract"
              ref="contract"
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="landselected"
              :items="landitems"
              label="เลือกที่ดิน"
              color="light-blue darken-2"
              :disabled="disabled.land"
              ref="land"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12 text-right">
            <v-btn color="green accent-4" @click="preSubmitUpdate()" v-if="updating">
              <v-icon>mdi-pencil-circle-outline</v-icon>
              <span>บันทึก</span>
            </v-btn>
            <v-btn color="green accent-4" @click="confirm = true" v-else>
              <v-icon>mdi-pencil-circle-outline</v-icon>
              <span>แก้ไข</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import DialogConfirm from "../tenantDetail/tdComponent/DialogConfirm";
export default {
  name: "ElectInfo",
  props: ["waterinfo"],
  components: {
    DialogConfirm
  },
  data() {
    return {
      water_update: {},
      contractselected: "",
      contractitems: [],
      contract: [],
      landselected: "",
      landitems: [],
      land: [],
      updating: false,
      confirm: false,
      c_title: "ต้องการแก้ไขข้อมูลน้ำประปา",
      c_txt: "แก้ไขข้อมูลน้ำประปา",
      confirm2: false,
      c_title2: "ต้องการบันทึกข้อมูลน้ำประปา",
      c_txt2: "บันทึกข้อมูลการแก้ไขน้ำประปา",
      disabled: {
        name: true,
        ppunit: true,
        status: true,
        land: true,
        contract: true
      },
      inited: false
    };
  },
  mounted() {
    this.$store.dispatch("getAllContract");
    this.$store.dispatch("getAllLand");
  },
  updated() {
    if (!this.inited) {
      this.initialForm();
    }
  },
  methods: {
    handleCloseOnUpdate() {
      this.dialogtenant = false;
    },
    initialForm() {
      this.contract = this.$store.getters.contract;
      this.land = this.$store.getters.land;
      for (let i = 0, arri = this.contract.length; i < arri; ++i) {
        this.contractitems = [...this.contractitems, this.contract[i].name];
      }
      for (let i = 0, arri = this.land.length; i < arri; ++i) {
        this.landitems = [...this.landitems, this.land[i].landname];
      }
      let { contract, land } = this.waterinfo;
      this.contractselected = contract.length !== 0 ? contract[0].name : "";
      this.landselected = land.length !== 0 ? land[0].landname : "";
      this.water_update = { ...this.waterinfo };
      this.inited = true;
    },
    handleEditElect() {
      for (let prop in this.disabled) {
        this.disabled[prop] = false;
      }
      this.updating = true;
    },
    handleResConfirm(result) {
      result ? this.handleEditElect() : null;
      this.confirm = false;
    },
    handleResConfirm2(result) {
      result ? this.handleSubmitUpdate() : (this.confirm2 = false);
    },
    getIdFromNameofContract() {
      let idcontracttemp = [];
      for (let j = 0, arrj = this.contract.length; j < arrj; ++j) {
        if (this.contractselected === this.contract[j].name) {
          idcontracttemp = [...idcontracttemp, this.contract[j]._id];
          break;
        }
      }
      return idcontracttemp;
    },
    getIdFromNameofLand() {
      let idlandtemp = [];
      for (let j = 0, arrj = this.land.length; j < arrj; ++j) {
        if (this.landselected === this.land[j].landname) {
          idlandtemp = [...idlandtemp, this.land[j]._id];
          break;
        }
      }
      return idlandtemp;
    },
    validateData(data) {
      if (!data.watername) {
        this.$refs["name"].focus();
        return false;
      } else if (!data.waterppunit) {
        this.$refs["ppunit"].focus();
        return false;
      } else {
        return true;
      }
    },
    preSubmitUpdate() {
      let newcontract = this.getIdFromNameofContract();
      let newland = this.getIdFromNameofLand();
      this.water_update = {
        ...this.water_update,
        contract: newcontract,
        land: newland
      };
      this.validateData(this.water_update)
        ? (this.confirm2 = true)
        : alert("กรุณากรอข้อมูลให้ครบถ้วน");
    },
    handleSubmitUpdate() {
      this.$store.dispatch("updateWater", this.water_update);
      this.confirm2 = false;
      this.$router.push({ path: "/water" });
    }
  }
};
</script>

<style scoped>
</style>