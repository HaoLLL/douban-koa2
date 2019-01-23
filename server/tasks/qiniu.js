const qiniu = require('qiniu');
const nanoid = require('nanoid');
const config = require('../config');

const bucket = config.qiniu.bucket;
const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK);
console.log(qiniu);
const cfg = new qiniu.conf.Config();
const client = new qiniu.rs.BucketManager(mac, cfg);
//key:文件名 nano生成 返回说明上传成功
const uploadToQiniu = async (url, key) => {
    return new Promise((resolve, reject) => {
        //从网络上面获取静态资源 用key重命名文件资源
        client.fetch(url, bucket, key, (err, ret, info) => {
            if (err) {
                reject(err);
            }
            if (info.statusCode === 200) {
                resolve({ key })
            } else {
                reject(info);
            }
        })
    })
}
(async() => {
    const movies = [
        {
            video:
                'http://vt1.doubanio.com/201901011506/b4baf6b8d9bd26a9eccf8625dcb63d3b/view/movie/M/402410239.mp4',
            doubanId: '30377703',
            poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2542848758.jpg',
            cover:
                'https://img3.doubanio.com/img/trailer/medium/2543712325.jpg?1545818708'
        }
    ];
    movies.map(async movie => {
        if (movie.video && !movie.key) {
            try {
                let videoData = await uploadToQiniu(movie.video, nanoid() + '.mp4');
                let coverData = await uploadToQiniu(movie.cover, nanoid() + '.png');
                let posterData = await uploadToQiniu(movie.poster, nanoid() + '.png');

                if (videoData.key) {
                    movie.videoKey = videoData.key;
                }
                if (coverData.key) {
                    movie.coverKey = coverData.key;
                }
                if (posterData.key) {
                    movie.posterKey = posterData.key;
                }
                console.log(movie);

            } catch (err) {
                console.log(err);
            }
        }
    })

})()


// { doubanId: 27615441,
//     title: '网络谜踪',
//     rate: 8.5,
//     poster:
//      'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2542848758.jpg' } ]