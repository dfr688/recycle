<template>
  <div class="addCard">
      <Swiper>
        <HeaderTop title="添加银行卡"/>
        <div class="add_info">
          <ul>
            <li>
              <div class="left">
                姓名
              </div>
              <div class="right">
                <input type="text" placeholder="请输入持卡人姓名" v-model="personName"/>
              </div>
            </li>
            <li>
              <div class="left">
                身份证号
              </div>
              <div class="right">
                <input type="text" placeholder="请输入持卡人身份证号码" v-model="idCard"/>
              </div>
            </li>
            <li>
              <div class="left">
                卡号
              </div>
              <div class="right">
                <input type="text" placeholder="请输入银行卡卡号" v-model="cardNumber"/>
              </div>
            </li>
            <li class="bank">
              <div class="left">
                所属银行
              </div>
              <div class="right">
                <select v-model="selected">
                  <option disabled value="">请选择所属银行</option>
                  <option>中国工商银行</option>
                </select>
                <i></i>
              </div>
            </li>
            <li>
              <div class="left">
                银行所在地
              </div>
              <div class="right">
                <input type="text" placeholder="请填写银行所在地" v-model="place"/>
              </div>
            </li>
            <li>
              <div class="left">
                手机号
              </div>
              <div class="right">
                <input type="text" placeholder="请输入银行预留手机号" v-model="phone"/>
              </div>
            </li>
            <li class="vcode">
              <div class="left">
                验证码
              </div>
              <div class="right">
                <input type="text" placeholder="请输入验证码" v-model="code"/>
                <div><Vcode :phone="phone"/></div>
              </div>
            </li>
          </ul>
        </div>
        <Btn text="提交" @goCard="goCard"/>
      </Swiper>  
  </div>
</template>

<script>
import Swiper from '../common/Swiper'
import HeaderTop from '../common/HeaderTop'
import Vcode from '../login/Vcode'
import Btn from '../common/Btn'
export default {
 name: "",
  data () {
    return {
      personName: "",
      idCard: "",
      cardNumber: "",
      selected: "",
      place: "",
      phone: "",
      code: ""
    }
  },
  components: {
    Swiper,
    HeaderTop,
    Vcode,
    Btn
  },
  computed: {},
  watch: {},
  methods: {
    goCard() {
      if(this.personName === ""){
        this.$toast.fail({
            message: "请输入持卡人姓名",
            duration: 1000
        });
      }else if(this.idCard === ""){
        this.$toast.fail({
            message: "请输入持卡人身份证号码",
            duration: 1000
        });
      }else if(this.cardNumber === ""){
        this.$toast.fail({
            message: "请输入银行卡卡号",
            duration: 1000
        });
      }else if(this.selected === ""){
        this.$toast.fail({
            message: "请选择银行名称",
            duration: 1000
        });
      }else if(this.place === ""){
        this.$toast.fail({
            message: "请输入银行所在地",
            duration: 1000
        });
      }else if(this.phone === ""){
        this.$toast.fail({
            message: "请输入银行预留手机号",
            duration: 1000
        });
      }else if(this.code === ""){
        this.$toast.fail({
            message: "请输入验证码",
            duration: 1000
        });
      }else{
        let token = localStorage.getItem("token");
        let data = {
          name: this.personName,
          idCardNo: this.idCard,
          cardNo: this.cardNumber,
          bankType: this.selected,
          address: this.place,
          phone: this.phone,
          smsCode: this.code
        }
        this.baseJs.ajaxReq("/phone/user/bank/card",data,"post",token)
        .then(res => {
          // console.log(res);
          if(res.code === 20000){
            this.$toast.success({
              message: res.msg,
              duration: 1000
            });
            this.$router.push("/card");
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
@import '../../assets/scss/_mixins.scss';
.addCard{
  height: 100%;
  .add_info{
    margin: 0 .4rem;
    margin-bottom: .8rem;
    ul{
      margin-top: 1rem;
      li{
        display: flex;
        font-size: $font-size-large;
        padding-bottom: .3rem;
        margin-bottom: .3rem;
        border-bottom: 1px solid #f1f1f1;
        .left{
          flex: 1;
        }
        .right{
          flex: 3;
          text-align: right;
          input{
            width: 100%;
            font-size: $font-size-large;
            text-align: right;
          }
        }
        &.bank{
          select{
            font-size: $font-size-large;
            border: none;
            direction: rtl;
            appearance:none; /*清除select默认样式 */
            -moz-appearance:none;
            -webkit-appearance:none;
          }
          i{
            display: inline-block;
            width: .32rem;
            height: .32rem;
            @include background_img("~@/assets/images/my/arrow.png");
            margin-bottom: -.04rem;
            margin-left: .05rem;
          }
        }
        &.vcode{
          .left{
            margin-bottom: .05rem;
          }
          .right{
            input{
              width: 2.4rem;
              text-align: left;
            }
            div{
              display: inline-block;
            }
          }
        }
      }
    }
  }
}
</style>