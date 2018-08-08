<template>
  <div>
    <div
      v-if="mdsData.mdsCollections"
    >
      <card
        v-for="(entry, key) in mdsData.mdsCollections[0]['fido-mds1'].entries"
        :key="key"
      >
        <h2>{{ key }}</h2>
        <h3>{{ entry.description }}</h3>
        <img 
          :src="entry.icon"
          alt=""
        >
        <p>
          <span>
            Status: 
          </span>
          <span>
            {{ latestStatus(entry.statusReports).status }}
          </span>
        </p>
        <pre>
          {{ JSON.stringify(entry, null, 2) }}
        </pre>
      </card>
      
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  asyncComputed: {
    mdsData: {
      get () {
        return axios.get('/data.json')
          .then(response => response.data)
      },
      default: {}
    }
  },
  methods: {
    latestStatus: (arr) => arr.slice().sort(
      (a,b) => a.effectiveDate>b.effectiveDate?-1:1
    )[0]
  }
}
</script>

<style>
</style>
