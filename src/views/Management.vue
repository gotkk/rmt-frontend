<template>
  <div id="management">
    <v-container>
      <v-row>
        <v-col cols="4">
          <div class="menu-item">
            <v-icon class="menu-icon">mdi-account</v-icon>
            <span>ผู้เช่า</span>
            <div>
              <v-btn class="mx-2" fab dark small color="light-blue lighten-1">
                <v-icon dark>mdi-plus</v-icon>
              </v-btn>
              <v-btn class="mx-2" fab dark small color="amber darken-3">
                <v-icon dark>mdi-pencil</v-icon>
              </v-btn>
              <v-btn class="mx-2" fab dark small color="red darken-1">
                <v-icon dark>mdi-delete</v-icon>
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Management"
};
</script>

<style scoped>
#management .menu-icon {
  font-size: 6vw;
}
#management .menu-item {
  /* background-color: aquamarine; */
  border-style: solid;
  border-width: 2px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
}
</style>