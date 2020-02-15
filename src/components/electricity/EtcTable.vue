<template>
  <v-card v-animate-css="'fadeIn'">
    <v-card-title>
      <v-btn rounded color="primary" dark @click="handleAdd()">
        <v-icon>mdi-plus-circle</v-icon>เพิ่มไฟฟ้า
      </v-btn>
      <v-spacer></v-spacer>
      <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
    </v-card-title>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="electricity"
      :search="search"
      @click:row="handleSelect"
      v-if="electricity"
    >
      <v-alert
        slot="no-results"
        :value="true"
        color="error"
        icon="warning"
      >ไม่พบ "{{ search }}" ในรายการหม้อไฟฟ้า</v-alert>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "EtcTable",
  props: ["electricity"],
  data() {
    return {
      selected: [],
      search: "",
      headers: [
        { text: "รหัสไฟฟ้า", value: "_id" },
        { text: "ชื่อไฟฟ้า", value: "electname" },
        { text: "ราคาไฟฟ้าต่อหน่วย", value: "electppunit" },
        { text: "สถานะการใช้งานไฟฟ้า", value: "electstatus" }
      ]
    };
  },
  methods: {
    handleSelect(data) {
      this.$router.push({ path: `/electricity/${data._id}` });
    },
    handleAdd() {
      this.$emit("handleAdd");
    }
  }
};
</script>

<style>
</style>