<template>
  <v-card flat tile class="py-5">
    <v-row justify="center">
      <v-col :cols="mini ? 12 : 8">
        <div>
          <v-row class="font-11 pr-3 my-1 grey--text">
            {{getDate}}
          </v-row>
          <v-card tile flat :to="link">
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
        <VspVueMusicPlayer v-if="item.audio.url" :item="item" :value="apiUrl + item.audio.url"/>
      </v-col>
    </v-row>
    <v-row>
      <v-btn color="orange" text v-if="mini" :to="link">
        {{$t('read_more')}}
      </v-btn>
    </v-row>
  </v-card>
</template>
<i18n>
  {
  "en":{
  "read_more" : "details"
  },"fa":{
  "read_more": "ادامه"
  }
  }
</i18n>
<script>

  const envApiUrl = process.env.API_URL;
  export default {
    props: ['item', 'mini'],
    data() {
      return {
      }
    },
    computed: {
      getDate() {
        if (_.get(this.$vsp, 'locale', undefined) == 'fa-ir') {
          return this.$vsp.$Helper.toJalaali(this.item.updated_at, "jYYYY-jM-jD");
        } else {
          return this.item.updated_at
        }
      },
      apiUrl() {
        return _.get(this.$vsp, 'API_URL', envApiUrl);
      },
      link() {
        return this.$vsp.home + this.item.id + '-' + this.item.name
      }
    }
  }
</script>
