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
          <span class="headline">เพิ่มน้ำประปา</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="waterform.watername"
                  label="ชื่อหม้อน้ำประปา"
                  :rules="datarule"
                  ref="wname"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="waterform.waterppunit"
                  label="ราคาน้ำประปาต่อหน่วย"
                  :rules="datarule"
                  type="number"
                  ref="ppunit"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-switch
                  v-model="waterstatus"
                  :label="`สถานะใช้งานน้ำประปา: ${waterstatus.toString()}`"
                ></v-switch>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="landselected"
                  :items="landitems"
                  label="เลือกที่ดิน"
                  color="light-blue darken-2"
                ></v-select>
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
  name: "DialogAddWater",
  components: {
    DialogConfirm
  },
  props: ["add"],
  data() {
    return {
      c_title: "ต้องการเพิ่มข้อมูลน้ำประปาหรือไม่",
      c_txt: "นี่เป็นบันทึกข้อมูลน้ำประปา เมื่อเพิ่มแล้วจะไม่สามารถลบได้",
      datarule: [value => !!value || "กรุณากรอกข้อมูล"],
      waterform: {},
      data_add: {},
      contractselected: {},
      contractitems: [],
      contract: [],
      landselected: {},
      landitems: [],
      land: [],
      confirm: false,
      waterstatus: false
    };
  },
  mounted() {
    this.$store.dispatch("getAllContract");
    this.$store.dispatch("getAllLand");
  },
  updated() {
    if (this.contractitems.length === 0) {
      this.initialForm();
    }
  },
  methods: {
    initialForm() {
      this.contract = this.$store.getters.contract;
      this.land = this.$store.getters.land;
      for (let i = 0, arri = this.contract.length; i < arri; ++i) {
        this.contractitems = [...this.contractitems, this.contract[i].name];
      }
      for (let i = 0, arri = this.land.length; i < arri; ++i) {
        this.landitems = [...this.landitems, this.land[i].landname];
      }
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
        this.$refs["wname"].focus();
        return false;
      } else if (!data.waterppunit) {
        this.$refs["ppunit"].focus();
        return false;
      } else {
        return true;
      }
    },
    preSubmitAdd() {
      let newcontract = this.getIdFromNameofContract();
      let newland = this.getIdFromNameofLand();
      let newppunit = parseFloat(this.waterform.waterppunit)
      let data_add = {
        ...this.waterform,
        waterstatus: this.waterstatus,
        waterppunit: newppunit,
        land: newland,
        contract: newcontract
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
      this.$store.dispatch("createWater", this.data_add);
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