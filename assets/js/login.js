$(function () {
  $("#login").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  $("#reg").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });

  // 从layui获取form对象
  var form = layui.form;

  // 表单验证
  form.verify({
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repass: function (value) {
      var pass = $(".reg-box [name=password]").val();
      if (pass !== value) {
        return "两次密码不一致！";
      }
    },
  });
  // 注册表单提交
  $("#form_reg").on("submit", function (e) {
    e.preventDefault();
    $.post(
      "/api/reguser",
      {
        username: $("#form_reg [name=username]").val(),
        password: $("#form_reg [name=password]").val(),
      },
      function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg("注册成功，请登录！");
        $("#reg").click();
      }
    );
  });

  var token = null;
  // 登录表单提交
  $("#form_login").on("submit", function (e) {
    e.preventDefault();
    $.post(
      "/api/login",
      {
        username: $("#form_login [name=username]").val(),
        password: $("#form_login [name=password]").val(),
      },
      function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        localStorage.setItem("token", res.token);
        layer.msg("登录成功！");
        location.href = "/index.html";
      }
    );
  });
});
