<template lang="html">
<div class="test">
  wowoowowowowowo
  <div class="test-main">
  hjjjjjj
  <span class="test-main-span">22222222</span>
  </div>
  <div class="nja-css-is-ok">
    sssss
    <span>wwww</span>
  </div>
  <div class="nja-css-is-no">
    sssss
    <span>wwww</span>
  </div>
  <div class="test-mixin">
    0
    <div class="div">
1
    </div>
    <div class="span">
2
    </div>
  </div>
</div>
</template>

<script>
export default {
};
</script>

<style>
@import 'abc.css';
.test {
  background-color: red;
  width: 300px;
  height: 200px;
  .test-main {
    background-color: var(--bg-color);
    width:var(--main-height);
    height:300px;
    &-span {
      font-size: 50px;
    }
  }
}
@define-mixin nja-ex-bg $wh: 100px, $c1: red, $c2: blue {
  width: $wh;
  height: $wh;
  .div {
    width: 30px;
    height: 30px;
    background-color: $c1;
  }
  .span {
    width: 40px;
    height: 40px;
    background-color: $c2;
  }
}
.test-mixin {
  background-color: green;
  @mixin nja-ex-bg 200px, blue;
}
</style>
