<template>
  <div>
    <v-container class="cn" v-animate-css="'fadeIn'">
      <v-row>
        <v-col cols="12">
          <p class="txt18 text-center">รายละเอียดการเช่า</p>
        </v-col>
      </v-row>

      <v-row v-if="false">
        <v-col cols="12">
          <p class="text-center">ชำระค่าเช่าเดือนนี้เรียบร้อยแล้ว</p>
        </v-col>
      </v-row>

      <v-row v-else>
        <v-col cols="6">
          <div class="period">
            <span class="txt18">{{mount}}</span>
          </div>
        </v-col>
        <v-col cols="6">
          <v-select :v-model="srent" :items="items" clearable label="เลือกสถานะค่าเช่า" color="light-blue darken-2"></v-select>
        </v-col>
      </v-row>

      <v-form v-if="true">
        <v-row>
          <v-col cols="2" offset="5">
            <v-btn color="light-blue darken-2" block class="ebtn">
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
  name: "RentDetail",
  data() {
    return {
      unitwt: "",
      srent: "",
      mount: "มีนาคม 2563",
      items: ["default", "vertical"]
    };
  }
};
</script>

<style scoped>

.ebtn{
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
  border-color: #0288D1;
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