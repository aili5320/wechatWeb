<template>
  <div class="center">
    <div class="title">
      <van-icon name="arrow-left" class="arrow"  @click="goBlack"/>
      <van-icon name="ellipsis"  />
    </div>
    <div class="userInfo">
      <div class="userPic">
        <img :src="searchUser.friPic" alt="">
      </div>
      <div class="info">
        <div class="username">{{ searchUser.friRealname }}</div>
        <div class="address">地区：武汉</div>
      </div>
    </div>
    <div class="remark">
      <span>备注和标签</span>
      <van-icon name="arrow" />
    </div>

    <div class="remark">
      <span>数据来源</span>
    </div>
    
    <div class="message">
      <span  @click="pass">添加好友</span>
    </div>
  </div>
</template>

<script>
import { passFriend } from "@/utils/api"
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name:"askInfo",
  data(){
    return {
      searchUser:{}
    }
  },
  methods:{
    goBlack() {
      this.$router.back();
    },
   async pass(){
      const userInfo = JSON.parse(localStorage.getItem("userInfo"))
      const req = {
       userId : userInfo.userId,
       searchId :this.searchUser.userId
      }
      const resule = await passFriend(req);
      if (resule ==1) {
        this.$notify({message:"添加成功",background:"transparent" ,color:'skyBlue'})
        this.$router.push("/contacts")
      } else if (resule == 2) {
        this.$notify({message:"添加失败",background:"transparent" ,color:'red'})
      }
      
    }
  },
  created(){
    this.searchUser = this.$route.query.searchUser;
    console.log(this.searchUser);
  }  
}
</script>

<style lang="less" scoped>
  .center {
    min-height: 100vh;
    background-color: #ededed;
    .title {
    width: 100%;
    height: 2rem;
    position: relative;
    background-color: #fff;
    i {
      position: absolute;
      font-size: 25px;
      right: .5rem;
      top: .5rem;
    }
    .arrow {
     left: .5rem;
    }
   }
   .userInfo {
    background-color: #fff;
    border-bottom: 1px solid #ededed;
    .userPic {
      display: inline-block;
      width: 2rem;
      height: 2rem;
      margin-left: .8rem;
      border-radius: 8px;
      overflow: hidden;
      // vertical-align: top;
    }
    .info {
      display: inline-block;
      font-size: 20px;
      margin-left: .5rem;
      color: #9e9e9e;
      .username {
        color:#111;
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
    margin-bottom: .5rem;
    background-color: #fff;
    span {
      position: relative;
      left: .5rem;
    }
    i {
      position: absolute;
      right:.5rem;
      top: .5rem;
    }
   }
  
  //  .power {
  //   font-size: 22px;
  //   height: 1.5rem;
  //   line-height: 1.5rem;
  //   position: relative;
  //   font-weight: 500;
  //   border-bottom: 10px solid #ededed;
  //   span {
  //     position: relative;
  //     left: .5rem;
  //   }
  //   i {
  //     position: absolute;
  //     right:.5rem;
  //     top: .5rem;
  //   }
  //  }
   .message {
    font-size: 23px;
    height: 1.5rem;
    line-height: 1.5rem;
    text-align: center;
    color:#5e6d8a;
    font-weight: 600;
    background-color: #fff;
   }

  }

</style>