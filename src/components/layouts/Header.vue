<template>
  <div>
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-home-circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>หน้าหลัก</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item  to="/about">
          <v-list-item-action>
            <v-icon>mdi-clock-alert</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>แจ้งเตือน</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item  to="/about">
          <v-list-item-action>
            <v-icon>mdi-clipboard-text</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>สัญญาเช่า</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item  to="/about">
          <v-list-item-action>
            <v-icon>mdi-google-maps</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>ที่ดิน</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item  to="/about">
          <v-list-item-action>
            <v-icon>mdi-flash</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>ไฟฟ้า</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item  to="/about">
          <v-list-item-action>
            <v-icon>mdi-water-pump</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>น้ำประปา</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>

// https://cdn.materialdesignicons.com/2.0.46/

export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: false
  }),
  updated() {
    console.log(this.drawer);
  },
  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>

<style>
</style>