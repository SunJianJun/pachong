var Nightmare = require('nightmare');
var nightmare = Nightmare({
  show: true,//显示electron窗口
  waitTimeout: 100000
});
// nightmare.goto()
nightmare
//加载页面
  .goto('http://www.ihchina.cn/5/5_1.html')
  .wait(function () {
    return $('.main_ccr_content_list_sbdqdw li').length > 0;
  })
  .inject('js', 'jquery.min.js')
  .wait(function () {
    qqNews = [];
    pagelengh = $('.main_ccr_content_list_sbdqdw li').length;
    page = 1;
    obj = {//结果
      centent: []
    };
    var listnom=function(bh) {
      obj.name=$('.main_ccr_content_list_sbdqdw ul li a').eq(bh).text().replace(/\s/g, "")//去除文字去掉空格
      showContent('content.prop6', '%1' + bh + '%', 'like', '申报地区或单位', $('.main_ccr_content_list_sbdqdw ul li a').eq(bh)[0]);//进入详情内容页面
    }
    listnom(2);
    if ($('#showList1').css('display') == 'none') {
      if ($('#mingluList tr:not(#tableList)').length) {
        window.cententPage = $('#pageBox1').text().split('，')[1]?$('#pageBox1').text().split('，')[1].replace(/[^0-9]/ig, ""):1;//取出内容总页码
        return true;
      }
    }
    return false;
  })
  .wait(function () {

    // $('#pageBox1').text().split('，')[2].replace(/[^0-9]/ig, "") //当前页数
    if (page != cententPage) {
      $('#mingluList tr:not(#tableList)').each(function () {
        var cenobj = {};
        cenobj.no = $(this).children().eq(0).text();
        cenobj.name = $(this).children().eq(1).text();
        cenobj.class = $(this).children().eq(2).text();
        cenobj.area = $(this).children().eq(3).text();
        cenobj.page = page + '' + cententPage;
        obj.centent.push(cenobj);
      })
      page++;
      nextPage(2);//下一页
      if($('#pageBox1').text().split('，')[2].replace(/[^0-9]/ig, "")==page) {
        return false;
      }
    }
    if (page == cententPage) {
      $('#mingluList tr:not(#tableList)').each(function () {
        var cenobj = {};
        cenobj.no = $(this).children().eq(0).text();
        cenobj.name = $(this).children().eq(1).text();
        cenobj.class = $(this).children().eq(2).text();
        cenobj.area = $(this).children().eq(3).text();
        cenobj.page = page + '' + cententPage;
        obj.centent.push(cenobj);
      })
      obj.cententPage = cententPage;
      qqNews.push(obj);

      // $('#showList1').css('display', 'block')
      return true;
    }

  })
  .evaluate(function () {
    return qqNews;
  })
  .end()
  .then(function (res) {
    console.log(res, res.length);
    console.log(res[0].centent)
    console.log(res[0].centent.length)
  })
  .catch(function (error) {
    console.error('failed:', error);
  });

// centent(0)