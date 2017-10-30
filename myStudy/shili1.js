var Nightmare = require('nightmare');
var nightmare = Nightmare({
  show: true//显示electron窗口
  // waitTimeout : 5000
});

nightmare
//加载页面
  .goto('http://www.ihchina.cn/5/5_1.html')
  .wait(function() {
    return document.querySelectorAll('.main_ccr_content_list_sbdqdw li a').length>0;
  })
  .inject('js','jquery.min.js')
  .wait(function(){
    window.qqNews=[];
    $('.main_ccr_content_list_sbdqdw li a').eq(4).click();
    if($('#pageBox1').text().split('，')[2]) {
      page = $('#pageBox1').text().split('，')[1].replace(/[^0-9]/ig, "");
      return true;
    }
  })
  .wait(function(){

    if(page!==1){
      //国家名录查询
      function getMingLu(catalogId , page ,callback){
        var name = $("#searchName").val();
        var value = $("#searchValue").val();
        var oper = $("#searchOper").val();
        var prop4 = $("#prop4").val();

        if(name == null){
          alert("未获取查询条件的名称");
          return false;
        }
        $.ajax({
          url: url + "/content/getPageCatalogContent",
          data: {
            "page": page,
            "rows": "10",
            "searchCondition[0].key": "catalog.id",
            "searchCondition[0].operator": "=",
            "searchCondition[0].value": catalogId,
            "searchCondition[1].key": name,
            "searchCondition[1].operator": oper,
            "searchCondition[1].value": value,
            "searchCondition[2].key": 'content.prop4',
            "searchCondition[2].operator": "=",
            "searchCondition[2].value": prop4,
            "sortMap['content.prop7']": "asc"
          },
          type: "get",
          dataType: "jsonp",//数据类型为jsonp
          jsonp: "jsonpCallback",//服务端用于接收callback调用的function名的参数
          success: function (data) {
            qqNews.push(data);
            callback(true)
          }
        })
      }
      getMingLu(5,1,function(e){
        if(e){
          return e;
        }
      })
      // $('#mingluList tr:not(#tableList)').each(function(){
      //   var title = $(this).find('a').text();
      //   qqNews.push(title);
      // });
      nextPage(2);
      page -= 1;
      return false;
    }
    if(page===1){
      $('#mingluList tr:not(#tableList)').each(function(){
        var title = $(this).find('a').text();
        qqNews.push(title);
      });
      return true;
    }

    return false;
  })
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