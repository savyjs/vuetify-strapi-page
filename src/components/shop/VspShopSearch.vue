<template>
  <v-menu
    bottom
    nudge-bottom="40"
    v-model="openModal"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        dense
        v-model="search"
        :loading="searchingLoader"
        outlined
        :placeholder="$t('search ...')"
        append-icon="search"
        @change="doSearch"
      />
    </template>
    <v-list tile>
      <v-list-item v-for="(item,j) in results" :key="j" :to="rootLink + '/' + item.id">
        {{j}} - {{item.title}}
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
  export default {
    props: ['searchUrl', 'rootLink', 'title'],
    data() {
      return {
        results: [],
        openModal: false,
        search: '',
        searchingLoader: false,
      }
    },
    methods: {
      doSearch(val) {
        clearTimeout(this.searching);
        this.results = [];
        this.searching = setTimeout(() => {
          this.searchingLoader = true;
          let searchName = _.get(this, 'title', 'title') + '_contains';
          let params = {};
          params[searchName] = val;
          delete this.$axios.defaults.headers.common["Authorization"];
          this.$axios.$get(this.searchUrl, {params}).then(res => {
            console.log({res})
            this.results = res;
            this.openModal = true;
          }).finally(() => {
            this.searchingLoader = false;
          })
        }, 300)
      }
    }
  }
</script>
