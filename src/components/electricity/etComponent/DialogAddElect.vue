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
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="electform.electname"
                  label="ชื่อหม้อไฟฟ้า"
                  :rules="datarule"
                  ref="ename"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="electform.electppunit"
                  label="ราคาไฟฟ้าต่อหน่วย"
                  :rules="datarule"
                  type="number"
                  ref="ppunit"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-switch
                  v-model="electstatus"
                  :label="`สถานะใช้งานไฟฟ้า: ${electstatus.toString()}`"
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
  name: "DialogAddElect",
  components: {
    DialogConfirm
  },
  props: ["add"],
  data() {
    return {
      c_title: "ต้องการเพิ่มข้อมูลไฟฟ้าหรือไม่",
      c_txt: "นี่เป็นบันทึกข้อมูลไฟฟ้า เมื่อเพิ่มแล้วจะไม่สามารถลบได้",
      datarule: [value => !!value || "กรุณากรอกข้อมูล"],
      electform: {},
      data_add: {},
      contractselected: {},
      contractitems: [],
      contract: [],
      landselected: {},
      landitems: [],
      land: [],
      confirm: false,
      electstatus: false
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
      if (!data.electname) {
        this.$refs["ename"].focus();
        return false;
      } else if (!data.electppunit) {
        this.$refs["ppunit"].focus();
        return false;
      } else {
        return true;
      }
    },
    preSubmitAdd() {
      let newcontract = this.getIdFromNameofContract();
      let newland = this.getIdFromNameofLand();
      let newppunit = parseFloat(this.electform.electppunit)
      let data_add = {
        electstatus: this.electstatus,
        ...this.electform,
        electppunit: newppunit,
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
      this.$store.dispatch("createElectricity", this.data_add);
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