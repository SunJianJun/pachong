var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var i = 0;
var url = "http://www.ihchina.cn/5/5_1.html";
//初始url

function fetchPage(x) {     //封装了一层函数
  startRequest(x);
}


function startRequest(x) {
  //采用http模块向服务器发起一次get请求
  http.get(x, function (res) {
    var html = '';        //用来存储请求网页的整个html内容
    var titles = [];
    res.setEncoding('utf-8'); //防止中文乱码
    //监听data事件，每次取一块数据
    res.on('data', function (chunk) {
      html += chunk;
    });
    //监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数
    res.on('end', function () {

      var $ = cheerio.load(html); //采用cheerio模块解析html

      // var time = $('.article-info a:first-child').next().text().trim();

      // var news_item = {
      //   //获取文章的标题
      //   title: $('div.article-title a').text().trim(),
      //   //获取文章发布的时间
      //   Time: time,
      //   //获取当前文章的url
      //   link: "http://www.ss.pku.edu.cn" + $("div.article-title a").attr('href'),
      //   //获取供稿单位
      //   author: $('[title=供稿]').text().trim(),
      //   //i是用来判断获取了多少篇文章
      //   i: i = i + 1,
      //
      // };
console.log($('.main_ccr_content_list_sbdqdw'))
      function showContent2(value, text,text2 ,prop12){
        $("#showList1").hide();
        $("#main_subNav").show();
        $("#showSelect").text(text);
        $("#prop3").val('');
        $("#prop6").val(value);
        $("#prop12").val(prop12);
        $("#s1").text("申报地区或单位|");
        $("#s2").text(text2);
        $("#tiaojian").show();
        getMingLu2('54' ,'1');
      }
//国家名录查询
      function getMingLu2(catalogId , page ){
        var leibie = $("#prop3").val();
        var pici = $("#prop4").val();
        var diqu = $("#prop6").val();
        var zengbu = $("#prop12").val();
        //var mingcheng = $("#title").val().replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        var num = 1;
        var data = {
          "page":page ,
          "rows":"10" ,
          "searchCondition[0].key":"catalog.id",
          "searchCondition[0].operator" : "=",
          "searchCondition[0].value" : catalogId,
        };
        if(leibie){
          data['searchCondition['+num+'].key']="content.prop3";
          data['searchCondition['+num+'].operator']="=";
          data['searchCondition['+num+'].value']=leibie;
          num++;
        }
        if(diqu){
          data['searchCondition['+num+'].key']="content.prop6";
          data['searchCondition['+num+'].operator']="like";
          data['searchCondition['+num+'].value']="%"+diqu+"%";
          num++;
        }
        if(zengbu){
          data['searchCondition['+num+'].key']="content.prop12";
          data['searchCondition['+num+'].operator']="=";
          data['searchCondition['+num+'].value']=zengbu;
          num++;
        }

        http.post({
          url:url+"/content/getPageCatalogContent",
          data:data,
          type:"get",
          dataType : "jsonp",//数据类型为jsonp
          jsonp: "jsonpCallback",//服务端用于接收callback调用的function名的参数
          success:function(data){
            console.log(data);
            var html = '<tbody><tr height="15" id="tableList">'+
              '<th width="10%%">序号</th>'+
              '<th width="40%">名称</th>'+
              '<th width="20%">类别</th>'+
              '<th width="30%">申报地区或单位</th>'+
              '</tr>';

            $.each(data.rows, function(index , val){
              var leibei = val.content.prop3;
              var bianHao = val.content.prop7;
              var num = "";
              num=bianHao;

              switch(leibei){
                case '01':
                  leibei = '民间文学';
                  break;
                case '02':
                  leibei = '传统音乐';
                  break;
                case '03':
                  leibei = '传统舞蹈';
                  break;
                case '04':
                  leibei = '传统戏剧';
                  break;
                case '05':
                  leibei = '曲艺';
                  break;
                case '06':
                  leibei = '传统体育、游艺与杂技';
                  break;
                case '07':
                  leibei = '传统美术';
                  break;
                case '08':
                  leibei = '传统技艺';
                  break;
                case '09':
                  leibei = '传统医药';
                  break;
                case '10':
                  leibei = '民俗';
                  break;
              }
              val.content.prop6.replay
              html += '<tr>';
              html += '<td class="glmltdBottom"><a>'+num+'</a>';
              html += '<td class="glmltdBottom"><a href="'+val.content.id+'.html" target="_blank">'+val.content.title+'</a>';
              html += '<td class="glmltdBottom"><a>'+leibei+'</a>';
              html += '<td class="glmltdBottom"><a>'+val.content.prop8+'</a>';
              html += '</tr>';

            });
            html += '</tbody>';
            //alert(html);
            $("#mingluList").html(html);
            var html2 = '共 '+data.total+' 项&nbsp;&nbsp;，共 '+data.totalPage+' 页，&nbsp;&nbsp;当前第 '+data.currPage+' 页。&nbsp;&nbsp;';
            html2+= '<a href="javascript:void(0);" onclick="fristPage();">首页</a>&nbsp;&nbsp;';
            html2+= '<a href="javascript:void(0);" onclick="beforePage( '+data.prePage+')">上一页</a>&nbsp;&nbsp;';
            html2+= '<a href="javascript:void(0);" onclick="nextPage('+data.nextPage+')">下一页</a>&nbsp;&nbsp;';
            html2+= '<a href="javascript:void(0);" onclick="lastPage('+data.totalPage+')">尾页</a><br>直接到&nbsp;&nbsp;';
            html2+= '<input id="pageNum" class="pageNum" onkeypress="javascript:EnterPress();">&nbsp;&nbsp;页';
            html2+= '<a href="javascript:void(0);" onclick="goto('+data.totalPage+')">&nbsp;跳转</a>';
            if(data.totalPage == 1){
              html2 = '共 '+data.total+' 项';
            }
            $("#pageBox1").html(html2);
          },
          error:function(data){
            alert("数据获取错误");
          }
        });
      }


      console.log(news_item);     //打印新闻信息
      var news_title = $('div.article-title a').text().trim();

      savedContent($,news_title);  //存储每篇文章的内容及文章标题

      savedImg($,news_title);    //存储每篇文章的图片及图片标题


      //下一篇文章的url
      var nextLink="http://www.ss.pku.edu.cn" + $("li.next a").attr('href');
      str1 = nextLink.split('-');  //去除掉url后面的中文
      str = encodeURI(str1[0]);
      //这是亮点之一，通过控制I,可以控制爬取多少篇文章.
      if (i <= 500) {
        fetchPage(str);
      }

    });

  }).on('error', function (err) {
    console.log(err);
  });

}

fetchPage(url);      //主程序开始运行