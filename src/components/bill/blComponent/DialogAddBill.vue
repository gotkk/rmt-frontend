<template>
  <div id="dialogaddtn">
    <DialogConfirm
      :confirm="confirm"
      @colseConfirm="handleResConfirm"
      :title="c_title"
      :text="c_txt"
    />
    <v-overlay :value="loading" z-index="203">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-dialog v-model="add" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">กำหนดใบเสร็จเริ่มต้นผู้เช่าใหม่</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="contractselected"
                  :items="contractitems"
                  label="เลือกสัญญาเช่า"
                  color="light-blue darken-2"
                  v-on:change="handleSelectContract"
                ></v-select>
              </v-col>
            </v-row>
            <div v-if="selectedcontract">
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="tenantselected" label="ผู้เช่า" disabled></v-text-field>
                </v-col>
              </v-row>
              <v-row v-for="(item, index1) in water" :key="item._id">
                <v-col>
                  <v-text-field v-model="item.watername" label="น้ำประปา" disabled></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field v-model="waterunit[index1].value" label="หน่วยน้ำประปา"></v-text-field>
                </v-col>
              </v-row>
              <v-row v-for="(item, index2) in electricity" :key="item._id">
                <v-col>
                  <v-text-field v-model="item.electname" label="ไฟฟ้า" disabled></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field v-model="electunit[index2].value" label="หน่วยไฟฟ้า"></v-text-field>
                </v-col>
              </v-row>
            </div>
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
  name: "DialogAddBill",
  components: {
    DialogConfirm
  },
  props: ["add"],
  data() {
    return {
      c_title: "ต้องการเพิ่มข้อมูลใบเสร็จเริ่มต้นผู้เช่าใหม่",
      c_txt:
        "นี่เป็นบันทึกข้อมูลใบเสร็จเริ่มต้นครั้งแรกสำหรับผู้เช่าใหม่เท่านั้น เมื่อเพิ่มแล้วจะไม่สามารถลบได้",
      datarule: [value => !!value || "กรุณากรอกข้อมูล"],
      electform: {},
      data_add: {},
      contractselected: {},
      contractitems: [],
      contract: [],
      tenantselected: {},
      water: [],
      waterunit: [],
      electunit: [],
      electricity: [],
      contractfull: {},
      tenantfull: {},
      selectedcontract: false,
      confirm: false,
      electstatus: false,
      loading: false,
      inited: false
    };
  },
  mounted() {
    this.$store.dispatch("getNewContractNotHaveBill");
  },
  updated() {
    if (!this.inited) {
      this.initialForm();
    }
  },
  methods: {
    initialForm() {
      this.contract = this.$store.getters.contract;
      for (let i = 0, arri = this.contract.length; i < arri; ++i) {
        this.contractitems = [...this.contractitems, this.contract[i].name];
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
    getIdFromNameofTenant() {
      let idtenanttemp = [];
      let fullname = this.tenantselected.split("-");
      let firstname = fullname[0];
      let lastname = fullname[1];
      for (let j = 0, arrj = this.tenant.length; j < arrj; ++j) {
        if (
          firstname === this.tenant[j].firstname &&
          lastname === this.tenant[j].lastname
        ) {
          idtenanttemp = [...idtenanttemp, this.tenant[j]._id];
          break;
        }
      }
      return idtenanttemp;
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
    handleSelectContract() {
      let contractid = this.getIdFromNameofContract();
      for (let i = 0, arri = this.contract.length; i < arri; ++i) {
        if (this.contract[i]._id === contractid[0]) {
          this.contractfull = this.contract[i];
          this.tenantfull = this.contract[i].tenant[0];
          this.tenantselected = `${this.contract[i].tenant[0].firstname} - ${this.contract[i].tenant[0].lastname}`;
          this.$store.dispatch("getWaterByContractId", this.contract[i]._id);
          this.$store.dispatch(
            "getElectricityByContractId",
            this.contract[i]._id
          );
          break;
        }
      }
      this.loading = true;
      setTimeout(() => {
        this.water = this.$store.getters.water;
        this.electricity = this.$store.getters.electricity;
        this.initailElectWater();
        this.selectedcontract = true;
        this.loading = false;
      }, [2400]);
    },
    initailElectWater() {
      for (let i = 0, arri = this.water.length; i < arri; ++i) {
        this.waterunit = [
          ...this.waterunit,
          {
            _id: this.water[i]._id,
            value: 0
          }
        ];
      }
      for (let i = 0, arri = this.electricity.length; i < arri; ++i) {
        this.electunit = [
          ...this.electunit,
          {
            _id: this.electricity[i]._id,
            value: 0
          }
        ];
      }
    },
    preSubmitAdd() {
      let date = new Date();
      date.setMonth(date.getMonth() - 1);
      let period = `${date.getFullYear()}-${date.getMonth()}`;
      let waterunittemp = [];
      let electunittemp = [];
      for (let i = 0, arri = this.waterunit.length; i < arri; ++i) {
        waterunittemp = [
          ...waterunittemp,
          {
            _id: this.waterunit[i]._id,
            value: parseFloat(this.waterunit[i].value)
          }
        ];
      }
      this.waterunit = waterunittemp;

      for (let i = 0, arri = this.electunit.length; i < arri; ++i) {
        electunittemp = [
          ...electunittemp,
          {
            _id: this.electunit[i]._id,
            value: parseFloat(this.electunit[i].value)
          }
        ];
      }
      this.electunit = electunittemp;

      let billdata = {
        waterunit: this.waterunit,
        electunit: this.electunit,
        period: period,
        billstatus: "paid",
        rent: 0,
        waterprice: 0,
        electprice: 0,
        mulct: 0,
        totalprice: 0,
        paid: 0,
        tenant: [this.tenantfull._id],
        contract: [this.contractfull._id]
      };
      this.$store.dispatch("createNewBill", billdata);
      this.$router.push({ path: "/" });
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
      this.contractselected = {};
      this.selectedcontract = false;
      this.waterunit = [];
      this.electunit = [];
      this.$emit("colseAdd");
    }
  }
};
</script>

<style>
</style>