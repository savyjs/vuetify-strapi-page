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
        <v-card tile>
          <v-responsive :aspect-ratio="16/9">
            <div class="d-flex  flex-wrap" v-for="i in rand()" :key="i">
              <v-card flat :to="`/#`+j" v-for="j in rand()" :key="j">
                <small>
                  <v-icon class="mx-1" small>menu</v-icon>
                  {{j}}
                </small>
              </v-card>
            </div>
          </v-responsive>
        </v-card>
      </v-menu>
    </template>
  </v-card>
</template>
<script>
  export default {
    props: ['value'],
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
