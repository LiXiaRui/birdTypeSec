<template>
    <div :style="styleObject">
        <el-container>
            <el-main>
                <div class="container">
                    <div class="picture">
                        <div class="title">
                            <h1>{{ msg }}</h1>
                        </div>
                        <div class="demo-image__placeholder">
                            <!--放置判断内容 -->
                            <div class="block">
                                <!-- <el-image :src=Aico></el-image> -->
                                <el-image :src="birdTest"></el-image>      
                                <AudioPlayer :audio-list="audioList"
                                             :before-play="onBeforePlay" />                         
                            </div>
                            <!--放置样本内容 -->
                            <div class="block">
                                <el-image :src="birdSample"></el-image>
                                <!-- <el-image :src=Mico></el-image> --> 
                                <div class="typename">
                                    <span class="demonstration">{{Mname}}</span>
                                </div>                         
                            </div>
                            
                        </div>
                    </div>
                    <div class="choose">
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
                            <el-form-item label="分类是否正确" prop="resource" style="width:100%;margin-left:20%;font-size:20px;">
                                <el-radio-group v-model="ruleForm.resource" style="margin-right:10%;">
                                    <el-radio label="是"></el-radio>
                                    <el-radio label="否">
                                        <el-select v-model="value" placeholder="请选择正确的类型">
                                            <el-option
                                            v-for="item in birdtype"
                                            :key="item.birdno"
                                            :label="item.birdname"
                                            :value="item.birdno">
                                            </el-option>
                                        </el-select>
                                    </el-radio> 
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item class="updown">
                                <el-button type="primary" @click="submitForm('ruleForm'),resetForm('ruleForm'),lastPage()" class="next" style="background-color:white;color:black;">上一条</el-button>
                                <el-button type="primary" @click="submitForm('ruleForm'),resetForm('ruleForm'),nextPage()" class="next" style="background-color:white;color:black;">下一条</el-button>  
                                <el-button type="primary" @click="submitForm('ruleForm')" class="next" style="background-color:white;color:black;">提  交</el-button>                              
                            </el-form-item>
                        </el-form>
                    </div>
                </div>    
            </el-main>
        </el-container>  
    </div>
</template>

<script>
import axios from 'axios'
import { AudioPlayer } from '@liripeng/vue-audio-player'
import '@liripeng/vue-audio-player/lib/vue-audio-player.css'

    export default {
        name: 'birdsort',
        components: {
            AudioPlayer
        },
        data () {
            return {
                styleObject: {
                    height: '900px'
                },
                 msg: '鸟类类型标注系统',
                 birdTest: require("@/assets/test1.jpg"),
                 birdSample: require("@/assets/sample.jpg"),
                 ruleForm: {
                    resource: ''
                },
                rules: {
                    resource: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ]
                },
                Mico: '',
                Aico: '',
                Mname: '',
                Aname: '',
                N: 1,
                S: 1,
                birdtype: [],
                value: '' ,
                dataNo: '',
                arresult: '',
                modelresult: '',
                audioList: [
                    
                ]    
            };
        },
        //从后端获取图片的数据
        created(){
            this.page();

            //从后端获取鸟的种类信息，提供给分类选择
            var url = '/api/birdLabel/v1/bird/info/list';
                axios.get(url)
                        //then获取成功；response成功后的返回值（对象）
                .then(response=>{
                    console.log(response);
                    this.birdtype=response.data;
                    console.log(this.birdtype);
                    console.log(this.value);
                })
                        //获取失败
                .catch(error=>{
                    console.log(error);
                    alert('网络错误，不能访问');
                })
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert("success");
                    console.log(this.ruleForm);
                    console.log(this.ruleForm.resource); 
                    console.log("value:"+this.value); 
                    console.log(this.arresult);
                    if (this.ruleForm.resource == "是"){
                        //返回this.dataNo  把this.modelresult赋值给this.arresult,然后返回this.arresult
                        this.arresult = this.modelresult;
                        console.log(this.modelresult);
                        console.log("value:"+this.value); 
                        console.log(this.arresult);
                    }
                    else{
                       //返回this.dataNo  把this.value赋值给this.arresult,然后返回this.arresult 
                       this.arresult = this.value;
                       console.log(this.arresult); 
                    }
                    //更新后端this.dataNo和this.arresult，更新链接：192.168.1.18:8080/birdImg/updateAR
                    console.log(this.arresult); 
                    console.log(this.dataNo); 
                    var URL = '/api/birdLabel/v1/bird/voice/info?DATANO='+this.dataNo+'&ARRESULT='+this.arresult;
                    axios.put(URL)
                            //then获取成功；response成功后的返回值（对象）
                    .then(response=>{                        
                        console.log(response.data);                      
                    })
                            //获取失败
                    .catch(error=>{
                        console.log(error);
                        alert('网络错误，不能访问');
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            page(){
                var url = '/api/birdLabel/v1/bird/voice/info/list/pages?pageNum='+this.N+'&pageSize='+this.S;
                axios.post(url)
                        //then获取成功；response成功后的返回值（对象）
                .then(response=>{
                    console.log(response);
                    this.birddata=response.data;
                    console.log(this.birddata);
                    console.log(this.birddata.list[0].birdBaseM);
                    //获取图片的base64码
                    // this.Aico = 'data:image/jpg;base64,'+ this.birddata.list[0].sourceFile.filecontent;//左边图片显示
                    // this.Mico = 'data:image/jpg;base64,'+ this.birddata.list[0].birdBaseM.sourceFile.filecontent;//右边图片显示
                    this.AVio = this.birddata.list[0].sourceFile.savepath
                    this.MVio = this.birddata.list[0].birdBaseM.sourceFile.savepath;//右边图片显示
                    console.log(this.AVio);
                    console.log(this.MVio);
                    this.audioList = [this.AVio,this.MVio];
                    console.log(this.audioList);

                    //获取图片标记的鸟类的类型名称
                    // this.Aname = this.birddata.list[0].birdBaseA.birdname;//左边名字显示
                    this.Mname = this.birddata.list[0].birdBaseM.birdname;//右边名字显示
                    //this.birdSamplej=response.data[1];
                    console.log(this.birddata.list[0]);
                    //获取数据的编号
                    this.dataNo = this.birddata.list[0].datano;
                    console.log(this.dataNo);
                    //获取arresult和arresult
                    this.arresult = this.birddata.list[0].arresult;
                    this.modelresult = this.birddata.list[0].modelresult;                    
                    console.log(this.arresult);
                    console.log(this.modelresult);
                })
                        //获取失败
                .catch(error=>{
                    console.log(error);
                    alert('网络错误，不能访问');
                })
            },
            nextPage(){
                this.N = this.N + 1;
                console.log("aaaaaaaa");
                console.log(this.N);
                this.page();
            },
            lastPage(){
                if (this.N > 1){
                    this.N = this.N - 1;
                    console.log("aaaaaaaa");
                    console.log(this.N);
                    this.page();
                }
                else{
                    this.page();
                }               
            },
            // 播放前做的事
            onBeforePlay(next) {
                next(); // 开始播放
            }
         },
         mounted() {
            // 动态设置背景图的高度为浏览器可视区域高度
            // 首先在Virtual DOM渲染数据时，设置下demo的高度．
            this.styleObject.height = `${document.documentElement.clientWidth*0.4}px`; // 具体计算看需要
            // 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
            const that = this;
            window.onresize = function temp() {
                that.styleObject.height = `${document.documentElement.clientWidth*0.4}px`;
            };
        },
    
    }
</script>

<style>
.el-container{
    width: 100%;
    height: 900px;
    /* margin-left: 10%; */
}
.title{
    text-align: center;
    /* background-color: aqua; */
    font-family: "黑体";
    font-size: 30px;
    height: 100px;
}

.picture{
    position: relative;
    width: 100%;
    height: 480px;
    margin-top: 30px;
    font-size: 25px;
    /* background-color: blueviolet; */
    
}
.demo-image__placeholder{
    height: 80%;
    /* background-color: aliceblue; */
}
.block{
    width: 35%; 
    height: 280px;;
    float: left;
    margin-left: 10%;
    position:relative;
    text-align: center;
    margin-top: 20px;
    /* background-color:brown; */
}
.choose{
    width: 85%;
    height: 200px;
    position: relative;
    /* background-color:honeydew; */
}
.demo-ruleForm{
    text-align: center;
}
.next{
    position: relative;
    
}
.el-radio__label{
    font-size: 20px;
}
.el-form-item__label{
    font-size: 20px;
}
.el-form-item is-required{
    width: 90%;
}
.updown{
    position: relative;
    margin-top: 50px;
    /* margin-left: 5%; */
}
.typename{
    position: relative;
    height: 50px;
    text-align: center;
    font-family: "楷体";
    font-size: 40px;
    margin-top: 20px;

}
.el-image__inner{
    height: 200px;
}


</style>