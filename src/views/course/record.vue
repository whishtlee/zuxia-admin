<template>
    <div class="app-container">
        <el-table :data="list" border style="width: 100%">
            <el-table-column align="center" label='ID' width="80"><template slot-scope="scope">{{(scope.$index+listQuery.pr)+1}}</template></el-table-column>
            <el-table-column label="用户" width="200"><template slot-scope="scope">{{scope.row.user.name}}</template></el-table-column>
            <el-table-column label="课程"><template slot-scope="scope">{{scope.row.message.message}}</template></el-table-column>
            <el-table-column label="时间" sortable prop="time" width="160"><template slot-scope="scope">{{scope.row.time | parseTime}}</template></el-table-column>
        </el-table>

        <div class="pagination-container">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10,20,30, 50]" :page-size="listQuery.pn" layout="total,sizes, prev, pager, next" :total="total"></el-pagination>
        </div>

    </div>
</template>
<script>
    import { getRecordList } from '@/api/course'
    import { parseTime } from '@/utils/index'

    export default {
        data() {
            return {
                list:[],
                total:0,
                listLoading:false,
                listQuery: {
                    count: 1,
                    pr: 0,
                    pn: 10
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
                getRecordList(this.listQuery).then((d) => {
                    this.listLoading = false
                    this.total = d.size
                    this.list = d.list
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
            }
        }
    }
</script>