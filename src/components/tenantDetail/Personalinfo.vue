<template>
  <div id="personalinfo">
    <DialogUpdateTenant
      @setResultUpdate="handleCloseOnUpdate"
      :dialogtenant="dialogtenant"
      :personinfo="personinfo"
    />
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
    <v-form v-if="personinfo">
      <v-container class="block-cn" v-animate-css="'fadeIn'">
        <v-row>
          <v-col cols="12">
            <p class="font-weight-bold text-center">รายละเอียดผู้เช่า</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="personalform.firstname"
              label="Firstname"
              :disabled="disabled.fname"
              ref="fname"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="personalform.lastname"
              label="Lastname"
              :disabled="disabled.lname"
              ref="lname"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="personalform.nickname"
              label="Nickname"
              :disabled="disabled.nname"
              ref="nname"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="personalform.tel"
              label="Telephone"
              :disabled="disabled.tel"
              ref="tel"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12 text-right">
            <v-btn color="green accent-4" @click="preSubmitUpdate()" v-if="updating">
              <v-icon>mdi-pencil-circle-outline</v-icon>
              <span>บันทึก</span>
            </v-btn>
            <v-btn color="green accent-4" @click="confirm=true" v-else>
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
import DialogUpdateTenant from "./tdComponent/DialogUpdateTenant";
import DialogConfirm from "../tenantDetail/tdComponent/DialogConfirm";
export default {
  name: "Personalinfo",
  props: ["personinfo", "tid"],
  data() {
    return {
      data_update: {},
      personalform: {},
      dialogtenant: false,
      initial: false,
      updating: false,
      confirm: false,
      c_title: "ต้องการแก้ไขข้อมูลไฟฟ้า",
      c_txt: "แก้ไขข้อมูลไฟฟ้า",
      confirm2: false,
      c_title2: "ต้องการบันทึกข้อมูลไฟฟ้า",
      c_txt2: "บันทึกข้อมูลการแก้ไขไฟฟ้า",
      disabled: {
        fname: true,
        lname: true,
        nname: true,
        tel: true
      }
    };
  },
  components: {
    DialogUpdateTenant,
    DialogConfirm
  },
  mounted() {
    console.log(this.personinfo);
  },
  updated() {
    if (!this.initial) {
      this.$store.dispatch("getBillByTenantId", this.personinfo._id);
      this.$store.dispatch("getContractByTenantId", this.personinfo._id);
      this.personalform = { ...this.personinfo };
      this.initial = true;
    }
  },
  methods: {
    handleCloseOnUpdate() {
      this.dialogtenant = false;
    },
    handleEditTenant() {
      for (let prop in this.disabled) {
        this.disabled[prop] = false;
      }
      this.updating = true;
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
      } else {
        return true;
      }
    },
    checkConfirm(data) {
      this.data_update = data;
      this.confirm2 = true;
    },
    preSubmitUpdate() {
      let data_update = {
        ...this.personalform,
        tel: this.personalform.tel.toString().split(",")
      };
      this.validateData(data_update)
        ? this.checkConfirm(data_update)
        : alert("กรุณากรอข้อมูลให้ครบถ้วน");
    },
    handleSubmitUpdate() {
      this.$store.dispatch("updateTenant", this.data_update);
      this.$router.push({ path: "/tenant" });
    },
    handleResConfirm(result) {
      result ? this.handleEditTenant() : null;
      this.confirm = false;
    },
    handleResConfirm2(result) {
      result ? this.handleSubmitUpdate() : (this.confirm2 = false);
    }
  }
};
</script>

<style scoped>
</style>