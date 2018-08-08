<template>
  <div>
    <div
      v-if="! mdsData.mdsCollections"
    >
      Loading...
    </div>
    <div
      v-if="mdsData.mdsCollections"
    >
      <card
        v-for="(entry, key) in entriesArray(mdsData.mdsCollections[0]['fido-mds1'].entries)"
        :key="key"
      >
        <h2>{{ entry.description }}</h2>
        <img 
          :src="entry.icon"
          alt=""
        >
        <p>
          <input
            v-model="entry.showJson"
            type="checkbox"
          >
          <span> Show JSON</span>
        </p>
        <div
          v-if="! entry.showJson"
        >
          <p>
            <span>
              Status: 
            </span>
            <span>
              {{ latestStatus(entry.statusReports).status }}
            </span>
          </p>
          <p>
            Key Protection:
            <ul>
              <li
                v-for="item in entry.keyProtection"
                :key="item"
              >
                {{ item }}
              </li>
            </ul>
          </p>
          <p>
            Matcher Protection:
            <ul>
              <li
                v-for="item in entry.matcherProtection"
                :key="item"
              >
                {{ item }}
              </li>
            </ul>
          </p>
          <p>
            Attestation Types:
            <ul>
              <li
                v-for="item in entry.attestationTypes"
                :key="item"
              >
                {{ item }}
              </li>
            </ul>
          </p>
        </div>
        <pre
          v-if="entry.showJson"
        >
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
    )[0],
    entriesArray: (obj) => Object.values(obj).sort(
      (a,b) => a.description.toLowerCase()>b.description.toLowerCase()?1:-1 
    )
  }
}
</script>

<style>
</style>
