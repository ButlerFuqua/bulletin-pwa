<template>
  <div class="p-2">
    <div>
      Hey, here's a good testimony, yall!
    </div>
    <p v-for="num in 50">Content...</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

type Data = {

}

export default Vue.extend({
  name: 'IndexPage',
  layout: 'landing',
  components: {},
  data(): Data {
    return {

    }
  },
  methods: {
  },
  async created() {

  }
})
</script>
