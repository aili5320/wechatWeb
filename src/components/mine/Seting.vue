<template>
  <div class="center">
    <div class="con"></div>
    <div class="title">
      <van-icon name="arrow-left" @click="goBack" />
      <span>个人信息</span>
    </div>
    <router-link to="/setPic">

    <div class="row top">
      <span>头像</span>
      <div class="userPic">
        <img src="@/assets/images/userPic.jpg" alt="" />
      </div>
      <van-icon name="arrow" />
    </div>
    </router-link>

    <div class="row">
      <span>名字</span>
      <div>L</div>
      <van-icon name="arrow" />
    </div>
    <div class="row">
      <span>拍一拍</span>
      <div></div>
      <van-icon name="arrow" />
    </div>
    <div class="row">
      <span>微信号</span>
      <div>cs123</div>
      <van-icon name="arrow" />
    </div>
    <div class="row">
      <span>我的二维码</span>
      <div>
        <i class="iconfont icon-ico"></i>
      </div>
      <van-icon name="arrow" />
    </div>
    <div class="row">
      <span>更多</span>
      <div></div>
      <van-icon name="arrow" />
    </div>

    <div class="row tinkle">
      <span>来电铃声</span>
      <div></div>
      <van-icon name="arrow" />
    </div>

    <div class="row tinkle">
      <span>微信豆</span>
      <div></div>
      <van-icon name="arrow" />
    </div>

    <div class="row">
      <span>我的地址</span>
      <div></div>
      <van-icon name="arrow" />
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "seting",
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.center {
  min-height: 100vh;
  background-color: #ededed;
  font-size: 22px;
  .con {
    height: 0.5rem;
    width: 100%;
  }
  .title {
    top: .2rem;
    text-align: center;
    position: relative;
    font-weight: 600;
    margin-bottom: 0.2rem;
    font-size: 20px;
    i {
      font-weight: 400;
      font-size: 25px;
      position: absolute;
      left: 0.2rem;
    }
  }

  .row {
    position: relative;
    height: 1.8rem;
    background-color: #fff;
    margin-bottom: 1px;
    span {
      position: absolute;
      left: 0.2rem;
      line-height: 2rem;
    }
    div {
      width: 2rem;
      height: 2rem;
      position: absolute;
      line-height: 2rem;
      text-align: right;
      right: 0.8rem;
      i {
        font-size: 25px;
        color: #111;
      }
    }
    i {
      position: absolute;
      right: 0;
      line-height: 2rem;
      color: #ccc;
    }
  }
  .top {
    height: 2.5rem;
    .userPic {
      margin-top: 0.2rem;
      border-radius: 8px;
      overflow: hidden;
    }
  }
  .tinkle {
    margin-top: 0.3rem;
  }

  .row:active {
    background-color: #ededed;
  }

  
}
</style>