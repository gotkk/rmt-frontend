<template>
  <v-card v-animate-css="'fadeIn'">
    <v-card-title>
      <v-btn rounded color="primary" dark @click="handleAdd()">
        <v-icon>mdi-plus-circle</v-icon>เพิ่มผู้เช่า
      </v-btn>
      <v-spacer></v-spacer>
      <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
    </v-card-title>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="tenant"
      :search="search"
      @click:row="handleSelect"
      v-if="tenant"
    >
      <v-alert
        slot="no-results"
        :value="true"
        color="error"
        icon="warning"
      >ไม่พบ "{{ search }}" ในรายการผู้เช่า</v-alert>
    </v-data-table>
  </v-card>
</template>

<script>
import DialogAddTenant from "./tnComponent/DialogAddTenant";
export default {
  name: "TnTable",
  comments: {
    DialogAddTenant
  },
  props: ["tenant"],
  data() {
    return {
      selected: [],
      search: "",
      headers: [
        { text: "รหัสผู้เช่า", value: "_id" },
        { text: "ชื่อ", value: "firstname" },
        { text: "นามสกุล", value: "lastname" },
        { text: "ชื่อเล่น", value: "nickname" },
        { text: "เบอร์โทร", value: "tel" },
        {
          text: "สถานะเช่า",
          value: "contract[0].ctstatus"
        }
      ],
      ctstatus: []
    };
  },
  methods: {
    handleSelect(tenant) {
      this.$router.push({ path: `/tenant/${tenant._id}` });
    },
    handleAdd() {
      this.$emit("handleAdd");
    }
  }
};
</script>

<style>
</style>