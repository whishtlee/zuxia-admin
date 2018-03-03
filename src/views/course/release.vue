<template>
    <div class="app-container">
        <el-row>
            <el-col :span="6" :offset="0">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span class="ft12">发行新卡券</span>
                        <el-button class="flr" size="mini" type="primary" icon="el-icon-edit" @click="issue" style="height: 20px;padding: 0px 5px;line-height: 19px;">发行新卡</el-button>
                    </div>
                    <div>
                        <div class="user-info red">类型、例：足下课堂新卡券</div>
                        <div class="user-info red">价值、例：998.00</div>
                        <div class="user-info red">售价、例：98.00</div>
                        <div class="user-info red">剩余、例：100</div>
                        <div class="user-info red">发行、例：{{new Date() | parseTime}}</div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6" :offset="0" v-for="(item, index) in list" :key="item.couponid">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span class="ft12">{{item.name}}</span>
                        <el-tag type="danger" size="mini" v-if="item.status == 1" class="flr">
                            <span class="cursor" @click="stopCard(item.couponid)">停止</span>
                        </el-tag>
                        <el-tag type="warning" size="mini" v-else-if="item.status ==2" class="flr">
                            <span class="cursor" @click="payment(item.couponid)">赠送</span>
                        </el-tag>
                        <el-tag type="info" size="mini" v-else class="flr">
                            <span class="cursor">已停止</span>
                        </el-tag>
                    </div>
                    <div>
                        <div class="user-info">类型：{{item.sellerName}}</div>
                        <div class="user-info">价值：{{item.cost}}</div>
                        <div class="user-info">售价：{{item.price}}</div>
                        <div class="user-info" v-if="(item.count - item.saleSize) > 0">剩余：{{item.count - item.saleSize}}</div>
                        <div class="user-info" v-else>剩余：无限</div>
                        <div class="user-info">发行：{{item.time | parseTime}}</div>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <!-- 分页 -->
        <div class="pagination-container">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[12,24,36,48]" :page-size="listQuery.pn" layout="sizes, prev, pager, next"></el-pagination>
        </div>

        <!-- 我的朋友 -->
        <el-dialog title="我的朋友" :visible.sync="dialogFriends">
            <el-input v-model="friendsQuery.name" placeholder="请输入内容" @change="myfriends"></el-input>
            <el-table :data="friends" border v-loading.body="friendsLoading" element-loading-text="Loading" class="mt10">
                <el-table-column align="center" label='ID' width="80"><template slot-scope="scope">{{(scope.$index+friendsQuery.pr)+1}}</template></el-table-column>
                <el-table-column property="name" label="姓名"></el-table-column>
                <el-table-column label="性别">
                    <template slot-scope="scope">
                        <span v-if="scope.row.sex == 1">男</span>
                        <span v-else-if="scope.row.sex == -1">女</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="80">
                    <template slot-scope="scope">
                        <el-button type="zuxia" size="mini" @click="giving(scope.row.userid)">赠送</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-container">
                <el-pagination background @size-change="fsizeChange" @current-change="fcountChange" :page-sizes="[10,20,30, 50]" :page-size="friendsQuery.pn" layout="sizes, prev, pager, next"></el-pagination>
            </div>
        </el-dialog>

        <!-- 普通卡券 -->
        <el-dialog title="发行普通卡券" :visible.sync="dialogOrdinary">
            <el-form :model="ordinary">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="专辑封面">
                            <div style="height: 300px;">
                                <vueCropper
                                        ref="cropper"
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
                                <label class="btn" for="upload">选择图片</label>
                                <input type="file" id="upload" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 2)">
                                <span @click="finish('base64')" class="btn">上传到服务器</span>
                            </div>
                        </el-form-item>
                    </el-col>    
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="图片地址" :label-width="formLabelWidth">
                            <el-input v-model="ordinary.pic" :disabled="true" placeholder="图片地址"></el-input>
                        </el-form-item>
                    </el-col> 
                </el-row>    
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="名称" :label-width="formLabelWidth">
                            <el-input v-model="ordinary.name" auto-complete="off" placeholder="卡券名称"></el-input>
                        </el-form-item>
                    </el-col>    
                    <el-col :span="12">
                        <el-form-item label="适用范围" :label-width="formLabelWidth">
                            <el-select v-model="ordinary.sellerid" placeholder="请选择适用区域">
                               <el-option  v-for="item in regionList" :key="item.sellerid" :label="item.realname" :value="item.sellerid"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>    
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="市场价值" :label-width="formLabelWidth">
                            <el-input v-model="ordinary.cost" auto-complete="off" placeholder="市场价值"></el-input>
                        </el-form-item>
                    </el-col>    
                    <el-col :span="12">
                        <el-form-item label="零售价值" :label-width="formLabelWidth">
                            <el-input v-model="ordinary.price" auto-complete="off" placeholder="零售价值"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>    
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="有效时期" :label-width="formLabelWidth">
                            <el-input v-model="ordinary.activetime" auto-complete="off" placeholder="领券后有效期（单位/时）"></el-input>
                        </el-form-item>
                    </el-col>    
                    <el-col :span="12">
                        <el-form-item label="发行量" :label-width="formLabelWidth">
                                <el-input v-model="ordinary.count" auto-complete="off" placeholder="-1代表不限量"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>  
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="领取量" :label-width="formLabelWidth">
                            <el-input v-model="ordinary.limit" auto-complete="off" placeholder="每个人能领取的数量"></el-input>
                        </el-form-item>
                    </el-col>    
                    <el-col :span="12">
                        <el-form-item label="发行时间" :label-width="formLabelWidth">
                            <el-date-picker
                                    v-model="ordinary.starttime"
                                    type="datetime"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>  
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogOrdinary = false">取 消</el-button>
                <el-button type="primary" @click="issueCard">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 赠送卡券 -->
        <el-dialog title="发行赠送卡券" :visible.sync="dialogGive">
            <el-form :model="give">
                 <el-row>
                    <el-col :span="24">
                        <el-form-item label="名称" :label-width="formLabelWidth">
                            <el-input v-model="give.name" auto-complete="off" placeholder="卡券名称"></el-input>
                        </el-form-item>
                    </el-col>    
                </el-row>  
                <el-row>
                     <el-col :span="12">
                        <el-form-item label="适用范围" :label-width="formLabelWidth">
                            <el-select v-model="give.sellerid" placeholder="请选择适用区域">
                               <el-option  v-for="item in regionList" :key="item.sellerid" :label="item.realname" :value="item.sellerid"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="有效时期" :label-width="formLabelWidth">
                            <el-input v-model="give.activetime" auto-complete="off" placeholder="领券后有效期（单位/时）"></el-input>
                        </el-form-item>  
                    </el-col> 
                </el-row> 
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="市场价值" :label-width="formLabelWidth">
                            <el-input v-model="give.cost" auto-complete="off" placeholder="市场价值"></el-input>
                        </el-form-item>
                    </el-col>    
                    <el-col :span="12">
                        <el-form-item label="零售价值" :label-width="formLabelWidth">
                            <el-input v-model="give.price" auto-complete="off" placeholder="零售价值"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> 
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogGive = false">取 消</el-button>
                <el-button type="primary" @click="issueGive">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import VueCropper from 'vue-cropper'
    import { uploading } from '@/api/utils'
    import { getMyCardList,getMyFriendsOrFans,getStopCard,giveMyCard,commodity,issueGiveCard,issueOrdinaryCard } from '@/api/course'
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
                    autoCropWidth: 200,
                    autoCropHeight: 300,
                    fixed: true,
                    fixedNumber: [2, 3]
                },
                formLabelWidth: '100px',
                list:[],
                dialogOrdinary:false,
                dialogGive:false,
                dialogFriends:false,
                regionList:[],
                giveCardid:0,
                ordinary:{
                    name:'',
                    sellerid:'',
                    cost:'',
                    price:'',
                    activetime:'',
                    count:'',
                    pic:'',
                    limit:'',
                    starttime:''
                },
                give:{
                    name:'',
                    sellerid:'',
                    cost:'',
                    price:'',
                    activetime:''
                },
                friendsLoading:false,
                friends:[],
                listQuery:{
                    pr:0,
                    pn:11,
                    count:1
                },
                form:{
                    name:'',
                    region:''
                },
                friendsQuery:{
                    pr: 0,
                    pn: 10,
                    name:''
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
            fsizeChange(val) {
                this.friendsQuery.pn = val
                this.myfriends()
            },
            fcountChange(val) {
                let page = (val - 1) *  this.friendsQuery.pn;
                this.friendsQuery.pr = page
                this.myfriends()
            },
            handleSizeChange(val) {
                this.listQuery.pn = val
                this.fetchData()
            },
            handleCurrentChange(val) {
                let page = (val - 1) *  this.listQuery.pn;
                this.listQuery.pr = page
                this.fetchData()
            },
            fetchData(){
                this.listLoading = true
                getMyCardList(this.listQuery).then((d) => {
                    this.listLoading = false
                    this.list = d.list
                })
            },
            payment(id) {
                if(id) {
                    this.giveCardid = id
                    this.myfriends()
                    this.dialogFriends = true
                } else {
                    this.$message({
                        message: '卡券编号错误，请重试',
                        type: 'warning'
                    });
                }
            },
            myfriends(){
                this.friendsLoading = true
                getMyFriendsOrFans(this.friendsQuery).then((d) => {
                    this.friendsLoading = false
                    this.friends = d.list
                })
            },
            stopCard(id){
                this.$confirm('是否停止发行这个卡券, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    getStopCard(id).then(d => {
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
            giving(id){
                if(id){
                    giveMyCard(this.giveCardid,id).then((d) => {
                        this.$message({
                            message: d.msg,
                            type: d.status == 1? 'success' : 'error'
                        });
                        if(d.status == 1) {
                            this.dialogFriends = false
                            this.fetchData()
                        }
                    })
                } else {
                    this.$message({
                        message: '用户编号错误，请重试',
                        type: 'warning'
                    });
                }
            },
            issue() {
                this.$confirm('请选择发行卡券类型', '提示', {
                    confirmButtonText: '普通卡券',
                    cancelButtonText: '赠送卡券',
                    type: 'warning',
                    center: true
                }).then(() => {
                     this.issueType(true)
                }).catch(() => {
                    this.issueType()
                });
            },
            issueType(t) {
                if(t) {
                    this.dialogOrdinary = true
                } else {
                    this.dialogGive = true        
                }
                commodity().then((d) => {
                    this.regionList = d.list
                })
            },
            issueGive() {
                issueGiveCard(this.give).then((d) => {
                    this.$message({
                        message: d.msg,
                        type: d.status == 1? 'success' : 'error'
                    });
                    if(d.status == 1) {
                        this.dialogGive = false
                        this.fetchData()
                    }
                }).catch(() => {
                    this.give.activetime = ''
                });
            },
            issueCard() {
                issueOrdinaryCard(this.ordinary).then((d) => {
                    this.$message({
                        message: d.msg,
                        type: d.status == 1? 'success' : 'error'
                    });
                    if(d.status == 1) {
                        this.dialogOrdinary = false
                        this.fetchData()
                    }
                }).catch(() => {
                    this.ordinary.activetime = ''
                });
            }, 
            uploadImg (e, num) {
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
                reader.readAsArrayBuffer(file)
            },
            finish (type) {
                this.$refs.cropper.getCropBlob((data) => {
                    var _this = this.ordinary
                    uploading(data).then(function(d){
                        if(d) {
                            _this.pic = d.name
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
    .user-info {
        font-size: 13px;
        padding-bottom: 10px;
    }
    .red{color:#ff0000}
    .el-card__body {
        padding: 20px;
    }
    .el-date-editor.el-input{
        width: auto;
    }
</style>