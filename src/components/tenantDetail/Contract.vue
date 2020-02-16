<template>
  <div>
    <v-container class="block-cn" v-animate-css="'fadeIn'">
      <v-row>
        <v-col>
          <p class="text-center">จัดการสัญญา</p>
        </v-col>
      </v-row>
      <SelectContract
        :contract="contract"
        @setContractSelect="handleSelectContract"
        v-if="!selected"
      />

      <div v-if="selected">
        <v-row v-animate-css="'fadeInDown'">
          <v-col>
            <span>สัญญาเช่า</span>
          </v-col>
          <v-col class="d-flex justify-end">
            <span>{{this.contractselect.name}}</span>
          </v-col>
        </v-row>
      </div>
    </v-container>

    <v-form v-if="selected">
      <v-container class="block-cn" v-animate-css="'fadeIn'">
        <v-row>
          <v-col cols="6" offset="6" class="d-flex justify-end">
            <v-switch
              v-model="contractselect.ctstatus"
              color="green accent-4"
              :label="`สถานะเช่า ${contractselect.ctstatus}`"
              disabled
            ></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <p class="font-weight-bold text-center">รายละเอียดสัญญาเช่าที่ดิน</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field v-model="contractselect.name" label="ชื่อสัญญาเช่า" disabled></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="contractselect.duration" label="ระยะเวลาเช่า (ปี)" disabled></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="contractselect.detail" label="รายละเอียดการเช่า" disabled></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field v-model="contractselect.start" label="วันเริ่มสัญญา" disabled></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="contractselect.end" label="วันสินสุดสัญญา" disabled></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field v-model="contractselect.deposit" label="ค่ามัดจำ" disabled></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="contractselect.rent" label="ค่าเช่า" disabled></v-text-field>
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
import SelectContract from "./tdComponent/SelectContract";
export default {
  name: "Contract",
  props: ["contract"],
  components: {
    SelectContract
  },
  data() {
    return {
      contractselect: {},
      selected: false
    };
  },
  mounted() {},
  methods: {
    handleSelectContract(value) {
      for (let i = 0, arri = this.contract.length; i < arri; ++i) {
        if (this.contract[i].name === value) {
          this.contractselect = this.contract[i];
          this.selected = true;
          break;
        }
      }
    }
  }
};
</script>

<style scoped>
</style>