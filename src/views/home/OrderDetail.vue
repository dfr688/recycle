<template>
  <div class="orderDetail">
      <Swiper>
          <HeaderTop title="订单详情"/>
          <div class="states" v-if="0 === active">
              <p>订单待发货</p>
              <span>请尽快投递您的宝贝</span>
          </div>
          <div class="states" v-if="1 === active">
              <p>物流运输中</p>
              <span>预计4天到货</span>
          </div>
          <div class="order_step">
            <van-steps
            :active="active"
            >
                <van-step>下单成功</van-step>
                <van-step>寄件投递</van-step>
                <van-step>收货质检</van-step>
                <van-step>快速放款</van-step>
            </van-steps>
          </div>
          <div class="product_detail" v-if="0 === active || 1 === active">
              <p><span>手机型号：</span>{{ name }}</p>
              <p><span>手机估价：</span>¥ {{ price }}</p>
          </div>
          <div class="cost" v-if="3 === active">
              <p>¥ 3200</p>
              <span>钱款已打入您的银行卡账户</span>
          </div>
          <div class="product_detail" v-if="2 === active || 3 === active">
              <p><span>手机型号：</span>iPhone XS Max</p>
              <p><span>手机估价：</span>¥ 5248</p>
              <p><span>最终报价：</span>¥ 3200</p>
          </div>
          <div class="address" v-if="0 === active">
              <div class="address_detail">
                  <p class="tit">手机回收地址</p>
                  <ul>
                      <li>
                          <span>收货人：</span><p>马先生</p>
                      </li>
                      <li>
                          <span>联系电话：</span><p>021-803313390</p>
                      </li>
                      <li>
                          <span>收货地址：</span><p>江苏省常州市天宁区华阳南路常州检验检测产业园2楼</p>
                      </li>
                  </ul>
              </div>
              <ul class="btn">
                  <li @click="goCancel">
                      取消订单
                  </li>
                  <li @click="goSendGoods">
                      去发货
                  </li>
              </ul>
          </div>
          <div class="address" v-if="1 === active">
              <div class="address_detail logistics">
                  <p class="tit">物流信息</p>
                  <van-steps direction="vertical" :active="0">
                        <van-step>
                            <h3>等待揽件</h3>
                            <p>{{ time }}</p>
                        </van-step>
                    </van-steps>
              </div>
          </div>
          <div class="quality" v-if="2 === active">
              <p>质检说明</p>
              <div>
                  该手机听筒不正常，且更换过电池与提交的描述有差异，根据差异扣款重新给到报价，您可以根据给到的报价继续交易或申请取消订单，我们会将手机退还给您。
              </div>
              <ul>
                  <li>
                      申请退货
                  </li>
                  <li>
                      确认成交
                  </li>
              </ul>
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
        active: "",
        name: "",
        price: "",
        orderId: "",
        time: ""
    }
  },
  components: {
      Swiper,
      HeaderTop
  },
  computed: {},
  watch: {},
  methods: {
    //取消订单
    goCancel() {
        let token = localStorage.getItem("token");
        this.baseJs.httpReq("/phone/order",{},this.orderId,"cancel","post",token)
        .then(res => {
            // console.log(res);
            if(res.code === 20000){
                this.$toast.success({
                    message: "取消成功",
                    duration: 1000
                });
                this.$router.push("/order");
            }
        })
        .catch(err => {
            console.log(err);
        })
    },
    //去发货
    goSendGoods() {
        this.$router.push({name:"sendgoods",query:{orderId:this.orderId}});
    }
  },
  created () {
      this.name = this.$route.query.productName;
      this.price = this.$route.query.price;
      this.orderId = this.$route.query.orderId;
      this.active = this.$route.query.stepIndex-1;
      this.time = this.$route.query.time;
  },
  mounted () {},
}
</script>
<style lang="scss" scoped>
    @import '../../assets/scss/orderDetail.scss';
</style>