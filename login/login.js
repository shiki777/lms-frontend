  $(document)
    .ready(function() {
      $('.ui.form')
        .form({
          fields: {
            name: {
              identifier  : 'name',
              rules: [
                {
                  type   : 'empty',
                  prompt : '用户名不能为空'
                }
              ]
            },
            password: {
              identifier  : 'password',
              rules: [
                {
                  type   : 'empty',
                  prompt : '密码不能为空'
                },
                {
                  type   : 'length[6]',
                  prompt : '密码至少需要6位'
                }
              ]
            }
          }
        })
      ;
    })
  ;