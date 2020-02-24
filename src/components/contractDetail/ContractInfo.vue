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
          <v-col cols="12">
            <v-select
              v-model="tenantselected"
              :items="tenantitems"
              label="เลือกผู้เช่า"
              color="light-blue darken-2"
              :disabled="disabled.tenant"
              ref="tenant"
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
        inited: false
      }
    };
  },
  mounted() {
    this.$store.dispatch("getAllTenant");
  },
  updated() {
    if (!this.inited) {
      this.initialForm();
    }
  },
  methods: {
    initialForm() {
      this.tenant = this.$store.getters.tenant;
      for (let i = 0, arri = this.tenant.length; i < arri; ++i) {
        this.tenantitems = [
          ...this.tenantitems,
          `${this.tenant[i].firstname}-${this.tenant[i].lastname}`
        ];
      }
      let { tenant} = this.contractinfo;
      this.tenantselected =
        tenant.length !== 0
          ? `${tenant[0].firstname}-${tenant[0].lastname}`
          : "";
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
      let newdeposit = parseFloat(this.contract_update.deposit);
      let newrent = parseFloat(this.contract_update.rent);
      this.contract_update = {
        ...this.contract_update,
        deposit: newdeposit,
        rent: newrent,
        tenant: newtenant
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