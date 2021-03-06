const { default: axios } = require("axios");
const puppeteer = require("puppeteer");
const PCR = require("puppeteer-chromium-resolver");

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
    const option = {
      revision: "",
      detectionPath: "",
      folderName: ".chromium-browser-snapshots",
      defaultHosts: [
        "https://storage.googleapis.com",
        "https://npm.taobao.org/mirrors",
      ],
      hosts: [],
      cacheRevisions: 2,
      retry: 3,
      silent: true,
    };
    const stats = await PCR(option);

    for (let i = 0; i < data.length; i++) {
      const browser = await puppeteer.launch({
        headless: true,
      });
      // console.log(data);
      // console.log(data[i]);
      const page = await browser.newPage();
      // await page.setViewport({ width: 1366, height: 768 });
      await page.goto(data[i]?.link, { waitUntil: "networkidle0" });
      // await autoScroll(page);
      await browser.close();
    }
    return true;
  } catch (err) {
    console.log(err);
  }
};

const views = async (req, res, next) => {
  try {
    await viewsFiles();
    res.status(200).send("Success!!");
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = { views };
