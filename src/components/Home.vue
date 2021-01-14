<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      这是我的Vue学习仓库，包含了常见的UI库组件，如
      <a href="https://element.eleme.cn/#/zh-CN" target="_blank" rel="noopener"
        >Element UI</a
      >
      、
      <a
        href="https://www.antdv.com/docs/vue/introduce-cn/"
        target="_blank"
        rel="noopener"
        >Ant Design Vue</a
      >
      等，<br />
      前往我的Github仓库
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener"
        >vue-learn</a
      >
    </p>
    <h3>Element UI el-tree</h3>
    <ul>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
          target="_blank"
          rel="noopener"
          >拖拽排序</a
        >
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
          target="_blank"
          rel="noopener"
          >筛选搜索</a
        >
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
          target="_blank"
          rel="noopener"
          >节点点击</a
        >
      </li>
    </ul>
    <h3>Ant Design Vue a-tree</h3>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank" rel="noopener"
          >父子组件通讯</a
        >
      </li>
      <li>
        <a href="https://forum.vuejs.org" target="_blank" rel="noopener"
          >Forum</a
        >
      </li>
      
      <li>
        <a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a>
      </li>
    </ul>
    <h3>Jquery z-tree</h3>
    <ul>
      <li>
        <a href="https://router.vuejs.org" target="_blank" rel="noopener"
          >el-tree 排序</a
        >
      </li>
      <li>
        <a href="https://vuex.vuejs.org" target="_blank" rel="noopener">el</a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-devtools#vue-devtools"
          target="_blank"
          rel="noopener"
          >vue-devtools</a
        >
      </li>
      
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
          rel="noopener"
          >awesome-vue</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Home",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
