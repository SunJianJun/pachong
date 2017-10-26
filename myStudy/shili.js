/**
 * Created by Administrator on 2017/10/26.
 */
var Nightmare = require('nightmare');
var nightmare = Nightmare({
  show: true,
  pollInterval: 1000
});


nightmare
  .goto('http://roll.news.qq.com/')
  .wait(function() {
    return document.querySelectorAll("#artContainer li").length>0;
  })
  .wait(function() {

    if (window._$qqNews == undefined) {

      window._$qqNews = {
        total: 0,
        page: 0,
        items: []
      }

      //停止自动刷新
      AutoRefresh();
      _$qqNews.total = qq.$("totalPage").value;

      G.showArtList = function(responseText) {
        try {
          eval("var json = " + responseText);
          if (json.response.code == "0") {
            qq.$("artContainer").innerHTML = json.data.article_info;

            //
            var newslist = document.querySelectorAll("#artContainer li a");
            for (var i = 0; i < newslist.length; i++) {

              _$qqNews.items.push({
                title: newslist[i].childNodes[0].data,
                href: newslist[i].href
              });
            }

            qq.$("totalPage").value = json.data.count;

            if (_$qqNews.total > 1) {
              _$qqNews.total -= 1;
              nextPage();
            }


          } else if (json.response.code == "2") {
            qq.$("totalPage").value = 1;
            G.gotoPage(1);
            qq.$("artContainer").innerHTML = '<div class="article-tips">该日期没有文章！</div>';
          } else {
            qq.$("totalPage").value = 1;
            G.gotoPage(1);
            qq.$("artContainer").innerHTML = '<div class="article-tips">文章加载失败！</div>';
          }
        } catch (e) {}
      }

      //加载第1页
      Refresh();

      return false;
    }

    if (_$qqNews.total == 1)
      return true;

    return false;

  }).evaluate(function() {

  return _$qqNews.items;
})
  .end()
  .then(function(result) {
    console.log(result, result.length)
  }).catch(function(error) {
  console.log('错误是：' + error);
})