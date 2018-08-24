<template>
  <ul
    :key="entry.key + '-list'"
    bordered
    dense>
    <li class="h3">
      Status:
    </li>
    <li
      class="list-item">
      {{ addBreaks(latestStatus(entry.statusReports).status) }}
    </li>
    <li class="h3">
      Key Protection:
    </li>
    <li
      v-for="(item, index) in entry.keyProtection"
      :key="entry.key + '-keyProtection-' + index"
      class="list-item">
      {{ item }}
    </li>
    <li class="h3">
      Matcher Protection:
    </li>
    <li
      v-for="(item, index) in entry.matcherProtection"
      :key="entry.key + '-matcherProtection-' + index"
      class="list-item">
      {{ item }}
    </li>
    <li class="h3">
      Attestation Types:
    </li>
    <li
      v-for="(item, index) in entry.attestationTypes"
      :key="entry.key + '-attestationType-' + index"
      class="list-item">
      {{ item }}
    </li>
    <li class="h3">
      tcDisplay:
    </li>
    <li
      v-for="(item, index) in entry.tcDisplay"
      :key="entry.key + '-tcDisplay-' + index"
      class="list-item">
      {{ item }}
    </li>
    <li class="h3">
      tcDisplay Content Type:
    </li>
    <li class="list-item">
      {{ entry.tcDisplayContentType }}
    </li>
  </ul>
</template>

<script>
import addBreaks from '~/assets/wordbreak'
export default {
  props: {
    entry: {
      type: Object,
      required: true
    }
  },
  methods: {
    addBreaks: (str) => addBreaks(str),
    latestStatus: (arr) => arr.slice().sort(
      (a,b) => a.effectiveDate>b.effectiveDate?-1:1
    )[0]
  }
}
</script>

