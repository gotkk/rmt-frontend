<template>
  <div id="personalinfo">
    <DialogUpdateTenant @setResultUpdate="handleCloseOnUpdate" :dialogtenant="dialogtenant" :personinfo="personinfo"/>
    <v-form v-if="personinfo">
      <v-container class="block-cn" v-animate-css="'fadeIn'">
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
            <v-btn color="green accent-4" @click="dialogtenant=true">
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
import DialogUpdateTenant from "./tdComponent/DialogUpdateTenant";
export default {
  name: "Personalinfo",
  props: ["personinfo"],
  data() {
    return {
      dialogtenant: false
    }
  },
  components: {
    DialogUpdateTenant
  },
  methods: {
    handleCloseOnUpdate() {
      this.dialogtenant = false;
    }
  }
};
</script>

<style scoped>
</style>