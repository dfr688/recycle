<template>
  <div class="order">
      <Swiper>
        <HeaderTop title="订单详情"/>
        <div class="order_list">
            <ul>
                <li v-for="(order,index) in orderList" :key="order.id" @click="goOrderDetail(order.modelName,order.estimatedPrice,order.id,order.status,order.createTime)" v-if="order.status !==0">
                    <div class="left">
                        <p class="time">{{ order.createTime }}</p>
                        <div class="wrap">
                            <div class="img"><img :src="order.iconUrl" alt=""/></div>
                            <div class="info">
                                <p>{{ order.modelName }}</p>
                                <p>¥ {{ order.estimatedPrice }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <p>{{ status[order.status] }}</p>
                        <i></i>
                    </div>
                </li>
            </ul>
        </div>
      </Swiper>
  </div>
</template>

<script>
import HeaderTop from '../common/HeaderTop'
import Swiper from '../common/Swiper'
const status = ["已取消","待发货","待质检","待确认","完成"];
export default {
 name: "",
  data () {
    return {
        status: status,
        orderList: []
    }
  },
  components: {
      HeaderTop,
      Swiper
  },
  computed: {},
  watch: {},
  methods: {
      goOrderDetail(name,price,id,stepIndex,time) {
          this.$router.push({name: "orderdetail",query:{productName:name,price:price,orderId:id,stepIndex:stepIndex,time:time}});
      }
  },
  created () {
      let token = localStorage.getItem("token");
      this.baseJs.ajaxReq("/phone/order",{},"get",token)
      .then(res => {
        // console.log(res);
          if(res.code === 20000){
              this.orderList = res.data;
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
.order{
    height: 100%;
    .order_list{
        margin-top: .4rem;
        ul{
            li{
                width: 6.7rem;
                padding: .4rem .2rem;
                margin: 0 auto;
                margin-bottom: .2rem;
                border-radius: .1rem;
                background: #fff;
                box-shadow: $box-shadow2;
                @include flex;
                font-size: $font-size-small;
                .left{
                    .time{
                        color: #999;
                    }
                    .wrap{
                        display: flex;
                        margin-top: .2rem;
                        .img{
                            width: 1.2rem;
                            height: 1.2rem;
                            background: #fff;
                            box-shadow: $box-shadow1;
                            border-radius: .1rem;
                            margin-right: .2rem;
                            img{
                                width: 100%;
                                height: 100%;
                                border-radius: .1rem;
                            }
                        }
                        .info{
                            padding-top: .1rem;
                            p{
                                font-size: .36rem;
                                &:first-child{
                                    margin-bottom: .1rem;
                                }
                            }
                        }
                    }
                }
                .right{
                    text-align: right;
                    color: #097962;
                    i{
                        display: inline-block;
                        width: .32rem;
                        height: .32rem;
                        @include background_img("~@/assets/images/my/arrow.png");
                        margin-top: .8rem;
                    }
                }
            }
        }
    }
}
</style>