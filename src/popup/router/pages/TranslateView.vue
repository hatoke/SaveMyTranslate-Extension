<template>
  <div class="translate-view">
    <div class="card-wrapper">
      <div class="card first">
        <div class="card-head">
          <span class="language">İngilizce</span>
        </div>
        <div class="card-body">
          <span>source text</span>
        </div>
      </div>
      <div class="card">
        <div class="card-head">
          <span class="language">Turkish</span>
        </div>
        <div class="card-body">
          <span>target text</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "translateView",
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
.translate-view {
  height: 250px;
  width: 600px;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  background-color: #fff;

  .card-wrapper {
    display: flex;
    height: 100%;

    .first {
      border-right: 1px solid #ddd;
    }

    .card {
      height: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      border-radius: 3px;
      overflow-y: auto;

      .card-head {
        padding: 10px;
        border-bottom: 1px solid #ddd;
      }

      .card-body {
        padding: 10px;
      }
    }
  }
}
</style>
