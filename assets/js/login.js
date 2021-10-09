$(function() {
    /* ============切换register和login form============== */
    $("#link-reg").on("click", function() {
        $(".login-box").hide()
        $(".reg-box").show()
    })
    $("#link-login").on("click", function() {
        $(".login-box").show()
        $(".reg-box").hide()
    })

    /**
     *下面就是bootstrapValidator的初始化
     *定义你需要的哪些表单需要验证，验证什么内容
     **/
    /* bootstrapValidator register form */
    $("#reg-form").bootstrapValidator({
            feedbackIcons: {
                //这里是用来对应三种不同状态时，在输入框后面添加的图标
                valid: "glyphicon glyphicon-ok",
                invalid: "glyphicon glyphicon-remove",
                validating: "glyphicon glyphicon-refresh",
            },
            fields: {
                //哪些字段需要验证，和html中的输入框，下拉框等等表单name属性所对应。
                username: {
                    validators: {
                        //从这里也可以容易的看出可以有多个验证信息
                        notEmpty: {
                            //非空验证
                            message: "Enter your name！", //提示信息，当你不写这里时它会自动的调用自带的提示信息，默认是英文，可导入language下的中文JS文件
                        },
                        stringLength: {
                            //长度限制（中文字符也算一个）
                            min: 4,
                            max: 16,
                            message: "Username must be at least 4 and max 16 characters！",
                        },
                        regexp: {
                            regexp: /^[a-zA-Z0-9_]+$/,
                            message: "username contain only numbers,characters and _",
                        },
                    },
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: "Enter your password！",
                        },
                        stringLength: {
                            min: 6,
                            max: 12,
                            message: "the password is at least 6 characters long and no longer than 12 characters",
                        },
                        regexp: {
                            regexp: /^[a-zA-Z0-9]{6,12}$/,
                            message: "The password contain only numbers and characters ",
                        },
                    },
                },
                confirmPassword: {
                    validators: {
                        notEmpty: {
                            message: "Type your password again!",
                        },
                        identical: {
                            //用来判断制定的字段和当前字段一致与否
                            field: "password",
                            message: "Passwords must match！",
                        },
                    },
                },
            },
        })
        /* 不能和submit form同时作用 */
        /* $("#btn_submit_reg").click(function() {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  $("#reg-form").data("bootstrapValidator").validate() //相当于触发一次所有的验证
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  if ($("#reg-form").data("bootstrapValidator").isValid()) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      //判断验证是否已经通过
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      toastr.success("Register success！") //提示成功信息
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      return false
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  } else {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      toastr.error("Register failed！")
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              }) */

    /* bootstrapValidator login form */
    $("#login-box").bootstrapValidator({
        feedbackIcons: {
            //这里是用来对应三种不同状态时，在输入框后面添加的图标
            valid: "glyphicon glyphicon-ok",
            invalid: "glyphicon glyphicon-remove",
            validating: "glyphicon glyphicon-refresh",
        },
        fields: {
            //哪些字段需要验证，和html中的输入框，下拉框等等表单name属性所对应。
            username: {
                validators: {
                    //从这里也可以容易的看出可以有多个验证信息
                    notEmpty: {
                        //非空验证
                        message: "Enter your name！", //提示信息，当你不写这里时它会自动的调用自带的提示信息，默认是英文，可导入language下的中文JS文件
                    },
                    stringLength: {
                        //长度限制（中文字符也算一个）
                        min: 4,
                        max: 16,
                        message: "Username must be at least 4 and maximal 16 characters！",
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_]+$/,
                        message: "username contain only numbers,characters and _",
                    },
                },
            },
            password: {
                validators: {
                    notEmpty: {
                        message: "Enter your password！",
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: "the password is at least 6 characters long and no longer than 12 characters",
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9]{6,12}$/,
                        message: "The password contain only numbers and characters ",
                    },
                },
            },
        },
    })

    //点击提交按钮时
    /* $("#btn_submit_login").click(function() {
                                                                                                                                                                        $("#logon-box").data("bootstrapValidator").validate() //相当于触发一次所有的验证
                                                                                                                                                                        if ($("#reg-box").data("bootstrapValidator").isValid()) {
                                                                                                                                                                            //判断验证是否已经通过
                                                                                                                                                                            toastr.success("Login success！") //提示成功信息
                                                                                                                                                                            return false
                                                                                                                                                                        } else {
                                                                                                                                                                            toastr.error("Login failed！")
                                                                                                                                                                        }
                                                                                                                                                                    }) */
    // 监听login表单提交事件
    $("#btn_submit_login").click(function(e) {
        e.preventDefault()
        e.stopPropagation()

        $.ajax({
            url: "/api/login",
            method: "POST",
            data: $("#login-box").serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return alert("fail to login!")
                }

                alert("Login success")
                    // save res.token in the localStorage
                localStorage.setItem("token", res.token)
                var x = localStorage.getItem("token")
                console.log(x)
                location.href = "/index.html"
            },
        })
    })

    // 监听register表单提交事件
    $("#btn_submit_reg").click(function(e) {
        e.preventDefault()
        e.stopPropagation()

        $.post(
            "/api/reguser", {
                username: $("#reg-form [name=username]").val(),
                password: $("#reg-form [name=password]").val(),
            },
            function(res) {
                if (res.status !== 0) {
                    return alert(res.message)
                }

                alert("Register success, please login!")
                $("#link-login").click()
            }
        )
    })
})