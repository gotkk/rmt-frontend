<template>
  <v-app>
    <Header />
    <v-content>
      <!-- <div id="app">
        <div id="nav">
          <router-link to="/">Home</router-link>|
          <router-link to="/about">About</router-link>
        </div>
      </div>-->
      <router-view />
      <!-- <div style="backgroundColor: red; height: 50px">sss</div> -->
    </v-content>
    <Footer />
  </v-app>
</template>


<script>
import Header from "@/components/layouts/Header.vue";
import Footer from "@/components/layouts/Footer.vue";

// จัดการ สำหรับเพิ่ม แก้ไข ลบ ผู้เช่า ที่ดิน ไฟฟ้า ประปา
// mongodump --db database_name --collection collection_name
// mongorestore --db database_name path_to_bson_file

export default {
  name: "App",
  components: {
    Header,
    Footer
  }
};
</script>


<style>
#bgt{
    background-color: aquamarine !important;
}
</style>
