<template>
  <v-card v-animate-css="'fadeIn'">
    <v-card-title>
      <v-btn rounded color="primary" dark @click="handleAdd()">
        <v-icon>mdi-plus-circle</v-icon>กำหนดใบเสร็จเริ่มต้นผู้เช่าใหม่
      </v-btn>
      <v-spacer></v-spacer>
      <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
    </v-card-title>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="bill"
      :search="search"
      @click:row="handleSelect"
      v-if="bill"
    >
      <v-alert
        slot="no-results"
        :value="true"
        color="error"
        icon="warning"
      >ไม่พบ "{{ search }}" ในรายการใบเสร็จ</v-alert>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "BillTable",
  props: ["bill"],
  data() {
    return {
      selected: [],
      search: "",
      headers: [
        { text: "รอบใบเสร็จ", value: "period" },
        { text: "ชื่อผู้เช่า", value: "tenant[0].firstname" },
        { text: "นามสกุลผู้เช่า", value: "tenant[0].lastname" },
        { text: "ชื่อเล่นผู้เช่า", value: "tenant[0].nickname" },
        { text: "ค่าเช่า", value: "rent" },
        { text: "ค่าไฟฟ้า", value: "electprice" },
        { text: "ค่าน้ำประปา", value: "waterprice" },
        { text: "ค่าปรับ", value: "mulct" },
        { text: "ราคารวมจ่าย", value: "totalprice" },
        { text: "จ่ายแล้ว", value: "paid" },
        { text: "สถานะของใบเสร็จ", value: "billstatus" }
      ]
    };
  },
  methods: {
    handleSelect(data) {
      // this.$router.push({ path: `/bill/${data._id}` });
      console.log(data);
      alert('this feature is comming soon!')
    },
    handleAdd(){
      this.$emit("handleAdd");
    }
  }
};
</script>

<style>
</style>