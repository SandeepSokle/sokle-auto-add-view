const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 250 });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });
  

  await page.goto(
    "https://primeprogrammingworld.blogspot.com/2021/06/leetcode-max-area-of-island-solution.html"
  );
  //   await page.screenshot({ path: "example.png" });
   await autoScroll(page);
  
  // await page.goto(
  //   "https://primeprogrammingworld.blogspot.com/2021/05/problem-158a-solution-next-round.html"
  // );

  // await autoScroll(page);

  setTimeout(async () => {
    await browser.close();
  }, 10000);
})();

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      // for (let i = 0; i <= 10; i++) {
        var totalHeight = 0;
        var distance = 15;
        var timer = setInterval(() => {
          var scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 600);
      // }
    });
  });
  return height;
}

