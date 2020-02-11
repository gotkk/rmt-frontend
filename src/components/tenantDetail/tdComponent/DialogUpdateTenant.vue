<template>
  <div>
    <v-dialog v-model="dialogtenant" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-text-field v-model="personalform.firstname" label="Firstname"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="personalform.lastname" label="Lastname"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field v-model="personalform.nickname" label="Nickname"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="personalform.tel" label="Telephone"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <!-- <v-text-field v-model="personinfo.tel" label="Contract"></v-text-field> -->
                <v-select
                  v-model="contractselected"
                  :items="contractitems"
                  multiple
                  label="เลือกสัญญาเช่า"
                  color="light-blue darken-2"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="handleCloseDialog(true)">Save</v-btn>
          <v-btn color="blue darken-1" text @click="handleCloseDialog(false)">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "DialogUpdateTenant",
  props: ["dialogtenant", "personinfo"],
  data() {
    return {
      contractselected: [],
      contractitems: [],
      personalform: {}
    };
  },
  mounted() {
    this.$store.dispatch("getAllContract");
  },
  updated() {
    console.log(this.personinfo);
    if (this.contractitems.length === 0) {
      this.personalform = { ...this.personinfo };
      for (let i = 0, arri = this.personinfo.contract.length; i < arri; ++i) {
        this.contractselected = [
          ...this.contractselected,
          this.personinfo.contract[i].name
        ];
      }
      for (
        let i = 0, arri = this.$store.getters.contract.length;
        i < arri;
        ++i
      ) {
        this.contractitems = [
          ...this.contractitems,
          this.$store.getters.contract[i].name
        ];
      }
    }
  },
  methods: {
    handleCloseDialog(value) {
        console.log(this.personalform.tel.toString().split(','));
      this.$emit("setResultUpdate", value);
    }
  }
};
</script>
<style>
</style>