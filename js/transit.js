// let dynamic = document.getElementById("temperature");
// let current = document.getElementById("current");
// let energy = document.getElementById("energy");
let cosmos = document.getElementById("cosmos");
let map_bg = document.getElementById("map_bg");
let realtime = document.getElementById("realtime");

let n = 0;
// let z
setInterval(() => {
  // dynamic.style.setProperty("z-index", n % 3);
  // current.style.setProperty("z-index", (n + 1) % 3);
  // energy.style.setProperty("z-index", (n + 2) % 3);

  cosmos.style.setProperty("z-index", ((n + 0) % 2) + 3);
  map_bg.style.setProperty("z-index", ((n + 1) % 2) + 3);
  // if (n % 2 == 0) {
  //   // realtime.style.setProperty("background-color", "blue");
  //   realtime.style.setProperty("color", "yellow");
  //   time.style.setProperty("color", "blue");
  // } else {
  //   // realtime.style.setProperty("background-color", "black");
  //   realtime.style.setProperty("color", "greenyellow");
  //   time.style.setProperty("color", "greenyellow");
  // }
  if (n > 999) {
    n = 0;
  }
  n += 1;
}, 60000);

// let n = "block";
// let m = "none";
// setInterval(() => {
//   dynamic.setAttribute("display", n);
//   current.setAttribute("display", m);
//   if (n == "block") {
//     n = "none";
//     m = "block";
//   } else {
//     n = "block";
//     m = "none";
//   }
// }, 100);
