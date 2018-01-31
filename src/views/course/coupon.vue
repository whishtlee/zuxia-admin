<template>
    <div class="app-container">
        <el-tabs type="card" @tab-click="handleClick" value="cardCenter">
            <el-tab-pane label="卡券中心" name="cardCenter">
                <el-table :data="contentList" border style="width: 100%">
                    <el-table-column align="center" label='ID' width="80"><template slot-scope="scope">{{(scope.$index+cardQuery.pr)+1}}</template></el-table-column>
                    <el-table-column prop="name" label="名称"></el-table-column>
                    <el-table-column label="抵押金额"><template slot-scope="scope">￥{{scope.row.cost}}</template></el-table-column>
                    <el-table-column prop="name" label="专辑"></el-table-column>
                    <el-table-column label="购买价格"><template slot-scope="scope">￥{{scope.row.price}}</template></el-table-column>
                    <el-table-column prop="starttime" sortable label="开始"></el-table-column>
                    <el-table-column prop="endtime" label="结束"></el-table-column>
                    <el-table-column label="状态或操作" width="120">
                        <template slot-scope="scope">
                            <el-tag v-if="!scope.row.status" size="medium"><span class="dot-inner dot1"></span>停止发行</el-tag>
                            <el-tag v-else-if="scope.row.limit <= scope.row.uselimit" size="medium"><span class="dot-inner dot2"></span>已领取</el-tag>
                            <el-tag v-else-if="scope.row.count != -1 && scope.row.count <= scope.row.saleSize " size="medium"><span class="dot-inner dot3"></span>已售完</el-tag>
                            <el-tag v-else-if="!scope.row.kelingqu" size="medium"><span class="dot-inner dot4"></span>时间未到</el-tag>
                            <el-tag v-else-if="scope.row.price=='免费'" size="medium"><span class="dot-inner dot5"></span>领取</el-tag>
                            <el-tag v-else size="medium"><span class="dot-inner dot5"></span>购买</el-tag>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination-container">
                    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10,20,30, 50]" :page-size="cardQuery.pn" layout="total, sizes, prev, pager, next" :total="total"></el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="未使用" name="noUse">
                <el-table :data="cardList" border>
                    <el-table-column align="center" label='ID' width="80"><template slot-scope="scope">{{(scope.$index+listQuery.pr)+1}}</template></el-table-column>
                    <el-table-column prop="coupon.name" label="名称"></el-table-column>
                    <el-table-column label="抵押金额"><template slot-scope="scope">￥{{scope.row.total}}</template></el-table-column>
                    <el-table-column label="开始" prop="time" sortable><template slot-scope="scope">{{scope.row.time | parseTime}}</template></el-table-column>
                    <el-table-column label="结束"><template slot-scope="scope">{{scope.row.exptime | parseTime}}</template></el-table-column>
                    <el-table-column label="操作" width="80">
                        <template slot-scope="scope">
                            <el-button type="zuxia" size="mini" @click="payment">赠送</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="已使用" name="beenUse">
                <el-table :data="cardList" border>
                    <el-table-column align="center" label='ID' width="80"><template slot-scope="scope">{{(scope.$index+listQuery.pr)+1}}</template></el-table-column>
                    <el-table-column prop="coupon.name" label="名称"></el-table-column>
                    <el-table-column label="抵押金额"><template slot-scope="scope">￥{{scope.row.total}}</template></el-table-column>
                    <el-table-column label="开始" prop="time" sortable><template slot-scope="scope">{{scope.row.time | parseTime}}</template></el-table-column>
                    <el-table-column label="结束"><template slot-scope="scope">{{scope.row.exptime | parseTime}}</template></el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="未支付" name="noPay">
                <el-table :data="cardList" border>
                    <el-table-column align="center" label='ID' width="80"><template slot-scope="scope">{{(scope.$index+listQuery.pr)+1}}</template></el-table-column>
                    <el-table-column prop="coupon.name" label="名称"></el-table-column>
                    <el-table-column label="抵押金额"><template slot-scope="scope">￥{{scope.row.total}}</template></el-table-column>
                    <el-table-column label="开始" prop="time" sortable><template slot-scope="scope">{{scope.row.time | parseTime}}</template></el-table-column>
                    <el-table-column label="结束"><template slot-scope="scope">{{scope.row.exptime | parseTime}}</template></el-table-column>
                    <el-table-column label="操作" width="80">
                        <template slot-scope="scope">
                            <el-button type="zuxia" size="mini" @click="payment">购买</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="已过期" name="expired">
                <el-table :data="cardList" border>
                    <el-table-column align="center" label='ID' width="80"><template slot-scope="scope">{{(scope.$index+listQuery.pr)+1}}</template></el-table-column>
                    <el-table-column prop="coupon.name" label="名称"></el-table-column>
                    <el-table-column label="抵押金额"><template slot-scope="scope">￥{{scope.row.total}}</template></el-table-column>
                    <el-table-column label="开始" prop="time" sortable><template slot-scope="scope">{{scope.row.time | parseTime}}</template></el-table-column>
                    <el-table-column label="结束"><template slot-scope="scope">{{scope.row.exptime | parseTime}}</template></el-table-column>
                </el-table>


            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import { cardCenter,cardOtherList } from '@/api/course'
    import { parseTime } from '@/utils/index'
    export default {
        data() {
            return {
                total:null,
                contentList: [],
                cardList:[],
                cardQuery:{
                    pr: 0,
                    pn: 10,
                    count: 1
                },
                listQuery:{
                    pr:0,
                    pn:30,
                    count:1,
                    status:1
                }
            }
        },
        filters: {
            parseTime(time,format){
                return parseTime(time,format)
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {// 加载数据
                cardCenter(this.cardQuery).then(d => {
                    this.contentList = d.list
                    this.total = d.size
                })
            },
            handleSizeChange(val) {
                this.cardQuery.pn = val
                this.fetchData()
            },
            handleCurrentChange(val) {
                let page = (val - 1) *  this.cardQuery.pn;
                this.cardQuery.pr = page
                this.fetchData()
            },
            handleClick(tab, event) {
                let type = null
                switch(tab.name) {
                    case 'noUse':
                        type = 1
                        break;
                    case 'beenUse':
                        type = -1
                        break;
                    case 'noPay':
                        type = -2
                        break;
                    case 'expired':
                        type = 0
                        break;
                    default:
                        type = null
                }
                if(type != null){
                    this.listQuery.status = type
                    cardOtherList(this.listQuery).then((d) => {
                        this.cardList = d.list
                    })
                }
            },
            payment() {
                this.$notify({
                    title: '提示',
                    message: '请在网站前端支付或赠送',
                    type: 'warning'
                });
            }
        }

    }
</script>

<style>
    .el-tag{
        color: #495060;
        border: 1px solid #e9eaec;
        background: #fff;
    }
    .el-tag--medium{
        line-height: 28px;
    }
    .dot-inner {
        display: inline-block;
        width: 10px;
        height: 10px;
        margin-right: 8px;
        border-radius: 50%;
        background: #e9eaec;
    }
    .dot-inner.dot1{background: #e9eaec;}
    .dot-inner.dot2{background: #f00;}
    .dot-inner.dot3{background: #f90;}
    .dot-inner.dot4{background: #b43af1;}
    .dot-inner.dot5{background: #19be6b;}
</style>