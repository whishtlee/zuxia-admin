<template>
    <div class='chart-container'>
        <el-header style="padding: 0px;display:flex;align-items: center">
            <div class="block">
                <span class="demonstration">根据时间搜索：</span>
                <el-date-picker
                        v-model="value7"
                        type="daterange"
                        size="mini"
                        unlink-panels
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions2">
                </el-date-picker>
            </div>
            <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="search">搜索</el-button>
        </el-header>
        <div :class="className" :id="id" :style="{height:'100%',width:'100%'}"></div>
    </div>
</template>

<script>
import echarts from 'echarts'
import { getReport } from '@/api/course'

export default {
    props: {
        className: {
            type: String,
            default: 'chart'
        },
        id: {
            type: String,
            default: 'chart'
        },
        width: {
            type: String,
            default: '200px'
        },
        height: {
            type: String,
            default: '200px'
        }
    },
    data() {
        return {
            chart: null,
            pickerOptions2: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            value7: ''
        }
    },
    mounted() {
        getReport().then((d) => {
            this.initChart(d.x, d.y)
        })
    },
    beforeDestroy() {
        if (!this.chart) {
            return
        }
        this.chart.dispose()
        this.chart = null
    },
    methods: {
        search(){
            getReport({begin:this.value7[0],end:this.value7[1]}).then((d) => {
                this.initChart(d.x, d.y)
            })
        },
        initChart(x, y) {
            var colors = ['#5793f3', '#d14a61', '#675bba'];
            var option = {
                title: {
                    text: '销售报表',
                    textStyle: {
                        color: '#d14a61',
                        fontSize: '22'
                    }
                },
                color: colors,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                toolbox: {
                    feature: {
                        dataView: { show: true, readOnly: false },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                legend: {
                    data: ['销售量']
                },
                xAxis: [
                    {
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        data: x
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '销售量',
                        min: 0,
                        max: 30,
                        position: 'left',
                        axisLine: {
                            lineStyle: {
                                color: colors[2]
                            }
                        },
                        axisLabel: {
                            formatter: '{value} 节'
                        }
                    }
                ],
                series: [
                    {
                        name: '销售量',
                        type: 'line',
                        data: y
                    }
                ]
            };

            this.chart = echarts.init(document.getElementById(this.id))
            this.chart.setOption(option)
        }
    }
}
</script>

<style scoped>
.chart-container {
    position: relative;
    padding: 20px;
    width: 100%;
    height: 85vh;
}
</style>

