<template>
    <div class="app-container">
        <el-row v-show="!showUpdate && !showCreate">
            <el-col :span="6" :offset="0">
                <el-card :body-style="{ padding: '0px' }">
                    <div @click="showCreate = true">
                        <img :src="addImg" class="image" height="165">
                        <div style="padding: 10px;">
                            <span class="ellipsis">新专辑</span>
                            <div class="bottom clearfix">
                                <time class="time">点击添加新专辑</time>
                                <el-button type="text" class="button"></el-button>
                            </div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6" v-for="(o, index) in list" :key="o.id" :offset="0">
                <el-card :body-style="{ padding: '0px' }">
                    <img :src="$store.getters.imgSrc + o.pic.stdmsgpicsid + '.png'" class="image" height="135" :onerror="defaultImg">
                    <span class="review-shibo" v-if="o.course.type == 'pilot'"></span>
                    <div style="padding: 10px;">
                        <span class="ellipsis">{{o.message}}</span>
                        <div class="bottom clearfix">
                            <time class="rmb ft12">价格：￥{{o.course.price}}</time>
                            <el-button type="text" class="button ft12 rmb" @click="pilot(false,o.id)" v-if="o.course.type == 'pilot'">取消试播</el-button>
                            <el-button type="text" class="button ft12 rmb" @click="pilot(true,o.id)" v-else>设为试播</el-button>
                        </div>
                        <div class="bottom clearfix">
                            <time class="time">{{o.time | parseTime('{y}-{m}-{d}')}}</time>
                            <el-button type="text" class="button" @click="deleteData(o.id)">删除</el-button>
                            <el-button type="text" class="button" @click="handleUpdate(o.id)">修改</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <div v-show="showUpdate">
            <el-form  label-position="right" label-width="100px">
                <el-form-item label="标题">
                    <el-input v-model="videoModel.title"></el-input>
                </el-form-item>
                <el-form-item label="售价">
                    <el-input v-model="videoModel.total"></el-input>
                </el-form-item>
                <el-form-item label="描述" class="markdown-con">
                    <textarea id="markdown_editor" style="display:none;"></textarea>
                </el-form-item >
                <el-form-item label="展开扩展">
                    <el-switch @click="showm" v-model="showMoney"></el-switch>
                </el-form-item>
                <div v-if="showMoney">
                    <el-form-item label="VIP1售价">
                        <el-input v-model="videoModel.v1"></el-input>
                    </el-form-item>
                    <el-form-item label="VIP2售价">
                        <el-input v-model="videoModel.v2"></el-input>
                    </el-form-item>
                    <el-form-item label="VIP3售价">
                        <el-input v-model="videoModel.v3"></el-input>
                    </el-form-item>
                    <el-form-item label="VIP4售价">
                        <el-input v-model="videoModel.v4"></el-input>
                    </el-form-item>
                    <el-form-item label="VIP5售价">
                        <el-input v-model="videoModel.v5"></el-input>
                    </el-form-item>
                    <el-form-item label="VIP6售价">
                        <el-input v-model="videoModel.v6"></el-input>
                    </el-form-item>
                </div>
            </el-form>
            <div slot="footer" style="margin-left: 100px">
                <el-button type="primary" @click="updateData">修改视频</el-button>
                <el-button @click="showUpdate = false">取消</el-button>
            </div>
        </div>

        <div v-show="showCreate">
            <el-form  label-position="right" label-width="100px">
                <el-form-item label="标题">
                    <el-input v-model="newVideoModel.title"></el-input>
                </el-form-item>
                <el-form-item label="售价">
                    <el-input v-model="newVideoModel.price"></el-input>
                </el-form-item>
                <el-form-item label="描述" class="markdown-con">
                    <textarea id="markdown_editor2" style="display:none;"></textarea>
                </el-form-item >
                <el-form-item label="展开扩展">
                    <el-switch @click="showm" v-model="showMoney"></el-switch>
                </el-form-item>
                <div v-if="showMoney">
                    <el-form-item label="VIP1售价">
                        <el-input v-model="newVideoModel.v1"></el-input>
                    </el-form-item>
                    <el-form-item label="VIP2售价">
                        <el-input v-model="newVideoModel.v2"></el-input>
                    </el-form-item>
                    <el-form-item label="VIP3售价">
                        <el-input v-model="newVideoModel.v3"></el-input>
                    </el-form-item>
                    <el-form-item label="VIP4售价">
                        <el-input v-model="newVideoModel.v4"></el-input>
                    </el-form-item>
                    <el-form-item label="VIP5售价">
                        <el-input v-model="newVideoModel.v5"></el-input>
                    </el-form-item>
                    <el-form-item label="VIP6售价">
                        <el-input v-model="newVideoModel.v6"></el-input>
                    </el-form-item>
                </div>
            </el-form>
            <div slot="footer" style="margin-left: 100px">
                <el-upload
                        class="upload-demo flt"
                        action="http://edu.cqzuxia.com/uploadingsafe"
                        :on-error="handleError"
                        :on-success="handleSuccess"
                        :before-upload="beforeUpload"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="3"
                        :on-exceed="handleExceed" >
                    <el-button  type="primary">选择视频并发布</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传mp4文件，请选择正确文件</div>
                </el-upload>
                <el-button @click="showCreate = false">返回</el-button>
            </div>
        </div>

    </div>
</template>


<script>
    import { albumVideo,pilotVideo,updateVideoInfo,updateVideo,deleteVideo,createVideo } from '@/api/course'
    import { parseTime } from '@/utils/index'
    import SimpleMDE from 'simplemde';
    export default {
        data() {
            return {
                list:[],
                defaultImg: 'this.src="' + require('../../assets/pic_v.jpg') + '"',
                addImg: require('../../assets/add.jpg'),
                showUpdate:false,
                showCreate:false,
                pilottype:false,
                dialogVisible:false,
                simplemde:null,
                listQuery:{
                    id: this.$route.params.id,
                    pr: 0,
                    pn: 999,
                    count: 1
                },
                showMoney:false,
                videoModel:{
                    title:'',
                    id:'',
                    info:'',
                    total:'',
                    v1:'',
                    v2:'',
                    v3:'',
                    v4:'',
                    v5:'',
                    v6:''
                },
                newVideoModel:{
                    title:'',
                    video:'',
                    gid:'',
                    message:'',
                    type:'real',
                    price:'',
                    v1:'',
                    v2:'',
                    v3:'',
                    v4:'',
                    v5:'',
                    v6:'',
                    equipment: 'Web端教师后台'
                }

            }
        },
        filters: {
            parseTime(time,format){
                return parseTime(time,format)
            }
        },
        mounted () {
            this.simplemde = new SimpleMDE({ element: document.getElementById("markdown_editor") });
            this.simplemde2 = new SimpleMDE({ element: document.getElementById("markdown_editor2") });
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                albumVideo(this.listQuery).then((d) => {
                    this.list = d.list
                }).catch(() => {});
            },
            handleUpdate(id) {
                updateVideoInfo({id:id}).then((d) => {
                    d.course = d.course ? d.course : {}
                    d.fee = d.fee ? d.fee : {}
                    this.videoModel = {
                        title: d.course.message,
                        id: d.course.id,
                        total: d.fee.total,
                        v1: d.fee.v1,
                        v2: d.fee.v2,
                        v3: d.fee.v3,
                        v4: d.fee.v4,
                        v5: d.fee.v5,
                        v6: d.fee.v6
                    }
                    this.simplemde.value(d.course.md)
                    this.showUpdate = true;
                }).catch((e) => { });
            },
            updateData() {
                this.videoModel.info = this.simplemde.value()
                updateVideo(this.videoModel).then((d) => {
                    this.$message({
                        message: d.msg,
                        type: d.status == 1? 'success' : 'error'
                    });
                }).catch(() => {});
            },
            pilot(a,b) {
                pilotVideo({id:this.listQuery.id,messageid:b},a).then((d) => {
                    this.$message({
                        message: d.msg,
                        type: d.status == 1? 'success' : 'error'
                    });
                    if(d.status == 1){
                        this.fetchData()
                    }
                }).catch(() => {});
            },
            showm(){
                this.showMoney = !this.showMoney
            },
            deleteData(val){
                this.$confirm('此操作将永久删除视频, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteVideo({id:val}).then(d => {
                        this.$message({
                            message: d.msg,
                            type: d.status == 1? 'success' : 'error'
                        });
                        if(d.status === 1) {
                            this.fetchData()
                        }
                    })
                }).catch(() => {});
            },
            // 文件上传
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            handleError(a,b){
                this.$message.error('文件上传失败，请稍后再试');
            },
            handleSuccess(a,b,c){
                this.newVideoModel.video = a.name
                this.newVideoModel.gid = this.listQuery.id
                this.newVideoModel.message = this.simplemde2.value()
                createVideo(this.newVideoModel).then((d) => {
                    this.$message({
                        message: d.msg,
                        type: d.status == 1? 'success' : 'error'
                    });
                }).catch(() => {});
            },
            beforeUpload (file){
                if(file.type != 'video/mp4'){
                    this.$message.error('请选择MP4格式视频上传');
                    return false;
                }
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            }
        }
    }
</script>
<style>
    @import '../../styles/markdown.scss';
    .el-col-6{padding: 10px;}
    .button{margin-left: 5px;}
    .bottom{line-height: 16px;}
    .rmb{color: #ff8600 }
    .el-card{position: relative}
</style>