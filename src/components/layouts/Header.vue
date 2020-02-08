<template>
  <div id="header">
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list dense>
        <v-list-item
          link
          v-for="(item, index) in menu"
          :key="index"
          :to="item.path"
          @click="setActiveTitle(item.title)"
        >
          <v-list-item-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{activeTitle}}</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>

export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: false,
    activeTitle: "Application",
    menu: [
      {
        path: "/",
        icon: "mdi-home-circle",
        title: "หน้าหลัก"
      },
      {
        path: "/tenant",
        icon: "mdi-account",
        title: "ผู้เช่า"
      },
      {
        path: "/alert",
        icon: "mdi-clock-alert",
        title: "แจ้งเตือน"
      },
      {
        path: "/management",
        icon: "mdi-google-keep",
        title: "การจัดการ"
      },
      {
        path: "/contract",
        icon: "mdi-clipboard-text",
        title: "สัญญาเช่า"
      },
      {
        path: "/land",
        icon: "mdi-google-maps",
        title: "ที่ดิน"
      },
      {
        path: "/electricity",
        icon: "mdi-flash",
        title: "ไฟฟ้า"
      },
      {
        path: "/water",
        icon: "mdi-water-pump",
        title: "น้ำประปา"
      },
      {
        path: "/bill",
        icon: "mdi-file-document",
        title: "ใบเสร็จ"
      }
    ]
  }),
  mounted() {
    this.initActiveTitle();
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
  methods: {
    initActiveTitle() {
      let pathtemp = this.$router.currentRoute.path;
      for (let i = 0, arri = this.menu.length; i < arri; ++i) {
        if (this.menu[i].path === pathtemp) {
          this.setActiveTitle(this.menu[i].title);
          break;
        }
      }
    },
    setActiveTitle(title) {
      this.activeTitle = title;
    }
  }
};
</script>

<style>
</style>