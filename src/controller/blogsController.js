const { default: axios } = require("axios");
const puppeteer = require("puppeteer");

const views = async (req, res, next) => {
  try {
    await viewsFiles();
    res.status(200).send("Success!!");
  } catch (err) {
    res.status(400).send(err);
  }
};

const getblogList = async () => {
  let data = await axios.get(
    "https://dynamic-portfolio-api.herokuapp.com/portfolio/getBlogs"
  );
  return data.data;
};

const viewsFiles = async () => {
  let data;
  try {
    data = await getblogList();
  } catch (err) {
    console.log(err.message);
  }
  const browser = await puppeteer.launch({ headless: true, slowMo: 250 });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });

  for (let i = 0; i < data.length; i++) {
    console.log(data[i]);
    await page.goto(data[i]?.link);
    await autoScroll(page);
  }
  // data?.map(async (ele) => {
  //   console.log(ele)
  //   await page.goto(ele?.link);
  //   //   await page.screenshot({ path: "example.png" });
  //   await autoScroll(page);
  //   // await browser.close();
  // });
  // await page.goto(
  //   "https://primeprogrammingworld.blogspot.com/2021/05/problem-158a-solution-next-round.html"
  // );

  // await autoScroll(page);

  // setTimeout(async () => {
  await browser.close();
  // }, 500);
};

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

module.exports = { views };
