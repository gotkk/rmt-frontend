<template>
  <div id="menutenant">
    <v-container>
      <div class="menublock" v-animate-css="'pulse'">
        <div v-if="active===0" class="menu-item menu-active">
          <v-icon class="menu-icon">mdi-account</v-icon>
        </div>
        <div v-else class="menu-item" @click="handleSelect(0)">
          <v-icon class="menu-icon">mdi-account</v-icon>
        </div>

        <div v-if="active===1" class="menu-item menu-active">
          <v-icon class="menu-icon">mdi-clipboard-text</v-icon>
        </div>
        <div v-else class="menu-item" @click="handleSelect(1)">
          <v-icon class="menu-icon">mdi-clipboard-text</v-icon>
        </div>

        <div v-if="active===2" class="menu-item menu-active">
          <v-icon class="menu-icon">mdi-calculator</v-icon>
        </div>
        <div v-else class="menu-item" @click="handleSelect(2)">
          <v-icon class="menu-icon">mdi-calculator</v-icon>
        </div>

        <div v-if="active===3" class="menu-item menu-active">
          <v-icon class="menu-icon">mdi-flash</v-icon>
        </div>
        <div v-else class="menu-item" @click="handleSelect(3)">
          <v-icon class="menu-icon">mdi-flash</v-icon>
        </div>

        <div v-if="active===4" class="menu-item menu-active">
          <v-icon class="menu-icon">mdi-water-pump</v-icon>
        </div>
        <div v-else class="menu-item" @click="handleSelect(4)">
          <v-icon class="menu-icon">mdi-water-pump</v-icon>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "MnTenantDetail",
  props: ["active"],
  methods: {
    handleSelect(index) {
      this.$emit("onSelect", index);
    }
  }
};
</script>

<style scoped>
#menutenant .menu-active {
  background-color: #ff4081;
}
#menutenant .menublock {
  display: flex;
  justify-content: space-evenly;
  margin-top: 16px;
  margin-bottom: 16px;
}

#menutenant .menu-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 9vw;
  height: 9vw;
  border-style: solid;
  border-width: 2px;
  border-radius: 5vw;
  cursor: pointer;
}
#menutenant .menu-item:hover {
  box-shadow: 0 8px 16px 0 rgba(255, 255, 255, 0.2),
    0 6px 20px 0 rgba(255, 0, 242, 0.19);
}

#menutenant .menu-icon {
  font-size: 6vw;
}
</style>