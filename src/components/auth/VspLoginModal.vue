<template>
  <v-dialog v-model="status">
    <div>
      login
    </div>
  </v-dialog>
</template>
<script>
  export default {
    data() {
      return {
        status: false
      }
    },
    created() {
      this.$nuxt.$on('VspLoginModal', (val=true) => {
        this.status = val;
      })
    }
  }
</script>
