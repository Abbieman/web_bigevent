$(function() {
    $('#link-reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    $('#link-login').on('click', function() {
        $('.reg-box').hide();
        $('.login-box').show();
    })

    var form = layui.form;
    var layer = layui.layer;

    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致，请重新输入！';
            }
        }
    })

    $('#form-login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'http://www.liulongbin.top:3007/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg('登录失败');
                layer.msg('登录成功');
                localStorage.setItem('token', res.token);
                location.href = './index.html';
            }
        })
    })

    $('#form-reg').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'http://www.liulongbin.top:3007/api/reguser',
            data: {
                username: $('#form-reg [name=username]').val(),
                password: $('#form-reg [name=password]').val()
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功！')
                $('#link-login').click();
            }
        });
    })
})