<template>
  <div class="firstPage" style="min-width:1200px;">
    <el-container class="container">
        <el-header>
            <el-image :src="birdTitle"></el-image>
            <el-divider></el-divider>
        </el-header>
        <el-container class="containerSecd">
            <el-aside class="menu" width="230px">
                <el-row class="tac">
                    <el-col :span="12">
                        <h5>鸟类标注</h5>
                        <el-menu
                        :default-active="this.$route.path"
                        router
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose">
                            <el-submenu index="1">
                                <template slot="title">
                                    <i class="el-icon-location"></i>
                                    <span>鸟类类型</span>
                                </template>
                                <el-menu-item-group>
                                    <template slot="title">古颚总目</template>
                                    <el-submenu index="1-1">
                                        <template slot="title">鸵鸟目</template>
                                        <el-menu-item index="ostrich" @click="goTo('/ostrich')">鸵鸟科</el-menu-item>
                                    </el-submenu>
                                    <el-submenu index="1-2">
                                        <template slot="title">鹤鸵目</template>
                                        <el-menu-item index="1-2-1">鹤鸵科</el-menu-item>
                                        <el-menu-item index="1-2-2">鸸鹋科</el-menu-item>
                                    </el-submenu>
                                    <el-submenu index="1-3">
                                        <template slot="title">无翼鸟目</template>
                                        <el-menu-item index="1-3-1">无翼鸟科</el-menu-item>
                                    </el-submenu>
                                </el-menu-item-group>
                                <el-menu-item-group>
                                    <template slot="title">楔翼总目</template>
                                    <el-submenu index="1-4">
                                        <template slot="title">企鹅目</template>
                                        <el-menu-item index="1-4-1">企鹅科</el-menu-item>
                                    </el-submenu>
                                </el-menu-item-group>
                                <el-menu-item-group>
                                    <template slot="title">今颚总目</template>
                                    <el-submenu index="1-5">
                                        <template slot="title">潜鸟目</template>
                                        <el-menu-item index="1-5-1">潜鸟科</el-menu-item>
                                    </el-submenu>
                                    <el-submenu index="1-6">
                                        <template slot="title">鸊鷉目</template>
                                        <el-menu-item index="1-6-1">鸊鷉科</el-menu-item>
                                    </el-submenu>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="2">
                                 <template slot="title">
                                    <i class="el-icon-menu"></i>
                                    <span>鸟类标注</span>
                                </template>
                                <el-menu-item-group>
                                    <!-- <router-link to="/birdsort">test</router-link> -->
                                    <el-menu-item index="/birdsort">
                                        <template slot="title" @click="goTo('/birdsort')">图片分类</template>
                                    </el-menu-item>
                                    <el-menu-item index="/birdsound">
                                        <template slot="title" @click="goTo('/birdsound')">音频分类</template>
                                    </el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-menu-item index="3" disabled>
                                <i class="el-icon-document"></i>
                                <span slot="title">导航三</span>
                            </el-menu-item>
                            <el-menu-item index="4">
                                <i class="el-icon-setting"></i>
                                <span slot="title">导航四</span>
                            </el-menu-item>
                        </el-menu>
                    </el-col>
                </el-row>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios'
import birdsort from '@/components/birdsort'
import birdsound from '@/components/birdsound'
export default {
  name: 'HelloWorld',
 
  data () {
    return {
      msg: '鸟类类型标注系统',
      birdTitle: require("@/assets/title.jpg"),    
    }
  },
  
  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      goTo(path) {
      this.$router.replace(path);
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
    position: relative;
    width: 80%;
    height: 1000px;
    left: 10%;
    /* background-color: antiquewhite; */
}
.header{
    height: 80px;
    background-color: #fff;
    color: #fff;
    top: 0;
    left: 0;
    width: 100%;
    line-height: 80px;
    z-index: 100;
    position: relative;
}
.h1{
    margin: 0;
    float: left;
    font-size: 32px;
    font-weight: 400;
}
.el-image{
    width: 120px;
    height: 80px;
    top:20px;
}
.el-divider{
    position: relative;
}
.containerSecd{
    position: relative;
    top: 50px;
    height: 1000px;
    /* background-color: rgb(194, 187, 177); */
}
.menu{
    position: relative;
    left: 0;
    top:0;
    height: 1000px;
    /* background-color: aquamarine; */
}
.el-col-12{
    width: 100%;
}
</style>
