<template>
  <div class="home" style="textAlign: center">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <div v-for="(item, index) in homecontent" :key="index">
      <Content
        :imgurl="item.imgurl"
        :txttitle="item.txttitle"
        :txtdetail="item.txtdetail"
        :icon="item.icon"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Content from "../components/homes/Content";

export default {
  name: "Home",
  components: {
    Content
  },
  data() {
    return {
      homecontent: [
        {
          imgurl:
            "https://i.pinimg.com/originals/7d/20/49/7d2049ce75e076b193529b3cc3f95461.png",
          txttitle: "ยินดีตอนรับเข้าสู่ระบบ RMT",
          txtdetail: "บริหารจัดการด้วยตัวคุณเอง"
        },
        {
          imgurl: "https://cdn.hipwallpaper.com/i/98/44/evWIuC.jpg",
          txttitle: "ระบบจัดการที่เช่า",
          txtdetail: "เริ่มจาก..."
        },
        {
          imgurl:
            "https://www.kcprofessional.com/-/media/kcp/articles/groupsjrarticles/understandingtenants/understanding-tenants-will-help-retain-them_ap_fullwdith_1920x1080.jpg",
          txttitle: "เพิ่มผู้เช่า",
          txtdetail: "เพิ่มได้จากหน้าเมนูผู้เช่า"
        },
        {
          imgurl: "https://wallpaperaccess.com/full/803470.jpg",
          txttitle: "เพิ่มที่ดิน",
          txtdetail: "เพิ่มได้จากหน้าเมนูที่ดิน"
        },
        {
          imgurl: "https://wallpaperaccess.com/full/552875.jpg",
          txttitle: "เพิ่มสัญญาเช่า",
          txtdetail: "เพิ่มได้จากหน้าเมนูสัญญาเช่า"
        },
        {
          imgurl: "https://cdn.hipwallpaper.com/i/73/83/VmBoUw.jpg",
          txttitle: "เพิ่มไฟฟ้า",
          txtdetail: "เพิ่มได้จากหน้าเมนูไฟฟ้า กรณีต้องการใช้ไฟฟ้าหม้อใหม่"
        },
        {
          imgurl:
            "https://hdwallsource.com/img/2014/6/water-pictures-29322-30041-hd-wallpapers.jpg",
          txttitle: "เพิ่มน้ำประปา",
          txtdetail:
            "เพิ่มได้จากหน้าเมนูน้ำประปา กรณีต้องการใช้น้ำประปาหม้อใหม่"
        },
        {
          imgurl:
            "https://cdn.gobankingrates.com/wp-content/uploads/2018/07/mobile-payment-process-credit-card-iStock-541991966.jpg",
          txttitle: "เพิ่มใบเสร็จเริ่มต้น",
          txtdetail:
            "เพิ่มได้จากหน้าเมนูใบเสร็จ ใช้ในกรณีที่เพิ่มผู้เช่า การเช่าที่ดินเข้ามาใหม่ ครั้งแรกเท่านั้น"
        },
        {
          imgurl:
            "https://themonarcgroup.com/img/cases/management-10-year-business-strategy03.jpg",
          txttitle: "พร้อมใช้งานได้ทันที!!",
          txtdetail: "พร้อมแล้ว มาเริ่มกันเลย..."
        }
      ]
    };
  }
};
</script>

<style scoped>
.home .block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.home .blocktxt {
  background-color: rgba(0, 0, 0, 0.4);
  width: 400px;
}
.home .txtspan {
  font-size: 46px;
  text-shadow: 2px 2px #000000;
}
</style>
