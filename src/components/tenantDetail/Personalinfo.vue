<template>
  <div id="personalinfo">
    <v-form>
      <v-container class="cn">
        <v-row>
          <v-col cols="2" offset="10">
            <v-switch v-model="active" color="green accent-4" :label="`สถานะเช่า: ${active.toString()}`"></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <p class="font-weight-bold text-center">รายละเอียดผู้เช่า</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field v-model="personinfo.fname" label="Firstname" disabled></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="personinfo.lname" label="Lastname" disabled></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field v-model="personinfo.mname" label="Nickname" disabled></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="personinfo.tel" label="Telephone" disabled></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12 text-right">
            <v-btn color="green accent-4">
              <v-icon>mdi-pencil-circle-outline</v-icon>
              <span>แก้ไข</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "Personalinfo",
  props: ["personinfo"],
  data() {
    return {
      active: true
    };
  }
};
</script>

<style scoped>
.cn {
  /* background-color: orange; */
  margin-top: 16px;
  border-radius: 16px;
  border-width: 2px;
  /* border-color: red; */
  border-style: solid;
  box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.2),
    0 6px 20px 0 rgba(255, 255, 255, 0.19);
}
</style>