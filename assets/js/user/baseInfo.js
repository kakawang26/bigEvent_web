$(function () {
  var form = layui.form;
  // 初始化用户信息
  var userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  form.val("formData", userInfo);

  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return "用户昵称必须是1-6个字符之间!";
      }
    },
  });

  $(".layui-btn-primary").on("click", function (e) {
    e.preventDefault();
    form.val("formData", userInfo);
  });

  $(".layui-form").submit(function (e) {
    e.preventDefault();
    var formData = form.val("formData");
    $.ajax({
      method: "post",
      url: "/my/userinfo",
      data: {
        id: userInfo.id,
        nickname: formData.nickname,
        email: formData.email,
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg("修改用户信息成功！");
        // 调用父页面的方法，重新渲染用户头像和信息
        window.parent.getUserInfo();
      },
    });
  });
});
