$(function () {
  var laypage = layui.laypage;

  //执行一个laypage实例
  laypage.render({
    elem: "pagination",
    count: 50, //数据总数，从服务端得到
    limit: 2,
    limits: [2, 5, 10],
    layout: ["count", "limit", "prev", "page", "next", "skip"],
  });

  function getArticleList() {
    $.ajax({
      method: "get",
      url: "/my/article/list",
      data: {
        pagenum: 1,
        pagesize: 2,
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg("获取文章列表成功！");
      },
    });
  }
  getArticleList();
});
