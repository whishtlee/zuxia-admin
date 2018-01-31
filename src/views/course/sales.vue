<template>
    <div class="app-container">
         <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
            <el-table-column align="center" label='ID' width="80"><template slot-scope="scope">{{(scope.$index+listQuery.pr)+1}}</template></el-table-column>
            <el-table-column label="订单编号"  width="160"><template slot-scope="scope">{{scope.row.sn}}</template></el-table-column>
            <el-table-column label="标题"><template slot-scope="scope">{{scope.row.title}}</template></el-table-column>
            <el-table-column label="金额"  width="80"><template slot-scope="scope">{{scope.row.total}}</template></el-table-column>
            <el-table-column label="用户"><template slot-scope="scope">{{scope.row.name}}</template></el-table-column>
            <el-table-column label="时间" width="160"><template slot-scope="scope">{{scope.row.time | parseTime}}</template></el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="pagination-container">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10,20,30, 50]" :page-size="listQuery.pn" layout="total, sizes, prev, pager, next" :total="total"></el-pagination>
        </div>
    </div>
</template>
<script>
    import {getSalesList} from '@/api/course'
    import { parseTime } from '@/utils/index'
    export default {
        data() {
            return {
                listLoading:false,
                list:[],
                total: 0,
                listQuery:{
                    pr: 0,
                    pn: 10,
                    count: 1
                }
            }
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
            fetchData() {
                this.listLoading = true
                getSalesList(this.listQuery).then(d => {
                    this.list = d.list
                    this.total = d.size
                    this.listLoading = false
                })
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
        }
    }
</script>