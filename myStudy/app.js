/**
 * Created by Administrator on 2017/10/25.
 */
var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var Nightmare=require('nightmare');
var nightmare=Nightmare({
  show:true //显示 electron 窗口
})
var i = 0;
var url = 'http://www.ihchina.cn/5/5_1.html';
//初始化url


// var getPrice=function (price,callback) {//取到价格
//   http.get('http://p.3.cn/prices/mgets?skuIds=J_'+price,function (res) {
//     var html='';
//     res.on('data',function(chunk){
//       html+=chunk;
//       res.setEncoding('utf-8');  //防止中文乱码
//     })
//     res.on('end',function () {
//
//       var $=cheerio.load(html)
//       var jgjson=eval($.text());
//       callback(jgjson[0].op)
//     })
//   })
// }
  //   function(){
  //   if(window.qqNews===undefined){}
  //   console.log('11')
  //   console.log(window.qqNews)
  //   console.log($('.main_ccr_content_list_sbdqdw'))
  // })
var startRequest=function(x) {
  //采用http模块向服务器发起一次get请求

  http.get(x, function (res) {
    var html = '';    //用来存储请求网页的整个html内容
    var titles = [];
    res.setEncoding('utf-8');  //防止中文乱码
    //监听data时间，每次取一块数据
    res.on('data', function (chunk) {
      html += chunk;
    });
    //监听end时间，如果整个网页的内容html都获取完毕，就执行回调函数
    res.on('end', function () {
      var $ = cheerio.load(html); //采用cheerio模块解析html
      // var time=$('.gl-warp.clearfix').text().trim();
      // console.log($('.main_ccr_content_list_sbdqdw').text().trim())

      for (var i = 0; i < $('.main_ccr_content_list_sbdqdw li').length; i++) {//遍历出每个商品

        // console.log($('.gl-warp.clearfix>li').eq(i).find('.p-price .js_ys i').text())
        var news_item = { //取到的内容解析
          //获取标题
          title: $('.main_ccr_content_list_sbdqdw li').eq(i).text().trim(),
          //获取商品地址
          url: 'http:' + $('.main_ccr_content_list_sbdqdw li a').eq(i).attr('href')
        };
        console.log(news_item);
      }
    });
  });

};


var fetchPage=function(x) {//封装函数
  startRequest(x);
};

fetchPage(url);
