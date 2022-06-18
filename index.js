const { default: axios } = require("axios");
const puppeteer = require("puppeteer");

// "https://dynamic-portfolio-api.herokuapp.com/ " + "portfolio/getBlogs",
const getblogList = async () => {
  let data = await axios.get(
    "https://dynamic-portfolio-api.herokuapp.com/portfolio/getBlogs"
  );
  return data.data;
};

(async () => {
  let data;
  try {
    data = await getblogList();
  } catch (err) {
    console.log(err.message);
  }
  const browser = await puppeteer.launch({ headless: false, slowMo: 250 });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });

  for (let i = 0; i < data.length; i++) {
    console.log(data[i]);
    await page.goto(data[i]?.link);
    await autoScroll(page);
  }
  await browser.close();
})();

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      // for (let i = 0; i <= 10; i++) {
      var totalHeight = 0;
      var distance = Math.floor(Math.random() * 15 + 1);
      var timer = setInterval(() => {
        distance = Math.floor(Math.random() * 55 + 1);
        var scrollHeight = document.body.scrollHeight;
        console.log(distance);
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, Math.floor(Math.random() * 1000 + 1));
      // }
    });
  });
  return;
}
