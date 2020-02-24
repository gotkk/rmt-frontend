<template>
  <div id="content" v-if="imgurl">
    <v-parallax :src="imgurl" height="700">
      <v-row align="center" justify="center">
        <v-col cols="12">
          <div class="block">
            <div class="blocktxt">
              <span class="txtspan">{{txttitle}}</span>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-parallax>
    <v-container>
      <v-row class="txtrow">
        <v-col cols="12">
          <span class="subtitle-1" style="backgroundColor=black;">{{txtdetail}}</span>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Content",
  props: ["imgurl", "txttitle", "txtdetail"]
};
</script>

<style scoped>
#content .block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#content .blocktxt {
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  width: 500px;
}
#content .txtspan {
  font-size: 42px;
  text-shadow: 2px 2px #000000;
}
#content .txtrow{
    margin: 16px;
    padding: 16px;
}
</style>