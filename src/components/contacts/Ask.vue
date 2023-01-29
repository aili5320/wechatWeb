<template>
  <div class="center">
    <div class="title" v-if="disFlag">
      <van-icon name="arrow-left" class="arrow" @click="goBack" />
      <span>新的朋友</span>
      <router-link to="/addFriends">
        <span class="right">添加朋友</span>
      </router-link>
    </div>

    <div class="searchBox" @click="disFlag = false">
      <div class="search">
        <div class="tip">
          <van-icon name="search" />
          <input
            type="text"
            @keydown="sendDown"
            v-model="userName"
            placeholder="账号/手机号"
          />
        </div>
      </div>
      <span class="cancel" v-if="!disFlag" @click="cancel">取消</span>

      <div class="oldSearch" ref="oldSearch" v-if="!disFlag" @click="searchBtn">
        <div class="oldtip">
          <div class="ico">
            <img src="@/assets/images/search.png" alt="" />
          </div>
          <div class="old">
            搜索：
            <span>{{ userName }}</span>
          </div>
        </div>
      </div>

      <div v-if="searchUser == 0" class="result">未查询到用户请重新输入!</div>
    </div>
    <div class="dis" v-if="disFlag">
      <div class="mine">
        <div class="phone">
          <img src="@/assets/images/phone.png" />
        </div>
        <span>添加手机联系人</span>
      </div>

      <div class="list">
        <div
          class="item"
          v-for="(item, index) in AskingList"
          :key="index"
          @click="AskInfo"
        >
        <router-link :to="{path:'/askInfo',query:{searchUser:item}}" >
          <div class="userPic">
            <img :src="item.friPic" />
          </div>
          <span>{{ item.friRealname }}</span>
          <van-icon name="arrow"  v-if="item.asking=='1'"/>
          <i v-if="item.asking=='0'" class="look">查看</i>
          <span class="tes">{{ item.apply }}</span>
        </router-link>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { queryUser, queryFriendList } from "@/utils/api";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "sky",
  data() {
    return {
      userName: "",
      disFlag: true,
      searchUser: {},
      AskingList:[]
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    AskInfo() {
      // this.$router.push({ path: '/askInfo', query:{searchUser:searchUser}})
    },
    cancel() {
      this.disFlag = true;
      this.userName = "";
    },

    async sendDown(e) {
      if (this.message == "") return;
      if (e.key == "Enter") {
        const req = { userName: this.userName };
        this.searchUser = await queryUser(req);

        this.skip();
        this.$refs.oldSearch.style.display = "none";
      }
    },
    async searchBtn() {
      const req = { userName: this.userName };
      this.searchUser = await queryUser(req);
      this.skip();
      this.$refs.oldSearch.style.display = "none";
    },

    skip() {
      if (this.searchUser != "") {
        localStorage.setItem("searchUser", JSON.stringify(this.searchUser));
        // this.$router.push({ path: '/searchUser', query: { userInfo: this.searchUser}})
        this.$router.push("/searchUser");
      }
    },
  },

 async created(){
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const req ={
       userId:userInfo.userId,
     }
   const result =  await queryFriendList(req);
   this.AskingList = result;

  }
};
</script>

<style lang="less" scoped>
.center {
  min-height: 100vh;
  background-color: #ededed;
  .title {
    width: 100%;
    height: 1.5rem;
    position: relative;
    text-align: center;
    i {
      position: absolute;
      font-size: 25px;
      top: 0.5rem;
      left: 0.5rem;
    }
    span {
      font-size: 20px;
      font-weight: 600;
    }
    .right {
      position: absolute;
      font-weight: 400;
      top: 0.45rem;
      right: 0.2rem;
    }
  }

  .searchBox {
    position: relative;
    top: 0.2rem;
    height: 1.2rem;
    width: 100%;
    .search {
      margin: 0 auto;
      width: 95%;
      border-radius: 5px;
      height: 1.2rem;
      border-radius: 5px;
      position: relative;
      background-color: transparent;
      box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.05),
        10px 10px 5px rgba(0, 0, 0, 0.05), 10px 10px 5px rgba(0, 0, 0, 0.05),
        inset -5px -5px 10px rgba(255, 255, 255, 0.5);
      .tip {
        text-align: center;
        font-size: 20px;
        line-height: 1.2rem;
        input {
          background-color: transparent;
        }
      }
    }

    .search::before {
      content: "";
      position: absolute;
      top: 8px;
      left: 50%;
      transform: translateX(-50%);
      width: 60%;
      height: 10px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 5px;
    }
    .cancel {
      position: absolute;
      right: 0.5rem;
      top: 0.3rem;
      font-size: 20px;
    }
    .oldSearch {
      margin-top: 15px;
      min-height: 90vh;
      width: 100%;
      background-color: #fff;
      position: relative;
      .oldtip {
        height: 1.8rem;
        border-bottom: 1px solid #ededed;
        .ico {
          position: absolute;
          left: 0.2rem;
          top: 0.2rem;
          width: 1.5rem;
          height: 1.5rem;
        }
        .old {
          position: absolute;
          top: 0.5rem;
          left: 2rem;
          font-size: 25px;
          font-weight: 500;
        }
      }
    }
    .result {
      margin-top: 20px;
      height: 2rem;
      width: 100%;
      text-align: center;
      background-color: #fff;
      line-height: 2rem;
      font-size: 20px;
      font-weight: 600;
    }
  }
  .dis {
    .mine {
      margin-top: 0.6rem;
      height: 2rem;
      background-color: #fff;
      text-align: center;
      position: relative;
      .phone {
        position: absolute;
        left: 45%;
        top: 0.2rem;
        height: 1rem;
        width: 1rem;
      }
      span {
        font-size: 14px;
        line-height: 3rem;
      }
    }
    .list {
      background-color: #fff;
      margin-top: 0.6rem;
      .item {
        font-size: 22px;
        height: 2rem;
        line-height: 1.5rem;
        position: relative;
        font-weight: 500;
        border-bottom: 2px solid #ededed;
        background-color: #fff;
        span {
          position: relative;
          left: 2.5rem;
        }
        i {
          position: absolute;
          right: 0.5rem;
          color: #ccc;
          top: 0.8rem;
        }
        .look{
          color: #fff;
          font-weight: 600;
          height: 1rem;
          width: 1.5rem;
          border-radius: 8px;
          line-height: 1rem;
          text-align: center;
          background-color: skyblue;
        }
        .userPic {
          position: absolute;
          left: 10px;
          top: 0.3rem;
          height: 1.5rem;
          width: 1.5rem;
          overflow: hidden;
          border-radius: 8px;
        }

        
        .tes {
          position: absolute;
          top: 0.8rem;
          width: 60%;
          // visibility: hidden;
          color: #ccc;
          font-size: 15px;
        }
      }
      .item:active {
        background-color: #ededed;
      }
      .item:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>