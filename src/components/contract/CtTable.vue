<template>
  <v-card v-animate-css="'fadeIn'">
    <v-card-title>
      <v-btn rounded color="primary" dark @click="handleAdd()">
        <v-icon>mdi-plus-circle</v-icon>เพิ่มสัญญาเช่า
      </v-btn>
      <v-spacer></v-spacer>
      <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
    </v-card-title>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="contract"
      :search="search"
      @click:row="handleSelect"
      v-if="contract"
    >
      <v-alert
        slot="no-results"
        :value="true"
        color="error"
        icon="warning"
      >ไม่พบ "{{ search }}" ในรายการสัญญาเช่า</v-alert>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "CtTable",
  props: ["contract"],
  data() {
    return {
      selected: [],
      search: "",
      headers: [
        { text: "รหัสสัญญาเช่า", value: "_id" },
        { text: "ชื่อสัญญาเช่า", value: "name" },
        { text: "รายละเอียดเช่า", value: "detail" },
        { text: "ระยะเวลาเช่า", value: "duration" },
        { text: "ค่ามัดจำ", value: "deposit" },
        { text: "วันเริ่ม", value: "start" },
        { text: "วันสิ้นสุด", value: "end" },
        { text: "ค่าเช่า", value: "rent" },
        { text: "สถานะสัญญาเช่า", value: "ctstatus" }
      ]
    };
  },
  methods: {
    handleSelect(data) {
      this.$router.push({ path: `/contract/${data._id}` });
    },
    handleAdd() {
      this.$emit("handleAdd");
    }
  }
};
</script>

<style>
</style>