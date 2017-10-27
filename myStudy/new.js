var Nightmare = require('nightmare');
var nightmare = Nightmare({
  show: true,//显示electron窗口
  waitTimeout : 5000
});

nightmare
//加载页面
  .goto('http://www.ihchina.cn/5/5_1.html')
  .wait(function() {
    return $('.main_ccr_content_list_sbdqdw li').length>0;
  })
  .inject('js','jquery.min.js')
  .wait(function(){
    window.qqNews=[];
    pagelengh = $('.main_ccr_content_list_sbdqdw li').length;
    window.page=1;
    window.cenobj ={};

    window.obj={};
    obj.centent=[];
    obj.name=$('.main_ccr_content_list_sbdqdw ul li a').eq(0).text().replace(/\s/g, "");//去除文字去掉空格

    showContent('content.prop6' , '%10%' ,'like', '申报地区或单位' ,$('.main_ccr_content_list_sbdqdw ul li a').eq(0)[0]);//进入详情内容页面
    if($('#showList1').css('display')=='none') {
      if($('#mingluList tr:not(#tableList)').length) {
        return true;
      }
    }
    return false;
  })
  .wait(function(){
    /*
    if(page!==1){
      $('#artContainer li').each(function(){
        var title = $(this).find('a').text();
        qqNews.push(title);
      });
      $('#pageArea .f12:contains("下一页")').click();
      page -= 1;
      return false;
    }
    */

    var cententPage=$('#pageBox1').text().split('，')[1].replace(/[^0-9]/ig,"");//取出内容总页码
    var countlength=$('#mingluList tr:not(#tableList)').length;
    if(page<=cententPage) {
      for (var a = 0; a < countlength; a++) {//取出每一行
        // if(num=='序号'){continue;}
        cenobj.no = $('#mingluList tr:not(#tableList)').eq(a).children().eq(0).text();
        cenobj.name = $('#mingluList tr:not(#tableList)').eq(a).children().eq(1).text();
        cenobj.class = $('#mingluList tr:not(#tableList)').eq(a).children().eq(2).text();
        cenobj.area = $('#mingluList tr:not(#tableList)').eq(a).children().eq(3).text();
        obj.centent.push(cenobj);
        cenobj={};
      }
      obj.cententPage = cententPage;
      nextPage(2);
      if($('#pageBox1').text().split('，')[2].replace(/[^0-9]/ig,"")!=page) {
        page++;
        return false;
      }
      if(page==cententPage){
        qqNews.push(obj);
        return true;
      }
    }
  })
  .wait()
  .evaluate(function(){
    return qqNews;
  })
  .end()
  .then(function(res){
    console.log(res,res.length);
    console.log(res[0].centent)
    console.log(res[0].centent.length)
  })
  .catch(function (error) {
    console.error('failed:', error);
  });