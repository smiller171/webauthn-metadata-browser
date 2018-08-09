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
      <mdc-card
        v-for="entry in filteredArray"
        :key="entry.aaid"
      >
        <mdc-card-header>
          <h2
            v-html="entry.description.replace(/_/g, '_<wbr>')"
          />
        </mdc-card-header>
        <img
          :src="entry.icon"
          alt=""
          class="entry-icon"
        >
        <div>
          <!-- <input
            v-model="entry.showJson"
            type="checkbox"
          >
          <span> Show JSON</span> -->
        </div>
        <mdc-card-text>
          <div
            v-if="! entry.showJson"
          >
            <div>
              <span>
                Status:
              </span>
              <span>
                {{ latestStatus(entry.statusReports).status }}
              </span>
            </div>
            <div>
              Key Protection:
              <ul>
                <li
                  v-for="item in entry.keyProtection"
                  :key="item"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
            <div>
              Matcher Protection:
              <ul>
                <li
                  v-for="item in entry.matcherProtection"
                  :key="item"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
            <div>
              Attestation Types:
              <ul>
                <li
                  v-for="item in entry.attestationTypes"
                  :key="item"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
            <div>
              tcDisplay:
              <ul>
                <li
                  v-for="item in entry.tcDisplay"
                  :key="item"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
            <div>
              <span>tcDisplay Content Type: </span>
              <span>{{ entry.tcDisplayContentType }}</span>
            </div>
          </div>
        </mdc-card-text>
        <pre
          v-if="entry.showJson"
        >
          {{ JSON.stringify(entry, hideJsonToggle, 2) }}
        </pre>
        <mdc-card-actions>
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
}
.mdc-card-header {
  align-self: center;
  text-align: center;
}
.entry-icon {
  align-self: center;
}
</style>

