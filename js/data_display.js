import data from "./fits_data.json" assert { type: "json" };
// console.log(data["time"]);
// let news_num = news.length;
// let count = 0;
let n = 0;
setInterval(function () {
  //   n = count % news_num;
  const date = new Date(); // 当前时间

  let time = data["time"][n];
  let latitude = data["latitude"][n];
  let latitude_ns;
  if (latitude < 0) {
    latitude_ns = " 南";
  } else {
    latitude_ns = " 北";
  }
  let longitude = data["longitude"][n];
  let longitude_ew;
  if (longitude < 0) {
    longitude_ew = " 西";
  } else {
    longitude_ew = " 东";
  }
  let altitude = data["altitude"][n] / 1000;

  document.querySelector("#time_value").innerHTML = date;
  document.querySelector("#latitude_value").innerHTML = latitude.toFixed(2);
  document.querySelector("#latitude_remark").innerHTML = latitude_ns;

  document.querySelector("#longitude_value").innerHTML = longitude.toFixed(2);
  document.querySelector("#longitude_remark").innerHTML = longitude_ew;

  document.querySelector("#altitude_value").innerHTML = altitude.toFixed(2);
  document.querySelector("#altitude_remark").innerHTML = "千米";
  //   document.querySelector("#news_figure").src = news[n].img_url;
  //   document.querySelector("#news_content").innerHTML = news[n].content;
  //   count += 1;
  n += 1;
}, 1000);
