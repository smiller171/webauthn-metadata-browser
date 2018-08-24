<template>
  <div class="flex">
    <div class="content">
      <header>
        <a 
          href="https://webauthn.org/" 
          --title="WebAuthn"
        >
          <img 
            class="header-logo"
            src="/images/webauthn-logo.png" 
            alt="WebAuthn logo"
          >
        </a>
        <h1 class="h1">WebAuthn Metadata Browser</h1>
      </header>
      <nuxt/>
    </div>
    <my-footer/>
  </div>
</template>

<script>
import MyFooter from '~/components/Footer'
export default {
  components: {
    MyFooter
  }
}
</script>


<style lang="scss">
html {
  font-family: "Open Sans", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background-color: var(--color-background-light);
  // padding: 1rem;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

@font-face {
  font-family: 'Open Sans';
  font-weight: 400;
  font-style: normal;
  src: local('Open Sans'),
       local('Open-Sans-regular'),
       url('/fonts/Open-Sans-regular/OpenSans-Regular.woff2') format('woff2'),
       url('/fonts/Open-Sans-regular/OpenSans-Regular.woff') format('woff'),
       url('/fonts/Open-Sans-regular/OpenSans-Regular.ttf') format('truetype'),
       url('/fonts/Open-Sans-regular/OpenSans-Regular.svg#OpenSans') format('svg');
}

@font-face {
  font-family: 'Open Sans';
  font-weight: 600;
  font-style: normal;
  src: local('Open Sans Semibold'),
       local('Open-Sans-600'),
       url('/fonts/Open-Sans-600/OpenSans-SemiBold.woff2') format('woff2'),
       url('/fonts/Open-Sans-600/OpenSans-SemiBold.woff') format('woff'),
       url('/fonts/Open-Sans-600/OpenSans-SemiBold.ttf') format('truetype'),
       url('/fonts/Open-Sans-600/OpenSans-SemiBold.svg#OpenSans') format('svg');
}
</style>

<style lang="scss" scoped>
.flex {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content {
  flex: 1;
  overflow-y: scroll;
  padding: 1rem;
}
.header-logo {
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: block;
}
.h1 {
  background-color: var(--color-primary);
  color: var(--color-primary-text);
  padding: 1rem;
  font-size: 1.5rem;
}
header {
  flex-shrink: 0;
}
.footer {
  background-color: var(--color-primary);
  color: var(--color-primary-text);
  flex-shrink: 0;
}
</style>
