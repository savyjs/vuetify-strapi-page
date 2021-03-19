<template>
  <v-card flat tile class="d-flex">
    <template v-for="(item,i) in items">
      <v-menu
        open-on-hover
        nudge-bottom="35"
        nudge-left="40"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-on="on" v-bind="attrs" depressed text tile>
            <v-icon class="text--grey mx-2" small>{{item.icon || 'menu'}}</v-icon>
            {{item.name}}
          </v-btn>
        </template>
        <v-card tile v-if="item.categories.length">
          <v-responsive :aspect-ratio="16/9">
            <v-row class="d-flex flex-wrap" no-gutters>
              <v-col v-for="(subItem,j) in item.categories" :key="j">
                <v-btn tile text block :to="rootLink + `/#`+j">
                  <v-icon class="mx-1" small>menu</v-icon>
                  <b>{{subItem.name}}</b>
                </v-btn>
                <v-btn tile text block :to="rootLink + `/#`+i" v-for="subSubItem in subItem.categories"
                       v-if="subItem.categories" :key="i">
                  <v-icon class="mx-1" small>menu</v-icon>
                  {{subSubItem.name}}
                </v-btn>
              </v-col>
            </v-row>
          </v-responsive>
        </v-card>
      </v-menu>
    </template>
  </v-card>
</template>
<script>
  export default {
    props: ['value', 'rootLink'],
    data() {
      return {}
    },
    computed: {
      items() {
        return this.value;
      }
    },
    methods: {
      rand() {
        return Math.floor(Math.random() * 15);
      }
    }
  }
</script>
