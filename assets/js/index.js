$(function () {
  getUserInfo();

  $("#logout").on("click", function () {
    layer.confirm(
      "确定退出登录？",
      { icon: 3, title: "提示" },
      function (index) {
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        location.href = "/login.html";
        layer.close(index);
      }
    );
  });
});

// 获取用户基本信息
function getUserInfo() {
  $.ajax({
    method: "get",
    url: "/my/userinfo",
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message);
      }
      //  渲染用户信息
      renderAvatar(res.data);
      localStorage.setItem("userInfo", JSON.stringify(res.data));
    },
  });
}

function renderAvatar(userinfo) {
  var name = userinfo.nickname || userinfo.username;
  $("#welcome").html("欢迎&nbsp;&nbsp;" + name);

  if (userinfo.user_pic) {
    $(".layui-nav-img").attr("src", userinfo.user_pic).show();
    $(".text-avatar").hide();
  } else {
    var first = name[0].toUpperCase();
    $(".layui-nav-img").hide();
    $(".text-avatar").html(first).show();
  }
}
