var request = require('request');
var iconv = require('iconv-lite');
var cheerio = require('cheerio');
var debug = require('debug')('crawl:read');
exports.movie = function(url,callback){
    //请求网址内容
    request({url,encoding: null},function(err,response,body){
        //实现在一个转码,把gbk编码的buffer转成
        body = iconv.decode(body,'gbk');
        var $ = cheerio.load(body);
        var movies = [];
        $('.keyword .list-title').each(function(){
            //把当前对象转成query对象
            var $me = $(this);
            //声明一个电影对象 一个时标签文本对应的
            var movie = {
                name: $me.text(),
                url: $me.attr('href')
            }
            debug(`读到:${movie.name}`)
            movies.push(movie);
        })
        callback(null,movies);
    })
}
/*exports.movie('http://top.baidu.com/buzz?b=26&c=1&fr=topcategory_c1',function(err,movies){
    console.log(movies);
})*/