$(function () {
  // 初始化富文本编辑器
  initEditor();

  // 1. 初始化图片裁剪器
  var $image = $("#image");

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: ".img-preview",
  };

  // 3. 初始化裁剪区域
  $image.cropper(options);

  $("#chooseImg").on("click", function () {
    $("#file").click();
  });

  $("#file").on("change", function (e) {
    var imgURL = URL.createObjectURL(e.target.files[0]);
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", imgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });

  $("#form_pub").submit(function (e) {
    e.preventDefault();

    var fd = new FormData($("#form_pub")[0]);

    fd.forEach(function (v, k) {
      console.log(k, v);
    });
  });
});
