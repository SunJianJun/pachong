var Nightmare = require('nightmare');
var nightmare = Nightmare({
  show: true//显示electron窗口
  // waitTimeout : 5000
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
    page=0
    return true;
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
    if(page+1){
      $('.main_ccr_content_list_sbdqdw li').each(function(e,v){
        var title = $(this).text().replace(/\s/g, "");//去除文字去掉空格
        if(title){
          $('.main_ccr_content_list_sbdqdw li').eq(e).find('a').click(function (cc) {

            qqNews.push(title+cc);

          })
          // qqNews.push(title+e);
        }
      });
      page+=1;
      // if(page>pagelengh-1){return true;}
      return true;
    }

    return false;
  })
  .wait()
  .evaluate(function(){
    return qqNews;
  })
  .end()
  .then(function(res){
    console.log(res,res.length);
  })
  .catch(function (error) {
    console.error('failed:', error);
  });