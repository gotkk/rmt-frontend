<template>
  <div id="landinfo">
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
    <v-form v-if="landinfo">
      <v-container class="block-cn" v-animate-css="'fadeIn'">
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model="land_update.landname"
              label="ชื่อที่ดิน"
              :disabled="disabled.name"
              ref="name"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="land_update.landarea"
              label="พื้นที่"
              :disabled="disabled.area"
              ref="deposit"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-switch
              v-model="land_update.landstatus"
              :label="`สถานะการใช้งานที่ดิน: ${land_update.landstatus}`"
              :disabled="disabled.status"
              ref="status"
            ></v-switch>
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
  name: "LandInfo",
  props: ["landinfo"],
  components: {
    DialogConfirm
  },
  data() {
    return {
      land_update: {},
      updating: false,
      confirm: false,
      c_title: "ต้องการแก้ไขข้อมูลที่ดิน",
      c_txt: "แก้ไขข้อมูลที่ดิน",
      confirm2: false,
      c_title2: "ต้องการบันทึกข้อมูลที่ดิน",
      c_txt2: "บันทึกข้อมูลการแก้ไขที่ดิน",
      disabled: {
        name: true,
        area: true,
        status: true,
      },
      inited: false
    };
  },
  mounted() {
  },
  updated() {
    if (!this.inited) {
      this.initialForm();
    }
  },
  methods: {
    handleCloseOnUpdate() {
      this.dialogtenant = false;
    },
    initialForm() {
      this.land_update = { ...this.landinfo };
      this.inited = true;
    },
    handleEditLand() {
      for (let prop in this.disabled) {
        this.disabled[prop] = false;
      }
      this.updating = true;
    },
    handleResConfirm(result) {
      result ? this.handleEditLand() : null;
      this.confirm = false;
    },
    handleResConfirm2(result) {
      result ? this.handleSubmitUpdate() : (this.confirm2 = false);
    },
    validateData(data) {
      if (!data.landname) {
        this.$refs["name"].focus();
        return false;
      } else if (!data.landarea) {
        this.$refs["area"].focus();
        return false;
      } else {
        return true;
      }
    },
    preSubmitUpdate() {
      this.land_update = {
        ...this.land_update
      };
      this.validateData(this.land_update)
        ? (this.confirm2 = true)
        : alert("กรุณากรอข้อมูลให้ครบถ้วน");
    },
    handleSubmitUpdate() {
      this.$store.dispatch("updateLand", this.land_update);
      this.confirm2 = false;
      this.$router.push({ path: "/land" });
    }
  }
};
</script>

<style scoped>
</style>