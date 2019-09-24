<template>
  <div class="my">
      <Swiper>
        <div class="top"></div>
        <div class="main">
          <div class="person_info">
            <div class="img">
              <img src="../../assets/images/my/logo.png" alt=""/>
            </div>
            <p v-if="isLogin">{{ phone }}</p>
            <p v-if="!isLogin" @click="goLogin">登录/注册</p>
          </div>
          <ul>
            <li @click="goOrder">
              <div class="left">
                <i class="sign_1"></i><span>我的订单</span>
              </div>
              <div class="right">
                <i class="arrow"></i>
              </div>
            </li>
            <li @click="goCard">
              <div class="left">
                <i class="sign_2"></i><span>我的银行卡</span>
              </div>
              <div class="right">
                <i class="arrow"></i>
              </div>
            </li>
            <li @click="goAddress">
              <div class="left">
                <i class="sign_3"></i><span>回寄地址</span>
              </div>
              <div class="right">
                <i class="arrow"></i>
              </div>
            </li>
            <li @click="goSuggest">
              <div class="left">
                <i class="sign_4"></i><span>意见反馈</span>
              </div>
              <div class="right">
                <i class="arrow"></i>
              </div>
            </li>
            <li class="version">
              <div class="left">
                <i class="sign_5"></i><span>系统版本</span>
              </div>
              <div class="right">
                V1.1.0
              </div>
            </li>
          </ul>
        </div>
        <Btn text="退出登录" @signOut="signOut"/>
      </Swiper>  
      <Tabbar></Tabbar>
  </div>
</template>

<script>
import Swiper from '../common/Swiper'
import Tabbar from '../common/Tabbar'
import Btn from '../common/Btn'
export default {
 name: "",
  data () {
    return {
      isLogin: false,
      phone: ""
    }
  },
  components: {
      Swiper,
      Tabbar,
      Btn
  },
  computed: {},
  watch: {},
  methods: {
    // 登录/注册
    goLogin() {
      this.$router.push("/login");
    },
    // 我的订单
    goOrder() {
      this.$router.push("/order");
    },
    // 回寄地址
    goAddress() {
      this.$router.push("/address");
    },
    // 银行卡
    goCard() {
      this.$router.push("/card");
    },
    // 意见反馈
    goSuggest() {
      this.$router.push("/suggest");
    },
    //隐藏手机中间四位
		geTel(tel) {
			return tel.substring(0, 3)+"****"+tel.substr(tel.length-4);
    },
    //退出登录
    signOut() {
      localStorage.removeItem("phone");
      localStorage.removeItem("token");
      this.isLogin = false;
    }
  },
  created () {
    this.phone = localStorage.getItem("phone");
		if(this.phone != null){
		  this.phone = this.geTel(this.phone);
		  this.isLogin = true;
    }
  },
  mounted () {},
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/my.scss';
</style>