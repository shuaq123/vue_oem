module.exports = [{
  name: '员工管理',
  id: 'basic',
  icon: 'th-large',
  sub: [{
    name: '员工角色',
    componentName: 'BasicLayout'
  }]
}, {
  name: '用户管理',
  id: 'form',
  icon: 'wpforms',
  sub: [{
    name: '客户管理',
    componentName: 'FormRadio'
  }]
},
{
  name: '营销管理',
  id: 'marketing',
  icon: 'wpforms',
  sub: [{
    name: '表单管理',
    componentName: 'Management'
  },
  {
    name: '菜品管理',
    componentName: 'DishesManagement'
  }]
},
]
