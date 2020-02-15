<template>
  <div id="dialogconfirm">
    <v-dialog v-model="confirm" persistent max-width="420">
      <v-card>
        <v-card-title class="headline">{{title}} ?</v-card-title>
        <v-card-text>{{text}}</v-card-text>
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
  name: "DialogConfirm",
  props: ["confirm", "title", "text"],
  methods: {
    handleCloseDialog(value) {
      this.$emit("colseConfirm", value);
    }
  }
};
</script>

<style>
</style>