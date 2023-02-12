// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById("dynamic"));
window.addEventListener("resize", myChart.resize);

// 指定图表的配置项和数据
var x_data = [];
var y_data = [];
for (var i = 0; i < 50; i++) {
  x_data.push(i);
  y_data.push(Math.random() * 10 - 5);
}
var x_num = 50;
setInterval(() => {
  for (var i = 0; i < 1; i++) {
    x_data.shift();
    x_data.push(x_num);
    y_data.shift();
    y_data.push(Math.random() * 10 - 5);
    x_num += 1;
  }
  myChart.setOption(option);
}, 300);

var option = {
  title: {
    text: "Gamma Ray Signal",
    x: "center",
    y: "bottom",
    textStyle: {
      fontSize: 20,
      fontFamily: "Microsoft Yahei",
    },
  },
  tooltip: {},
  legend: {},
  grid: {
    // show: true,
    top: 0,
    bottom: 60,
    left: 0,
    right: 0,
  },

  // x轴数据
  xAxis: {
    data: x_data,
    show: true,
    axisTick: { show: false },
    axisLabel: { show: false },
  },
  // y轴数据
  yAxis: {
    show: false,
  },
  series: [
    {
      type: "line",
      color: "#4ffbdf",

      symbol: "none",
      step: "middle",
      areaStyle: {
        color: "black",
        opacity: 0.5,
      },
      data: y_data,
      emphasis: {
        lineStyle: {
          color: "blue",
        },
      },
    },
  ],
};
