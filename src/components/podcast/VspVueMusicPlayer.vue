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
  const apiUrl = process.env.API_URL;
  export default {
    props: ['value', 'item'],
    data() {
      return {
        apiUrl,
        audioFile: this.value
      }
    },
    mounted() {
    }
  }

</script>
