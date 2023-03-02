$(function () {
  var form = layui.form;

  form.verify({
    pwd: [/^[\S]{1,6}$/, "密码为1-6个非空字符"],
    samePwd: function (value) {
      var val = $(".layui-form [name=oldPwd]").val();
      if (value === val) {
        return "新密码不能跟原密码相同！";
      }
    },
    reNewPwd: function (value) {
      var val = $(".layui-form [name=newPwd]").val();
      if (value !== val) {
        return "两次密码不一致！";
      }
    },
  });

  $(".layui-form").submit(function (e) {
    e.preventDefault();
    $.ajax({
      method: "post",
      url: "/my/updatepwd",
      data: form.val("formData"),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg("更新密码成功!");
        $(".layui-form")[0].reset();
      },
    });
  });
});
