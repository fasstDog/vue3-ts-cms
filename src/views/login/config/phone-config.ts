    // 编写规则
    export const rules = {
      // name:[{规则1},{规则2}],
      // password:[{规则1},{规则2}]
      number:[{
        required:true,
        message:'手机号是必写内容',
        trigger:'blur'
      },{
        pattern:/^[0-9]{11}$/,
        message:'请输入正确的手机号',
        trigger:'blur'
      }],
      code:[{
        required:true,
        message:'请输入验证码',
        trigger:'blur'
      },{
        pattern:/^[0-9]{6,6}$/,
        message:'请输入正确的验证码',
        trigger:'blur'
      }]
    }
