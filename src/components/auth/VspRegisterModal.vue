<template>
  <v-dialog v-model="status">
    <div>
      register
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
      this.$nuxt.$on('VspRegisterModal', (val = true) => {
        this.status = val;
      })
    }
  }
</script>
