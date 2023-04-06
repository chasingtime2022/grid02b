let dynamic = document.getElementById("temperature");
let current = document.getElementById("current");
let energy = document.getElementById("energy");

let n = 0;
// let z
setInterval(() => {
  dynamic.style.setProperty("z-index", n % 3);
  current.style.setProperty("z-index", (n + 1) % 3);
  energy.style.setProperty("z-index", (n + 2) % 3);
  if (n > 999) {
    n = 0;
  }
  n += 1;
}, 5000);

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
