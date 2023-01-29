<template>
  <div class="center">
    <div class="title" v-if="disFlag">
      <van-icon name="arrow-left" @click="goBack" />
      <span>添加好友</span>
    </div>

    <div class="searchBox"  @click="disFlag=false">
      <div class="search" >
        <div class="tip">
          <van-icon name="search" />
          <input type="text"  @keydown="sendDown" v-model="userName" placeholder="账号/手机号" />
        </div>
      </div>
      <span class="cancel" v-if="!disFlag" @click="cancel">取消</span>

      <div class="oldSearch"  ref="oldSearch" v-if="!disFlag" @click="searchBtn">
          <div class="oldtip" >
            <div class="ico">
            <img src="@/assets/images/search.png" alt=""/>
          </div>
          <div class="old">
            搜索：
           <span >{{ userName }}</span>
          </div>
          </div>
      </div>
      
      <div v-if="searchUser==0"  class="result">
        未查询到用户请重新输入!
      </div>
    </div>
    <div class="dis" v-if="disFlag">
      <div class="mine">
        <span>我的账号是：admin </span>
        <i class="iconfont icon-ico"></i>
      </div>

      <div class="list" >
        <div class="item">
          <i class="iconfont icon-shoucang"></i>
          <span>雷达加朋友</span>
          <van-icon name="arrow" />
          <span class="tes">添加身边的朋友</span>
        </div>
        <div class="item">
          <i class="iconfont icon-zhaopian"></i>
          <span>面对面群聊</span>
          <van-icon name="arrow" />
          <span class="tes">与身边的朋友进入同一个群聊</span>
        </div>
        <div class="item">
          <i class="iconfont icon-kabao"></i>
          <span>扫一扫</span>
          <van-icon name="arrow" />
          <span class="tes">扫二维码图片</span>
        </div>
        <div class="item">
          <i class="iconfont icon-biaoqing"></i>
          <span>手机联系人</span>
          <van-icon name="arrow" />
          <span class="tes">添加通讯录中的朋友</span>
        </div>
        <div class="item">
          <i class="iconfont icon-biaoqing"></i>
          <span>公众号</span>
          <van-icon name="arrow" />
          <span class="tes">获取更多资讯和服务</span>
        </div>
        <div class="item">
          <i class="iconfont icon-biaoqing"></i>
          <span>企业微信联系人</span>
          <van-icon name="arrow" />
          <span class="tes">通过手机号搜索企业微信服务</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { queryUser } from "@/utils/api"
export default {
  name: "addFriends",
  data(){
    return {
      userName:"",
      disFlag:true,
      searchUser:{}
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    cancel(){
      this.disFlag = true
      this.userName =""
    },

    async sendDown(e){
      if (this.message == "") return;
      if (e.key == "Enter") {
        const req ={"userName":this.userName }
        this.searchUser = await queryUser(req);
        this.skip();
        this.$refs.oldSearch.style.display="none"
      }
    },
   async searchBtn() {
      const req ={"userName":this.userName }
      this.searchUser = await queryUser(req);
      this.skip();
      this.$refs.oldSearch.style.display="none"
    },
    
    skip(){
      if(this.searchUser!=''){
        localStorage.setItem("searchUser",JSON.stringify(this.searchUser));
        // this.$router.push({ path: '/searchUser', query: { userInfo: this.searchUser}})
        this.$router.push("/searchUser")
      }
    }
    
  },
};
</script>

<style lang="less" scoped>
.center {
  min-height: 100vh;
  background-color: #ededed;
  .title {
    top: 0.3rem;
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
        left: .2rem;
        top: .2rem;
        width: 1.5rem;
        height: 1.5rem;
      }
      .old {
        position: absolute;
        top: .5rem;
        left: 2rem;
        font-size: 25px;
        font-weight: 500;
        span {

        }
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
      margin-top: 0.8rem;
      text-align: center;
      font-size: 20px;
      i {
        font-size: 25px;
        color: rgb(139, 172, 238);
      }
    }
    .list {
      background-color: #fff;
      margin-top: 0.5rem;
      .item {
        font-size: 22px;
        height: 2rem;
        line-height: 1.5rem;
        position: relative;
        font-weight: 500;
        border-bottom: 1px solid #ededed;
        background-color: #fff;
        span {
          position: relative;
          left: 1.4rem;
        }
        i {
          position: absolute;
          right: 0.5rem;
          color: #ccc;
          top: 0.5rem;
        }
        .iconfont {
          position: absolute;
          left: 10px;
          color: #111;
          top: 0;
          font-size: 25px;
        }
        .tes {
          position: absolute;
          top: .8rem;
          color: #ccc;
          font-size: 15px;
        }
      }
      .item:active {
        background-color: #ededed;
      }
    }
  }
}
</style>