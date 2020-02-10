<template>
  <div>
    <v-container class="block-cn" v-animate-css="'fadeIn'">
      <v-row>
        <v-col>
          <p class="text-center">จัดการข้อมูลไฟฟ้าเดือนนี้</p>
        </v-col>
      </v-row>
      <SelectContract :contract="contract" @setContractSelect="handleSelectContract" v-if="!selected"/>

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

    <v-container class="block-cn" v-animate-css="'fadeIn'" v-if="selected">
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
              clearable
              label="เลือกหม้อไฟฟ้า"
              color="amber darken-3"
            ></v-select>
          </v-col>
        </v-row>

        <v-form>
          <v-row>
            <v-col cols="4" offset="3">
              <v-text-field
                v-model="unitelect"
                label="หน่วยไฟฟ้าเดือนนี้"
                required
                color="amber darken-3"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-btn color="amber darken-3" block class="ebtn">
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

export default {
  name: "Electricity",
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
      unitelect: "",
      contractselect: {},
      electitems: [],
      electselected: "",
      period: "period",
      paid: false,
      notuse: false,
      selected: false,
      billselect: {}
    };
  },
  mounted() {},
  updated() {},
  methods: {
    checkPeriod() {
      let etc = this.contractselect.electricity;
      if (etc.length === 0) {
        this.notuse = true;
      } else {
        let { month: bmonth, year: byear } = this.billselect;
        let date = new Date();
        let mindex = date.getMonth();
        let month = this.month[mindex];
        let year = date.getFullYear();
        if (mindex === bmonth && year === byear) {
          this.paid = true;
        } else {
          this.period = month + " " + year;
          for (let i = 0, arri = etc.length; i < arri; ++i) {
            this.electitems.push(etc[i].electname);
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
        this.checkPeriod();
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
      this.period = "period";
      this.electitems = [];
      this.electselected = "";
      this.unitelect = "";
      this.billselect = {};
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