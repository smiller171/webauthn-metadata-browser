<template>
  <footer class="footer">
    <a href="https://millergeek.xyz">Website by Scott Miller</a>
    <div class="iconDiv">
      <a href="https://github.com/smiller171/webauthn-metadata-browser">
        Source
        <github-icon
          class="iconImg"
        />
      </a>
    </div>
    
  </footer>
</template>

<script>
import GithubIcon from '~/components/GithubIcon'
export default {
  components: {
    GithubIcon
  }
}
</script>


<style lang="scss" scoped>
.footer {
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
}
a {
  color: inherit;
  text-decoration: inherit;
  font-weight: bold
}
.iconDiv {
  text-align: center;
}
.iconImg {
  height: 1.2em;
  vertical-align: middle;
  fill: currentColor;
}
</style>
