<template>
  <div class="assets">
    <div class="search">
        <i></i>
        <input type="text" placeholder="搜索您想要回收的品牌、机型型号" readonly onfocus="this.blur()" @click="goSearch"/>
        <span @click="goBack"></span>
    </div>
    <div class="wrap">
        <van-sidebar v-model="activeKey">
            <van-sidebar-item v-for="(brand,index) in brandList" :key="brand.id" :title="brand.name" @click="chooseBrand(brand.id)"/>
        </van-sidebar>
        <div class="content">
            <ul>
                <li v-for="(model,index) in modelList" :key="model.id" @click="goProductAssets(model.id)">
                   <i :class="{hot:0===index || 1===index || 2===index}"></i>{{ model.name }}
                </li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script>
export default {
 name: "",
  data () {
    return {
        activeKey: 0,
        brandList: [],
        modelList: [],
        firstId: ""
    }
  },
  components: {
     
  },
  computed: {},
  watch: {},
  methods: {
      goBack() {
          this.$router.push("/home");
      },
	  // 搜索
	  goSearch() {
		  this.$router.push("/search");
	  },
      goProductAssets(id) {
          let modelId = id;
          this.$router.push({name:"productassets",query:{modelId:modelId}});
      },
    //获取型号
      chooseBrand(id) {
          let brandId = id;
          this.baseJs.httpReq("/phone/brand/",{},brandId,"model","get","")
          .then(res => {
            // console.log(res);
              if(res.code === 20000){
                  this.modelList = res.data;
              }
          })
          .catch(err => {
              console.log(err);
          })
      }
  },
  created () {
    //获取品牌列表   
      this.baseJs.ajaxReq("/phone/brand",{},"get","")
      .then(res => {
        // console.log(res);
          if(res.code === 20000){
            this.brandList = res.data;
            this.firstId = this.brandList[0].id;
            this.chooseBrand(this.firstId);
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
@import '../../assets/scss/assets.scss';
</style>