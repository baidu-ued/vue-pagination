# Vue Pagination

[Vue.js](http://vuejs.org/) (基于 2.1.0)

## 安装

```bash
npm install vuejs-pagination --save-dev
```

## 例子

```html
<body id="app">
    <ul class="list">
        <li class="item" v-for="item in items">{{item.name}}</li>
    </ul>
    <pagination :page-length="pageLength" :actived-page="activePage" :page-size="7" v-on:change="change"></pagination>
</body>
```

```javascript
import Pagination from 'vuejs-pagination'
new Vue({
    el: '#app',
    data:function() {
        return{
            pageLength : 20,
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

Name       | Type          | Default | min | Required | Description
:--------- | :------------ | :------ | :-- | :------- | :-------------------
pageLength | Number        |         | 1   | true     | 总页码长度
activePage | Number        |         | 1   | true     | 当前页码，当监听到页码变化后，需改变该值
pageSize   | String,Number | 5       | 3   |          | 显示区域长度

### 自定义事件

Name   | Type     | arguments | Required | Description
:----- | :------- | :-------- | :------- | :--------------------
change | funciton | value     | true     | 通过v-on:change监听分页器的变化
