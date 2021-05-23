<template>
  <v-card
    outlined
    tile
    :to="item.to"
    width="100%"
    height="100%">
    <v-img eager :src="item.img" sizes="100%">
      <v-btn v-if="item.bookmark" color="warning" style="position: absolute;top:10px;left:10px" fab small>
        <v-icon small>fa-bookmark</v-icon>
      </v-btn>
    </v-img>
    <div class="d-flex justify-space-between">
      <span><v-icon v-if="item.stars" v-for="j in item.stars" color="warning" small class="mx-1" :key="j">star</v-icon></span>
      <span class="font-12">
        <b class="px-3 mx-1 teal--text" v-if="!item.discount && item.price">{{ _.isNumber(item.price) ? $Helper.price(item.price,item.unit || '$') :
              (item.price || '')}}</b>
            <template v-else-if="item.discount && item.price">
              <b class="px-3 mr-1  teal--text">
                {{ _.isNumber(item.price) ? $Helper.price(item.price-item.discount,'$') : (item.price || '')}}
              </b>
              <i class="ml-1 px-3 red white--text"><small>{{$Helper.price(item.discount,'$')}} {{$t('off')}}</small></i>
            </template>
      </span>
    </div>
    <v-spacer/>
    <v-card-text>
      <div class="text-start">
        <h2 class="text-start">{{item.title}}</h2>
      </div>
      <table class="oddTable">
        <tbody>
        <tr v-if="item.subTitle">
          <td class="text-start">
            <h3>{{item.subTitle}}</h3>
          </td>
        </tr>
        <tr v-for="(row,key) in _.get(item,'rows',[])" :key="key">
          <td v-if="row.title">
            {{row.title || ''}}
          </td>
          <td v-if="row.value">
            {{row.value || ''}}
          </td>
          <td v-if="row.icon">
            <v-icon>{{row.icon}}</v-icon>
          </td>
          <td v-if="row.image">
            <img :src="row.image"/>
          </td>
        </tr>
        </tbody>
      </table>
    </v-card-text>
    <v-card-actions>
      <v-tooltip bottom v-for="(badge,key) in _.get(item,'badges',[])" :key="key">
        <template v-slot:activator="{ on }">
          <v-btn class="ml-1" :color="badge.color || 'primary'" v-on="on" outlined fab small>
            <v-icon small>{{badge.icon}}</v-icon>
          </v-btn>
        </template>
        <span>{{badge.title}}</span>
      </v-tooltip>
      <div>
        <v-chip
          v-for="(tag,key) in _.get(item,'tags',[])"
          :key="key"
          small
          dark
          class="ml-1"
          color="green lighten-1"
        >
          <v-icon color="white" small class="mx-1 font-11">{{tag.icon}}</v-icon>
          <span class="mx-1">{{tag.title}}</span>
        </v-chip>
      </div>
    </v-card-actions>
    <v-card-actions>
      <div>
        <v-img :src="image" v-for="(image,i) in _.get(item,'tagImages',[])" :key="i"/>
      </div>
    </v-card-actions>
  </v-card>
</template>
<script>
  import _ from 'lodash'

  export default {
    props: ['item'],
    created() {
      this._ = _;
    },
    data() {
      return {
        margin: 0,
      }
    },
  }
</script>
<style>

  .gradientTransparencyBg {
    background: rgba(0, 0, 0, .01);
  }

  .glassyBg {
    padding-top: 20px;
    background-color: rgba(255, 255, 255, 0.5);
  }

  .gradientBg {
    background: rgb(232, 242, 232);
    background: linear-gradient(205deg, rgba(232, 242, 232, 1) 2%, rgba(255, 255, 255, 1) 93%);
  }

  .gardeshGreenBg {
    background: rgb(18, 240, 20);
    background: linear-gradient(205deg, rgba(18, 240, 20, 1) 2%, rgba(179, 246, 149, 1) 93%);
  }
</style>
