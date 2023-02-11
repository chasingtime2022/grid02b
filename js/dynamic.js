var dom = document.getElementById("dynamic");
var myChart = echarts.init(dom, null, {
  renderer: "canvas",
  useDirtyRect: false,
  width: 400,
  height: 100,
});
var app = {};

var option;

function randomData() {
  now = new Date(+now + oneDay);
  value = Math.random() * 21 - 10;
  return {
    name: now.toString(),
    value: [
      [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"),
      Math.round(value),
    ],
  };
}
let data = [];
let now = new Date(2022, 9, 3);
let oneDay = 24 * 3600 * 100;
let value = Math.random() * 100;
for (var i = 0; i < 800; i++) {
  data.push(randomData());
}
option = {
  title: {
    text: "Dynamic Signal from Cosmos",
    x: "center",
  },

  grid: { left: "0%", top: "0%", width: "100%", height: "100%" },
  xAxis: {
    type: "time",
    splitLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
  },
  yAxis: {
    type: "value",
    boundaryGap: [0, "100%"],
    splitLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
  },
  series: [
    {
      name: "Fake Data",
      type: "line",
      showSymbol: false,
      areaStyle: { color: "black" },
      data: data,
      lineStyle: { color: "purple" },
    },
  ],
};
setInterval(function () {
  for (var i = 0; i < 5; i++) {
    data.shift();
    data.push(randomData());
  }
  myChart.setOption({
    series: [
      {
        data: data,
      },
    ],
  });
}, 200);

if (option && typeof option === "object") {
  myChart.setOption(option);
}

window.addEventListener("resize", myChart.resize);
