<template>
  <div class="sendCode">
      <div class="back" @click="goBack"></div>
      <div class="title">输入短信验证码</div>
      <div class="prompt">验证码已发送至 <span>(+86) {{ phone }}</span></div>
      <div class="code_info">
          <div class="input_box">
              <input type="text" v-model="code"/>
          </div>
          <div class="count_down">
              <VcodeDiff/>
          </div>
      </div>
      <div class="next_btn" v-if="isShow" @click="goNext">下一步</div>
      <Btn text="下一步" v-if="!isShow" @goStep="goStep"/>
  </div>
</template>

<script>
import VcodeDiff from './VcodeDiff'
import Btn from '../common/Btn'
export default {
 name: "",
  data () {
    return {
        phone: "",
        isShow: true,
        code: ""
    }
  },
  components: {
      VcodeDiff,
      Btn
  },
  computed: {},
  watch: {
      code(newV,oldV){
          if(newV !== ""){
              this.isShow = false;
          }else{
              this.isShow = true;
          }
      }
  },
  methods: {
      goBack() {
          this.$router.go(-1);
      },
      goNext() {
          this.$toast.fail({
            message: "请输入验证码",
			duration: 1000
          });
      },
      goStep() {
          
      }
  },
  created () {
      this.phone = this.$route.query.phone;
  },
  mounted () {},
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/_mixins.scss';
.sendCode{
    position: relative;
    width: 6.7rem;
    height: 100%;
    margin: 0 auto;
    font-size: $font-size-large;
    .back{
        position: absolute;
        top: 1rem;
        left: 0;
        width: .4rem;
        height: .4rem;
        @include background_img("~@/assets/images/home/back.png");
    }
    .title{
        text-align: center;
        font-size: .46rem;
        padding-top: 2rem;
    }
    .prompt{
        text-align: center;
        margin-top: .2rem;
        span{
            color: #f82828;
        }
    }
    .code_info{
        width: 80%;
        margin: 1rem auto;
        margin-bottom: 1.2rem;
        @include flex;
        .input_box{
            width: 50%;
            border-bottom: 1px solid #f1f1f1;
            input{
                width: 100%;
                font-size: $font-size-large;
                text-align: center;
            }
        }
        .count_down{
            width: 50%;
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
}
</style>