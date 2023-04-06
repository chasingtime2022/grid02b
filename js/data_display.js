import tem_data from "./temperature_data.json" assert { type: "json" };
import pos_data from "./position_data.json" assert { type: "json" };
// console.log(data["time"]);
// let news_num = news.length;
// let count = 0;
let n = 0;
setInterval(function () {
  //   n = count % news_num;
  const date = new Date(); // 当前时间

  // let time = pos_data["time"][n];
  let latitude = pos_data["latitude"][n];
  let latitude_ns;
  if (latitude < 0) {
    latitude_ns = " 南";
  } else {
    latitude_ns = " 北";
  }
  let longitude = pos_data["longitude"][n];
  let longitude_ew;
  if (longitude < 0) {
    longitude_ew = " 西";
  } else {
    longitude_ew = " 东";
  }
  let altitude = pos_data["altitude"][n] / 1000;
  let temperature = tem_data["temperature"][n];

  document.querySelector("#time_value").innerHTML = date;

  // latitude
  document.querySelector("#latitude_value").innerHTML = latitude.toFixed(2);
  document.querySelector("#latitude_remark").innerHTML = latitude_ns;

  // longitude
  document.querySelector("#longitude_value").innerHTML = longitude.toFixed(2);
  document.querySelector("#longitude_remark").innerHTML = longitude_ew;

  // altitude
  document.querySelector("#altitude_value").innerHTML = altitude.toFixed(2);
  document.querySelector("#altitude_remark").innerHTML = "千米";

  // temperature
  document.querySelector("#temperature_value").innerHTML =
    temperature.toFixed(2);
  document.querySelector("#temperature_remark").innerHTML = "°C";
  //   document.querySelector("#news_figure").src = news[n].img_url;
  //   document.querySelector("#news_content").innerHTML = news[n].content;
  //   count += 1;
  n += 1;
}, 1000);
