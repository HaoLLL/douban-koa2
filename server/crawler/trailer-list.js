const url = "https://movie.douban.com/tag/#/?sort=U&range=6,10&tags=";
const puppeteer = require('puppeteer');
//爬取首页基本信息
const sleep = time=>new Promise((resolve,reject)=>{
    setTimeout(resolve,time);
})
;(async()=>{
    console.log("start visit the target page");
    //1.开启一个浏览器
    const browser =await puppeteer.launch({
        args:['--no-sandbox'],
        dumpio:false
    });
    //2.开启一个页面
    const page = await browser.newPage();
    await page.goto(url,{
        waitUntil:'networkidle2'
    });
    //确保页面空闲了
    await sleep(3000);
    //等待出现'加载更多'
    await page.waitForSelector('.more');
    for(let i=0;i<1;i++){
        await sleep(3000);//如果有更多次数的加载
        await page.click('.more');
    }
    //使用window上面挂载的对象
    const result = await page.evaluate(()=>{
        //回调是浏览器中运行的脚本
        var $ = window.$;
        var items = $('.list-wp a');
        var links = [];
        if(items.length>=1){
            items.each((index,item)=>{
                let it = $(item);
                let doubanId = it.find('div').data('id');
                let title = it.find('p').find('.title').text();
                let rate = Number(it.find('p').find('.rate').text());
                let poster = it.find('div').find('span').find('img').attr('src').replace('s_ratio','l_ratio');
                links.push({
                    doubanId,
                    title,
                    rate,
                    poster
                })
            })
        }
        return links;
    })
    browser.close();
    console.log(result);
    process.send({result});
    process.exit(0);
})();