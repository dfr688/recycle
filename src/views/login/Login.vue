<template>
  <div class="login">
      <Swiper>
      <Com tit="登录">
          <ul>
              <li>
                  <p><i class="phone_icon"></i>手机号码</p>
                  <input type="tel" placeholder="请输入您的手机号" v-model="phone"/>
              </li>
              <li>
                  <p><i class="psw_icon"></i>密码</p>
                  <input class="loginPsw" type="tel" placeholder="请输入登录密码" v-model="psw"/>
              </li>
          </ul>
          <Btn text="登录" @goLogin="goLogin"/>
          <div class="tip">还没有账号，<span @click="goRegister">立即注册</span></div>
      </Com>
      </Swiper>    
  </div>
</template>

<script>
import Com from './Com'
import Btn from '../common/Btn'
import Swiper from '../common/Swiper'
export default {
 name: "",
  data () {
    return {
        phone: "",
        psw: ""
    }
  },
  components: {
      Com,
      Btn,
      Swiper
  },
  computed: {},
  watch: {},
  methods: {
      goRegister() {
          this.$router.push("/register");
      },
      // 点击登录
    goLogin() {
      if(this.phone == ""){
        this.$toast.fail({
            message: '手机号不能为空',
            duration: 1000
        });
      }else if(this.psw == ""){
        this.$toast.fail({
            message: '密码不能为空',
            duration: 1000
        });
      }else{
        this.baseJs.ajaxReq("/phone/user/signIn",{phone:this.phone,password:this.psw},'post',"")
        .then(res => {
        // console.log(res);
          if(res.code != 20000){
            this.$toast.fail({
                message: res.msg,
                duration: 1000
            });
          }else{
          // 缓存token
          localStorage.setItem("token",res.data);
          // 缓存手机号
          localStorage.setItem("phone",this.phone);
            this.$toast.success({
                message: res.msg,
                duration: 1000
            });
            let fromRouter = localStorage.getItem("fromRouter");
            if(fromRouter === "register"){
              this.$router.push("/my");
              return;
            }
            this.$router.push({name:fromRouter});
          }
        })
        .catch(err => {
          console.log(err);
        })
      }
    }
  },
  created () {},
  mounted () {},
  beforeRouteEnter(to, from, next) {
    localStorage.setItem("fromRouter",from.name);
    next();
  }
}
</script>
<style lang="scss" scoped>
   @import '../../assets/scss/login.scss';
</style>