<template>
  <div>
    <DialogConfirm
      :confirm="confirm"
      @colseConfirm="handleResConfirm"
      :title="c_title"
      :text="c_txt"
    />
    <v-container class="block-cn" v-animate-css="'fadeIn'">
      <v-row>
        <v-col>
          <p class="text-center">จัดการข้อมูล</p>
        </v-col>
      </v-row>
      <SelectContract
        :contract="$store.getters.contract"
        @setContractSelect="handleSelectContract"
        v-if="!ctselected"
      />
      <div v-if="ctselected">
        <v-row v-animate-css="'fadeInDown'">
          <v-col>
            <span>สัญญาเช่า</span>
          </v-col>
          <v-col class="d-flex justify-end">
            <span>{{this.contractselect.name}}</span>
          </v-col>
        </v-row>
        <SelectBill
          :billlist="billlist"
          @setBillSelect="handleSelectBill"
          @setNotReady="handleSelectNotReady"
          v-if="ctselected&&!blselected"
        />
      </div>
      <div v-if="blselected">
        <v-row v-animate-css="'fadeInDown'">
          <v-col>
            <span>เลือกงวดค่าเช่า (เดือน)</span>
          </v-col>
          <v-col class="d-flex justify-end">
            <span>{{this.month[indexmonth]}}</span>
          </v-col>
        </v-row>
      </div>
    </v-container>

    <v-container class="block-cn" v-animate-css="'fadeIn'" v-if="blselected">
      <v-row>
        <v-col cols="12">
          <p class="txt18 text-center">รายละเอียดการเช่า</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p>ประจำเดือน</p>
        </v-col>
        <v-col>
          <p class="text-right">{{this.month[indexmonth]}}</p>
        </v-col>
      </v-row>
      <hr dash />

      <div v-if="paid">
        <v-row>
          <v-col cols="12">
            <p class="text-center pt-8">ได้รับค่าเช่าเดือนนี้เรียบร้อยแล้ว</p>
          </v-col>
        </v-row>
      </div>

      <div v-else-if="!ready">
        <v-row>
          <v-col cols="12">
            <p
              class="text-center pt-8"
            >ยังไม่ได้กรอกข้อมูล หรือกรอกข้อมูลไม่ครบ (หน่วยของไฟฟ้า-น้ำประปา)</p>
          </v-col>
        </v-row>
      </div>

      <div v-else>
        <v-row>
          <v-col>
            <p class="text-center">ข้อมูลการใช้ไฟฟ้า</p>
          </v-col>
        </v-row>
        <v-row v-if="notuseelect">
          <v-col>
            <p class="text-center">ไม่ได้ใช้ไฟฟ้า</p>
          </v-col>
        </v-row>
        <div v-for="(item, index) in electcalcurate" :key="index">
          <v-row>
            <v-col>
              <p>หม้อไฟฟ้า : {{item.name}}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <p>หน่วยไฟฟ้า x {{item.ppunit}}</p>
            </v-col>
            <v-col>
              <p class="text-right">{{item.unit}} หน่วย</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <p>ค่าไฟฟ้า</p>
            </v-col>
            <v-col>
              <p class="text-right">{{item.total}} บาท</p>
            </v-col>
          </v-row>
          <hr v-if="index!==electcalcurate.length-1" class="divider-dash" />
        </div>
        <hr />

        <v-row>
          <v-col>
            <p class="text-center">ข้อมูลการใช้น้ำประปา</p>
          </v-col>
        </v-row>
        <v-row v-if="notusewater">
          <v-col>
            <p class="text-center">ไม่ได้ใช้น้ำประปา</p>
          </v-col>
        </v-row>
        <div v-for="(item, index) in watercalculate" :key="index+1">
          <v-row>
            <v-col>
              <p>หม้อน้ำประปา : {{item.name}}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <p>หน่วยน้ำ x {{item.ppunit}}</p>
            </v-col>
            <v-col>
              <p class="text-right">{{item.unit}} หน่วย</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <p>ค่าน้ำ</p>
            </v-col>
            <v-col>
              <p class="text-right">{{item.total}} บาท</p>
            </v-col>
          </v-row>
          <hr v-if="index!==watercalculate.length-1" class="divider-dash" />
        </div>
        <hr />

        <v-row>
          <v-col>
            <p class="text-center">สรุปรายการข้อมูล</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p>ค่าเช่า</p>
          </v-col>
          <v-col>
            <p class="text-right">{{rental}} บาท</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p>ค่าปรับ</p>
          </v-col>
          <v-col>
            <p class="text-right">{{mulct}} บาท</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p>ค่าไฟฟ้า</p>
          </v-col>
          <v-col>
            <p class="text-right">{{sumelectprice}} บาท</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p>ค่าน้ำประปา</p>
          </v-col>
          <v-col>
            <p class="text-right">{{sumwaterprice}} บาท</p>
          </v-col>
        </v-row>
        <hr />
        <v-row>
          <v-col>
            <p>ยอดรวมที่ต้องจ่ายทั้งสิ้น</p>
          </v-col>
          <v-col>
            <p class="text-right">{{totalallprice}} บาท</p>
          </v-col>
        </v-row>
        <hr />
        <v-row>
          <v-col class="d-flex justify-center">
            <v-btn @click="confirm=true">ชำระค่าเช่า</v-btn>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import SelectContract from "./tdComponent/SelectContract";
import SelectBill from "./tdComponent/SelectBill";
import DialogConfirm from "../tenantDetail/tdComponent/DialogConfirm";

export default {
  name: "RentDetail",
  props: ["tid"],
  components: {
    SelectContract,
    DialogConfirm,
    SelectBill
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
        "ธันวาคม",
        "-"
      ],
      contract: [],
      contractselect: {},
      billselect: {},
      preventbill: {},
      paid: false,
      ready: false,
      ctselected: false,
      blselected: false,
      notuse: false,
      notuseelect: false,
      notusewater: false,
      confirm: false,
      period: "period",
      bill: [],
      billlist: [],
      selectunit: [],
      swaterunit: [],
      selectprice: [],
      swaterprice: [],
      electcalcurate: [],
      watercalculate: [],
      sumelectprice: 0,
      sumwaterprice: 0,
      totalallprice: 0,
      rental: 0,
      mulct: 0,
      indexmonth: 12,
      c_title: "ต้องการบันทึกได้รับค่าเช่าแล้ว",
      c_txt: "บันทึกข้อมูล ได้รับค่าเช่าจากผู้เช่าคนนี้เรียบร้อยแล้ว"
    };
  },
  mounted() {
    this.contract = this.$store.getters.contract;
    this.bill = this.$store.getters.bill;
  },
  updated() {},
  methods: {
    checkReady() {
      // let { electunit, waterunit, billstatus } = this.billselect;
      let { electunit, waterunit } = this.billselect;
      let electricity = this.$store.getters.electricity;
      let water = this.$store.getters.water;
      let eready = false;
      let wready = false;
      this.period = this.billselect.period;
      // let date = new Date();
      // let mindex = date.getMonth();
      // let month = this.month[mindex];
      // let year = date.getFullYear();
      // this.period = month + " " + year;
      // if (mindex === bmonth && year === byear) {

      // if (billstatus === "paid") {
      //   this.paid = true;
      // } else {
      if (electricity.length !== 0) {
        if (electunit.length === electricity.length) {
          eready = true;
        }
      } else {
        this.notuseelect = true;
        eready = true;
      }

      if (water.length !== 0) {
        if (waterunit.length === water.length) {
          wready = true;
        }
      } else {
        this.notusewater = true;
        wready = true;
      }
      if (eready && wready) {
        this.ready = true;
      } else {
        this.ready = false;
      }
      // }
      // }
    },
    handleSelectContract(value) {
      this.resetData();
      for (let i = 0, arri = this.contract.length; i < arri; ++i) {
        if (this.contract[i].name === value) {
          this.contractselect = this.contract[i];
          this.ctselected = true;
          break;
        }
      }
      this.$store.dispatch(
        "getElectricityByContractId",
        this.contractselect._id
      );
      this.$store.dispatch("getWaterByContractId", this.contractselect._id);
      if (this.bill.length > 0 && this.contractselect !== {}) {
        this.setBill();
      }
    },
    handleSelectBill(value) {
      let monthselect = this.month.indexOf(value);
      for (let i = 0, arri = this.billlist.length; i < arri; ++i) {
        let m = this.billlist[i].period.split("-");
        m[1] = parseFloat(m[1]);
        if (m[1] === monthselect) {
          this.billselect = this.billlist[i];
          this.blselected = true;
          break;
        }
      }
      if (this.billselect !== {}) {
        this.checkReady();
      }
      if (this.ready) {
        this.calculateMulct();
        this.calculateTotalRent();
      }
    },
    handleSelectNotReady() {
      this.blselected = true;
      this.ready = false;
    },
    calculateMulct() {
      let { rent: r } = this.contractselect;
      let { period } = this.billselect;
      let splitperiod = period.split("-");
      let m = parseFloat(splitperiod[1]);
      this.indexmonth = m;
      let date = new Date();
      let rent = parseFloat(r);
      let month = date.getMonth();
      if (month !== m) {
        if (rent >= 10000) {
          this.mulct = 1000;
        } else {
          this.mulct = 500;
        }
      }
    },
    calculateTotalRent() {
      let electricity = this.$store.getters.electricity;
      let water = this.$store.getters.water;
      for (let i = 0, arri = electricity.length; i < arri; ++i) {
        for (
          let j = 0, arrj = this.preventbill.electunit.length;
          j < arrj;
          ++j
        ) {
          if (electricity[i]._id === this.preventbill.electunit[j]._id) {
            for (
              let k = 0, arrk = this.billselect.electunit.length;
              k < arrk;
              ++k
            ) {
              if (
                this.preventbill.electunit[j]._id ===
                this.billselect.electunit[k]._id
              ) {
                let data = {
                  name: electricity[i].electname,
                  unit:
                    this.billselect.electunit[k].value -
                    this.preventbill.electunit[j].value,
                  ppunit: electricity[i].electppunit,
                  total:
                    (this.billselect.electunit[k].value -
                      this.preventbill.electunit[j].value) *
                    electricity[i].electppunit
                };
                this.sumelectprice = this.sumelectprice + data.total;
                this.electcalcurate = [...this.electcalcurate, data];
                break;
              }
            }
            break;
          }
        }
      }

      for (let i = 0, arri = water.length; i < arri; ++i) {
        for (
          let j = 0, arrj = this.preventbill.waterunit.length;
          j < arrj;
          ++j
        ) {
          if (water[i]._id === this.preventbill.waterunit[j]._id) {
            for (
              let k = 0, arrk = this.billselect.waterunit.length;
              k < arrk;
              ++k
            ) {
              if (
                this.preventbill.waterunit[j]._id ===
                this.billselect.waterunit[k]._id
              ) {
                let data = {
                  name: water[i].watername,
                  unit:
                    this.billselect.waterunit[k].value -
                    this.preventbill.waterunit[j].value,
                  ppunit: water[i].waterppunit,
                  total:
                    (this.billselect.waterunit[k].value -
                      this.preventbill.waterunit[j].value) *
                    water[i].waterppunit
                };
                this.sumwaterprice = this.sumwaterprice + data.total;
                this.watercalculate = [...this.watercalculate, data];
                break;
              }
            }
            break;
          }
        }
      }

      this.rental = this.contractselect.rent;
      this.totalallprice =
        parseFloat(this.contractselect.rent) +
        this.sumelectprice +
        this.sumwaterprice +
        this.mulct;
    },
    setBill() {
      let contractid = this.contractselect._id;
      let billlistall = [];
      for (let i = 0, arri = this.bill.length; i < arri; ++i) {
        if (
          this.bill[i].contract[0] === contractid &&
          (this.bill[i].billstatus === "notpaid" ||
            this.bill[i].billstatus === "installment")
        ) {
          this.billlist = [...this.billlist, this.bill[i]];
        }
        if (
          this.bill[i].contract[0] === contractid &&
          this.bill[i].billstatus === "paid"
        ) {
          billlistall = [...billlistall, this.bill[i]];
        }
      }
      this.preventbill = billlistall[billlistall.length - 1];
      let date = new Date();
      let period = `${date.getFullYear()}-${date.getMonth()}`
      if(period === this.preventbill.period){
        this.paid = true;
        this.indexmonth = date.getMonth();
      }
    },
    handlePaid() {
      let billdata = {
        ...this.billselect,
        billstatus: "paid"
      };
      this.$store.dispatch("updateBillStatusPaid", billdata);
      this.$router.push({path: '/tenant'});
    },
    handleResConfirm(result) {
      result ? this.handlePaid() : (this.confirm = false);
      this.confirm = false;
    },
    resetData() {
      this.electcalcurate = [];
      this.watercalculate = [];
      this.swaterprice = [];
      this.selectprice = [];
      this.selectunit = [];
      this.swaterunit = [];
      this.billlist = [];
      this.contractselect = {};
      this.preventbill = {};
      this.billselect = {};
      this.period = "period";
      this.sumelectprice = 0;
      this.sumwaterprice = 0;
      this.totalallprice = 0;
      this.indexmonth = 12;
      this.rental = 0;
      this.mulct = 0;
      this.notuseelect = false;
      this.notusewater = false;
      this.ctselected = false;
      this.blselected = false;
      this.notuse = false;
      this.ready = false;
      this.paid = false;
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

.divider-dash {
  border-style: dashed;
}
</style>