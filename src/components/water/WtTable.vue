<template>
  <v-card v-animate-css="'fadeIn'">
    <v-card-title>
      <v-btn rounded color="primary" dark @click="handleAdd()">
        <v-icon>mdi-plus-circle</v-icon>เพิ่มน้ำประปา
      </v-btn>
      <v-spacer></v-spacer>
      <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
    </v-card-title>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="water"
      :search="search"
      @click:row="handleSelect"
      v-if="water"
    >
      <v-alert
        slot="no-results"
        :value="true"
        color="error"
        icon="warning"
      >ไม่พบ "{{ search }}" ในรายการหม้อน้ำประปา</v-alert>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "WtTable",
  props: ["water"],
  data() {
    return {
      selected: [],
      search: "",
      headers: [
        { text: "รหัสน้ำประปา", value: "_id" },
        { text: "ชื่อน้ำประปา", value: "watername" },
        { text: "ราคาน้ำต่อหน่วย", value: "waterppunit" },
        { text: "สถานะการใช้น้ำ", value: "waterstatus" }
      ]
    };
  },
  methods: {
    handleSelect(data) {
      this.$router.push({ path: `/water/${data._id}` });
    },
    handleAdd() {
      this.$emit("handleAdd");
    }
  }
};
</script>

<style>
</style>