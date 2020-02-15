<template>
  <v-card v-animate-css="'fadeIn'">
    <v-card-title>
      ใบเสร็จค่าเช่า
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
        { text: "รหัสใบเสร็จ", value: "_id" },
        { text: "ชื่อผู้เช่า", value: "tenant.firstname" },
        { text: "รอบใบเสร็จ", value: "month" },
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
      this.$router.push({ path: `/bill/${data._id}` });
    }
  }
};
</script>

<style>
</style>