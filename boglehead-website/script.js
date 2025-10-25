document.addEventListener('DOMContentLoaded', function () {
    var chartDom = document.getElementById('chart');
    var myChart = echarts.init(chartDom);
    var option;

    const initialInvestment = 10000;
    const annualReturn = 0.07;
    const years = 30;

    const highExpenseRatio = 0.01; // 1%
    const lowExpenseRatio = 0.0003; // 0.03%

    let lowExpenseData = [];
    let highExpenseData = [];
    let xAxisData = [];

    for (let i = 0; i <= years; i++) {
        xAxisData.push(i);
        
        let lowValue = initialInvestment * Math.pow(1 + annualReturn - lowExpenseRatio, i);
        lowExpenseData.push(lowValue.toFixed(2));

        let highValue = initialInvestment * Math.pow(1 + annualReturn - highExpenseRatio, i);
        highExpenseData.push(highValue.toFixed(2));
    }
    
    option = {
        title: {
            text: '费用率对投资回报的影响 (30年)',
            subtext: '初始投资 $10,000, 年回报率 7%',
            left: 'center',
            textStyle: {
                fontSize: 16
            }
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                let result = `第 ${params[0].axisValue} 年<br/>`;
                params.forEach(param => {
                    result += `${param.seriesName}: $${parseInt(param.value).toLocaleString()}<br/>`;
                });
                return result;
            }
        },
        legend: {
            data: ['低费用基金 (0.03%)', '高费用基金 (1%)'],
            top: 'bottom'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            name: '年份',
            data: xAxisData
        },
        yAxis: {
            type: 'value',
            name: '投资组合价值 ($)',
            axisLabel: {
                formatter: '${value}'
            }
        },
        series: [
            {
                name: '低费用基金 (0.03%)',
                type: 'line',
                data: lowExpenseData,
                smooth: true,
                lineStyle: {
                    color: '#0055a5',
                    width: 3
                }
            },
            {
                name: '高费用基金 (1%)',
                type: 'line',
                data: highExpenseData,
                smooth: true,
                lineStyle: {
                    color: '#c23531',
                    width: 3
                }
            }
        ]
    };

    option && myChart.setOption(option);

    window.addEventListener('resize', function() {
        myChart.resize();
    });
});