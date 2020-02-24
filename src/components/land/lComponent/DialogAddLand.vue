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
          <span class="headline">เพิ่มที่ดิน</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="landform.landname"
                  label="ชื่อที่ดิน"
                  :rules="datarule"
                  ref="lname"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="landform.landarea"
                  label="ขนาดพื้นที่"
                  :rules="datarule"
                  ref="larea"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-switch
                  v-model="landstatus"
                  :label="`สถานะการเช่าที่ดิน: ${landstatus.toString()}`"
                ></v-switch>
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
  name: "DialogAddLand",
  components: {
    DialogConfirm
  },
  props: ["add"],
  data() {
    return {
      c_title: "ต้องการเพิ่มข้อมูลที่ดินหรือไม่",
      c_txt: "นี่เป็นบันทึกข้อมูลที่ดิน เมื่อเพิ่มแล้วจะไม่สามารถลบได้",
      datarule: [value => !!value || "กรุณากรอกข้อมูล"],
      landform: {},
      data_add: {},
      confirm: false,
      landstatus: false
    };
  },
  mounted() {

  },
  updated() {

  },
  methods: {
    validateData(data) {
      if (!data.landname) {
        this.$refs["lname"].focus();
        return false;
      } else if (!data.landarea) {
        this.$refs["larea"].focus();
        return false;
      } else {
        return true;
      }
    },
    preSubmitAdd() {
      let data_add = {
        landstatus: this.landstatus,
        ...this.landform,
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
      this.$store.dispatch("createLand", this.data_add);
      this.confirm = false;
      this.handleCloseDialog();
    },
    handleCloseDialog() {
      this.landform ={},
      this.landstatus = false;
      this.$emit("colseAdd");
    }
  }
};
</script>

<style>
</style>