<template>
    <div class="bgcolor">
      <h2>介绍一下我的好朋友们！！👬</h2>
        <div v-for="(item,index) in datas" :key="index">
            <p class="title">{{index+1}}、 {{item.title}}</p>
            <p class="desc">{{item.content}}</p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

const fetchData = ({ store, route }) => {
  return store.dispatch("getDatas");
};

export default {
  asyncData: fetchData,
  computed: {
    ...mapGetters({
      datas: 'getDatas'
    })
  },
  mounted() {
    fetchData({ store: this.$store, route: this.$route });
  }
};
</script>

<style lang="postcss" scoped>
.bgcolor{
  background: #eaeaea;
  padding: 20px;
}
.title{
  color: #9e6701;
  margin-bottom: 0;
}
.desc{
  padding-left: 20px;
  color: #e83d5b;
  font-weight: 700;
  margin: 0;
}
</style>
