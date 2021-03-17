<template>
  <v-row
  >
    <v-col
      v-for="(item,i) in items"
      :key="i"
      cols="12"
      sm="6"
      md="4"
      class="d-flex align-stretch"
    >
      <v-card class="flex-grow-1">
        <v-card-text>
          <v-img
            height="300px"
            v-if="_.has(item,'image.formats.small.url') || _.has(item,'image.url')"
            contain
            :src="API_URL + _.get(item,'image.formats.small.url',_.get(item,'image.url',nullPhoto))"/>
          <v-card-title>
            {{item.title || ''}}
            <v-spacer/>
            <v-icon v-for="i in starNumbers" :key="i" color="yellow">star</v-icon>
            <v-icon v-for="i in (5-starNumbers)" :key="i" color="grey">star</v-icon>
          </v-card-title>
          <v-card flat style="overflow: hidden">
            {{vsp.$Helper.shorten(item.description,wordLimit || 50)}}
          </v-card>
        </v-card-text>
        <v-card-actions class="align-self-end">
          <v-btn color="primary" small rounded outlined :to="productsLink+'/'+item.id">
            <v-icon small class="mx-1">{{btnIcon || 'launch'}}</v-icon>
            {{$t(btnText || 'show')}}
          </v-btn>
          <v-btn color="secondary" small rounded outlined>
            <v-icon small class="mx-1">{{modalIcon || 'all_out'}}</v-icon>
            {{$t(modalText || 'quick_show')}}
          </v-btn>
          <v-btn color="secondary" small rounded outlined @click="$nuxt.$emit('addToCart',item.id)">
            <v-icon small class="mx-1">{{cartIcon || 'add_shopping_cart'}}</v-icon>
            {{$t(cartText || 'add_to_cart')}}
          </v-btn>
          <v-btn v-for="(btn,i) in getBtns" :key="i" :to="btn.to" :link="btn.link" :color="btn.color" small rounded
                 outlined>
            <v-icon small class="mx-1" v-if="btn.icon">{{btn.icon || ''}}</v-icon>
            {{$t(btn.text || '')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col v-if="hasReadMore" cols="12">
      <v-btn :to="productsLink">{{$t('more')}}</v-btn>
    </v-col>
  </v-row>
</template>
<i18n>
  {
  "fa":{
  "more":"ادامه",
  "add_to_cart":"افزودن به سبد",
  "quick_show":"نمایش سریع",
  "show":"نمایش"
  },"en":{
  "add_to_cart":"add to cart",
  "quick_show":"quick show"
  }
  }
</i18n>
<script>
  const nullPhoto = require('../../assets/avatar.png');
  import _ from 'lodash'

  const defaultBtns = [
    // {
    //   text: 'show',
    //   icon: 'eye',
    //   to: '',
    //   link: ''
    // },
  ];
  export default {
    props: ['value', 'limit', 'readmore', 'btns', 'rate', 'wordLimit', 'baseUrl', 'modalText', 'modalIcon', 'btnText', 'btnIcon','cartIcon','cartText', 'root'],
    created() {
      this._ = _;
    },
    computed: {
      getBtns() {
        return this.btns || defaultBtns;
      },
      starNumbers() {
        return this.rate || 4;
      },
      API_URL() {
        return this.baseUrl || this.vsp.API_URL;
      },
      hasReadMore() {
        return (this.limit < this.count || this.readmore);
      },
      count() {
        if (_.isArray(this.value)) return this.value.length;
      },
      items() {
        if (_.isArray(this.value)) {
          return _.take(this.value, this.limit || 6)
        }
      },
      productsLink() {
        return this.root || '/shop/products';
      }
    }
  }
</script>
