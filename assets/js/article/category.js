$(function () {
  var form = layui.form;
  // 获取文章类别
  function getArticleList() {
    $.ajax({
      method: "get",
      url: "/my/article/cates",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        // 渲染文章类别
        var htmlStr = template("tpl_list", res);
        $("tbody").html(htmlStr);
        layer.msg("获取文章类别成功！");
      },
    });
  }
  getArticleList();

  // 添加类别
  $("#addCate").on("click", function () {
    layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "添加文章分类",
      content: $("#dialog"),
    });
  });

  $("#addBtn").on("click", function (e) {
    e.preventDefault();
    $.ajax({
      method: "post",
      url: "/my/article/addcates",
      data: form.val("formData"),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        getArticleList();
        layer.msg("添加文章类别成功");
      },
    });
  });
});
