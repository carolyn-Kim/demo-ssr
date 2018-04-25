<template>
    <div>
        <div class="about">
           <p>今儿个吃点什么呢？😋</p>
            <p>{{ datas }}</p>
            <button type="button" class="button" @click="handleBtnClick">点我呀！</button>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";

console.log("测试script！！");

const fetchData = ({ store, route }) => {
  return store.dispatch("getAboutInfo");
};

export default {
  asyncData: fetchData,
  computed: {
    ...mapGetters({
      datas: 'getAboutInfo'
    })
  },
  mounted() {
    fetchData({ store: this.$store, route: this.$route });
  },
  methods: {
    handleBtnClick() {
      this.$router.push({ path: '/' })
    }
  }
};

</script>
<style lang="postcss" scoped>
.about {
  background: black;
  color: yellowgreen;
  text-align: left;
  position: relative;
  padding: 20px;

  & .button {
    background: none;
    color: red;
    border: 0;
    position: absolute;
    bottom: 0;
    width: 100px;
    right: 0;
    outline: 0;
    padding: 0;
    margin: 0;
    font-size:18px;
    cursor: pointer;
  }
}
</style>

