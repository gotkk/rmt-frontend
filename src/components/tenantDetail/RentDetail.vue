<template>
  <div>
    <SelectContract :contract="contract" @setContractSelect="handleSelectContract" />

    <v-container class="block-cn" v-animate-css="'fadeIn'" v-if="selected">
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
          <p class="text-right">{{period}}</p>
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
            <v-btn>ชำระค่าเช่า</v-btn>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import SelectContract from "./tdComponent/SelectContract";

export default {
  name: "RentDetail",
  props: ["bill", "contract", "tenant"],
  components: {
    SelectContract
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
      contractselect: {},
      billselect: {},
      paid: false,
      ready: false,
      selected: false,
      notuse: false,
      notuseelect: false,
      notusewater: false,
      period: "period",
      selectunit: [],
      swaterunit: [],
      selectprice: [],
      swaterprice: [],
      srental: 0,
      smulct: 0,
      stotal: 0,
      electcalcurate: [],
      watercalculate: [],
      sumelectprice: 0,
      sumwaterprice: 0,
      totalallprice: 0,
      rental: 0,
      mulct: 0
    };
  },
  mounted() {},
  updated() {},
  methods: {
    checkPeriod() {
      let { billstatus } = this.billselect;
      if (billstatus === "paid") {
        this.paid = true;
      }
    },
    checkReady() {
      let {
        month: bmonth,
        year: byear,
        electunit,
        waterunit
      } = this.billselect;
      let { electricity, water } = this.contractselect;
      let date = new Date();
      let mindex = date.getMonth();
      let month = this.month[mindex];
      let year = date.getFullYear();
      let eready = false;
      let wready = false;
      this.period = month + " " + year;
      if (mindex === bmonth && year === byear) {
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
        this.checkPeriod();
      }
      if (!this.paid) {
        this.checkReady();
      }
      if (this.ready) {
        this.calculateTotalRent();
      }
    },
    calculateTotalRent() {
      for (
        let i = 0, arri = this.contractselect.electricity.length;
        i < arri;
        ++i
      ) {
        let data = {
          name: this.contractselect.electricity[i].electname,
          unit: this.billselect.electunit[i].value,
          ppunit: this.contractselect.electricity[i].electppunit,
          total:
            this.billselect.electunit[i].value *
            this.contractselect.electricity[i].electppunit
        };
        this.sumelectprice = this.sumelectprice + data.total;
        this.electcalcurate = [...this.electcalcurate, data];
      }
      for (let i = 0, arri = this.contractselect.water.length; i < arri; ++i) {
        let data = {
          name: this.contractselect.water[i].watername,
          unit: this.billselect.waterunit[i].value,
          ppunit: this.contractselect.water[i].waterppunit,
          total:
            this.billselect.waterunit[i].value *
            this.contractselect.water[i].waterppunit
        };
        this.sumwaterprice = this.sumwaterprice + data.total;
        this.watercalculate = [...this.watercalculate, data];
      }
      this.rental = this.contractselect.rent;
      this.totalallprice = parseFloat(this.contractselect.rent) + this.sumelectprice + this.sumwaterprice + this.mulct;
    },
    setBillSelect() {
      let contractid = this.contractselect._id;
      for (let i = 0, arri = this.bill.length; i < arri; ++i) {
        if (this.bill[i].contract === contractid) {
          this.billselect = this.bill[i];
          break;
        }
      }
    },
    resetData() {
      this.electcalcurate = [];
      this.watercalculate = [];
      this.swaterprice = [];
      this.selectprice = [];
      this.selectunit = [];
      this.swaterunit = [];
      this.contractselect = {};
      this.billselect = {};
      this.period = "period";
      this.sumelectprice = 0;
      this.sumwaterprice = 0;
      this.totalallprice = 0;
      this.srental = 0;
      this.smulct = 0;
      this.stotal = 0;
      this.rental = 0;
      this.mulct = 0;
      this.notuseelect = false;
      this.notusewater = false;
      this.selected = false;
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