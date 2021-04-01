<template>
  <v-card tile class="ma-0 pa-0 grey lighten-4" :dark="dark">
    <v-img
      fit
      height="170px"
      width="100%"
      :src="background"
    >
      <v-container>
        <v-row>
          <v-col class="d-flex justify-start align-start">
            <v-img v-if="logo" :src="logo" max-width="100px" contain max-height="100px"/>
            <div class="mx-1" v-else-if="title || subtitle">
              <h1 v-if="title">{{title}}</h1>
              <h3 v-if="subtitle">{{subtitle}}</h3>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-img>
    <v-container style="margin-top: -80px">
      <v-card class="my-5 py-5 px-5" rounded>
        <v-card elevation="0" dark>
          <v-container>
            <v-row>
              <v-col class="green accent-4 d-flex justify-center align-center" style="border-left:1px solid #FFF">
                <h4 class="">{{header.title}}</h4>
              </v-col>
              <v-col class="light-green accent-4 d-flex justify-center align-center" v-for="(item,i) in header.items"
                     :key="i">
                <p class="text-center font-13">
                  {{item.title}}
                  <v-divider class="mx-2 px-2" dark/>
                  <b class="font-14">
                    {{item.subtitle}}
                  </b>
                </p>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <slot/>
        <v-card elevation="0" flat light>
          <v-container>
            <v-row
              class="my-5"
              v-for="(item,i) in card.items"
              :key="i">
              <v-col class="d-flex grey lighten-1 justify-center align-center  text-center font-18">
                <span class="black--text">{{item.title}}</span>
              </v-col>
              <v-col class="d-flex grey lighten-2 justify-start align-center text-center font-16">
                <span class="black--text">{{item.text}}</span>
              </v-col>
              <v-col class="grey lighten-2">
                <v-btn dark block large elevation="0" :color="item.color || 'light-green accent-4'"
                       class="d-flex justify-space-between">
                  <span>{{item.btnText}}
                  <v-divider vertical/>
                  </span>
                  <v-icon>{{item.icon}}</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-card>
    </v-container>
    <v-footer dark color="grey darken-4">
      <v-container>
        <div class="text-center">
          <template v-for="(item,i) in footer.items">
            <span v-if="i>0" class="mx-1" style="padding-bottom: 1px">•</span>
            <v-btn text :to="item.link">
              {{item.title}}
            </v-btn>
          </template>
          <div class="py-1">{{footer.text}}</div>
          <div class="d-flex align-center justify-center py-1">
            <v-img :src="footer.logo" :to="footer.link" height="30px" contain/>
          </div>
        </div>
      </v-container>
    </v-footer>
  </v-card>
</template>
<script>
  export default {
    props: ['title', 'subtitle', 'logo', 'background', 'header', 'card', 'footer', 'dark'],
  }
</script>
