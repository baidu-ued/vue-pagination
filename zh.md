# Vue Pagination

[EngLish](https://github.com/BraisedCakes/vue-pagination/blob/master/README.md)

[Vue.js](http://vuejs.org/) (基于 2.1.0)

## 例子

```html
<body id="app">
    <ul class="list">
        <li class="item" v-for="item in items">{{item.name}}</li>
    </ul>
      <m-pagination :all-length="allLength" :actived-page="activePage" :page-num="7" v-on:gogogo="change"></m-pagination>
</body>
```

```javascript
new Vue({
    el: '#app',
    data:function() {
        return{
            allLength : 20,
            activePage : 1
        }
    },
    methods:{
        change:function(value){
            this.activePage = value;    //必须改变activePage
        }
    }
})
```

### Props

Name       | Type          | Default | Required | Description
:--------- | :------------ | :------ | :------- | :-------------------
pageLength | Number        |         | true     | 总页码长度
activePage | Number        | 1       | true     | 当前页码，当监听到页码变化后，需改变该值
pageSize   | String,Number | 5       |          | 显示区域长度

### 自定义事件

Name   | Type     | arguments | Required | Description
:----- | :------- | :-------- | :------- | :-----------------
change | funciton | value     | true     | 通过v-on:change监听分页器的变化
