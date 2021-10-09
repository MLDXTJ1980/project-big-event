/* jquery的ajaxPrefilter函数，每次调用$.get(),$.post()或$.ajax()的时候会先调用ajaxPrefilter这个函数，可以拿到我们给Ajax提供的配置对象options */
$.ajaxPrefilter(function(options) {
    //在发起真正的ajax请求之前统一拼接请求的根路径
    options.url = "http://api-breakingnews-web.itheima.net" + options.url
})