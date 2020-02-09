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
            <p class="text-center pt-8">ยังไม่ได้กรอกข้อมูลหน่วยไฟฟ้าหรือน้ำประปา</p>
          </v-col>
        </v-row>
      </div>

      <div v-else>
        777
        <!-- <v-row>
          <v-col>
            <p>หน่วยไฟฟ้า ({{bill.electunit[0].name}})</p>
          </v-col>
          <v-col>
            <p class="text-right">{{bill.electunit[0].value}} หน่วย</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p>ค่าไฟฟ้า ({{bill.electunit[0].name}})</p>
          </v-col>
          <v-col>
            <p
              class="text-right"
            >{{calculatePriceElect(bill.electunit[0]._id, bill.electunit[0].value)}} บาท</p>
          </v-col>
        </v-row> -->

        <!-- <v-row>
          <v-col>
            <p>หน่วยน้ำ ({{bill.waterunit[0].name}})</p>
          </v-col>
          <v-col>
            <p class="text-right">{{bill.waterunit[0].value}} หน่วย</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p>ค่าน้ำ ({{bill.waterunit[0].name}})</p>
          </v-col>
          <v-col>
            <p
              class="text-right"
            >{{calculatePriceWater(bill.waterunit[0]._id, bill.waterunit[0].value)}} บาท</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p>ค่าเช่า</p>
          </v-col>
          <v-col>
            <p class="text-right">{{contract.rent}} บาท</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p>ค่าปรับ</p>
          </v-col>
          <v-col>
            <p class="text-right">999 บาท</p>
          </v-col>
        </v-row>
        <hr />
        <v-row>
          <v-col>
            <p>ยอดรวมที่ต้องจ่ายทั้งสิ้น</p>
          </v-col>
          <v-col>
            <p class="text-right">999 บาท</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col centered>
            <v-btn>ชำระค่าเช่า</v-btn>
          </v-col>
        </v-row> -->
      </div>
    </v-container>
  </div>
</template>

<script>
import SelectContract from "./tdComponent/SelectContract";

export default {
  name: "RentDetail",
  props: ["bill", "contract"],
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
      paid: false,
      ready: false,
      selected: false,
      period: "period",
      selectunit: [],
      swaterunit: [],
      selectprice: [],
      swaterprice: [],
      srental: 0,
      smulct: 0,
      stotal: 0
    };
  },
  mounted() {},
  methods: {
    checkPeriod() {
      let {
        month: bmonth,
        year: byear,
        electunit,
        waterunit,
        billstatus
      } = this.bill;
      if (billstatus === "paid") {
        this.paid = true;
      }
      let date = new Date();
      let mindex = date.getMonth();
      let month = this.month[mindex];
      let year = date.getFullYear();
      this.period = month + " " + year;
      if (mindex === bmonth && year === byear) {
        if (electunit.length > 0 && waterunit.length > 0) {
          this.ready = true;
        }
      }
    },
    calculatePriceElect(id, unit) {
      for (let i = 0, arri = this.electricity.length; i < arri; ++i) {
        if (id === this.electricity[i]._id) {
          return unit * this.electricity[i].electppunit;
        }
      }
    },
    calculatePriceWater(id, unit) {
      for (let i = 0, arri = this.water.length; i < arri; ++i) {
        if (id === this.water[i]._id) {
          return unit * this.water[i].waterppunit;
        }
      }
    },
    setRentDetailList() {},
    handleSelectContract(value) {
      this.resetData();
      for (let i = 0, arri = this.contract.length; i < arri; ++i) {
        if (this.contract[i].name === value) {
          this.contractselect = this.contract[i];
          this.selected = true;
          break;
        }
      }
      this.checkPeriod();
    },
    resetData() {
      this.contractselect = {};
      this.selected = false;
      this.notuse = false;
      this.paid = false;
      this.period = "period";
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