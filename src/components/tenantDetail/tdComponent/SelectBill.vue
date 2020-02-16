<template>
  <div id="SelectContract">
    <v-row v-animate-css="'fadeIn'">
      <v-col>
        <v-overflow-btn
          :items="billnamelist"
          label="เลือกงวดค่าเช่า (เดือน)"
          target="#dropdown-bill"
          v-model="billselected"
        ></v-overflow-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Select",
  props: ["billlist"],
  data() {
    return {
      billnamelist: [],
      billselected: "",
      month: [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม"
      ]
    };
  },
  mounted() {
    this.initialBill();
  },
  updated() {
    if (this.billselected) {
      this.$emit("setBillSelect", this.billselected);
    }
  },
  methods: {
    initialBill() {
      for (let i = 0, arri = this.billlist.length; i < arri; ++i) {
        let fullperiod = this.billlist[i].period.split("-");
        let monthindex = fullperiod[1];
        this.billnamelist.push(this.month[monthindex]);
      }
      if (this.billnamelist.length === 0) {
        this.$emit("setNotReady");
      }
    }
  }
};
</script>

<style>
</style>