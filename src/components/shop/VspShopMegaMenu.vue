<template>
  <v-card flat tile class="d-flex">
    <template v-for="(item,i) in items">
      <v-menu>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-on="on" v-bind="attrs" text tile :to="rootLink + '/' + item.id + '-' + item.slug">
            <v-icon class="text--grey mx-2" small>{{item.icon || 'menu'}}</v-icon>
            {{item.name}}
          </v-btn>
        </template>
        <v-card tile v-if="false && item.childs.length">
          <v-responsive :aspect-ratio="16/9">
            <v-row class="d-flex flex-wrap" no-gutters>
              <v-col v-for="(subItem,j) in item.childs" :key="j">
                <v-btn tile text block :to="rootLink + `/#`+j">
                  <v-icon class="mx-1" small>menu</v-icon>
                  <b>{{subItem.name}}</b>
                </v-btn>
                {{subItem}}
                <v-btn tile text block :to="rootLink + `/#`+i" v-for="subSubItem in subItem.childs"
                       v-if="subItem.childs" :key="i">
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
  import _ from 'lodash'

  export default {
    props: ['value', 'rootLink'],
    data() {
      return {}
    },
    computed: {
      items() {
        return _.isArray(this.value) ? _.take(this.value, 9) : this.value;
      }
    },
    methods: {
      rand() {
        return Math.floor(Math.random() * 15);
      }
    }
  }
</script>
