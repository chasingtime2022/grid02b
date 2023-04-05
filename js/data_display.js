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
  let latitude_ew;
  if (latitude < 0) {
    latitude_ew = latitude.toFixed(2) + " 南";
  } else {
    latitude_ew = latitude.toFixed(2) + " 北";
  }
  let longitude = data["longitude"][n];
  let longitude_ew;
  if (longitude < 0) {
    longitude_ew = longitude.toFixed(2) + " 西";
  } else {
    longitude_ew = longitude.toFixed(2) + " 东";
  }
  let altitude = (data["altitude"][n] / 1000).toFixed(2) + " 千米";

  document.querySelector("#time").innerHTML = "时间: " + date;
  document.querySelector("#latitude").innerHTML = "纬度: " + latitude_ew;
  document.querySelector("#longitude").innerHTML = "经度: " + longitude_ew;
  document.querySelector("#altitude").innerHTML = "高度: " + altitude;
  //   document.querySelector("#news_figure").src = news[n].img_url;
  //   document.querySelector("#news_content").innerHTML = news[n].content;
  //   count += 1;
  n += 1;
}, 1000);
