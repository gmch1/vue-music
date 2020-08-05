<template>
  <div class="my-loading-wrapper">
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.my-loading-wrapper {
  div {
    position: fixed;
    z-index: 1000;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 60px;
    height: 60px;
    opacity: 0.6;
    border-radius: 50%;
    background: #d44439;
    animation: loading 1.4s infinite ease-in;
  }
  div :nth-child(2) {
    animation-delay: -0.7s;
  }

  @keyframes loading {
    0%,
    100% {
      transform: scale(0);
    }
    50% {
      transform: scale(1);
    }
  }
}
</style>
