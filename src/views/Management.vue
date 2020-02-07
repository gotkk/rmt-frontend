<template>
  <div id="management">
    <v-container>
      <v-row>
        <v-col cols="12">
          <p class="text-center font-weight-bold">การจัดการข้อมูล</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3" xl="2">
          <div class="menu-item" v-animate-css="'fadeIn'">

            <div class="menu-block-icon">
              <v-icon class="menu-icon">mdi-account</v-icon>
              <span>ผู้เช่า</span>
            </div>

            <div class="menu-action">
              <div class="menu-block-btn" @mouseover="add = true" @mouseleave="add = false">
                <div class="menu-btn" style="backgroundColor: #039BE5">
                  <v-icon dark class="menu-btn-icon">mdi-plus</v-icon>
                </div>
                <span v-if="add" v-animate-css="'slideInLeft'">เพิ่ม</span>
              </div>
              <div class="menu-block-btn" @mouseover="update = true" @mouseleave="update = false">
                <div class="menu-btn" style="backgroundColor: #FF8F00">
                  <v-icon dark class="menu-btn-icon">mdi-pencil</v-icon>
                </div>
                <span v-if="update" v-animate-css="'slideInLeft'">แก้ไข</span>
              </div>
              <div class="menu-block-btn" @mouseover="del = true" @mouseleave="del = false">
                <div class="menu-btn" style="backgroundColor: #E53935">
                  <v-icon dark class="menu-btn-icon">mdi-delete</v-icon>
                </div>
                <span v-if="del" v-animate-css="'slideInLeft'">ลบ</span>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Management",
  data() {
    return {
      add: false,
      update: false,
      del: false
    }
  }
};
</script>

<style scoped>
#management .menu-icon {
  font-size: 92px;
}
#management .menu-btn-icon {
  font-size: 24px;
}
#management .menu-btn {
  z-index: 2;
  border-radius: 50%;
  padding: 6px;
}
#management .menu-item {
  /* background-color: aquamarine; */
  border-style: solid;
  border-width: 2px;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding: 16px;
  height: 200px;
}
#management .menu-item:hover{
    box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.2),
    0 6px 20px 0 rgba(255, 255, 255, 0.19);
}
#management .menu-action {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}
#management .menu-block-icon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-style: solid;
}
#management .menu-block-btn{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100px;
  cursor: pointer;
  /* background-color: antiquewhite */
}
</style>