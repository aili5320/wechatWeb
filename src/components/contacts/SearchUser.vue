<template>
  <div class="center">
    <div class="title">
      <van-icon name="arrow-left" class="arrow" @click="goBlack" />
      <van-icon name="ellipsis"  />
    </div>
    <div class="userInfo">
      <div class="userPic">
        <img :src="searchUser.userPic" alt="">
      </div>
      <div class="info">
        <div class="username"> {{ searchUser.realName
 }} </div>
        <div class="account">{{ searchUser.userName }}</div>
        <!-- <div class="address">地区：{{ userInfo.address }}</div> -->
        <div class="address">地区：武汉</div>
      </div>
    </div>
    <div class="remark">
      <span>备注和标签</span>
      <van-icon name="arrow" />
    </div>
    <div class="power">
      <span>个性签名</span>
      <van-icon name="arrow" />
      <span class="tip">{{ searchUser.remark }}</span>
    </div>
    <div class="power">
      <span>来源</span>
      <van-icon name="arrow" />
      <span class="tip">来自账号搜索</span>
    </div>
    <div class="power">
      <span>更多信息</span>
      <van-icon name="arrow" />
      <van-icon name="phone-o"  class="phone"/>
    </div>
      
   <router-link :to="{path:'/apply',query:{searchUser:searchUser}}">
    <div class="message" >
      <span >添加到通讯录</span>
    </div>
  </router-link>
  </div>
</template>

<script>
export default {
   // eslint-disable-next-line vue/multi-word-component-names
   name:"SearchUser",
   data(){
    return {
      searchUser: {}
    }
   },
   methods:{
    goBlack() {
      this.$router.go(-1);
    },
   },
   created() {
    this.searchUser = JSON.parse(localStorage.getItem("searchUser")); 
  
  },
}
</script>

<style lang="less" scoped>
  .center {
    min-height: 100vh;
    background-color: #ededed;
    .title {
    width: 100%;
    height: 1.5rem;
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
    background-color: #fff;
    margin-top: 1px;
    font-size: 22px;
    height: 1.5rem;
    line-height: 1.5rem;
    position: relative;
    font-weight: 500;
    margin-bottom: 10px;
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
  
   .power {
    background-color: #fff;
    font-size: 22px;
    height: 1.5rem;
    line-height: 1.5rem;
    position: relative;
    font-weight: 500;
    span {
      position: absolute;
      left: .5rem;
    }
    i {
      position: absolute;
      right:.5rem;
      top: .5rem;
    }
    .tip {
      font-size: 16px;
      color:#9e9e9e;
      margin-left: 3rem;
    }
    .phone{
      left:3.5rem;
    }
   }
   .message {
    font-size: 23px;
    height: 1.5rem;
    line-height: 1.5rem;
    text-align: center;
    color:#5e6d8a;
    margin-top: 10px;
    background-color: #fff;
    font-weight: 600;
   }
  }

</style>