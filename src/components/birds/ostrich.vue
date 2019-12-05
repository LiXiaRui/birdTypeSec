<template>
  <div class="hello">
      <el-container>
        <el-main> 
            <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="item in tuoniaoList" :key="item.index">
                    <el-image :src="item.imgTest"></el-image>
                </el-carousel-item>
            </el-carousel>
            <div class="title">
                <h1>{{msg}}</h1>
            </div>
            <el-collapse v-model="activeName" accordion>
                <el-collapse-item title="鸵鸟目" name="1">
                    <div>鸵鸟目(Struthionformes) ，仅鸵鸟科一科，仅一种，即非洲鸵鸟，现存最大的鸟。鸵鸟目只有鸵鸟一种，是大家最熟悉的走禽，也是现存最大的鸟，身高可达2.5米，体重达135千克，卵重超过1.3千克。</div>
                    <div>鸵鸟主要产于非洲，但在史前时期曾经出现在中国。鸵鸟擅长奔跑，腿部裸露，只有两个脚趾。</div>
                </el-collapse-item>
                <el-collapse-item title="美洲鸵鸟目" name="2">
                    <div>美洲鸵鸟目(Rheiformes)1科2种，美洲最大的鸟。</div>
                    <div>美洲鸵鸟目只有美洲鸵鸟科(Rheidae)一科，分大美洲鸵和小美洲鸵两种。</div>
                    <div>大美洲鸵是美洲最大的鸟，但比鸵鸟要小得多，体重只有25千克。小美洲驼体型更小，是体型最小的大型走禽。</div>
                    <div>美洲鸵鸟有三个脚趾，又被称作三趾鸵鸟，虽然也不会飞，翼却比较发达。</div>
                </el-collapse-item>
            </el-collapse>
        </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '鸵鸟科',
      activeName: '1',
      tuoniaoList: [
        {
        'imgTest': require("@/assets/test1.jpg"),
        'index': 1
        },
        {
        'imgTest': require("@/assets/test2.jpg"),
        'index': 2
        },
        {
        'imgTest': require("@/assets/test3.jpg"),
        'index': 3
        },
        {
        'imgTest':  require("@/assets/test4.jpg"),
        'index': 4
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-carousel__item h3 {
color: #475669;
font-size: 14px;
opacity: 0.75;
line-height: 200px;
margin: 0;
}

.el-carousel__item:nth-child(2n) {
background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
background-color: #d3dce6;
}
.el-main{
    position: relative;
}
.title{
    position: relative;
    height: 100px;
    text-align: center;
    font-size: 40px;
    font-family: 楷体;
}
.introduce{
    position: relative;
    margin-top: 300px;
}
</style>
