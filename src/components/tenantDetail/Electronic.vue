<template>
  <div>
    <v-container class="cn">
      <v-row>
        <v-col cols="12">
          <p class="txt18 text-center">ไฟฟ้า</p>
        </v-col>
      </v-row>

      <v-row v-if="false">
        <v-col cols="12">
          <p class="text-center">ไม่ได้ใช้ไฟฟ้า</p>
        </v-col>
      </v-row>

      <v-row v-if="false">
        <v-col cols="12">
          <p class="text-center">บันทึกข้อมูลแล้ว</p>
        </v-col>
      </v-row>

      <v-row v-else>
        <v-col cols="6">
          <div class="period">
            <span class="txt18">{{mount}}</span>
          </div>
        </v-col>
        <v-col cols="6">
          <v-select v-model="elec" :items="items" clearable label="เลือกหม้อไฟฟ้า" color="amber darken-3"></v-select>
        </v-col>
      </v-row>

      <v-form v-if="true">
        <v-row>
          <v-col cols="4" offset="3">
            <v-text-field
              v-model="unitelec"
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
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Electronic",
  data() {
    return {
      unitelec: "",
      elec: "",
      mount: "มีนาคม 2563",
      items: ["default", "vertical"]
    };
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