const puppeteer = require('puppeteer');
const CaptchaSolver = require('captcha-solver')
const URL = 'https://www.redbubble.com/auth/login';



const cognitoUsername = 'EnochXu';
const password = 'cd6hUdWcy7vLDT4';

(async () => {
  const browser = await puppeteer.launch({headless:false,slowMo:250  
    
  }
  );
  const solver = new CaptchaSolver(browser);

  const page = await browser.newPage();

  await page.setViewport({width: 600, height: 600})
  await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 9_0_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13A404 Safari/601.1')

  await page.goto(URL, {waitUntil: 'networkidle0'});
  
  await page.type('#ReduxFormInput1',cognitoUsername,{delay: 50});//
  await page.type('#ReduxFormInput2',password,{delay: 50});//
  await page.waitFor(500);
  await page.click('.app-ui-components-Button-Button_button_1_MpP',{delay: 500});
  if(page.url()==='https://www.redbubble.com/auth/login'){
    console.log('需要输入验证码');
    const codes = await solver.solve();
    while(true){
      await page.waitForNavigation({
        waitUntil: 'load'
      })
      console.log(page.url())
      if(page.url()==='https://www.redbubble.com/explore/'){
        console.log('登录成功');
        break;
      }
    }
  }

  await page.waitForNavigation({
    waitUntil:'load'
  });
  await page.screenshot({path: 'login.png'});//截个图
  await browser.close();
})();

