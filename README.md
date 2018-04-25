vue-ssr demo，基本ssr已实现。不是特别完善(更新中...)

### 操作步骤

#### npm install



> 开发部署

#### npm run build

​	dev部署的时候用了gulp-watch，执行完后不会退出，control + c退出即可。

#### npm run start:dev

​	启动服务，端口号是8081。这里使用了热更新模块，会监测



> 上线部署

#### npm run prod

#### npm start

​	启动服务，端口号是8081。这里使用了pm2，别忘记pm2 stop dist/app.js 退出



#### 访问http://localhost:8081



### 文件目录树


demo-ssr
├── README.md
├── config
│   ├── webpack.conf.js     //相同配置
│   ├── webpack.dev.js      //dev配置文件
│   ├── webpack.prod.js     //production配置文件
│   └── webpack.server.js   //server端配置文件
├── docs
│   └── service-reporter    //接口测试文档，使用mochawesome
│       ├── assets
│       │   ├── MaterialIcons-Regular.woff
│       │   ├── MaterialIcons-Regular.woff2
│       │   ├── app.css
│       │   ├── app.css.map
│       │   ├── app.js
│       │   ├── app.js.map
│       │   ├── roboto-light-webfont.woff
│       │   ├── roboto-light-webfont.woff2
│       │   ├── roboto-medium-webfont.woff
│       │   ├── roboto-medium-webfont.woff2
│       │   ├── roboto-regular-webfont.woff
│       │   └── roboto-regular-webfont.woff2
│       ├── mochawesome.html
│       └── mochawesome.json
├── gulpfile.js     //server端gulp文件
├── logs    //日志文件夹
│   ├── pm2     //npm start 后产生的pm2日志文件
│   │   ├── error-0.log
│   │   └── out-0.log
│   └── yd.log  //容错日志文件
├── package-lock.json
├── package.json
├── postcss.config.js   //postcss配置文件
├── src //源文件
│   ├── nodeuii     //node端
│   │   ├── app.js      // 启动文件
│   │   ├── config      
│   │   │   └── config.js       //配置文件
│   │   ├── controllers     
│   │   │   ├── AboutController.js
│   │   │   ├── DataController.js
│   │   │   └── IndexController.js
│   │   ├── middleware 
│   │   │   └── errorHandler.js     // 容错
│   │   ├── pm2.json
│   │   └── services
│   │       ├── AboutService.js
│   │       └── IndexService.js
│   └── webapp     //页面类
│       ├── App.vue
│       ├── app.js
│       ├── assets
│       │   ├── booklogo.jpg
│       │   └── sun.jpg
│       ├── components
│       │   ├── About.vue
│       │   ├── Friend.vue
│       │   ├── Home.vue
│       │   └── Sun.vue
│       ├── entry-client.js
│       ├── entry-server.js
│       ├── errors      //容错页面
│       │   ├── 404.html
│       │   └── 500.html
│       ├── index.template.html    // 模板文件
│       ├── router
│       │   └── index.js
│       └── vuex
│           ├── actions.js
│           ├── getters.js
│           └── store.js
└── tests
    ├── e2e
    │   └── rizeRunner.js
    ├── mochaRunner.js
    └── service
        └── router.spec.js

21 directories, 55 files
