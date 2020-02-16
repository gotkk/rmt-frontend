<template>
  <div id="dialogaddtn">
    <DialogConfirm
      :confirm="confirm"
      @colseConfirm="handleResConfirm"
      :title="c_title"
      :text="c_txt"
    />
    <v-dialog v-model="add" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">เพิ่มที่ดิน</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="landform.landname"
                  label="ชื่อที่ดิน"
                  :rules="datarule"
                  ref="lname"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="landform.landarea"
                  label="ขนาดพื้นที่"
                  :rules="datarule"
                  ref="larea"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-switch
                  v-model="landstatus"
                  :label="`สถานะการเช่าที่ดิน: ${landstatus.toString()}`"
                ></v-switch>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="contractselected"
                  :items="contractitems"
                  label="เลือกสัญญาเช่า"
                  color="light-blue darken-2"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="electselected"
                  :items="electitems"
                  label="เลือกหม้อไฟฟ้า"
                  color="light-blue darken-2"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="waterselected"
                  :items="wateritems"
                  label="เลือกหม้อน้ำประปา"
                  color="light-blue darken-2"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="preSubmitAdd()">Save</v-btn>
          <v-btn color="blue darken-1" text @click="handleCloseDialog()">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import DialogConfirm from "../../tenantDetail/tdComponent/DialogConfirm";
export default {
  name: "DialogAddLand",
  components: {
    DialogConfirm
  },
  props: ["add"],
  data() {
    return {
      c_title: "ต้องการเพิ่มข้อมูลที่ดินหรือไม่",
      c_txt: "นี่เป็นบันทึกข้อมูลที่ดิน เมื่อเพิ่มแล้วจะไม่สามารถลบได้",
      datarule: [value => !!value || "กรุณากรอกข้อมูล"],
      landform: {},
      data_add: {},
      contractselected: {},
      contractitems: [],
      contract: [],
      electselected: {},
      electitems: [],
      elect: [],
      waterselected: {},
      wateritems: [],
      water: [],
      confirm: false,
      landstatus: false,
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
      this.inited = true;
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
        this.$refs["lname"].focus();
        return false;
      } else if (!data.landarea) {
        this.$refs["larea"].focus();
        return false;
      } else {
        return true;
      }
    },
    preSubmitAdd() {
      let newcontract = this.getIdFromNameofContract();
      let newelect = this.getIdFromNameofElectricity();
      let newwater = this.getIdFromNameofWater();
      let data_add = {
        landstatus: this.landstatus,
        ...this.landform,
        contract: newcontract,
        electricity: newelect,
        water: newwater
      };
      this.validateData(data_add)
        ? this.checkConfirm(data_add)
        : alert("กรุณากรอข้อมูลให้ครบถ้วน");
    },
    checkConfirm(data) {
      this.data_add = data;
      this.confirm = true;
    },
    handleResConfirm(res) {
      res ? this.handleSubmitAdd() : (this.confirm = false);
    },
    handleSubmitAdd() {
      console.log(this.data_add);
      this.$store.dispatch("createLand", this.data_add);
      this.confirm = false;
      this.handleCloseDialog();
    },
    handleCloseDialog() {
      this.$emit("colseAdd");
    }
  }
};
</script>

<style>
</style>