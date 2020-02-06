<template>
  <!-- <v-data-table :headers="headers" :items="desserts" :items-per-page="10" class="elevation-1" @click:row="selectTenant(desserts[index].fname)"></v-data-table> -->
  <v-card>
    <v-card-title>
      ผู้เช่า
      <v-spacer></v-spacer>
      <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>
    </v-card-title>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="tenant"
      :search="search"
      @click:row="handleSelect"
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
export default {
  name: "Tntable",
  methods: {
    handleSelect(tenant) {
      this.$router.push({ path: `/tenant/${tenant.id}` }) 
    }
  },
  data() {
    return {
      selected: [],
      search: "",
      headers: [
        { text: "id", value: "id" },
        { text: "ชื่อ", value: "firstname" },
        { text: "นามสกุล", value: "lastname" },
        { text: "ชื่อเล่น", value: "nickname" },
        { text: "เบอร์โทร", value: "tel" },
        { text: "สถานะเช่า", value: "statusR" }
      ],
      tenant: [
        {
          id: "456sd6465s891",
          firstname: "Frozen",
          lastname: "Yogurt",
          nickname: "a",
          tel: "083-4567283",
          statusR: true
        },
        {
          id: "s45sdsd64sdsa",
          firstname: "Yogurt",
          lastname: "Frozen",
          nickname: "b",
          tel: "081-7891542",
          statusR: false
        }
      ]
    };
  }
};
</script>

<style>
</style>