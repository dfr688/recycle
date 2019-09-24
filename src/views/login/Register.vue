<template>
  <div class="login register">
      <Swiper>
      <Com tit="注册">
          <ul>
              <li>
                  <p><i class="phone_icon"></i>手机号码</p>
                  <input type="tel" placeholder="请输入您的手机号" v-model="phone"/>
              </li>
              <li>
                  <p><i class="psw_icon"></i>密码</p>
                  <input class="registerPsw" type="tel" placeholder="请输入登录密码" v-model="psw"/>
              </li>
              <li class="vcode">
                  <p><i class="code_icon"></i>验证码</p>
                  <div class="wrap">
                    <input type="tel" placeholder="请输入验证码" v-model="code"/>
                    <div><Vcode :phone="phone"/></div>
                  </div>
              </li>
          </ul>
          <Btn text="注册" @goRegister="goRegister"/>
          <div class="user_server">注册代表已同意<span @click="goPrivacy">《用户服务协议》</span></div>
          <div class="tip">还没有账号，<span @click="goLogin">立即登录</span></div>
      </Com>  
      </Swiper>
  </div>
</template>

<script>
import Com from './Com'
import Btn from '../common/Btn'
import Swiper from '../common/Swiper'
import Vcode from './Vcode'
export default {
 name: "",
  data () {
    return {
        phone: "",
        psw: "",
        code: ""
    }
  },
  components: {
    Com,
    Btn,
    Swiper,
    Vcode
  },
  computed: {},
  watch: {},
  methods: {
    goPrivacy() {
      this.$router.push("/privacy");
    },
      goLogin() {
          this.$router.push("/login");
      },
      // 点击注册
      goRegister() {
        if(this.phone == ""){
            this.$toast.fail({
              message: "手机号不能为空",
              duration: 1000
            });
        }else if(this.psw == ""){
             this.$toast.fail({
              message: "密码不能为空",
              duration: 1000
            });
        }else if(!/^[0-9]{6,18}$/.test(this.psw)){
            this.$toast.fail({
              message: "请输入6到18位数字！",
              duration: 1000
            });
        }else if(this.code == ""){
             this.$toast.fail({
              message: "验证码不能为空",
              duration: 1000
            });
        }else{
            this.baseJs.ajaxReq("/phone/user/signUp",{phone:this.phone,password:this.psw,smsCode:this.code},'post',"")
            .then(res => {
                // console.log(res);
                if(res.code != 20000){
                    this.$toast.fail({
                      message: res.msg,
                      duration: 1000
                    });
                }else{
                    this.$toast.success({
                      message: res.msg,
                      duration: 1000
                    });
                    this.$router.push("/login");
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
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/login.scss';
</style>