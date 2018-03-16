# 聊天室React版本
PS：别的想法。做成类似咸鱼的二手物品网站。

## 文件结构
- 代码文件的组织结构：按功能组织(Organzied by Feature)
- 模块接口结构： `export { actions, reducer, view }`
- 状态树设计：扁平，一个模块负责一个状态节点

```
// 模块结构
|
|-- actionTypes.js
|-- actions.js // actions 构造函数
|-- reducer.js
|-- service.js
|-- index.js // 接口暴露
|-- view(direction)
```

```
// 聊天室文件结构
|
|-- components // 木偶组件
|-- containers
        |-- login //登录
        |-- register // 注册
        |-- central // （备用）
|-- App.js  // router and eles
|-- index.js // 主入口
|-- store.js // redux store
|-- reducer.js // redux reducer
```

### redux stree

```
{
    user: {
        hasAuth: Boolean, // 是否登录，用于路由的跳转
        role: 'boss' 或者 'genius'
    },
    baseInfo: {
        avatar: '' // 用户头像
        nickname: '' // 昵称,
        job: '' // 工作岗位&寻找的工作
        salary: null, // 薪水
        // boss
        jobDesc: '', // 工作描述
        // 牛人
        selfDesc: '', //自我描述
    }
}
```
