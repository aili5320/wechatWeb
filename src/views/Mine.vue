<template>
  <div class="center">
    <van-pull-refresh
      v-if="isLoading"
      @refresh="onRefresh"
      loading-text=" "
      loosing-text=" "
    >
      <router-link to="/seting">
        <div class="userInfo">
          <div class="userPic">
            <img :src="userInfo.userPic" alt="" />
          </div>
          <div class="info">
            <div class="username">{{ userInfo.realName }}</div>
            <div class="account">微信号：{{ userInfo.userName }}</div>
            <div class="state">
              <div class="state-left">+状态</div>
              <div class="state-right"><van-icon name="more-o" /></div>
            </div>
          </div>
          <div class="con">
            <i class="iconfont icon-ico"></i>
            <van-icon name="arrow" />
          </div>
        </div>
      </router-link>

      <div class="seting">
        <i class="iconfont icon-weixinzhifu"></i>
        <span>服务</span>
        <van-icon name="arrow" />
      </div>

      <div class="list">
        <div class="item">
          <i class="iconfont icon-shoucang"></i>
          <span>收藏</span>
          <van-icon name="arrow" />
        </div>
        <div class="item">
          <i class="iconfont icon-zhaopian"></i>
          <span>朋友圈</span>
          <van-icon name="arrow" />
        </div>
        <div class="item">
          <i class="iconfont icon-kabao"></i>
          <span>卡包</span>
          <van-icon name="arrow" />
        </div>
        <div class="item">
          <i class="iconfont icon-biaoqing"></i>
          <span>表情</span>
          <van-icon name="arrow" />
        </div>
      </div>

      <div class="seting">
        <i class="iconfont icon-shezhi"></i>
        <span>设置</span>
        <van-icon name="arrow" />
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "mine",
  data() {
    return {
      userInfo: {},
      isLoading: false,
    };
  },
  methods: {
    onRefresh() {
      this.$router.go(0);
    },
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-pull-refresh {
    overflow: visible;
}
.center {
  min-height: 100vh;
  background-color: #ededed;
  .userInfo {
    // margin-top: 2rem;
    height: 5rem;
    background-color: #fff;
    .userPic {
      margin-top: 1.5rem;
      display: inline-block;
      width: 2.3rem;
      height: 2.3rem;
      margin-left: 0.8rem;
      border-radius: 8px;
      overflow: hidden;
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
      .state {
        margin-top: 0.2rem;
        display: flex;
        flex-flow: row nowrap;
        .state-left {
          flex: 1;
          height: 0.8rem;
          line-height: 0.8rem;
          text-align: center;
          border-radius: 1rem;
          border: 1px solid #ccc;
        }
        .state-right {
          flex: 1;
          margin-left: 0.2rem;
          font-size: 25px;
        }
      }
    }

    .con {
      position: absolute;
      right: 10px;
      top: 2rem;
      i {
        font-size: 25px;
        margin-left: 0.2rem;
      }
    }
  }
  .seting {
    margin-top: 0.5rem;
    font-size: 22px;
    height: 1.5rem;
    line-height: 1.5rem;
    position: relative;
    font-weight: 500;
    background-color: #fff;
    .iconfont {
      position: absolute;
      left: 8px;
      top: 0;
      font-size: 25px;
    }
    span {
      position: relative;
      left: 1rem;
    }
    i {
      position: absolute;
      right: 0.5rem;
      top: 0.5rem;
    }
  }
  .seting:active {
    background-color: #ededed;
  }
  .list {
    background-color: #fff;
    margin-top: 0.5rem;
    .item {
      font-size: 22px;
      height: 1.5rem;
      line-height: 1.5rem;
      position: relative;
      font-weight: 500;
      background-color: #fff;
      span {
        position: relative;
        left: 1rem;
      }
      i {
        position: absolute;
        right: 0.5rem;
        top: 0.5rem;
      }
      .iconfont {
        position: absolute;
        left: 8px;
        top: 0;
        font-size: 25px;
      }
    }
    .item:active {
      background-color: #ededed;
    }
  }
}
</style>