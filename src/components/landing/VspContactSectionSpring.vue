<template>
  <v-card tile flat>
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
      <v-form lazy-validation ref="submitForm">
        <v-row justify="center">
          <v-col cols="12" sm="10" md="8" lg="7" justify="center">
            <div>
              <slot/>
            </div>
          </v-col>
          <v-col cols="12" sm="10" md="8" lg="7" justify="center">
            <v-text-field dense outlined label="Email" v-model="main.email"/>
            <v-textarea dense outlined label="Message" v-model="main.message"/>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" sm="5" md="5" lg="4" class="text-center">
            <v-btn color="success" block rounded class="mx-1 px-5" large @click="submitForm">
              <v-icon small class="mx-2">fa fa-send</v-icon>
              {{$t('Submit')}}
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </v-card>
</template>
<script>
  export default {
    props: ['api', 'name', 'rows', 'tags', 'contacts', 'img', 'social', 'footer', 'address', 'phone', 'email'],
    data() {
      return {
        main: {}
      }
    },
    methods: {
      submitForm() {

      }
    }
  }
</script>
