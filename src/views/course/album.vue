<template>
    <div class="app-container">
        <el-row>
            <el-col :span="6" :offset="0">
                <el-card :body-style="{ padding: '0px' }">
                    <div  @click="handleCreate">
                        <img :src="defaultImg" class="image" height="255">
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
                    <img :src="$store.getters.imgSrc+o.picid" class="image" height="255">
                    <div style="padding: 10px;">
                        <span class="ellipsis">{{o.name}}</span>
                        <div class="bottom clearfix">
                            <time class="time">{{o.time | parseTime('{y}-{m}-{d}')}}</time>
                            <el-button type="text" class="button" @click="deleteData(o.id)">删除</el-button>
                            <el-button type="text" class="button" @click="handleUpdate(o)">修改</el-button>
                            <router-link :to="'/system/album/video/' + o.id">
                                <el-button type="text" class="button">管理</el-button>
                            </router-link>

                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="50%">
            <el-form  ref="createPackage" :model="album" label-position="right" label-width="100px" style="padding: 0 10px">
                <el-form-item label="专辑封面">
                    <div style="height: 300px;">
                        <vueCropper
                                ref="cropper2"
                                :img="example.img"
                                :outputSize="example.size"
                                :outputType="example.outputType"
                                :info="example.info"
                                :canScale="example.canScale"
                                :autoCrop="example.autoCrop"
                                :autoCropWidth="example.autoCropWidth"
                                :autoCropHeight="example.autoCropHeight"
                                :fixed="example.fixed"
                                :fixedNumber="example.fixedNumber"
                        ></vueCropper>
                    </div>
                    <div>
                        <label class="btn" for="upload2">选择图片</label>
                        <input type="file" id="upload2" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 2)">
                        <span @click="finish('base64')" class="btn">上传到服务器</span>
                    </div>
                </el-form-item>
                <el-form-item label="图片地址">
                    <el-input v-model="album.picid" :disabled="true" placeholder="图片地址"></el-input>
                </el-form-item>
                <el-form-item label="专辑标题" prop="name" :rules="{ required: true, message: '标题不能为空'}">
                    <el-input v-model="album.name" placeholder="专辑标题"></el-input>
                </el-form-item>
                <el-form-item label="关键词" prop="flag" :rules="{ required: true, message: '关键词不能为空'}">
                    <el-input v-model="album.flag" placeholder="用逗号隔开如：JAVA,PHP,C"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="描述" v-model="album.info"></el-input>
                </el-form-item>
                <el-form-item label="展开扩展">
                    <el-switch @click="showm"  v-model="showMoney"></el-switch>
                </el-form-item>
                <div v-if="showMoney">
                    <el-form-item label="售价">
                        <el-input v-model.number="album.total" placeholder="卖价"></el-input>
                    </el-form-item>
                    <el-form-item label="套餐描述">
                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="套餐描述" v-model="album.finfo"></el-input>
                    </el-form-item>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="VIP1 售价" prop="v1">
                                <el-input v-model.number="album.v1" placeholder="VIP1 售价" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="VIP2 售价" prop="v2">
                                <el-input v-model.number="album.v2" placeholder="VIP2 售价"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="VIP3 售价" prop="v3">
                                <el-input v-model.number="album.v3" placeholder="VIP3 售价"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="VIP4 售价" prop="v4">
                                <el-input v-model.number="album.v4" placeholder="VIP4 售价"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="VIP5 售价" prop="v5">
                                <el-input v-model.number="album.v5" placeholder="VIP5 售价"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="VIP6 售价" prop="v6">
                                <el-input v-model.number="album.v6" placeholder="VIP6 售价"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button v-if="dialogStatus=='create'" type="zuxia" @click="createData">添加</el-button>
                <el-button v-else type="primary" @click="updateData">修改</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script>
    import VueCropper from 'vue-cropper'
    import { mapGetters } from 'vuex'
    import { getAlbumList,createAlbum,updateAlbum,deleteAlbum } from '@/api/course'
    import { uploading } from '@/api/utils'
    import { parseTime } from '@/utils/index'
    export default {
        data() {
            return {
                example: {
                    img: '',
                    info: true,
                    size: 1,
                    outputType: 'jpeg',
                    canScale: false,
                    autoCrop: true,
                    // 只有自动截图开启 宽度高度才生效
                    autoCropWidth: 200,
                    autoCropHeight: 300,
                    // 开启宽度和高度比例
                    fixed: true,
                    fixedNumber: [2, 3]
                },
                defaultImg: require('../../assets/add.jpg'),
                dialogTitle:'',
                showMoney:false,
                list:null,
                dialogFormVisible:false,
                dialogStatus:'',
                dataObj: { token: '', key: '' },
                album:{
                    name:'',
                    flag:'',
                    info:'',
                    total:'',
                    fname:'',
                    finfo:'',
                    v1: '',
                    v2: '',
                    v3: '',
                    v4: '',
                    v5: '',
                    v6: '',
                    picid:''
                }
            }
        },
        components: {
            VueCropper
        },
        created() {
            this.fetchData()
        },
        filters: {
            parseTime(time,format){
                return parseTime(time,format)
            }
        },
        methods: {
            handleImageScucess(file) {
                this.emitInput(file.files.file)
            },
            resetTemp() {
                this.album = {
                    name:'',
                    flag:'',
                    info:'',
                    total:'',
                    fname:'',
                    finfo:'',
                    v1: '',
                    v2: '',
                    v3: '',
                    v4: '',
                    v5: '',
                    v6: '',
                    picid:''
                }
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 5;

                if (!isJPG || !isPNG) {
                    this.$message.error('上传图片只能是 JPG 或 PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 5MB!');
                }
                return isJPG && isLt2M;
            },
            fetchData() {// 加载数据
                this.listLoading = true
                getAlbumList().then(d => {
                    this.list = d.list
                    this.listLoading = false
                })
            },
            handleCreate(){
                this.resetTemp()
                this.dialogFormVisible = true
                this.dialogStatus = 'create'
                this.dialogTitle = '创建专辑'
                this.$nextTick(() => {
                    this.$refs['createPackage'].clearValidate()
                })
            },
            handleUpdate(row){
                this.example.img = this.$store.getters.imgSrc + row.picid
                this.album = Object.assign({}, row) // copy obj
                this.dialogFormVisible = true
                this.dialogStatus = 'update'
                this.dialogTitle = '更改专辑'
                this.$nextTick(() => {
                    this.$refs['createPackage'].clearValidate()
                })
            },
            deleteData(val){
                this.$confirm('此操作将永久删除专辑, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteAlbum({id:val}).then(d => {
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
            createData(){
                this.$refs['createPackage'].validate((valid) => {
                    if (valid) {
                        createAlbum(this.album).then(d => {
                            this.$message({
                                message: d.msg,
                                type: d.status == 1 ? 'success' : 'error'
                            });
                        })
                    }
                })
            },
            updateData(){
                this.$refs['createPackage'].validate((valid) => {
                    if (valid) {
                        updateAlbum(this.album).then(d => {
                            this.$message({
                            message: d.msg,
                                type: d.status == 1 ? 'success' : 'error'
                            });
                        })
                    }
                })
            },
            showm(){
                this.showMoney = !this.showMoney
            },
            uploadImg (e, num) {
                //上传图片
                // this.option.img
                var file = e.target.files[0]
                if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
                    this.$message.error('上传图片只能是 JPG 或 PNG 格式!');
                    return false
                }
                var reader = new FileReader()
                reader.onload = (e) => {
                    let data
                    if (typeof e.target.result === 'object') {
                        // 把Array Buffer转化为blob 如果是base64不需要
                        data = window.URL.createObjectURL(new Blob([e.target.result]))
                    } else {
                        data = e.target.result
                    }
                    if (num === 1) {
                        this.option.img = data
                    } else if (num === 2) {
                        this.example.img = data
                    }
                }
                // 转化为base64
                // reader.readAsDataURL(file)
                // 转化为blob
                reader.readAsArrayBuffer(file)
            },
            finish (type) {
                this.$refs.cropper2.getCropBlob((data) => {
                    var _this = this.album
                    uploading(data).then(function(d){
                        if(d) {
                            _this.picid = d.name
                        } else {
                            this.$notify.error({
                                title: '错误',
                                message: '图片上传失败，请稍后再试'
                            });
                        }
                    }).catch(() => {});

                })
            }
        }
    }
</script>
<style>
    .el-col-6{padding: 10px;}
    .button{margin-left: 5px;}
    .bottom{line-height: 16px;}
</style>