let dynamic = document.getElementById("temperature");
let current = document.getElementById("current");

let n = 5;
let m = n - 1;
setInterval(() => {
  dynamic.style.setProperty("z-index", n);
  current.style.setProperty("z-index", m);
  if (n > m) {
    m = n;
    n = n - 1;
  } else {
    n = m;
    m = m - 1;
  }
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
