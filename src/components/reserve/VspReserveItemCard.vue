<template>
  <v-hover
    v-slot:default="{ hover }"
    open-delay="200"
  >
    <v-card
      :to="item.to"
      :class="`radius---15 white elevation---${hover ? 24 : 10}`"
      width="100%"
      height="100%">

      <v-img eager :src="item.img" sizes="100%">
        <v-btn color="warning" style="position: absolute;top:10px;left:10px" fab small>
          <v-icon small>fa-bookmark</v-icon>
        </v-btn>
      </v-img>
      <v-card-text>
        <table class="oddTable">
          <tbody>
          <tr>
            <td>
              <v-icon class="mx-1 font-12" color="grey" small>fa-plane</v-icon>
              <b>{{item.title}}</b>
            </td>
            <td class="text-left green--text  font-11">
              <b>{{$Helper.price(item.price)}}</b>
              <v-icon color="gardeshGreen" small class="mx-1">fa-gift</v-icon>
            </td>
          </tr>
          <tr>
            <td>
              <v-chip
                small
                dark
                color="green lighten-1"
              >
                <v-icon color="white" small class="mx-1 font-11">fa-hourglass-2</v-icon>
                {{item.subTitle}}
              </v-chip>
            </td>
            <td class="text-left  font-11 error--text">
              <strike><i><small>{{$Helper.price(item.price-10000)}}</small></i></strike>
              <v-icon color="error" small class="mx-1 font-12">fa-flash</v-icon>
            </td>
          </tr>
          </tbody>
        </table>
      </v-card-text>
      <v-card-actions>
        <v-icon small class="mx-1" color="error">fa-fire</v-icon>
        <v-icon v-for="j in item.stars" color="warning" small class="mx-1" :key="j">star</v-icon>
        <v-spacer/>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn class="ml-1" color="gardeshGreen" v-on="on" outlined fab small>
              <v-icon small>fa-taxi</v-icon>
            </v-btn>
          </template>
          <span>تاکسی فرودگاه</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn class="ml-1" color="info" v-on="on" outlined fab small>
              <v-icon small>fa-hotel</v-icon>
            </v-btn>
          </template>
          <span>هتل</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn class="ml-1" color="primary" v-on="on" outlined fab small>
              <v-icon small>fa-train</v-icon>
            </v-btn>
          </template>
          <span>قطار</span>
        </v-tooltip>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>
<script>
  export default {
    props: ['item'],
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
