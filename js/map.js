// import pos_data from "./json/position.json" assert { type: "json" };
// import pos_data from "./json/path_20230428.json" assert { type: "json" };
import pos_data from "./json/path_maydays.json" assert { type: "json" };
import tem_data from "./json/temperature_data.json" assert { type: "json" };

let map = document.getElementById("map");
let map_bg = document.getElementById("map_bg");
let w = map.clientWidth;
let h = map.clientHeight;
let w_bg = map_bg.clientWidth;
let h_bg = map_bg.clientHeight;
// console.log(map_bg.clientWidth);
let ctx = map.getContext("2d");
map.width = w_bg;
map.height = h_bg;

// 创建变量
let s_lon, s_lat, s_alt, x_pos, y_pos;
let x_data = [];
let y_data = [];

// 数据显示长度
let freq = 1; // 数据采集频率
let show_len = 8100 / freq; // 1s数据更新

// 获取当前时间
let now, year, month, day, hour, minute, second, head_num, end_num;
function now_num() {
  now = new Date();
  year = now.getFullYear();
  month = now.getMonth() + 1; // 月份需要加1
  day = now.getDate();
  hour = now.getHours();
  minute = now.getMinutes();
  second = now.getSeconds();
  // console.log(now, year, month, day, hour, minute, second);
  // console.log(day);

  if (month == 5) {
    // "=="注意符号
    head_num = ((day - 3) * 86400 + hour * 3600 + minute * 60 + second) / freq; // 1s数据更新
  } else {
    if (month == 4) {
      head_num =
        ((day - 3) * 86400 + hour * 3600 + minute * 60 + second) / freq; // 1s数据更新
    } else {
      console.log("Month Error");
    }
  }
  return head_num;
}
// console.log(head_num);
// console.log(pos_data["longitude"][head_num]);
// head_num = hour * 360 + minute * 6; // 10s数据更新
// head_num = hour * 60 + minute * 1; // 60s数据更新

// console.log(pos_data["longitude"][head_num]);
head_num = now_num();
// 数据少于显示长度时
if (head_num > show_len) {
  end_num = head_num - show_len;
} else {
  end_num = 0;
}
// console.log(end_num);

let i;
let lon_offset = 0; // offset = 5
// console.log(end_num);
// for (i = end_num; i < head_num; i++) {
//   let xx = pos_data["longitude"][i];
//   console.log(xx);
// }

// 当数量不足时
let act_len = Math.min(head_num, show_len);

for (i = end_num; i < end_num + act_len; i++) {
  s_lon = pos_data["longitude"][i];
  s_lat = pos_data["latitude"][i];
  // console.log(s_lat);

  if (s_lon > lon_offset - 180) {
    s_lon = s_lon - lon_offset * 2;
  } else {
    s_lon = s_lon + 345;
  }

  x_pos = ((s_lon + 180) / 360) * w; // offset=15
  y_pos = ((90 - s_lat) / 180) * h;

  x_data.push(x_pos);
  y_data.push(y_pos);
}
// console.log(x_data.length);
// console.log(x_data[1]);

//背景图片
let img = new Image();
// img.src = "map.webp";
// img.onload = function () {
//   ctx.drawImage(img, 0, 0, w, h);
//
// };

// interval
// console.log(i);
setInterval(() => {
  // img.src = "../satellite/map.webp";
  // img.onload = function () {
  // 清除画布
  ctx.clearRect(0, 0, w * 1.2, h * 1.2);
  // ctx.drawImage(img, 0, 0, w, h);

  // 更新时间
  // time = new Date();
  // hour = time.getHours();
  // minute = time.getMinutes();
  // head_num = hour * 360 + minute * 6;

  // console.log(head_num, show_len, act_len);

  // head
  let x_len = x_data.length;
  let size_head = 10;
  ctx.beginPath();
  ctx.arc(x_data[x_len - 1], y_data[x_len - 1], size_head, 0, Math.PI * 2);
  ctx.fillStyle = "purple";
  ctx.fill();
  ctx.strokeStyle = "blue";
  ctx.stroke();
  i;
  ctx.closePath();
  // }

  //path
  let dot_num = 1; // 间距
  let size_path = 1;
  let sep_num = size_head / 0.5 / size_path; // 间距
  // for (let num = 0; num < act_len - 4; num++) { //10s数据更新
  for (let num = 0; num < x_len - sep_num; num++) {
    //60s数据更新
    ctx.beginPath();
    if (num % dot_num == 0) {
      ctx.arc(x_data[num], y_data[num], 1, 0, Math.PI * 2);
      // console.log(num);
    }

    ctx.fillStyle = "red";
    ctx.fill();
    // ctx.strokeStyle = "black";
    // ctx.stroke();
    ctx.closePath();
  }
  // };
  // head_num += 1;
  head_num = now_num();
  // console.log(head_num);
  s_lon = pos_data["longitude"][head_num];
  s_lat = pos_data["latitude"][head_num];
  s_alt = pos_data["altitude"][head_num];
  // console.log(head_num);
  // console.log(s_lon);
  // console.log(s_lat);
  // console.log(s_alt);

  if (s_lon > lon_offset - 180) {
    s_lon = s_lon - lon_offset * 2;
  } else {
    s_lon = s_lon + 345;
  }

  x_pos = ((s_lon + 180) / 360) * w;
  y_pos = ((90 - s_lat) / 180) * h;
  x_data.push(x_pos);
  y_data.push(y_pos);

  if (x_data.length > show_len) {
    x_data.shift();
    y_data.shift();
  }
  // 数据显示

  // let time = pos_data["time"][n];
  // let latitude = pos_data["latitude"][n];
  let latitude_ns;
  if (s_lat < 0) {
    latitude_ns = " 南";
  } else {
    latitude_ns = " 北";
  }
  // let longitude = pos_data["longitude"][n];
  let longitude_ew;
  if (s_lon < 0) {
    longitude_ew = " 西";
  } else {
    longitude_ew = " 东";
  }
  // let altitude = pos_data["altitude"][i].toFixed(2);
  // let altitude = pos_data["altitude"][i];
  let temperature = tem_data["temperature"][head_num % 500].toFixed(2);
  // console.log(temperature);

  // const date = new Date(); // 当前时间
  // document.querySelector("#time_value").innerHTML = date;

  // latitude
  document.querySelector("#latitude_value").innerHTML = s_lat.toFixed(2);
  document.querySelector("#latitude_remark").innerHTML = latitude_ns;

  // longitude
  document.querySelector("#longitude_value").innerHTML = s_lon.toFixed(2);
  document.querySelector("#longitude_remark").innerHTML = longitude_ew;

  // altitude
  document.querySelector("#altitude_value").innerHTML = s_alt.toFixed(2);
  document.querySelector("#altitude_remark").innerHTML = "千米";

  // temperature
  document.querySelector("#temperature_value").innerHTML = temperature;
  document.querySelector("#temperature_remark").innerHTML = "°C";

  // 数据显示

  if (i > pos_data.length) {
    i = 0;
  }
  // window.addEventListener("resize", img.resize);
}, 1000 * freq); // interval 1s=1000, 1min=60000
