<template>
  <div id="app">
    <h1>hello webpack</h1>
    <Testcss />
    <Testless />
    <Testscss />
  </div>
</template>

<script>
import Testcss from 'components/Testcss'
import Testless from 'components/Testless'
import Testscss from 'components/Testscss'

export default {
  components: {
    Testcss,
    Testless,
    Testscss
  }
}
</script>
