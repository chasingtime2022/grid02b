import pha_data from "./json/pha_data.json" assert { type: "json" };

// import * as echarts from "echarts";

var chartDom = document.getElementById("pha");
var myChart = echarts.init(chartDom);
window.addEventListener("resize", myChart.resize);
var option;

const data = [];
const x_label = [];
const y_data = [];
const pha = pha_data["pha"];
for (let i = 0; i < 127; i++) {
  // data.push(Math.round(Math.random() * 200));
  x_label.push(i);
  data.push(0);
}
// console.log(y_data);
// console.log(x_label);
option = {
  title: {
    text: "PHA 能量分布/log",
    // text: "Gamma Ray Signal",
    x: "center",
    y: "bottom",
    textStyle: {
      fontSize: 18,
      // fontFamily: "Microsoft Yahei",
      color: "greenyellow",
    },
  },
  yAxis: {
    max: "dataMax",
    // data: y_data,
    show: false,
    axisTick: { show: false },
    axisLabel: { show: false },
  },
  xAxis: {
    type: "category",
    // data: ["A", "B", "C", "D", "E"],
    data: x_label,
    inverse: false,
    animationDuration: 300,
    animationDurationUpdate: 300,
    max: data.length, // only the largest 3 bars will be displayed
  },
  grid: {
    show: false,
    top: 20,
    bottom: 60,
    left: 20,
    right: 60,
  },
  series: [
    {
      realtimeSort: false,
      // name: "X",
      // type: "bar",
      type: "line",
      smooth: 0.6,
      symbol: "none",
      lineStyle: {
        color: "red",
        width: 5,
      },

      data: data,
      // label: {
      //   show: false,
      //   position: "top",
      //   valueAnimation: true,
      // },
      // markPoint: {
      //   data: [{ type: "max", name: "Max" }],
      //   symbol: "circle",
      //   symbolSize: 30, // 大小
      //   symbolRotate: 0, // 旋转
      //   symbolOffset: [0, 0], // 偏移
      //   label: {
      //     color: "white",
      //   },
      //   itemStyle: {
      //     color: "rgba(215, 96, 96, 1)",
      //   },
      // },
    },
  ],
  legend: {
    show: false,
  },
  animationDuration: 0,
  animationDurationUpdate: 3000,
  animationEasing: "linear",
  animationEasingUpdate: "linear",
};
var chn;
var cycle = 0;
var count = 0;
function run() {
  // for (var i = 0; i < 128; i++) {
  //   if (Math.random() > 0.9) {
  //     data[i] += Math.round(Math.random() * 2000);
  //   } else {
  //     data[i] += Math.round(Math.random() * 200);
  //   }
  //   // chn = Number(pha[i + 128 * cycle]);
  //   // cycle++;
  //   // // console.log(cycle);
  //   // y_data[chn]++;
  //   // // console.log(y_data);
  // }
  chn = Number(pha[count]);
  data[chn] += 1;
  count++;

  // chn = Number(pha[count]);
  // // console.log(count);
  // count++;
  // y_data[chn]++;
  // console.log(y_data);
  // console.log(data);

  myChart.setOption({
    series: [
      {
        type: "line",
        smooth: 0.6,
        symbol: "none",
        lineStyle: {
          color: "white",
          width: 2,
        },
        data: data,
      },
      // {
      //   type: "bar",
      //   data: data,
      // },
    ],
  });
}
setTimeout(function () {
  run();
}, 0);
setInterval(function () {
  run();
}, 1000);

option && myChart.setOption(option);
