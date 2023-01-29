<template>
  <div class="box">
    <i class="tops iconfont icon-scale" @click="goBack"></i>
    <div class="pic">
      <div class="picBox">
        <img :src="friPic" alt="" />
      </div>
    </div>
    <p class="name">{{ friRealname }}</p>
    <p class="tip">等待对方接受邀请...</p>

    <div class="option">
      <div class="item">
        <i class="iconfont icon-maikefeng" ></i>
        <span>麦克风已开</span>
      </div>
      <div class="item">
        <i class="iconfont icon-guaduan" style="color:red"></i>
        <span>挂断</span>
      </div>
      <div class="item">
        <i class="iconfont icon-24gf-volumeCross"></i>
        <span>扬声器已关</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Speech",
  data() {
    return {
      sendId: "",
      friRealname: "",
      friPic: "",
    };
  },
  methods:{
    goBack(){
      this.$router.go(-1);
    }
  },
  created() {
    this.sendId = this.$route.query.sendId;
    this.friRealname = this.$route.query.friRealname;
    this.friPic = this.$route.query.friPic;
  },
};
</script>

<style lang="less" scoped>
.box {
  // width: 100%;
  overflow: hidden;
  min-height: 100vh;
  background-image: linear-gradient(to bottom right, #cec4c4, #edeaf1, #e1eefd);

  .tops{
    position: absolute;
    left:5%;
    top:3%;
    font-size: 25px;
  }
  .pic {
    width: 4rem;
    height: 4rem;
    margin: 20% auto;
    position: relative;
    box-shadow: inset 20px 20px 20px rgba(0, 0, 0, 0.05),
      25px 40px 20px rgba(0, 0, 0, 0.05), 25px 30px 30px rgba(0, 0, 0, 0.05),
      inset -20px -20px 25px rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    transition: 0.5s;
    .picBox {
      width: 2.5rem;
      height: 2.5rem;
      position: absolute;
      left: 18%;
      top: 20%;
      overflow: hidden;
      border-radius: 50%;
      transition: 0.5s;
    }
  }
  .pic:hover {
    width: 4.5rem;
    height: 4.5rem;
  }

  .pic:hover > .picBox {
    left: 22%;
    top: 25%;
  }

  .name {
    margin-top: -1rem;
    text-align: center;
    font-weight: 600;
    color: #1e1e1e;
    font-size: 20px;
    letter-spacing: 3px;
  }
  .tip {
    margin-top: 5rem;
    text-align: center;
    color: #1e1e1e;
    font-size: 16px;
    // font-weight: 600;
  }

  .option {
    width: 100%;
    max-height: 5rem;
    display: flex;
    position: absolute;
    bottom: 1.5rem;
    flex-flow: row wrap;
    justify-content: flex-start;
    .item {
      // height: 3rem;
      // width: 3rem;
      border-radius: 8px;
      width: calc((100% - 40px) / 3);
      font-size: 18px;
      text-align: center;
      i {
        font-size: 35px;
        width: 2rem;
        height: 2rem;
        color:#1e1e1e;
        line-height: 2rem;
        display: block;
        box-shadow: inset 20px 20px 20px rgba(0, 0, 0, 0.05),
          25px 40px 20px rgba(0, 0, 0, 0.05), 25px 30px 30px rgba(0, 0, 0, 0.05),
          inset -20px -20px 25px rgba(255, 255, 255, 0.9);
        border-radius: 50%;
        // transition: 0.5s;
      }
      i:first-child {
        margin-left: 35px;
      }
      span {
        display: inline-block;
        font-size: 16px;
        margin: 15px 0 0 31px;
      }
    }
  }
}
</style>