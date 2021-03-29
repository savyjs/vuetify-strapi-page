<template>
  <client-only>
        <span class="ltr">
           <vue-plyr>
               <audio controls crossorigin playsinline>
                <source
                  :src="audioFile"
                  type="audio/mp3"
                />
           </audio>
           </vue-plyr>
        </span>
  </client-only>
</template>
<script>
  export default {
    props: ['value', 'item'],
    data() {
      return {
        audioFile: this.value
      }
    },
    mounted() {
    }
  }

</script>
