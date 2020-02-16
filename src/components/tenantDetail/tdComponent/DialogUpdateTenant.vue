<template>
  <div>
    <DialogConfirm
      :confirm="confirm"
      @colseConfirm="handleResConfirm"
      :title="c_title"
      :text="c_txt"
    />
    <v-dialog v-model="dialogtenant" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="personalform.firstname"
                  label="Firstname"
                  :rules="datarule"
                  ref="fname"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="personalform.lastname"
                  label="Lastname"
                  :rules="datarule"
                  ref="lname"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="personalform.nickname"
                  label="Nickname"
                  :rules="datarule"
                  ref="nname"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="personalform.tel"
                  label="Telephone"
                  :rules="datarule"
                  ref="tel"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-select
                  v-model="contractselected"
                  :items="contractitems"
                  multiple
                  label="เลือกสัญญาเช่า"
                  color="light-blue darken-2"
                  :rules="contractrule"
                  ref="selectcontract"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="preSubmitUpdate()">Save</v-btn>
          <v-btn color="blue darken-1" text @click="handleCloseDialog()">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import DialogConfirm from "./DialogConfirm";
export default {
  name: "DialogUpdateTenant",
  props: ["dialogtenant", "personinfo"],
  components: {
    DialogConfirm
  },
  data() {
    return {
      contractselected: [],
      contractitems: [],
      personalform: {},
      contract: [],
      datarule: [value => !!value || "กรุณากรอกข้อมูล"],
      contractrule: [value => !!value || "กรุณาเลือกข้อมูล"],
      confirm: false,
      c_title: "ต้องการอัพเดตข้อมูลหรือไม่",
      c_txt: "นี่เป็นบันทึกข้อมูลการแก้ไขข้อมูลผู้เช่า",
      data_update: {},
      inited: false
    };
  },
  mounted() {
    this.$store.dispatch("getAllContract");
  },
  updated() {
    if (!this.inited) {
      this.initialForm();
    }
  },
  methods: {
    initialForm() {
      this.personalform = { ...this.personinfo };
          for (let i = 0, arri = this.personinfo.contract.length; i < arri; ++i) {
              this.contractselected = [
                  ...this.contractselected,
            this.personinfo.contract[i].name
          ];
        }
        for (
            let i = 0, arri = this.$store.getters.contract.length;
          i < arri;
          ++i
        ) {
            this.contractitems = [
                ...this.contractitems,
            this.$store.getters.contract[i].name
          ];
        }
      this.contract = this.$store.getters.contract;
      this.inited = true;
    },
    getIdFromNameofContract() {
      let idcontracttemp = [];
      for (let i = 0, arri = this.contractselected.length; i < arri; ++i) {
        for (let j = 0, arrj = this.contract.length; j < arrj; ++j) {
          if (this.contractselected[i] === this.contract[j].name) {
            idcontracttemp = [...idcontracttemp, this.contract[j]._id];
            break;
          }
        }
      }
      return idcontracttemp;
    },
    validateData(data) {
      if (data.firstname.length === 0) {
        this.$refs["fname"].focus();
        return false;
      } else if (data.lastname.length === 0) {
        this.$refs["lname"].focus();
        return false;
      } else if (data.nickname.length === 0) {
        this.$refs["nname"].focus();
        return false;
      } else if (data.tel.length === 0 || data.tel[0] === "") {
        this.$refs["tel"].focus();
        return false;
      } else if (data.contract.length === 0) {
        this.$refs["selectcontract"].focus();
        return false;
      } else {
        return true;
      }
    },
    preSubmitUpdate() {
      let newcontract = this.getIdFromNameofContract();
      let data_update = {
        ...this.personalform,
        contract: newcontract,
        tel: this.personalform.tel.toString().split(",")
      };
      this.validateData(data_update)
        ? this.checkConfirm(data_update)
        : alert("กรุณากรอข้อมูลให้ครบถ้วน");
    },
    checkConfirm(data) {
      this.data_update = data;
      this.confirm = true;
    },
    handleResConfirm(res) {
      res ? this.handleSubmitUpdate() : (this.confirm = false);
    },
    handleSubmitUpdate() {
      this.$store.dispatch("updateTenant", this.data_update);
      this.$router.push({ path: "/tenant" });
    },
    handleCloseDialog() {
      this.$emit("setResultUpdate");
    }
  }
};
</script>
<style>
</style>