<template>
  <div id="dialoginitialbill">
    <v-dialog v-model="initialbill" persistent max-width="320">
      <v-card>
        <v-card-title class="headline">เริ่มบิลเดือนใหม่เลยหรือไม่ ?</v-card-title>

        <v-card-text>นี่เป็นการเริ่มต้นเปิดบิลในรอบเดือนปัจจุบัน เพื่อทำให้สามารถบันทึกข้อมูลไฟฟ้าหรือน้ำประปาได้</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="handleCloseDialog(true)">ตกลง</v-btn>

          <v-btn color="red darken-1" text @click="handleCloseDialog(false)">ยกเลิก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "DialogInitialBill",
  props: ["initialbill"],
  methods: {
      handleCloseDialog(result){
          this.$emit("setCloseBillDialog", result);
      }
  },
};
</script>

<style>
</style>