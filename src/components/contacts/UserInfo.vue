<template>
  <div class="center">
    <div class="title">
      <van-icon name="arrow-left" class="arrow" @click="goBlack" />
      <van-icon name="ellipsis" />
    </div>
    <div class="userInfo">
      <div class="userPic">
        <img :src="friPic" alt="" />
      </div>
      <div class="info">
        <div class="username">{{ friRealname }}</div>
        <div class="account">微信号：{{ friUserName }}</div>
        <div class="address">地区：武汉</div>
      </div>
    </div>
    <div class="remark">
      <span>备注和标签</span>
      <van-icon name="arrow" />
    </div>
    <div class="power">
      <span>朋友权限</span>
      <van-icon name="arrow" />
    </div>
    <div class="remark">
      <span>朋友圈</span>
      <van-icon name="arrow" />
    </div>
    <div class="power">
      <span>更多信息</span>
      <van-icon name="arrow" />
    </div>
    <router-link
      :to="{
        path: '/dialog',
        query: {
          sendId: sendId,
          friRealname: friRealname,
          friPic: friPic,
          friUserName: friUserName,
        },
      }"
    >
      <div class="message">
        <i class="iconfont icon-xiaoxi"></i>
        <span>发消息</span>
      </div>
    </router-link>

    <div class="message">
      <i class="iconfont icon-video"></i>
      <span>音视频通话</span>
    </div>
    <div class="bg"></div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "UserInfo",
  data() {
    return {
      sendId: "",
      friRealname: "",
      friPic: "",
      friUserName: "",
    };
  },
  methods: {
    goBlack() {
      this.$router.back();
    },
  },

  created() {
    this.sendId = this.$route.query.sendId;
    this.friRealname = this.$route.query.friRealname;
    this.friPic = this.$route.query.friPic;
    this.friUserName = this.$route.query.friUserName;
  },
};
</script>

<style lang="less" scoped>
.center {
  .title {
    width: 100%;
    height: 1.5rem;
    position: relative;
    background-color: #fff;
    i {
      position: absolute;
      font-size: 25px;
      right: 0.5rem;
      top: 0.5rem;
    }
    .arrow {
      left: 0.5rem;
    }
  }
  .userInfo {
    border-bottom: 1px solid #ededed;
    .userPic {
      display: inline-block;
      width: 2rem;
      height: 2rem;
      margin-left: 0.8rem;
      border-radius: 8px;
      overflow: hidden;
      // vertical-align: top;
    }
    .info {
      display: inline-block;
      font-size: 20px;
      margin-left: 0.5rem;
      color: #9e9e9e;
      .username {
        color: #111;
        font-weight: 600;
        font-size: 22px;
      }
    }
  }
  .remark {
    font-size: 22px;
    height: 1.5rem;
    line-height: 1.5rem;
    position: relative;
    font-weight: 500;
    border-bottom: 1px solid #ededed;
    span {
      position: relative;
      left: 0.5rem;
    }
    i {
      position: absolute;
      right: 0.5rem;
      top: 0.5rem;
    }
  }

  .power {
    font-size: 22px;
    height: 1.5rem;
    line-height: 1.5rem;
    position: relative;
    font-weight: 500;
    border-bottom: 10px solid #ededed;
    span {
      position: relative;
      left: 0.5rem;
    }
    i {
      position: absolute;
      right: 0.5rem;
      top: 0.5rem;
    }
  }
  .message {
    font-size: 23px;
    height: 1.5rem;
    line-height: 1.5rem;
    text-align: center;
    color: #5e6d8a;
    font-weight: 600;
    border-bottom: 1px solid #ededed;
    i {
      font-size: 20px;
      margin-right: 0.2rem;
    }
  }
  .bg {
    background-color: #ededed;
    width: 100%;
    min-height: 8rem;
  }
}
</style>