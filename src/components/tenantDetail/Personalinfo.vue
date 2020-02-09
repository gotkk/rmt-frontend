<template>
  <div id="personalinfo">
    <v-form v-if="personinfo">
      <v-container class="cn" v-animate-css="'fadeIn'">
        <v-row>
          <v-col cols="12">
            <p class="font-weight-bold text-center">รายละเอียดผู้เช่า</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field v-model="personinfo.firstname" label="Firstname" disabled></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="personinfo.lastname" label="Lastname" disabled></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field v-model="personinfo.nickname" label="Nickname" disabled></v-text-field>
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