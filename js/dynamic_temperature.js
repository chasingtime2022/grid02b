import data from "./temperature_data.json" assert { type: "json" };

// console.log(data["temperature"]);

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById("temperature"));
window.addEventListener("resize", myChart.resize);

let tem_data = data["temperature"];

// 指定图表的配置项和数据
var x_data = [];
var y_data = [];
let tem_display;
for (var i = 0; i < 50; i++) {
  x_data.push(i);
  // y_data.push((tem_data[i] - 12) * 1000);
  y_data.push(tem_data[i]);
  tem_display = tem_data[i];
}
var x_num = 50;
setInterval(() => {
  for (var i = 0; i < 1; i++) {
    x_data.shift();
    x_data.push(x_num);
    y_data.shift();
    // y_data.push((tem_data[x_num] - 12) * 1000);
    y_data.push(tem_data[x_num]);
    x_num += 1;
    tem_display = tem_data[x_num];
    // console.log(x_num);
    if (x_num > 700) {
      x_num = 50;
    }
  }
  myChart.setOption(option);
  window.addEventListener("resize", myChart.resize);
}, 1000);

var option = {
  title: {
    text: "SiPM 温度 /°C",
    // text: "Gamma Ray Signal",
    x: "center",
    y: "bottom",
    textStyle: {
      fontSize: 18,
      // fontFamily: "Microsoft Yahei",
      color: "greenyellow",
    },
  },
  tooltip: {},
  legend: {},
  grid: {
    // show: false,
    top: 20,
    bottom: 60,
    left: 20,
    right: 60,
  },

  // x轴数据
  xAxis: {
    data: x_data,
    show: false,
    axisTick: { show: true },
    axisLabel: { show: true },
  },
  // y轴数据
  yAxis: {
    show: false,
    axisLabel: {
      show: true,
    },
    scale: true, // 不强制显示零；
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
      markPoint: {
        data: [
          { type: "max", name: "Max" },
          { type: "min", name: "Min" },
        ],
        symbol: "circle",
        symbolSize: 30, // 大小
        symbolRotate: 0, // 旋转
        symbolOffset: [0, 0], // 偏移
        label: {
          color: "white",
        },
        itemStyle: {
          color: "rgba(215, 96, 96, 1)",
        },
      },
      markLine: {
        data: [{ type: "average", name: "Avg" }],
        label: {
          fontStyle: "normal",
          fontWeight: "bolder",
          color: "greenyellow",
        },
        lineStyle: {
          color: "greenyellow",
        },
      },
    },
    // {
    //   // name: "Highest",
    //   type: "point",
    //   data: y_data,
    //   markPoint: {
    //     data: [
    //       { type: "max", name: "Max" },
    //       { type: "min", name: "Min" },
    //     ],
    //   },
    //   markLine: {
    //     data: [{ type: "average", name: "Avg" }],
    //   },
    // },
  ],
};
