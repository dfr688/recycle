<template>
  <div class="search">
    <div class="back" @click="goBack"></div>
    <form action="aa.php">
        <van-search
            v-model="value"
            placeholder="请输入搜索关键词"
            show-action
            shape="round"
            @search="onSearch(value,1)"
            >
            <div slot="action" @click="onSearch(value,1)">搜索</div>
        </van-search>
    </form>
    <div class="hot_search" v-if="show">
        <p>热门搜索</p>
        <ul>
            <li v-for="(product,index) in productList" :key="product.id" @click="goProductAssets(product.id)">
                {{ product.name }}
            </li>
        </ul>
    </div>
    <div class="wrap" v-if="isSee">
        <Swiper>
            <div class="list">
                <ul>
                    <li v-for="(item,index) in productList" :key="item.id" @click="goProductAssets(item.id)">
                        {{ item.name }}
                    </li>
                </ul>
            </div>
        </Swiper>    
    </div>
    <div class="nothing" v-if="isHas">
        <div></div>
        <p>暂无此产品</p>
    </div>
  </div>
</template>

<script>
import Swiper from '../common/Swiper'
export default {
 name: "",
  data () {
    return {
        value: "",
        productList: [],
        show: true,
        isSee: false,
        isHas: false
    }
  },
  components: {
      Swiper
  },
  computed: {},
  watch: {},
  methods: {
      goBack() {
          this.$router.push("/home");
      },
      onSearch(value,num) {
          this.baseJs.ajaxReq("/phone/model/search",{name:value},"get","")
          .then(res => {
            // console.log(res);
              if(num === 1){
                  this.show = false;
				  this.isSee = true;
              }else if(num === 0){
                  this.show = true;
				  this.isSee = false;
              }
              if(res.code === 20000){
                  if(res.data.length === 0){
                      this.isHas = true;
					  this.isSee = false;
                  }else{
                      this.isHas = false;
                  }
                  this.productList = res.data;
              }
          })
          .catch(err => {
              console.log(err);
          })
      },
      goProductAssets(id) {
          this.$router.push({name:"productassets",query:{modelId:id}});
      }
  },
  created () {
    this.onSearch("iphone",0);
  },
  mounted () {},
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/_mixins.scss';
    .search{
        height: 100%;
        .back{
            display: inline-block;
            width: .4rem;
            height: .4rem;
            @include background_img("~@/assets/images/home/back.png");
            margin-left: .4rem;
            margin-bottom: -.2rem;
        }
        form{
            width: 95%;
            margin: 0 auto;
            margin-top: .2rem;
        }
        .hot_search{
            font-size: $font-size-middle;
            width: 85%;
            margin: 0 auto;
            margin-top: .2rem;
            p{
                font-size: .36rem;
                color: #999;
            }
            ul{
                display: flex;
                flex-wrap: wrap;
                margin-top: .2rem;
                li{
                    width: 30%;
                    height: .8rem;
                    line-height: .8rem;
                    text-align: center;
                    background: #f8f8f8;
                    border-radius: .2rem;
                    margin: .1rem;
                }
            }
        }
        .wrap{
            width: 80%;
            margin: 0 auto;
            height: 87%;
            .list{
                font-size: .3rem;
                ul li{
                    padding-bottom: .2rem;
                    border-bottom: 1px solid #f1f1f1;
                    margin: .4rem 0;
                }
            }
        }
        .nothing{
            font-size: .3rem;
            color: #999;
            text-align: center;
			margin-top: 2rem;
            div{
                width: 1.62rem;
                height: 1.28rem;
                margin: 0 auto;
                @include background_img("~@/assets/images/my/no.png");
                margin-bottom: .2rem;
            }
        }
    }
</style>