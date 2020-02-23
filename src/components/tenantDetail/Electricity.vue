<template>
  <div>
    <DialogConfirm
      :confirm="billdialog"
      @colseConfirm="handleCloseBillDialog"
      :title="ib_title"
      :text="ib_txt"
    />
    <DialogConfirm
      :confirm="savedialog"
      @colseConfirm="handleCloseSaveDialog"
      :title="su_title"
      :text="su_txt"
    />

    <DialogConfirm
      :confirm="agreedialog"
      @colseConfirm="handleCloseAgreeDialog"
      :title="ag_title"
      :text="ag_txt"
    />

    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-container class="block-cn" v-animate-css="'fadeIn'">
      <v-row>
        <v-col>
          <p class="text-center">จัดการข้อมูลไฟฟ้าเดือนนี้</p>
        </v-col>
      </v-row>
      <SelectContract
        :contract="$store.getters.contract"
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
          <p class="txt18 text-center">ไฟฟ้า</p>
        </v-col>
      </v-row>
      <hr />

      <v-row v-if="notuse">
        <v-col cols="12">
          <p class="text-center">ไม่ได้ใช้ไฟฟ้า</p>
        </v-col>
      </v-row>

      <v-row v-else-if="paid">
        <v-col cols="12">
          <p class="text-center">บันทึกข้อมูลไฟฟ้าเดือนนี้แล้ว</p>
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
              v-model="electselected"
              :items="electitems"
              label="เลือกหม้อไฟฟ้า"
              color="amber darken-3"
              ref="selectelect"
              :rules="electselectrules"
            ></v-select>
          </v-col>
        </v-row>

        <v-form @submit.prevent>
          <v-row>
            <v-col cols="4" offset="3">
              <v-text-field
                v-model="unitelect"
                label="หน่วยไฟฟ้าเดือนนี้"
                required
                color="amber darken-3"
                :rules="electunitrules"
                ref="fillunitelect"
                type="number"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-btn color="amber darken-3" block class="ebtn" @click="prepareSubmit()">
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
import DialogConfirm from "./tdComponent/DialogConfirm";

export default {
  name: "Electricity",
  props: ["tid"],
  components: {
    SelectContract,
    DialogConfirm
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
      contract: [],
      bill: [],
      unitelect: "",
      contractselect: {},
      electitems: [],
      electselected: "",
      period: "period",
      paid: false,
      notuse: false,
      selected: false,
      billdialog: false,
      savedialog: false,
      agreedialog: false,
      loading: false,
      ready: false,
      cancel: false,
      billselect: {},
      nowmonth: 0,
      nowyear: 0,
      electunitrules: [value => !!value || "กรุณากรอกหน่วยไฟฟ้า"],
      electselectrules: [value => !!value || "กรุณาเลือกหม้อไฟฟ้า"],
      ib_title: "เริ่มบิลเดือนใหม่เลยหรือไม่",
      ib_txt:
        "นี่เป็นการเริ่มต้นเปิดบิลในรอบเดือนปัจจุบัน เพื่อทำให้สามารถบันทึกข้อมูลไฟฟ้าได้",
      su_title: "ต้องการบันทึกข้อมูลหรือไม่",
      su_txt:
        "เมื่อทำการบันทึกข้อมูลแล้ว จะไม่สามารถดำเนินการแก้ไขหน่วยไฟฟ้าได้",
      ag_title: "ยืนยันดำเนินการต่อ",
      ag_txt: ""
    };
  },
  mounted() {
    this.contract = this.$store.getters.contract;
    this.bill = this.$store.getters.bill;
  },
  updated() {},
  methods: {
    checkPeriod() {
      let etc = this.$store.getters.electricity;

      let { electunit, period } = this.billselect;

      let fullperiod = period.split("-");
      let bmonth = parseFloat(fullperiod[1]);
      let byear = parseFloat(fullperiod[0]);

      let countetc = etc.length;
      let countbilletc = electunit.length;
      if (countetc === 0) {
        this.notuse = true;
      } else {
        let month = this.month[this.nowmonth];
        let year = this.nowyear;
        if (this.nowmonth === bmonth && year === byear) {
          if (countetc === countbilletc) {
            this.paid = true;
          } else {
            this.period = month + " " + (year + 543);
            if (electunit.length === 0) {
              for (let i = 0, arri = etc.length; i < arri; ++i) {
                this.electitems.push(etc[i].electname);
              }
            } else {
              for (let i = 0, arri = etc.length; i < arri; ++i) {
                for (let j = 0, arrj = electunit.length; j < arrj; ++j) {
                  if (etc[i]._id !== electunit[j]._id) {
                    this.electitems.push(etc[i].electname);
                  }
                }
              }
            }
          }
        }
      }
    },
    handleCloseAgreeDialog(result) {
      if (result) {
        this.initialBill();
      } else {
        this.$router.push({ path: "/tenant" });
      }
      this.agreedialog = false;
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
      this.$store.dispatch(
        "getElectricityByContractId",
        this.contractselect._id
      );

      if (this.bill.length > 0 && this.contractselect !== {}) {
        this.setBillSelect();
      }

      if (this.billselect !== {}) {
        // this.agreedialog = true;
        // this.loading = true;
        // setTimeout(() => {
        //   this.loading = false;
        //   this.initialBill();
        // }, [2000]);
        setTimeout(() => {
          this.initialBill();
        }, [500]);
      }
    },
    setBillSelect() {
      let contractid = this.contractselect._id;
      let billtemp = [];
      for (let i = 0, arri = this.bill.length; i < arri; ++i) {
        if (this.bill[i].contract[0] === contractid) {
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
      this.electitems = [];
      this.electselected = "";
      this.unitelect = "";
      this.billselect = {};
      this.nowmonth = 0;
      this.nowyear = 0;
    },
    prepareSubmit() {
      if (this.electselected.length === 0) {
        alert("กรุณาเลือกหม้อไฟฟ้า");
        this.$refs["selectelect"].focus();
      } else if (this.unitelect.length === 0) {
        alert("กรุณากรอกข้อมูลหน่วยไฟฟ้า");
        this.$refs["fillunitelect"].focus();
      } else {
        this.savedialog = true;
      }
    },
    initialBill() {
      let date = new Date();
      let mindex = date.getMonth();
      let year = date.getFullYear();
      this.nowmonth = mindex;
      this.nowyear = year;

      let { period } = this.billselect;
      let fullperiod = period.split("-");
      let bmonth = parseFloat(fullperiod[1]);
      let byear = parseFloat(fullperiod[0]);
      if (mindex === bmonth && year === byear) {
        this.ready = true;
        this.checkPeriod();
      } else {
        this.billdialog = true;
      }
    },
    initailBillSubmit() {
      let period = `${this.nowyear}-${this.nowmonth}`;
      let billdata = {
        waterunit: [],
        electunit: [],
        period: period,
        billstatus: "notpaid",
        rent: parseFloat(this.contractselect.rent),
        waterprice: 0,
        electprice: 0,
        mulct: 0,
        totalprice: parseFloat(this.contractselect.rent),
        paid: 0,
        tenant: [this.tid],
        contract: [this.contractselect._id]
      };
      this.$store.dispatch("createInitialBill", billdata);
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
        let electdata = {};
        let electricity = this.$store.getters.electricity;
        for (let i = 0, arri = electricity.length; i < arri; ++i) {
          if (electricity[i].electname === this.electselected) {
            electdata._id = electricity[i]._id;
            break;
          }
        }
        electdata.value = parseFloat(this.unitelect);
        let billdata = {
          ...this.billselect,
          electunit: [{ ...electdata }]
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
  border-color: #ff8f00;
  border-width: 2px !important;
}
</style>