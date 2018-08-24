<template>
  <mdc-list
    :key="entry.key + '-list'"
    bordered
    dense>
    <mdc-list-item class="h3">
      Status:
    </mdc-list-item>
    <mdc-list-item
      class="list-item">
      {{ addBreaks(latestStatus(entry.statusReports).status) }}
    </mdc-list-item>
    <mdc-list-item class="h3">
      Key Protection:
    </mdc-list-item>
    <mdc-list-item
      v-for="(item, index) in entry.keyProtection"
      :key="entry.key + '-keyProtection-' + index"
      class="list-item">
      {{ item }}
    </mdc-list-item>
    <mdc-list-item class="h3">
      Matcher Protection:
    </mdc-list-item>
    <mdc-list-item
      v-for="(item, index) in entry.matcherProtection"
      :key="entry.key + '-matcherProtection-' + index"
      class="list-item">
      {{ item }}
    </mdc-list-item>
    <mdc-list-item class="h3">
      Attestation Types:
    </mdc-list-item>
    <mdc-list-item
      v-for="(item, index) in entry.attestationTypes"
      :key="entry.key + '-attestationType-' + index"
      class="list-item">
      {{ item }}
    </mdc-list-item>
    <mdc-list-item class="h3">
      tcDisplay:
    </mdc-list-item>
    <mdc-list-item
      v-for="(item, index) in entry.tcDisplay"
      :key="entry.key + '-tcDisplay-' + index"
      class="list-item">
      {{ item }}
    </mdc-list-item>
    <mdc-list-item class="h3">
      tcDisplay Content Type:
    </mdc-list-item>
    <mdc-list-item class="list-item">
      {{ entry.tcDisplayContentType }}
    </mdc-list-item>
  </mdc-list>
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

