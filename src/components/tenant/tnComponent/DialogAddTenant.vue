<template>
  <div id="dialogaddtn">
    <DialogConfirm
      :confirm="confirm"
      @colseConfirm="handleResConfirm"
      :title="c_title"
      :text="c_txt"
    />
    <v-dialog v-model="add" persistent max-width="600px">
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
                  label="ชื่อ"
                  :rules="datarule"
                  ref="fname"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="personalform.lastname"
                  label="นามสกุล"
                  :rules="datarule"
                  ref="lname"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="personalform.nickname"
                  label="ชื่อเล่น"
                  :rules="datarule"
                  ref="nname"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="personalform.tel"
                  label="เบอร์โทร"
                  :rules="datarule"
                  ref="tel"
                ></v-text-field>
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
  name: "DialogAddTenant",
  components: {
    DialogConfirm
  },
  props: ["add"],
  data() {
    return {
      c_title: "ต้องการเพิ่มข้อมูลผู้เช่าหรือไม่",
      c_txt: "นี่เป็นบันทึกข้อมูลผู้เช่า เมื่อเพิ่มแล้วจะไม่สามารถลบได้",
      datarule: [value => !!value || "กรุณากรอกข้อมูล"],
      personalform: {},
      data_add: {},
      confirm: false,
    };
  },
  mounted() {
  },
  updated() {
  },
  methods: {
    validateData(data) {
      if (!data.firstname) {
        this.$refs["fname"].focus();
        return false;
      } else if (!data.lastname) {
        this.$refs["lname"].focus();
        return false;
      } else if (!data.nickname) {
        this.$refs["nname"].focus();
        return false;
      } else if (!data.tel) {
        this.$refs["tel"].focus();
        return false;
      } else {
        return true;
      }
    },
    preSubmitAdd() {
      let newtel =
        this.personalform.tel &&
        this.personalform.tel
          .toString()
          .split(",")
          .map(item => item.trim());
      let data_add = {
        ...this.personalform,
        tel: newtel
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
      this.$store.dispatch("createTenant", this.data_add);
      this.confirm = false;
      this.handleCloseDialog();
    },
    handleCloseDialog() {
      this.personalform= {}
      this.$emit("colseAdd");
    }
  }
};
</script>

<style>
</style>