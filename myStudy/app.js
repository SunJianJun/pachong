/**
 * Created by Administrator on 2017/10/25.
 */
var http=require('http');
var fs=require('fs');
var cheerio=require('cheerio');
var request=require('request');

var i=0;
var url = 'http://list.jd.com/list.html?cat=670,671,1105&ev=933%5F88790&sort=sort%5Ftotalsales15%5Fdesc&trans=1&JL=3_%E5%A4%84%E7%90%86%E5%99%A8_Intel%20i7%E6%A0%87%E5%87%86%E7%94%B5%E5%8E%8B%E7%89%88#J_crumbsBar';
//初始化url


function fetchPage(x){//封装函数
  startRequest(x);
}

var getPrice=function (price,callback) {//取到价格
  http.get('http://p.3.cn/prices/mgets?skuIds=J_'+price,function (res) {
    var html='';
    res.on('data',function(chunk){
      html+=chunk;
      res.setEncoding('utf-8');  //防止中文乱码
    })
    res.on('end',function () {

      var $=cheerio.load(html)
      var jgjson=eval($.text());
      callback(jgjson[0].op)
    })
  })
}

function startRequest(x){
  //采用http模块向服务器发起一次get请求
  /*
  http.get(x,function (res) {
      var html='';    //用来存储请求网页的整个html内容
      var titles=[];
      res.setEncoding('utf-8');  //防止中文乱码
    //监听data时间，每次取一块数据
      res.on('data',function(chunk){
        html+=chunk;
      })
    //监听end时间，如果整个网页的内容html都获取完毕，就执行回调函数
    res.on('end',function () {
      var $=cheerio.load(html); //采用cheerio模块解析html
      // var time=$('.gl-warp.clearfix').text().trim();
      // console.log($('.gl-warp.clearfix>li').length)

      for(var i=0;i<$('.gl-warp.clearfix>li').length;i++){//遍历出每个商品

        // console.log($('.gl-warp.clearfix>li').eq(i).find('.p-price .js_ys i').text())
        var news_item={ //取到的内容解析
          //获取标题
          title:$('.gl-warp.clearfix>li').eq(i).find('.p-name a em').text().trim(),
          //获取价格
          price:$('.gl-warp.clearfix>li').eq(i).find('.p-price .js_ys i').text().trim(),
          //获取介绍
          presentation:$('.gl-warp.clearfix>li').eq(i).find('.p-name a i').text().trim(),
          //获取商品地址
          url:'http:'+$('.gl-warp.clearfix>li').eq(i).find('.p-name a').attr('href')
        }
        console.log(news_item);
      }
      // console.log($('.gl-warp.clearfix>li').eq(1).find('.p-name a em').text().trim())
      // console.log($('.gl-warp.clearfix').html())
      // var news_item={ //取到的内容解析
      //   //获取标题
      //   title:$('.gl-warp.clearfix>li:eq(1)').text().trim()
      //   //获取价格
      //   price:
      //   //获取介绍
      //   presentation:
      //   //获取商品地址
      //   url:
      //
      // }
      // console.log(time);
    })
  })
  */
}
fetchPage(url)
