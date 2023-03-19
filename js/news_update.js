const news = [
  {
    title: "天格计划GRID",
    img_url: "./news/grid_logo_1.jpg",
    content:
      "伽马暴的瞬时辐射机制有多种猜想，至今仍未有定论。2016年，天格学生团队对这一 前沿科学问题发起挑战。构建一个覆盖全天的伽马射线暴探测网络，监测、定位与引力波爆发成协的短伽马射线暴。",
  },
  {
    title: "天格计划创始成员",
    img_url: "./news/creators.jpg",
    content: "",
  },
  {
    title: "中子星并和",
    img_url: "./news/neutron.gif",
    content: "",
  },
  {
    title: "Hubble Telescope",
    img_url: "./news/hubble.png",
    content:
      "Named in honor of the trailblazing astronomer Edwin Hubble, the Hubble Space Telescope is a large, space-based observatory, which has revolutionized astronomy since its launch and deployment by the space shuttle Discovery in 1990. Far above rain clouds, light pollution, and atmospheric distortions, Hubble has a crystal-clear view of the universe. Scientists have used Hubble to observe some of the most distant stars and galaxies yet seen, as well as the planets in our solar system.",
  },
  {
    title: "James Webb Space Telescope",
    img_url: "./news/webb.png",
    content:
      "The James Webb Space Telescope is a giant leap forward in our quest to understand the Universe and our origins. Webb will examine every phase of cosmic history: from the first luminous glows after the Big Bang to the formation of galaxies, stars, and planets to the evolution of our own solar system.",
  },
  {
    title: "Perseverance Mars Rover",
    img_url: "./news/mars.jpg",
    content:
      'The Mars Perseverance rover mission is part of NASA\'s Mars Exploration Program, a long-term effort of robotic exploration of the Red Planet. The Mars Perseverance mission addresses high-priority science goals for Mars exploration, including key questions about the potential for life on Mars. The mission takes the next step by not only seeking signs of habitable conditions on Mars in the ancient past, but also searching for signs of past microbial life itself. The Mars Perseverance rover introduces a drill that can collect core samples of the most promising rocks and soils and set them aside in a "cache" on the surface of Mars.',
  },
  {
    title: "Parker Solar Probe",
    img_url: "./news/probe.png",
    content:
      "NASA's historic Parker Solar Probe mission is revolutionizing our understanding of the Sun, where changing conditions can propagate out into the solar system, affecting Earth and other worlds. Parker Solar Probe travels through the Sun’s atmosphere, closer to the surface than any spacecraft before it, facing brutal heat and radiation conditions to provide humanity with the closest-ever observations of a star.",
  },
];

let news_num = news.length;
let count = 0;
let n;
setInterval(function () {
  n = count % news_num;
  document.querySelector("#news_title").innerHTML = news[n].title;
  document.querySelector("#news_figure").src = news[n].img_url;
  document.querySelector("#news_content").innerHTML = news[n].content;
  count += 1;
}, 5000);

// const news = [
//   {
//     title: "天格计划GRID",
//     img_url: "./news/grid_logo_1.jpg",
//     content:
//       "伽马暴的瞬时辐射机制有多种猜想，至今仍未有定论。2016年，天格学生团队对这一 前沿科学问题发起挑战。构建一个覆盖全天的伽马射线暴探测网络，监测、定位与引力波爆发成协的短伽马射线暴。",
//   },
//   {
//     title: "The First Members of GRID",
//     img_url: "./news/creators.jpg",
//     content: "",
//   },
//   {
//     title: "Neutron Star Merger",
//     img_url: "./news/neutron.gif",
//     content: "",
//   },
//   {
//     title: "Hubble Telescope",
//     img_url: "./news/hubble.png",
//     content:
//       "Named in honor of the trailblazing astronomer Edwin Hubble, the Hubble Space Telescope is a large, space-based observatory, which has revolutionized astronomy since its launch and deployment by the space shuttle Discovery in 1990. Far above rain clouds, light pollution, and atmospheric distortions, Hubble has a crystal-clear view of the universe. Scientists have used Hubble to observe some of the most distant stars and galaxies yet seen, as well as the planets in our solar system.",
//   },
//   {
//     title: "James Webb Space Telescope",
//     img_url: "./news/webb.png",
//     content:
//       "The James Webb Space Telescope is a giant leap forward in our quest to understand the Universe and our origins. Webb will examine every phase of cosmic history: from the first luminous glows after the Big Bang to the formation of galaxies, stars, and planets to the evolution of our own solar system.",
//   },
//   {
//     title: "Perseverance Mars Rover",
//     img_url: "./news/mars.jpg",
//     content:
//       'The Mars Perseverance rover mission is part of NASA\'s Mars Exploration Program, a long-term effort of robotic exploration of the Red Planet. The Mars Perseverance mission addresses high-priority science goals for Mars exploration, including key questions about the potential for life on Mars. The mission takes the next step by not only seeking signs of habitable conditions on Mars in the ancient past, but also searching for signs of past microbial life itself. The Mars Perseverance rover introduces a drill that can collect core samples of the most promising rocks and soils and set them aside in a "cache" on the surface of Mars.',
//   },
//   {
//     title: "Parker Solar Probe",
//     img_url: "./news/probe.png",
//     content:
//       "NASA's historic Parker Solar Probe mission is revolutionizing our understanding of the Sun, where changing conditions can propagate out into the solar system, affecting Earth and other worlds. Parker Solar Probe travels through the Sun’s atmosphere, closer to the surface than any spacecraft before it, facing brutal heat and radiation conditions to provide humanity with the closest-ever observations of a star.",
//   },
// ];
