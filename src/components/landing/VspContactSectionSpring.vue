<template>
  <v-card tile flat class="envelopPocket">
    <v-row>
      <v-col>
        <table class="oddTable">
          <tbody>
          <tr v-for="(row,j) in (rows||[])" :key="j">
            <td v-if="row.icon">
              <v-icon>{{row.icon}}</v-icon>
            </td>
            <td>{{row.title || row}}</td>
            <td v-if="row.value">{{row.value}}</td>
          </tr>
          </tbody>
        </table>
        <v-chip
          v-for="(tag,key) in (tags||[])"
          :key="key"
          small
          dark
          class="ml-1 my-1"
          color="green lighten-1"
        >
          <v-icon v-if="tag.icon" color="white" small class="mx-1 font-11">{{tag.icon}}</v-icon>
          <span class="mx-1">{{tag.title || tag}}</span>
        </v-chip>
      </v-col>
    </v-row>
    <div class="py-5">
      <div class="font-16 text-center my-3 mb-5">
        <b>
          {{title || 'Contact Form'}}
        </b>
      </div>
      <v-form lazy-validation @submit.prevent="submitForm">
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="7" justify="center">
            <div>
              <slot/>
            </div>
          </v-col>
          <v-col cols="12" sm="10" md="8" lg="7" justify="center">
            <v-text-field filled dense outlined required label="Email" v-model="main.email"/>
            <v-textarea filled dense outlined label="Message" required v-model="main.message"/>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" sm="5" md="5" lg="4" class="text-center">
            <v-btn color="success" block rounded class="mx-1 px-5" :loading="sendLoading" v-if="checkRecaptcha" large
                   type="submit">
              <v-icon small class="mx-2">fa fa-send</v-icon>
              {{$t('Submit')}}
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </v-card>
</template>
<i18n>
  {
  "en":{
  "SENT":"Your message sent successfully",
  "ERROR":"Sorry, an error occurred",
  "FILL_FORM":"Please fill out the form"
  },
  "fa":{
  "SENT": "پیام شما با موفقیت ارسال شد"
  }
  }
</i18n>
<script>
  export default {
    props: ['api', 'title', 'rows', 'tags', 'contacts', 'img', 'social', 'footer', 'address', 'phone', 'email'],
    data() {
      return {
        sendLoading: false,
        main: {}
      }
    },
    methods: {
      async checkRecaptcha() {
        try {
          this.main.token = await this.$recaptcha.getResponse()
          // send token to server alongside your form data
          // at the end you need to reset recaptcha
          return true;
        } catch (error) {
          console.log('Login error:', {error})
          return false;
        }
      },
      async submitForm() {
        if (Object.keys(this.main).length < 1) {
          return this.$swal.fire({icon: 'warning', text: this.$t('FILL_FORM')});
        }
        this.sendLoading = true;
        this.$axios.$post(this.api, {...this.main}).then(res => {
          this.$swal.fire({icon: 'check', text: this.$t('SENT')})
          this.main = {}
        }).catch(error => {
          this.$swal.fire({icon: 'warning', text: this.$t('ERROR')})
          console.error({error})
        }).finally(() => {
          this.sendLoading = false;
        })
      }
    }
  }
</script>
<style scoped>
  .envelopPocket {
    background: url('/bg/bottombg.png') no-repeat bottom right 30px 100%;
  }
</style>
