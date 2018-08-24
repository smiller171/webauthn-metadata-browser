<template>
  <div>
    <div v-if="!toggle">
      First view
    </div>
    <div v-if="toggle">
      Second view
    </div>
    <input
      id="toggle" 
      v-model="toggle"
      type="checkbox"
      name="toggle"
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      toggle: null
    }
  }
}
</script>
