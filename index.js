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
      var distance = Math.floor(Math.random() * 25 + 1);
      var timer = setInterval(() => {
        distance = Math.floor(Math.random() * 25 + 1)
        var scrollHeight = document.body.scrollHeight;
        console.log(distance)
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, Math.floor(Math.random() * 2000 + 1));
      // }
    });
  });
  return height;
}
