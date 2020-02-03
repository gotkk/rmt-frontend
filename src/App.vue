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

export default {
  name: "App",
  components: {
    Header,
    Footer
  }
};
</script>


<style>
</style>
