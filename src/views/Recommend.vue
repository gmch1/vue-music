<template>
  <div class="home">
    <my-tab></my-tab>
  </div>
</template>

<script>
// @ is an alias to /src
import MyTab from "@/components/my-tab/my-tab";

export default {
  name: "Home",
  components: {
    MyTab
  }
};
</script>
