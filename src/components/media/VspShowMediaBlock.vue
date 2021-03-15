<template>
  <v-card flat tile class="py-5">
    <v-row justify="center">
      <v-col :cols="mini ? 12 : 8">
        <div>
          <v-row class="font-11 pr-3 my-1 grey--text">{{vsp.Helper.toJalaali(item.updated_at,"jYYYY-jM-jD")}}</v-row>
          <v-card tile flat :to="itemLink">
            <h1 class="font-14 text-right">{{_.get(item,'id','-')}}: {{_.get(item,'name','-')}}</h1>
          </v-card>
        </div>
        <div class="my-1 grey--text text--darken-2 font-13" v-html="item.text"/>
      </v-col>
      <v-col v-if="!mini" cols="4">
        <v-img v-if="item.cover.url"
               :src="apiUrl + _.get(item,'cover.formats.small.url',_.get(item,'cover.url',''))"/>
      </v-col>
      <v-col cols="12" v-if="!mini">
        <VspVueAudioPlayer v-if="item.audio.url" :item="item" :value="apiUrl + item.audio.url"/>
      </v-col>
    </v-row>
    <v-row>
      <v-btn color="orange" text v-if="mini" :to="itemLink">
        ادامه
      </v-btn>
    </v-row>
  </v-card>
</template>
<script>
  const apiUrl = process.env.API_URL;
  import _ from 'lodash'

  export default {
    props: ['item', 'mini', 'link'],
    data() {
      return {
        apiUrl
      }
    },
    created() {
      this._ = _;
    },
    computed: {
      itemLink() {
        return this.link + '/' + this.item.id + '-' + this.item.name
      }
    }
  }
</script>
