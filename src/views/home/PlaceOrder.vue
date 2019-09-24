<template>
  <div class="placeOrder">
      <Swiper>
          <HeaderTop title="下单"/>
          <div class="assets_price">
              <p>{{ productName }}</p>
              <span>¥ {{ price }}</span>
              <div @click="goProductAssets">重新估价</div>
          </div>
          <div class="remind">官方提醒您：该机型预计下月跌幅为400元</div>
          <div class="basic_info">
              <p>该机型基础信息</p>
              <ul>
                  <li v-for="(item,index) in infoList" :key="index">
                      {{ item }}
                  </li>
              </ul>
          </div>
          <div class="attention">
              <p class="title">注意事项</p>
              <ul>
                  <li>
                      <i class="clear"></i>
                      <p>清理数据</p>
                      <span>请备份手机内的重要数据并为您的设备充满电，方便快速质检。</span>
                  </li>
                  <li>
                      <i class="lock"></i>
                      <p>解锁设备账号和密码</p>
                      <span>解锁开机密码并接触设备账号（iCloud、小米、华为等）</span>
                  </li>
              </ul>
          </div>
          <Btn text="立即下单" @placeOrder="placeOrder"/>
      </Swiper>    
  </div>
</template>

<script>
import Swiper from '../common/Swiper'
import HeaderTop from '../common/HeaderTop'
import Btn from '../common/Btn'
import { Dialog } from 'vant';
export default {
 name: "",
  data () {
    return {
        productName: "",
        price: "",
        infoList: [],
        id: ""
    }
  },
  components: {
      Swiper,
      HeaderTop,
      Btn
  },
  computed: {},
  watch: {},
  methods: {
      goProductAssets() {
          this.$router.go(-1);
      },
      placeOrder() {
            let token = localStorage.getItem("token");
            this.baseJs.ajaxReq("/phone/order",{modelId:this.id,estimatedPrice:this.price},"put",token)
            .then(res => {
                // console.log(res);
                if(res.code === 20000 ){
                    Dialog.alert({
                        title: '下单成功',
                        message: '前往我的订单查看详情'
                    }).then(() => {
                        this.$router.push("/order");
                    });
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
  },
  created () {
      this.productName = this.$route.query.nameV;
      this.price = this.$route.query.price;
      this.infoList = this.$route.query.infoList;
      this.id = this.$route.query.id;
  },
  mounted () {},
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/placeorder.scss';
</style>