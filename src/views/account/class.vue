<template>
    <div class="app-container">
        <el-table :data="stdlist" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
            <el-table-column align="center" label='ID' width="80"><template slot-scope="scope">{{(scope.$index+listQuery.pr)+1}}</template></el-table-column>
            <el-table-column label="姓名"><template slot-scope="scope">{{scope.row.name}}</template></el-table-column>
            <el-table-column label="性别">
                <template slot-scope="scope">
                    <span v-if="scope.row.sex == 1">男</span>
                    <span v-if="scope.row.sex == -1">女</span>
                </template>
            </el-table-column>
             <el-table-column label="同意">
                <template slot-scope="scope">
                    <span v-if="scope.row.agree">是</span>
                    <span v-else>否</span>
                </template>
            </el-table-column>
            <el-table-column label="状态" width="100">
                <template slot-scope="scope">
                     <el-button   type="success" size="mini">正式成员</el-button> 
                     <!--v-if="scope.row.confirm == 1"   -->
                    <!-- <el-button  v-else type="zuxia" size="mini" @click="payment(scope.row.userid)">同意加入</el-button> -->
                </template>
            </el-table-column>

        </el-table>

        <div class="pagination-container">
            <el-pagination background @size-change="fsizeChange" @current-change="fcountChange" :page-sizes="[10,20,30, 50]" :page-size="listQuery.pn" layout="sizes, prev, pager, next" :total="total"></el-pagination>
        </div>


    </div>
</template>
<script>
    import { collegeAdmin,agreeJoin } from '@/api/account'
    export default {
        data() {
            return {
                listLoading:false,
                total:0,
                listQuery:{
                    pr:0,
                    pn:10,
                    collegeid:this.$route.params.id
                },
                stdlist:[],
            }
        },
        watch: {
            '$route' (to, from) {
                this.listQuery.collegeid = this.$route.params.id
                //获取上方数据列表
                this.fetchData()
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {// 加载数据
                this.listLoading = true
                collegeAdmin(this.listQuery).then(d => {
                    this.listLoading = false
                    this.total = parseInt(d.count)
                    this.stdlist = d.collegeadmin
                }).catch(() => {
                    this.listLoading = false
                });
            },
            payment(id) {
                agreeJoin(this.listQuery.collegeid,id).then((d) => {
                    this.$message({
                        message: d.msg,
                        type: d.status == 1? 'success' : 'error'
                    });
                }).catch(() => {
                });
            },
            fsizeChange(val) {
                this.listQuery.pn = val
                this.fetchData()
            },
            fcountChange(val) {
                let page = (val - 1) *  this.listQuery.pn;
                this.listQuery.pr = page
                this.fetchData()
            }
        }
    }
</script>