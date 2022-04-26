<template>
  <v-card tile flat>
    <v-row>
      <v-col cols="7" sm="5" md="3" lg="2">
        <v-img
          fit
          width="100%"
          :src="img"
        >
        </v-img>
      </v-col>
      <v-col cols="12" sm="7" md="9" lg="10">
        <table class="oddTableNoPadding">
          <tbody>
          <tr v-for="(row,j) in (rows||[])" :key="j">
            <td v-if="row.icon">
              <v-icon>{{ row.icon }}</v-icon>
            </td>
            <td>{{ row.title || row }}</td>
            <td v-if="row.value">{{ row.value }}</td>
          </tr>
          </tbody>
        </table>
        <v-chip
          v-for="(tag,key) in (tags||[])"
          :key="key"
          small
          dark
          class="ml-1 my-1"
          color="green lighten-1"
        >
          <v-icon v-if="tag.icon" color="white" small class="mx-1 font-11">{{ tag.icon }}</v-icon>
          <span class="mx-1">{{ tag.title || tag }}</span>
        </v-chip>
      </v-col>
    </v-row>
    <div class="py-5">
      <slot/>
    </div>
    <v-card-actions>
      <div class="full">
        <div class="full d-flex justify-space-between flex-wrap">
          <div class="d-flex justify-space-between">
            <v-btn class="mr-2 my-2" target="_blank" fab dark small :color="row.color" :href="row.link || '#' "
                   v-for="(row,j) in (social||[])" :key="j">
              <v-icon small>{{ row.icon }}</v-icon>
            </v-btn>
          </div>
          <div>
            <v-btn :color="cta.color || 'primary'" :href="cta.link || '#' " dark rounded>
              <b>Message</b>
            </v-btn>
          </div>
        </div>
      </div>
    </v-card-actions>
    <v-card-actions>
      <table class="oddTable">
        <tbody>
        <tr v-for="(row,j) in (contacts||[])" :key="j">
          <td v-if="row.icon">
            <v-icon>{{ row.icon }}</v-icon>
          </td>
          <td>{{ row.title || row }}</td>
          <td v-if="row.value">{{ row.value }}</td>
        </tr>
        </tbody>
      </table>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: ['name', 'cta', 'rows', 'tags', 'contacts', 'img', 'social', 'footer', 'email'],
}
</script>
