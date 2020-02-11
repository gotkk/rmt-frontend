<template>
  <div>
    <DialogInitialBill :initialbill="billdialog" @setCloseBillDialog="handleCloseBillDialog" />
    <DialogSaveUnit :saveunit="savedialog" @setCloseSaveDialog="handleCloseSaveDialog" />
    <v-container class="block-cn" v-animate-css="'fadeIn'">
      <v-row>
        <v-col>
          <p class="text-center">จัดการข้อมูลน้ำประปาเดือนนี้</p>
        </v-col>
      </v-row>
      <SelectContract
        :contract="contract"
        @setContractSelect="handleSelectContract"
        v-if="!selected"
      />

      <div v-if="selected">
        <v-row v-animate-css="'fadeInDown'">
          <v-col>
            <span>สัญญาเช่า</span>
          </v-col>
          <v-col class="d-flex justify-end">
            <span>{{this.contractselect.name}}</span>
          </v-col>
        </v-row>
      </div>
    </v-container>

    <v-container class="block-cn" v-animate-css="'fadeIn'" v-if="selected&&ready">
      <v-row>
        <v-col cols="12">
          <p class="txt18 text-center">น้ำประปา</p>
        </v-col>
      </v-row>
      <hr />

      <v-row v-if="notuse">
        <v-col cols="12">
          <p class="text-center">ไม่ได้ใช้น้ำประปา</p>
        </v-col>
      </v-row>

      <v-row v-else-if="paid">
        <v-col cols="12">
          <p class="text-center">บันทึกข้อมูลน้ำประปาเดือนนี้แล้ว</p>
        </v-col>
      </v-row>

      <v-row v-else-if="cancel">
        <v-col cols="12">
          <p class="text-center">ยังไม่ได้เปิดบิลประจำเดือนปัจจุบัน</p>
        </v-col>
      </v-row>

      <div v-else>
        <v-row>
          <v-col cols="6">
            <div class="period">
              <span class="txt18">{{period}}</span>
            </div>
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="waterselected"
              :items="wateritems"
              label="เลือกหม้อน้ำประปา"
              color="light-blue darken-2"
              ref="selectwater"
              :rules="waterselectrules"
            ></v-select>
          </v-col>
        </v-row>

        <v-form @submit.prevent>
          <v-row>
            <v-col cols="4" offset="3">
              <v-text-field
                v-model="unitwater"
                label="หน่วยน้ำประปาเดือนนี้"
                required
                :rules="waterunitrules"
                ref="fillunitwater"
                type="number"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-btn color="light-blue darken-2" block class="ebtn" @click="prepareSubmit()">
                <v-icon>mdi-content-save</v-icon>
                <span>บันทึก</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </div>
    </v-container>
  </div>
</template>

<script>
import SelectContract from "./tdComponent/SelectContract";
import DialogInitialBill from "./tdComponent/DialogInitialBill";
import DialogSaveUnit from "./tdComponent/DialogSaveUnit";

export default {
  name: "Electronic",
  props: ["bill", "contract"],
  components: {
    SelectContract,
    DialogInitialBill,
    DialogSaveUnit
  },
  data() {
    return {
      month: [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม"
      ],
      unitwater: "",
      contractselect: {},
      wateritems: [],
      waterselected: "",
      period: "period",
      paid: false,
      notuse: false,
      selected: false,
      billdialog: false,
      savedialog: false,
      ready: false,
      cancel: false,
      billselect: {},
      nowmonth: 0,
      nowyear: 0,
      waterunitrules: [value => !!value || "กรุณากรอกหน่วยน้ำประปา"],
      waterselectrules: [value => !!value || "กรุณาเลือกหม้อน้ำประปา"]
    };
  },
  mounted() {},
  methods: {
    checkPeriod() {
      let { water: wat } = this.contractselect;
      let { waterunit, month: bmonth, year: byear } = this.billselect;
      let countwat = wat.length;
      let countbillwat = waterunit.length;
      if (countwat === 0) {
        this.notuse = true;
      } else {
        let month = this.month[this.nowmonth];
        let year = this.nowyear;
        if (this.nowmonth === bmonth && year === byear) {
          if (countwat === countbillwat) {
            this.paid = true;
          } else {
            this.period = month + " " + (year + 543);
            if (waterunit.length === 0) {
              for (let i = 0, arri = wat.length; i < arri; ++i) {
                this.wateritems.push(wat[i].watername);
              }
            } else {
              for (let i = 0, arri = wat.length; i < arri; ++i) {
                for (let j = 0, arrj = waterunit.length; j < arrj; ++j) {
                  if (wat[i]._id !== waterunit[j]._id) {
                    this.wateritems.push(wat[i].watername);
                  }
                }
              }
            }
          }
        }
      }
    },
    handleSelectContract(value) {
      this.resetData();
      for (let i = 0, arri = this.contract.length; i < arri; ++i) {
        if (this.contract[i].name === value) {
          this.contractselect = this.contract[i];
          this.selected = true;
          break;
        }
      }
      if (this.bill.length > 0 && this.contractselect !== {}) {
        this.setBillSelect();
      }
      if (this.billselect !== {}) {
        this.initialBill();
      }
    },
    setBillSelect() {
      let contractid = this.contractselect._id;
      let billtemp = [];
      for (let i = 0, arri = this.bill.length; i < arri; ++i) {
        if (this.bill[i].contract === contractid) {
          billtemp = [...billtemp, this.bill[i]];
        }
      }
      this.billselect = billtemp[billtemp.length - 1];
    },
    resetData() {
      this.contractselect = {};
      this.selected = false;
      this.notuse = false;
      this.paid = false;
      this.billdialog = false;
      this.savedialog = false;
      this.ready = false;
      this.cancel = false;
      this.period = "period";
      this.wateritems = [];
      this.waterselected = "";
      this.unitwater = "";
      this.billselect = {};
      this.nowmonth = 0;
      this.nowyear = 0;
    },
    prepareSubmit() {
      if (this.waterselected.length === 0) {
        alert("กรุณาเลือกหม้อน้ำประปา");
        this.$refs["selectwater"].focus();
      } else if (this.unitwater.length === 0) {
        alert("กรุณากรอกข้อมูลหน่วยน้ำประปา");
        this.$refs["fillunitwater"].focus();
      } else {
        this.savedialog = true;
      }
    },
    initialBill() {
      let { month: bmonth, year: byear } = this.billselect;
      let date = new Date();
      let mindex = date.getMonth();
      let year = date.getFullYear();
      this.nowmonth = mindex;
      this.nowyear = year;
      if (mindex === bmonth && year === byear) {
        this.ready = true;
        this.checkPeriod();
      } else {
        this.billdialog = true;
      }
    },
    initailBillSubmit() {
      let billdata = {
        waterunit: [],
        electunit: [],
        month: this.nowmonth,
        year: this.nowyear,
        billstatus: "notpaid",
        rent: parseFloat(this.contractselect.rent),
        waterprice: 0,
        electprice: 0,
        mulct: 0,
        totalprice: 0,
        paid: 0,
        tenant: this.tenant._id,
        contract: this.contractselect._id
      };
      this.$store.dispatch("createInitialBill", billdata);
      this.$store.dispatch("updateTenantWithLastBill", this.tenant._id);
      this.$router.push({ path: "/tenant" });
    },
    handleSubmit(data) {
      this.$store.dispatch("updateBillWithUnit", data);
      this.$router.push({ path: "/tenant" });
    },
    handleCloseBillDialog(result) {
      this.billdialog = false;
      result ? this.initailBillSubmit() : (this.cancel = true);
      this.ready = true;
    },
    handleCloseSaveDialog(result) {
      if (result) {
        let waterdata = {};
        let { water } = this.contractselect;
        for (let i = 0, arri = water.length; i < arri; ++i) {
          if (water[i].watername === this.waterselected) {
            waterdata._id = water[i]._id;
            break;
          }
        }
        waterdata.value = parseFloat(this.unitwater);
        let billdata = {
          ...this.billselect,
          waterunit: [...this.billselect.waterunit, { ...waterdata }]
        };
        this.handleSubmit(billdata);
      }
      this.savedialog = false;
    }
  }
};
</script>

<style scoped>
.ebtn {
  margin-top: 14px;
}

.txt18 {
  font-size: 20px;
}

.period {
  /* background-color: aquamarine; */
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-style: solid;
  border-color: #0288d1;
  border-width: 2px !important;
}
</style>