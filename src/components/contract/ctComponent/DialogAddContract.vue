<template>
  <div id="dialogaddtn">
    <DialogConfirm
      :confirm="confirm"
      @colseConfirm="handleResConfirm"
      :title="c_title"
      :text="c_txt"
    />
    <v-dialog v-model="add" persistent max-width="1080px">
      <v-card>
        <v-card-title>
          <span class="headline">เพิ่มสัญญาเช่า</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="4">
                <v-text-field
                  v-model="contractform.name"
                  label="ชื่อสัญญาเช่า"
                  :rules="datarule"
                  ref="name"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="contractform.deposit"
                  label="ค่ามัดจำ"
                  :rules="datarule"
                  type="number"
                  ref="deposit"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="contractform.rent"
                  label="ค่าเช่า"
                  :rules="datarule"
                  type="number"
                  ref="rent"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="contractform.detail"
                  label="รายละเอียดการเช่า"
                  :rules="datarule"
                  ref="detail"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-dialog
                  ref="startdialog"
                  v-model="startmodal"
                  :return-value.sync="startdate"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="startdate"
                      label="เลือกวันเริ่มสัญญาเช่า"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="startdate" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="$refs.startdialog.save(startdate)">OK</v-btn>
                    <v-btn text color="primary" @click="startmodal = false">Cancel</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
              <v-col cols="4">
                <v-dialog
                  ref="enddialog"
                  v-model="endmodal"
                  :return-value.sync="enddate"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="enddate"
                      label="เลือกวันหมดสัญญาเช่า"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="enddate" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="$refs.enddialog.save(enddate)">OK</v-btn>
                    <v-btn text color="primary" @click="endmodal = false">Cancel</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
              <v-col cols="4">
                <v-switch
                  v-model="contractstatus"
                  :label="`สถานะการเช่า: ${contractstatus.toString()}`"
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
  name: "DialogAddContract",
  components: {
    DialogConfirm
  },
  props: ["add"],
  data() {
    return {
      c_title: "ต้องการเพิ่มข้อมูลสัญญาเช่าหรือไม่",
      c_txt: "นี่เป็นบันทึกข้อมูลสัญญาเช่า เมื่อเพิ่มแล้วจะไม่สามารถลบได้",
      datarule: [value => !!value || "กรุณากรอกข้อมูล"],
      contractform: {},
      data_add: {},
      tenantselected: "",
      tenantitems: [],
      tenant: [],
      confirm: false,
      contractstatus: false,
      startdate: new Date().toISOString().substr(0, 10),
      startmodal: false,
      enddate: new Date().toISOString().substr(0, 10),
      endmodal: false,
      inited: false
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
      this.inited = true;
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
    preSubmitAdd() {
      let newtenant = this.tenantselected ? this.getIdFromNameofTenant() : [];
      let newdeposit = parseFloat(this.contractform.deposit);
      let newrent = parseFloat(this.contractform.rent);
      let data_add = {
        ctstatus: this.contractstatus,
        ...this.contractform,
        deposit: newdeposit,
        rent: newrent,
        start: this.startdate,
        end: this.enddate,
        tenant: newtenant,
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
      this.$store.dispatch("createContract", this.data_add);
      this.confirm = false;
      this.handleCloseDialog();
    },
    handleCloseDialog() {
      this.contractform = {};
      this.tenantselected = "";
      this.contractstatus = false;
      this.$emit("colseAdd");
    }
  }
};
</script>

<style>
</style>