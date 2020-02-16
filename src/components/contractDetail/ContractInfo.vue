<template>
  <div id="contractinfo">
    <DialogConfirm
      :confirm="confirm"
      @colseConfirm="handleResConfirm"
      :title="c_title"
      :text="c_txt"
    />
    <DialogConfirm
      :confirm="confirm2"
      @colseConfirm="handleResConfirm2"
      :title="c_title2"
      :text="c_txt2"
    />
    <v-form v-if="contractinfo">
      <v-container class="block-cn" v-animate-css="'fadeIn'">
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model="contract_update.name"
              label="ชื่อสัญญาเช่า"
              :disabled="disabled.name"
              ref="name"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="contract_update.deposit"
              label="ค่ามัดจำ"
              :disabled="disabled.deposit"
              type="number"
              ref="deposit"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="contract_update.rent"
              label="ค่าเช่า"
              :disabled="disabled.rent"
              type="number"
              ref="rent"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="contract_update.detail"
              :disabled="disabled.detail"
              label="รายละเอียดการเช่า"
              ref="detail"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-dialog
              ref="startdialog"
              v-model="startmodal"
              :return-value.sync="contract_update.start"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="contract_update.start"
                  label="เลือกวันเริ่มสัญญาเช่า"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                  :disabled="disabled.start"
                  ref="start"
                ></v-text-field>
              </template>
              <v-date-picker v-model="contract_update.start" scrollable>
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.startdialog.save(contract_update.start)"
                >OK</v-btn>
                <v-btn text color="primary" @click="startmodal = false">Cancel</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
          <v-col cols="4">
            <v-dialog
              ref="enddialog"
              v-model="endmodal"
              :return-value.sync="contract_update.end"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="contract_update.end"
                  label="เลือกวันหมดสัญญาเช่า"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                  :disabled="disabled.end"
                  ref="end"
                ></v-text-field>
              </template>
              <v-date-picker v-model="contract_update.end" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="$refs.enddialog.save(contract_update.end)">OK</v-btn>
                <v-btn text color="primary" @click="endmodal = false">Cancel</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
          <v-col cols="4">
            <v-switch
              v-model="contract_update.ctstatus"
              :label="`สถานะการเช่า: ${contract_update.ctstatus}`"
              :disabled="disabled.status"
              ref="status"
            ></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-select
              v-model="tenantselected"
              :items="tenantitems"
              label="เลือกผู้เช่า"
              color="light-blue darken-2"
              :disabled="disabled.tenant"
              ref="tenant"
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="landselected"
              :items="landitems"
              label="เลือกที่ดิน"
              color="light-blue darken-2"
              :disabled="disabled.land"
              ref="land"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-select
              v-model="electselected"
              :items="electitems"
              multiple
              label="เลือกหม้อไฟฟ้า"
              color="light-blue darken-2"
              :disabled="disabled.elect"
              ref="elect"
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="waterselected"
              :items="wateritems"
              multiple
              label="เลือกหม้อน้ำประปา"
              color="light-blue darken-2"
              :disabled="disabled.water"
              ref="water"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12 text-right">
            <v-btn color="green accent-4" @click="preSubmitUpdate()" v-if="updating">
              <v-icon>mdi-pencil-circle-outline</v-icon>
              <span>บันทึก</span>
            </v-btn>
            <v-btn color="green accent-4" @click="confirm = true" v-else>
              <v-icon>mdi-pencil-circle-outline</v-icon>
              <span>แก้ไข</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import DialogConfirm from "../tenantDetail/tdComponent/DialogConfirm";
export default {
  name: "ContractInfo",
  props: ["contractinfo"],
  components: {
    DialogConfirm
  },
  data() {
    return {
      contract_update: {},
      tenantselected: "",
      tenantitems: [],
      tenant: [],
      landselected: "",
      landitems: [],
      land: [],
      electselected: [],
      electitems: [],
      elect: [],
      waterselected: [],
      wateritems: [],
      water: [],
      startdate: new Date().toISOString().substr(0, 10),
      startmodal: false,
      enddate: new Date().toISOString().substr(0, 10),
      endmodal: false,
      updating: false,
      confirm: false,
      c_title: "ต้องการแก้ไขข้อมูลสัญญา",
      c_txt: "แก้ไขสัญญาฉบับนี้",
      confirm2: false,
      c_title2: "ต้องการบันทึกข้อมูลสัญญา",
      c_txt2: "บันทึกข้อมูลการแก้ไขสัญญา",
      disabled: {
        name: true,
        deposit: true,
        rent: true,
        detail: true,
        start: true,
        end: true,
        status: true,
        tenant: true,
        land: true,
        elect: true,
        water: true,
        inited: false
      }
    };
  },
  mounted() {
    this.$store.dispatch("getAllTenant");
    this.$store.dispatch("getAllLand");
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
      this.tenant = this.$store.getters.tenant;
      this.land = this.$store.getters.land;
      this.elect = this.$store.getters.electricity;
      this.water = this.$store.getters.water;
      for (let i = 0, arri = this.tenant.length; i < arri; ++i) {
        this.tenantitems = [
          ...this.tenantitems,
          `${this.tenant[i].firstname}-${this.tenant[i].lastname}`
        ];
      }
      for (let i = 0, arri = this.land.length; i < arri; ++i) {
        this.landitems = [...this.landitems, this.land[i].landname];
      }
      for (let i = 0, arri = this.elect.length; i < arri; ++i) {
        this.electitems = [...this.electitems, this.elect[i].electname];
      }
      for (let i = 0, arri = this.water.length; i < arri; ++i) {
        this.wateritems = [...this.wateritems, this.water[i].watername];
      }
      let { tenant, land, electricity, water } = this.contractinfo;
      this.tenantselected =
        tenant.length !== 0
          ? `${tenant[0].firstname}-${tenant[0].lastname}`
          : "";
      this.landselected = land.length !== 0 ? land[0].landname : "";
      for (let i = 0, arri = electricity.length; i < arri; ++i) {
        this.electselected = [...this.electselected, electricity[i].electname];
      }
      for (let i = 0, arri = water.length; i < arri; ++i) {
        this.waterselected = [...this.waterselected, water[i].watername];
      }
      this.contract_update = { ...this.contractinfo };
      this.inited = true;
    },
    handleEditContract() {
      for (let prop in this.disabled) {
        this.disabled[prop] = false;
      }
      this.updating = true;
    },
    handleUpdateContract() {
      for (let prop in this.disabled) {
        this.disabled[prop] = true;
      }
      this.updating = false;
    },
    handleResConfirm(result) {
      result ? this.handleEditContract() : null;
      this.confirm = false;
    },
    handleResConfirm2(result) {
      result ? this.handleSubmitUpdate() : (this.confirm2 = false);
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
      if (!data.name) {
        this.$refs["name"].focus();
        return false;
      } else if (!data.deposit) {
        this.$refs["deposit"].focus();
        return false;
      } else if (!data.rent) {
        this.$refs["rent"].focus();
        return false;
      } else if (!data.detail) {
        this.$refs["detail"].focus();
        return false;
      } else {
        return true;
      }
    },
    preSubmitUpdate() {
      let newtenant = this.tenantselected ? this.getIdFromNameofTenant() : [];
      let newland = this.getIdFromNameofLand();
      let newelect = this.getIdFromNameofElectricity();
      let newwater = this.getIdFromNameofWater();
      let newdeposit = parseFloat(this.contract_update.deposit);
      let newrent = parseFloat(this.contract_update.rent);
      this.contract_update = {
        ...this.contract_update,
        deposit: newdeposit,
        rent: newrent,
        tenant: newtenant,
        land: newland,
        electricity: newelect,
        water: newwater
      };
      this.validateData(this.contract_update)
        ? (this.confirm2 = true)
        : alert("กรุณากรอข้อมูลให้ครบถ้วน");
    },
    handleSubmitUpdate() {
      this.$store.dispatch("updateContract", this.contract_update);
      this.confirm2 = false;
      this.$router.push({ path: "/contract" });
    }
  }
};
</script>

<style scoped>
</style>