<template>
    <div class="verifyLogin">
        <div class="back" @click="goBack"></div>
        <div class="title">登录</div>
        <div class="phone_info">
            <div class="input_box">
                <input type="text" placeholder="请输入手机号" v-model="phone"/>
            </div>
            <div class="tips">未注册的手机号验证后自动创建账户</div>
        </div>
        <div class="next_btn" v-if="isShow" @click="goNext">下一步</div>
        <Btn text="下一步" v-if="!isShow" @goNextStep="goNextStep"/>
        <div class="server">点击下一步即表示同意<span>《用户服务协议》</span></div>
    </div>
</template>

<script>
import Btn from '../common/Btn'
export default {
 name: "",
  data () {
    return {
        isShow: true,
        phone: ""
    }
  },
  components: {
      Btn
  },
  computed: {},
  watch: {},
  methods: {
      goNext() {
          this.$toast.fail({
            message: "请输入手机号",
			duration: 1000
          });
      },
      goNextStep() {
          if(!/^1[3-9]\d{9}$/.test(this.phone)){
              this.$toast.fail({
                message: "请输入正确的手机号",
                duration: 1000
            });
          }else{
              this.$router.push({name: "sendcode",query:{phone:this.phone}});
          }
      },
      goBack() {
          this.$router.go(-1);
      }
  },
  watch: {
      phone(newV,oldV) {
          if(newV !== ""){
              this.isShow = false;
          }else{
              this.isShow = true;
          }
      }
  },
  created () {},
  mounted () {},
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/_mixins.scss';
    .verifyLogin{
        width: 6.7rem;
        height: 100%;
        margin: 0 auto;
        font-size: $font-size-large;
        position: relative;
        .back{
            position: absolute;
            top: 1rem;
            left: 0;
            width: .4rem;
            height: .4rem;
            @include background_img("~@/assets/images/home/back.png");
        }
        .title{
            font-size: .46rem;
            text-align: center;
            padding-top: 2rem;
        }
        .phone_info{
            margin-top: 1rem;
            .input_box{
                padding-bottom: .2rem;
                border-bottom: 1px solid #f1f1f1;
                input{
                    font-size: $font-size-large;
                    width: 100%;
                }
            }
            .tips{
                font-size: $font-size-small;
                margin-top: .1rem;
                margin-bottom: 1.2rem;
            }
        }
        .next_btn{
            width: 100%;
            height: 1rem;
            line-height: 1rem;
            text-align: center;
            background: #e5e5e5;
            border-radius: .5rem;
            font-size: .4rem;
            color: #fff;
        }
        .server{
            font-size: $font-size-small;
            text-align: center;
            margin-top: .2rem;
            span{
                color: #f82828;
            }
        }
    }
</style>