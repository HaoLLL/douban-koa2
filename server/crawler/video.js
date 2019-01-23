const base = `https://movie.douban.com/subject/`;
const doubanId = '30377703'
// const videoBase = "https://movie.douban.com/trailer/241239/#content";
const videoBase = "https://movie.douban.com/trailer/241239";
const puppeteer = require('puppeteer');
//详情页的预告片cover 点进去的预告片视频地址
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
    await page.goto(base+doubanId,{
        waitUntil:'networkidle2'
    });
    //确保页面空闲了
    await sleep(1000);
    //等待出现'加载更多'

    //使用window上面挂载的对象
    const result = await page.evaluate(()=>{
        //回调是浏览器中运行的脚本
        var $ = window.$;
        var it = $('.related-pic-video');
        if(it && it.length>0){
            var link = it.attr('href');
            var cover = it.css('background-image').replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '');
            return {
                link,
                cover
            }
        }
        return {};
    });
    let video;
    if(result.link){
        await page.goto(result.link,{
            waitUntil:'networkidle2'
        })
        await sleep(2000);
        video = await page.evaluate(()=>{
            var $ = window.$;
            var it = $('source');
            if(it&&it.length>0){
                return it.attr('src');
            }
            return '';
        });
    }
    const data = {
        video,
        doubanId,
        cover:result.cover
    }
    browser.close();
    console.log(data);
    process.send({data});
    process.exit(0);
})();