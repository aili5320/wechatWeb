<template>
  <div class="center">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh"  loading-text=" " loosing-text=" ">
    <div class="title">
      <div class="ioc">
        <p>好友</p>
        <router-link to="/addFriends">
          <i class="iconfont icon-24gl-portraitMalePlus4"></i>
        </router-link>
      </div>
    </div>
    <div class="centent">
      <div class="searchBox">
        <div class="search">
          <div class="tip">
            <van-icon name="search" />
            <span>搜索</span>
          </div>
        </div>
      </div>

      <div class="box">
        <router-link to="/ask">
          <div class="row">
            <div class="picBox tips">
              <img src="@/assets/images/add.png" alt="" />
            </div>
            <div class="info">
              <p class="username">新朋友</p>
            </div>
            <div class="before"></div>
          </div>
        </router-link>

        <div class="row">
          <div class="picBox tips">
            <img src="@/assets/images/chat.png" alt="" />
          </div>
          <div class="info">
            <p class="username">仅聊天</p>
          </div>
          <div class="before"></div>
        </div>
        <div class="row">
          <div class="picBox tips">
            <img src="@/assets/images/flock.png" alt="" />
          </div>
          <div class="info">
            <p class="username">群聊</p>
          </div>
          <div class="before"></div>
        </div>
        <div class="row bottom">
          <div class="picBox tips">
            <img src="@/assets/images/tip.png" alt="" />
          </div>
          <div class="info">
            <p class="username">标签</p>
          </div>
          <div class="before"></div>
        </div>
      </div>

      <div class="box" v-for="(item, index) in userList" :key="index">
        <router-link
          :to="{
            path: '/userInfo',
            query: {
              sendId: item.userId,
              friRealname: item.friRealname,
              friPic: item.friPic,
              friUserName:item.friUserName
            },
          }"
        >
          <div class="row">
            <div class="picBox ">
              <img :src="item.friPic" alt="" />
            </div>
            <div class="info">
              <span class="username">{{ item.friRealname }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </van-pull-refresh>
  </div>
</template>

<script>
import { friendList } from "@/utils/api";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Contacts",
  data() {
    return {
      userList: [],
      isLoading: false,
    };
  },
  methods: {
    onRefresh(){
      this.$router.go(0)
    }
  },
  async created() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const req = {
      userId: userInfo.userId,
    };
    this.userList = await friendList(req);
  },
};
</script>

<style lang="less" scoped>

/deep/ .van-pull-refresh {
    overflow: visible;
}
.center {
  // background-color: #ededed;
  .title {
    position: fixed;
    margin-top: 0;
    margin-left: 0;
    top: 0;
    width: 100%;
    height: 1.5rem;
    // background-color: #ededed;
    background-color: #fff;
    z-index: 99;
    backdrop-filter: blur(15px);
    .ioc {
      position: relative;
      p {
        position: absolute;
        left: 40%;
        width: 50px;
        height: 50px;
        font-weight: 600;
        line-height: 60px;
        color: #111;
        font-size: 20px;
        text-align: center;
        letter-spacing: 2px;
        box-shadow: inset 2px 2px 2px rgba(0, 0, 0, 0.05),
          10px 10px 5px rgba(0, 0, 0, 0.05), 10px 10px 5px rgba(0, 0, 0, 0.05),
          inset -5px -5px 10px rgba(255, 255, 255, 0.5);
        border-radius: 50%;
      }
      // p::before {
      //   content: "";
      //   position: absolute;
      //   top: 10px;
      //   left: 10px;
      //   width: 10px;
      //   height: 8px;
      //   border-radius: 50%;
      //   background-color: #fff;
      //   opacity: 0.45;
      // }
      // p:hover {
      //   border-radius: 50%;
      // }
      i {
        position: absolute;
        // top: 10px;
        font-weight: 600;
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 55px;
        right: 0.4rem;
        font-size: 22px;
        box-shadow: inset 2px 2px 2px rgba(0, 0, 0, 0.05),
          10px 10px 5px rgba(0, 0, 0, 0.05), 10px 10px 5px rgba(0, 0, 0, 0.05),
          inset -5px -5px 10px rgba(255, 255, 255, 0.5);
        border-radius: 50% 50% 49% 51% / 66% 61% 39% 34%;
      }
      // i:hover {
      //   border-radius: 50%;
      // }
    }
  }
  .centent {
    width: 100%;
    margin-bottom: 2rem;
    min-height: 10rem;
    .searchBox {
      margin-top: 1.5rem;
      height: 1.2rem;
      .search {
        margin: 0 auto;
        width: 98%;
        height: 1rem;
        border-radius: 5px;
        position: relative;
        // background: #e0e0e0;
        background-color: transparent;
        box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.05),
          10px 10px 5px rgba(0, 0, 0, 0.05), 10px 10px 5px rgba(0, 0, 0, 0.05),
          inset -5px -5px 10px rgba(255, 255, 255, 0.5);
        .tip {
          text-align: center;
          font-size: 16px;
          line-height: 1rem;
          color: #c4c4c4;
          span {
            margin-left: 0.2rem;
          }
        }
      }
      .search::before {
        content: "";
        position: absolute;
        top: 5px;
        left: 50%;
        transform: translateX(-50%);
        width: 65%;
        height: 7px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 5px;
      }
    }
    .box {
      
      .row {
        height: 1.2rem;
        padding: 0.2rem;
        margin: 8px;
        overflow: hidden;
        display: flex;
        position: relative;
        border-radius: 8px;
        box-shadow: inset 6px 15px 15px rgba(0, 0, 0, 0.1),
          inset -12px -15px 10px rgba(255, 255, 255, 1),
          15px 20px 15px rgba(0, 0, 0, 0.05),
          15px 15px 20px rgba(0, 0, 0, 0.025);
        .picBox {
          margin-left: 10px;
          width: 1.2rem;
          height: 1.2rem;
          border-radius: 8px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .tips{
          width: 1rem;
          height: 1rem;
        }
        .info {
          float: left;
          width: 60%;
          margin-left: 0.5rem;
          line-height: 1.2rem;
          font-size: 20px;
          color: #c4c4c4;
          .username {
            color: #111;
            font-size: 20px;
          }
        }
        .before {
          position: absolute;
          top: 6px;
          left: 50%;
          transform: translateX(-50%);
          width: 40%;
          height: 10px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 5px;
        }
      }
      .bottom {
       margin-bottom: 0.8rem;
      }
    }
  }
}
</style>