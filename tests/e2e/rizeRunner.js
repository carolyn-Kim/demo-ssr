const Rize = require('rize');

const rize = new Rize();

rize
    .goto('http://localhost:8081/about')
    .assertTitle('一灯SSR')
    .assertSeeIn('.about', '今儿个吃点什么呢')
    .click('.button')
    .assertSee('首页')
    .end();

