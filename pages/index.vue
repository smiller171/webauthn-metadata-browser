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
      <div
        class="filter-container">
        <mdc-textfield
          v-model="query"
          name="filterInput"
          label="Filter"
          class="filter-input">
          <img
            slot="leading-icon"
            class="search-icon"
            src="/images/search.svg">
        </mdc-textfield>
      </div>
      <div class="results-container">
        <mdc-card
          v-for="entry in filteredArray"
          :key="entry.aaid"
        >
          <mdc-card-header>
            <h2
              class="entry-header"
              v-html="entry.description.replace(/_/g, '_<wbr>')"
            />
          </mdc-card-header>
          <img
            :src="entry.icon"
            alt=""
            class="entry-icon"
          >
          <mdc-card-text class="entry-body">
            <div
              v-if="! entry.showJson"
            >
              <mdc-list
                bordered
                dense>
                <mdc-list-item class="h3">
                  Status:
                </mdc-list-item>
                <mdc-list-item
                  class="list-item"
                  v-html="latestStatus(entry.statusReports).status.replace(/_/g, '_<wbr>')"/>
                <!-- <mdc-list-group-divider /> -->
                <mdc-list-item class="h3">
                  Key Protection:
                </mdc-list-item>
                <mdc-list-item
                  v-for="(item, index) in entry.keyProtection"
                  :key="index"
                  class="list-item">
                  {{ item }}
                </mdc-list-item>
                <!-- <mdc-list-group-divider /> -->
                <mdc-list-item class="h3">
                  Matcher Protection:
                </mdc-list-item>
                <mdc-list-item
                  v-for="(item, index) in entry.matcherProtection"
                  :key="index + 100"
                  class="list-item">
                  {{ item }}
                </mdc-list-item>
                <!-- <mdc-list-group-divider /> -->
                <mdc-list-item class="h3">
                  Attestation Types:
                </mdc-list-item>
                <mdc-list-item
                  v-for="(item, index) in entry.attestationTypes"
                  :key="index + 200"
                  class="list-item">
                  {{ item }}
                </mdc-list-item>
                <!-- <mdc-list-group-divider /> -->
                <mdc-list-item class="h3">
                  tcDisplay:
                </mdc-list-item>
                <mdc-list-item
                  v-for="(item, index) in entry.tcDisplay"
                  :key="index + 300"
                  class="list-item">
                  {{ item }}
                </mdc-list-item>
                <!-- <mdc-list-group-divider /> -->
                <mdc-list-item class="h3">
                  tcDisplay Content Type:
                </mdc-list-item>
                <mdc-list-item class="list-item">
                  {{ entry.tcDisplayContentType }}
                </mdc-list-item>
              </mdc-list>
            </div>
            <pre
              v-if="entry.showJson"
            >
{{ JSON.stringify(entry, hideJsonToggle, 2) }}
            </pre>
          </mdc-card-text>
          
          <mdc-card-actions class="card-actions">
            <mdc-card-action-buttons>
              <mdc-card-action-button
                @click="toggleJson(entry)">
                {{ entry.showJson?'Hide':'Show' }} Json
              </mdc-card-action-button>
            </mdc-card-action-buttons>
          </mdc-card-actions>
        </mdc-card>
      </div>
    </div>
  </div>
</template>

<script>
import Fuse from 'fuse.js'
import mdsData from '~/static/data.json'
export default {
  data: () => ({
    query: '',
    mdsData
  }),
  computed: {
    entriesArray() {
      return Object.values(this.mdsData.mdsCollections[0]['fido-mds1'].entries).sort(
        (a,b) => a.description.toLowerCase()>b.description.toLowerCase()?1:-1
      )
    },
    filteredArray() {
      if (! this.query) {
        return this.entriesArray
      }
      let options = {
        shouldSort: true,
        tokenize: true,
        includeMatches: false,
        threshold: 0.4,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          'description'
        ]
      }
      let fuse = new Fuse(this.entriesArray, options) // "list" is the item array
      return fuse.search(this.query)
    }
  },
  methods: {
    latestStatus: (arr) => arr.slice().sort(
      (a,b) => a.effectiveDate>b.effectiveDate?-1:1
    )[0],
    hideJsonToggle: (k,v) => k=='showJson'?undefined:v,
    toggleJson(entry) {
      return this.$set( entry, 'showJson', !entry.showJson)
    }
  }
}
</script>

<style lang="scss">
.filter-container {
  display: flex;
  align-items: center;
  .mdc-text-field__input {
    box-sizing: content-box;
  }
  .mdc-text-field--with-leading-icon {
    .mdc-text-field__icon {
      bottom: 8px;
    }
  }
  
}
.filter-input {
  margin-left: auto;
  margin-right: auto;
}
.search-icon {
  width: 24px;
}
.mdc-card {
  margin-top: 1rem;
  min-width: 30%;
  max-width: 500px;
  flex-basis: 400px;
  flex-shrink: 1;
  flex-grow: 1;
  margin-right: 1rem;
}
.mdc-card-header {
  align-self: center;
  text-align: center;
}
.entry-icon {
  align-self: center;
  max-width: calc(100% - 2rem);
}
.h3 {
  display: block;
  font-size: 1.17em;
  font-weight: bold;
}
.list-item {
  text-indent: 1em;
}
.results-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-right: -1rem;
}
.entry-header {
  word-break: break-word;
}
.entry-body {
  order: 1;
}
</style>

