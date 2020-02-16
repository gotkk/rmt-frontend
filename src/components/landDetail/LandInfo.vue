<template>
  <div id="landinfo">
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
    <v-form v-if="landinfo">
      <v-container class="block-cn" v-animate-css="'fadeIn'">
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model="land_update.landname"
              label="ชื่อที่ดิน"
              :disabled="disabled.name"
              ref="name"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="land_update.landarea"
              label="พื้นที่"
              :disabled="disabled.area"
              ref="deposit"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-switch
              v-model="land_update.landstatus"
              :label="`สถานะการใช้งานที่ดิน: ${land_update.landstatus}`"
              :disabled="disabled.status"
              ref="status"
            ></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-select
              v-model="electselected"
              :items="electitems"
              label="เลือกหม้อไฟฟ้า"
              color="light-blue darken-2"
              :disabled="disabled.elect"
              ref="elect"
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="waterselected"
              :items="wateritems"
              label="เลือกหม้อน้ำประปา"
              color="light-blue darken-2"
              :disabled="disabled.water"
              ref="water"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-select
              v-model="contractselected"
              :items="contractitems"
              label="เลือกหม้อสัญญาเช่า"
              color="light-blue darken-2"
              :disabled="disabled.contract"
              ref="elect"
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
  name: "LandInfo",
  props: ["landinfo"],
  components: {
    DialogConfirm
  },
  data() {
    return {
      land_update: {},
      contractselected: "",
      contractitems: [],
      contract: [],
      electselected: "",
      electitems: [],
      elect: [],
      waterselected: "",
      wateritems: [],
      water: [],
      updating: false,
      confirm: false,
      c_title: "ต้องการแก้ไขข้อมูลที่ดิน",
      c_txt: "แก้ไขข้อมูลที่ดิน",
      confirm2: false,
      c_title2: "ต้องการบันทึกข้อมูลที่ดิน",
      c_txt2: "บันทึกข้อมูลการแก้ไขที่ดิน",
      disabled: {
        name: true,
        area: true,
        status: true,
        contract: true,
        elect: true,
        water: true
      },
      inited: false
    };
  },
  mounted() {
    this.$store.dispatch("getAllContract");
    this.$store.dispatch("getAllElectricity");
    this.$store.dispatch("getAllWater");
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
      this.elect = this.$store.getters.electricity;
      this.water = this.$store.getters.water;
      for (let i = 0, arri = this.contract.length; i < arri; ++i) {
        this.contractitems = [...this.contractitems, this.contract[i].name];
      }
      for (let i = 0, arri = this.elect.length; i < arri; ++i) {
        this.electitems = [...this.electitems, this.elect[i].electname];
      }
      for (let i = 0, arri = this.water.length; i < arri; ++i) {
        this.wateritems = [...this.wateritems, this.water[i].watername];
      }
      let { contract, electricity, water } = this.landinfo;
      this.contractselected = contract.length !== 0 ? contract[0].name : "";
      this.electselected =
        electricity.length !== 0 ? electricity[0].electname : "";
      this.waterselected = water.length !== 0 ? water[0].watername : "";
      this.land_update = { ...this.landinfo };
      this.inited = true;
    },
    handleEditLand() {
      for (let prop in this.disabled) {
        this.disabled[prop] = false;
      }
      this.updating = true;
    },
    handleResConfirm(result) {
      result ? this.handleEditLand() : null;
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
    getIdFromNameofElectricity() {
      let idelecttemp = [];
      for (let j = 0, arrj = this.elect.length; j < arrj; ++j) {
        if (this.electselected === this.elect[j].electname) {
          idelecttemp = [...idelecttemp, this.elect[j]._id];
          break;
        }
      }
      return idelecttemp;
    },
    getIdFromNameofWater() {
      let idwatertemp = [];
      for (let j = 0, arrj = this.water.length; j < arrj; ++j) {
        if (this.waterselected === this.water[j].watername) {
          idwatertemp = [...idwatertemp, this.water[j]._id];
          break;
        }
      }
      return idwatertemp;
    },
    validateData(data) {
      if (!data.landname) {
        this.$refs["name"].focus();
        return false;
      } else if (!data.landarea) {
        this.$refs["area"].focus();
        return false;
      } else {
        return true;
      }
    },
    preSubmitUpdate() {
      let newcontract = this.getIdFromNameofContract();
      let newelect = this.getIdFromNameofElectricity();
      let newwater = this.getIdFromNameofWater();
      this.land_update = {
        ...this.land_update,
        contract: newcontract,
        electricity: newelect,
        water: newwater
      };
      this.validateData(this.land_update)
        ? (this.confirm2 = true)
        : alert("กรุณากรอข้อมูลให้ครบถ้วน");
    },
    handleSubmitUpdate() {
      console.log(this.land_update);
      this.$store.dispatch("updateLand", this.land_update);
      this.confirm2 = false;
      this.$router.push({ path: "/land" });
    }
  }
};
</script>

<style scoped>
</style>