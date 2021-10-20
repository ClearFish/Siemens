<template>
  <div class="big_box">
    <div class="top">
      <p class="title" @click="goBack">GREEN Concept</p>
      <p class="change_color">/</p>
      <p class="change_color">PCF共享机制</p>
    </div>
    <div class="bg_box">
      <div class="gif_bg"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="less" scoped>
.big_box {
  width: 100%;
  height: 100%;
  .top {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .title {
      font-size: 14px;
      color: #00183c;
      position: relative;
      cursor: pointer;
    }
    // .title::after {
    //     content: "";
    //     display: block;
    //     width: 30px;
    //     height: 2px;
    //     position: absolute;
    //     bottom: -5px;
    //     left: 0;
    //     background: #11435C;
    //     opacity: 0.12;
    // }

    .change_color {
      color: #999999;
      margin-left: 15px;
      font-size: 14px;
    }
  }
  .bg_box {
    margin-top: 20px;
    width: 100%;
    height: 96%;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    .gif_bg {
      width: 80%;
      height: 100%;
      background: url("../../assets/images/shar.gif") no-repeat center;
      background-size: 100% 100%;
    }
  }
}
</style>