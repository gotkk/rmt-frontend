<template>
  <v-card v-animate-css="'fadeIn'">
    <v-card-title>
      ที่ดิน
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
  methods: {
    handleSelect(data) {
      this.$router.push({ path: `/land/${data._id}` });
    }
  },
  data() {
    return {
      selected: [],
      search: "",
      headers: [
        { text: "รหัสที่ดิน", value: "_id" },
        { text: "ชื่อที่ดิน", value: "landname" },
        { text: "เนื้อที่", value: "landarea" },
        { text: "สถานะการเช่า", value: "landstatus" },
      ]
    };
  },
  props: ["land"]
};
</script>

<style>
</style>