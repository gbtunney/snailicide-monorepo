# Testing

## Possible JEST alternative?

- [avajs/ava: Node.js test runner🚀](https://github.com/avajs/ava)

## Backstop

- [garris/BackstopJS: automated visual regression testing](https://github.com/garris/BackstopJS)

## Puppeteer

```shell
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({ path: 'example.png' });

  await browser.close();
})();
```
