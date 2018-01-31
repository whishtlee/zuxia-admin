<template>
    <div class="app-container">
        <div class="filter-container">
            <el-select clearable class="filter-item" v-model="listQuery.school" placeholder="选择学校" @change="changeSchool">
                <el-option v-for="item in schoolOptions" :key="item.id" :label="item.title" :value="item.id"></el-option>
            </el-select>
            <el-select clearable class="filter-item" v-model="listQuery.grade" placeholder="选择年级"  @change="changeGrade">
                <el-option  v-for="item in gradeOptions" :key="item.id" :label="item.title" :value="item.id"></el-option>
            </el-select>
        </div>

        <el-table :data="cls" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
            <el-table-column align="center" label='ID' width="80"><template slot-scope="scope">{{scope.$index+1}}</template></el-table-column>
            <el-table-column label="学校"><template slot-scope="scope">{{scope.row.school}}</template></el-table-column>
            <el-table-column label="年级"><template slot-scope="scope">{{scope.row.grade}}</template></el-table-column>
            <el-table-column label="名称"><template slot-scope="scope">{{scope.row.title}}</template></el-table-column>

        </el-table>



    </div>
</template>
<script>
    import { college } from '@/api/account'
    export default {
        data() {
            return {
                listLoading:false,
                total:0,
                listQuery:{
                    school:'',
                    grade:''
                },
                cls:[],
                clsList:[],
                schoolOptions:[],
                gradeOptions:[],
                gradeOptionsList:[]
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {// 加载数据
                this.listLoading = true
                college(this.listQuery).then(d => {
                    this.schoolOptions = d.school
                    this.gradeOptions = d.grade
                    this.gradeOptionsList = d.grade
                    this.cls = d.cls
                    this.clsList = d.cls
                    this.total = d.size
                    this.listLoading = false
                })
            },
            handleFilter() {

            },
            changeSchool() {
                let newGrade = [];
                for(const grade of this.gradeOptionsList){
                    if(grade.pid == this.listQuery.school){
                        newGrade.push(grade)
                    }
                }
                if(this.listQuery.school) {
                    this.gradeOptions = newGrade;
                } else {
                    this.gradeOptions = this.gradeOptionsList;
                }
            },
            changeGrade() {
                let newClass = [];
                for(const cls of this.clsList){
                    if(cls.pid == this.listQuery.grade){
                        newClass.push(cls)
                    }
                }
                if(this.listQuery.grade) {
                    this.cls = newClass;
                } else {
                    this.cls = this.clsList;
                }
            }
        }
    }
</script>