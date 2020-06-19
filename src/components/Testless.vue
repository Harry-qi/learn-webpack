<template>
  <div class="less">
    测试less
    <p>
      <span>测试babel 使用Promise</span>
      {{ a }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      a: ''
    }
  },
  created() {
    this.changeA().then(res => {
      this.a = res
    })
  },
  methods: {
    // 测试Promise语法，看配置是否有用
    changeA() {
      return new Promise((resolve, reject) => {
        resolve([1, 2])
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .less{
    font-size: 30px;
    margin-top: 20px;
    border: 1px solid #333;
    margin-bottom: 20px;
  }
</style>
