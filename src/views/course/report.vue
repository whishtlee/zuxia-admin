<template>
    <div class='chart-container'>
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
            chart: null
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

