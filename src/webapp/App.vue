<template>
    <div id="app">
        <h1>🍭 奇先生妙小姐</h1>
        <nav>
            <ul>
                <ol><router-link to="/home" exact>首页-快乐先生 🎈 🎉 👏</router-link></ol>
                <ol><router-link to="/about">贪吃先生 🍔 🍟 🍗 </router-link></ol>
                <ol><router-link to="/friends">强壮先生 💪 💪🏻 💪🏼</router-link></ol>
                <ol><router-link to="/sun">阳光小姐 ☀️ 🏖️ 🌴</router-link></ol>
            </ul>
        </nav>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
<style lang="postcss" scoped>
:root{
    --linkColor:#4CAF50;
}
a{
    color: var(--linkColor);
    text-decoration: none;
}

ul{
    margin: 0;
    padding: 0;
}
ul>ol{
    line-height: 40px;
    height:40px;
}
ul>ol:hover{
    background: #eaeaea;
}
</style>
