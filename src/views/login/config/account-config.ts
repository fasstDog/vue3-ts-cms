    // 编写规则
export const rules = {
      // name:[{规则1},{规则2}],
      // password:[{规则1},{规则2}]
      name:[{
        required:true,
        message:'用户名是必写内容',
        trigger:'blur'
      },{
        pattern:/^[a-z0-9]{5,10}$/,
        message:'用户名必须是5-10个字母或数字',
        trigger:'blur'
      }],
      password:[{
        required:true,
        message:'密码是必填内容',
        trigger:'blur'
      },{
        pattern:/^[a-z0-9]{5,}$/,
        message:'密码必须是5个字母或数字以上',
        trigger:'blur'
      }]
    }
