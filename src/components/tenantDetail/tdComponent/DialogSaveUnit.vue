<template>
  <div id="dialogsaveunit">
    <v-dialog v-model="saveunit" persistent max-width="320">
      <v-card>
        <v-card-title class="headline">ต้องการบันทึกข้อมูลหรือไม่ ?</v-card-title>

        <v-card-text>เมื่อทำการบันทึกข้อมูลแล้ว จะไม่สามารถดำเนินการแก้ไขหน่วยไฟฟ้าหรือน้ำประปาได้</v-card-text>

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
  name: "DialogSaveUnit",
  props: ["saveunit"],
  methods: {
      handleCloseDialog(result){
          this.$emit("setCloseSaveDialog", result);
      }
  },
};
</script>

<style>
</style>