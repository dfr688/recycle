<template>
  <div class="card">
    <Swiper>
        <HeaderTop title="我的银行卡"/>
        <div class="remind" v-if="!hasCard">
            <i></i>
            暂无银行卡信息
        </div>
        <div class="add_btn" @click="goAddCard" v-if="!hasCard">
           <van-button type="primary">添加银行卡</van-button>
        </div>
        <div class="bank_card" v-if="hasCard">
            <ul>
                <li>
                    <div class="left">
                        <img src="../../assets/images/my/bank_1.png" alt=""/>
                    </div>
                    <div class="right">
                        <p>{{ cardDetail.bankType }}</p>
                        <span>储蓄卡</span>
                        <div>
                            {{ card }}
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="tips" v-if="hasCard">
            交易将全部结算至此账户,必须为储蓄卡
        </div>
    </Swiper>    
  </div>
</template>

<script>
import Swiper from '../common/Swiper'
import HeaderTop from '../common/HeaderTop'
export default {
 name: "",
  data () {
    return {
        hasCard: true,
        cardDetail: "",
        card: ""
    }
  },
  components: {
      Swiper,
      HeaderTop
  },
  computed: {},
  watch: {},
  methods: {
      goAddCard() {
          this.$router.push("/addcard");
      },
       // 隐藏银行卡号 四位
      getNum(num) {
        return "****"+" "+"****"+" "+"****"+" "+num.substr(num.length-4);
      }
  },
  created () {
      let token = localStorage.getItem("token");
      this.baseJs.ajaxReq("/phone/user/bank/card",{},"get",token)
      .then(res => {
        //   console.log(res);
          if(res.code === 20000){
              if(res.data == null){
                  this.hasCard = false;
              }else{
                  this.hasCard = true;
              }
            this.cardDetail = res.data;
            this.card = this.getNum(this.cardDetail.cardNo);
          }
      })
      .catch(err => {
          console.log(err);
      })
  },
  mounted () {},
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/_mixins.scss';
    .card{
        height: 100%;
        .remind{
            font-size: $font-size-middle;
            text-align: center;
            color: #999;
            margin-top: 3rem;
            i{
                display: block;
                width: 1.62rem;
                height: 1.28rem;
                @include background_img("~@/assets/images/my/no.png");
                margin: 0 auto;
                margin-bottom: .2rem;
            }
        }
        .add_btn{
           width: 3rem;
           margin: 0 auto;
           margin-top: 2rem;
           height: .88rem;
           font-size: .3rem;
           .van-button{
               width: 100%;
               height: 100%;
               line-height: 100%;
               border-radius: .1rem;
               font-size: .3rem;
               border: none;
               background: #097962;
           }
        }
        .bank_card{
            width: 6.7rem;
            margin: 0 auto;
            margin-top: .8rem;
            background-image: linear-gradient(90deg, #ffad7a 0%, #fd6c6d 100%), linear-gradient(#ff7c70, #ff7c70);
	        box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.1);
            border-radius: .2rem;
            padding: .5rem 0;
            padding-left: .4rem;
            ul{
                li{
                    display: flex;
                    font-size: .36rem;
                    color: #fff;
                    .left{
                        width: 1rem;
                        height: 1rem;
                        background: #fff;
                        border-radius: 100%;
                        position: relative;
                        margin-right: .3rem;
                        img{
                            width: .8rem;
                            height: .8rem;
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            margin-top: -.4rem;
                            margin-left: -.4rem;
                        }
                    }
                    .right{
                        span{
                            font-size: .22rem;
                            display: inline-block;
                            margin-top: .16rem;
                            margin-bottom: .7rem;
                        }
                    }
                }
            }
        }
        .tips{
            color: #666;
            font-size: .24rem;
            margin-left: .4rem;
            margin-top: .2rem;
        }
    }
</style>