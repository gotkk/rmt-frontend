<template>
  <v-data-table :headers="headers" :items="desserts" :items-per-page="10" class="elevation-1"></v-data-table>
</template>

<script>
export default {
  name: "Tntable",
  data() {
    return {
      headers: [
        {
          text: "ชื่อ",
          align: "left",
          // sortable: false,
          value: "fname"
        },
        { text: "นามสกุล", value: "lname" },
        { text: "ชื่อเล่น", value: "nickname"},
        { text: "เบอร์โทร", value: "tel" },
        { text: "ค่าเช่าเดือนนี้", value: "status" }
      ],
      desserts: [
        {
          fname: "Frozen",
          lname: "Yogurt",
          tel: "081-3339746",
          nickname: "a",
          status: "จ่ายแล้ว"
        },
        {
          fname: "Ice cream",
          lname: "sandwich",
          tel: "081-7779548",
          nickname: "b",
          status: "ยังไม่จ่าย"
        }
      ]
    };
  }
};
</script>

<style>
</style>