<template>
  <v-card v-animate-css="'fadeIn'">
    <v-card-title>
      <v-btn rounded color="primary" dark @click="handleAdd()">
        <v-icon>mdi-plus-circle</v-icon>เพิ่มที่ดิน
      </v-btn>
      <v-spacer></v-spacer>
      <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
    </v-card-title>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="land"
      :search="search"
      @click:row="handleSelect"
      v-if="land"
    >
      <v-alert
        slot="no-results"
        :value="true"
        color="error"
        icon="warning"
      >ไม่พบ "{{ search }}" ในรายการที่ดิน</v-alert>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "LnTable",
  props: ["land"],
  data() {
    return {
      selected: [],
      search: "",
      headers: [
        { text: "รหัสที่ดิน", value: "_id" },
        { text: "ชื่อที่ดิน", value: "landname" },
        { text: "เนื้อที่", value: "landarea" },
        { text: "สถานะการเช่า", value: "landstatus" }
      ]
    };
  },
  methods: {
    handleSelect(data) {
      this.$router.push({ path: `/land/${data._id}` });
    },
    handleAdd() {
      this.$emit("handleAdd");
    }
  }
};
</script>

<style>
</style>