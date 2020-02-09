<template>
  <div id="personalinfo">
    <v-form v-if="contract">
      <v-container class="cn" v-animate-css="'fadeIn'">
        <v-row>
          <v-col cols="6" offset="6" class="d-flex justify-end">
            <v-switch
              v-model="contract.ctstatus"
              color="green accent-4"
              :label="`สถานะเช่า ${contract.ctstatus}`"
              disabled
            ></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <p class="font-weight-bold text-center">รายละเอียดสัญญาเช่าที่ดิน</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field v-model="contract.name" label="ชื่อสัญญาเช่า" disabled></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="contract.duration" label="ระยะเวลาเช่า (ปี)" disabled></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="contract.detail" label="รายละเอียดการเช่า" disabled></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field v-model="contract.start" label="วันเริ่มสัญญา" disabled></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="contract.end" label="วันสินสุดสัญญา" disabled></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field v-model="contract.deposit" label="ค่ามัดจำ" disabled></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="contract.rent" label="ค่าเช่า" disabled></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12 text-right">
            <v-btn color="green accent-4">
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
export default {
  name: "Contract",
  props: ["contract"],
  mounted() {
    console.log(this.contract);
  },
};
</script>

<style scoped>
.cn {
  /* background-color: orange; */
  margin-top: 16px;
  border-radius: 16px;
  border-width: 2px;
  /* border-color: red; */
  border-style: solid;
  box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.2),
    0 6px 20px 0 rgba(255, 255, 255, 0.19);
}
</style>