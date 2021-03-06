<template>
  <div>
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
        :key="entry.key"
      >
        <mdc-card-header>
          <h2
            class="entry-header">
            {{ addBreaks(entry.description) }}
          </h2>
        </mdc-card-header>
        <img
          :src="entry.icon"
          alt=""
          class="entry-icon"
        >
        <mdc-card-text class="entry-body">
          <div
            :class="{hidden: entry.showJson}"
          >
            <metadata-list
              :entry="entry"
            />
          </div>
          <div
            :class="{hidden: !entry.showJson}">
            <pre
              v-html="prettyJson(entry)"/>
          </div>
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
</template>

<script>
import addBreaks from '~/assets/wordbreak'
import Fuse from 'fuse.js'
import jsonFormat from 'json-pretty-html'
import mdsData from '~/static/data.json'
import MetadataList from '~/components/MetadataList'
export default {
  components: {
    MetadataList
  },
  data() {
    let entriesArray = Object.entries(mdsData.mdsCollections[0]['fido-mds1'].entries).map(
      arr => ({
        key: arr[0],
        showJson: false,
        ...arr[1]
      })
    ).sort(
      (a,b) => {
        if (a.description.toLowerCase() === b.description.toLowerCase()) {
          return a.key>b.key?1:-1
        }
        return a.description.toLowerCase()>b.description.toLowerCase()?1:-1
      }
    )
    return {
      query: '',
      mdsData,
      entriesArray
    }
  },
  computed: {
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
    hideExtraJson: ({key, showJson, ...obj}) => obj,
    toggleJson(entry) {
      return this.$set( entry, 'showJson', !entry.showJson)
    },
    addBreaks: (str) => addBreaks(str),
    prettyJson(obj) {
      return jsonFormat(this.hideExtraJson(obj))
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
.json-pretty {
  --solarized-base03: #002b36;
  --solarized-base02: #073642;
  --solarized-base01: #586e75;
  --solarized-base00: #657b83;
  --solarized-base0: #839496;
  --solarized-base1: #93a1a1;
  --solarized-base2: #eee8d5;
  --solarized-base3: #fdf6e3;

  --solarized-yellow: #b58900;
  --solarized-orange: #cb4b16;
  --solarized-red: #dc322f;
  --solarized-magenta: #d33682;
  --solarized-violet: #6c71c4;
  --solarized-blue: #268bd2;
  --solarized-cyan: #2aa198;
  --solarized-green: #859900;
  background-color: var(--solarized-base3);
  color: var(--solarized-base00);
  overflow-x: scroll;
}
.json-key {
  color: var(--solarized-red);
}
.json-string {
  color: var(--solarized-cyan);
  white-space: pre-wrap;
}
.json-number {
  color: var(--solarized-magenta);
}
.json-boolean {
  color: var(--solarized-yellow);
}
.hidden {
  display: none;
}
</style>

