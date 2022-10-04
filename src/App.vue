<script setup lang="ts">
import type { GlobalThemeOverrides } from 'naive-ui'
import { darkTheme } from 'naive-ui'
import { ui as io } from '../common/event'
import { CREATE_RECTANGLES, EXIST, GET_TEHME, NOTIFY, SET_THEME, TEST_ACTION, UI_READY } from '../common/eventName'
import logo from './assets/logo.png'

const triggerOne = ref('This works!')
const consoleTry = () => {
  io?.send(
    NOTIFY, 'This is a notification from the main process',
  )
}
const test = () => {
  io?.send(TEST_ACTION, 'test')
}
const cancel = () => {
  io?.send(EXIST, '')
}
const create = () => {
  io?.send(CREATE_RECTANGLES, { type: 'create-rectangles', count: 5 })
}
const isDark = ref(false)
const ifUseDarkTheme = computed(() => {
  if (isDark.value)
    return darkTheme
  return undefined
})
const el = ref(null)
const mainColor = useCssVar('--c-primary', el)
useTitle('Desgin Common Plugin UI')

io?.on(SET_THEME, ({ ifDark }) => {
  isDark.value = ifDark
})

watch(isDark, () => {
  if (isDark.value)
    document.body.setAttribute('arco-theme', 'dark')
  else
    document.body.removeAttribute('arco-theme')
})

onMounted(() => {
  io?.send(GET_TEHME, '')
  io?.send(UI_READY, '')
})

onKeyStroke('Escape', (e) => {
  e.preventDefault()
  cancel()
})
const themeOverrides = computed(() => {
  /**
 * js 文件下使用这个做类型提示
 * @type import('naive-ui').GlobalThemeOverrides
 */
  const custom: GlobalThemeOverrides = {
    common: {
      primaryColor: mainColor.value,
      primaryColorHover: mainColor.value,
      successColor: mainColor.value,
    },
    Button: {
      textColor: mainColor.value,
      textColorFocus: mainColor.value,
      color: mainColor.value,
      borderHover: mainColor.value,
      borderPressed: mainColor.value,
    },
  }
  return custom
})
</script>

<template>
  <div :class="[isDark ? 'dark' : '']">
    <n-config-provider :theme-overrides="themeOverrides" :theme="ifUseDarkTheme">
      <div flex="~ center col">
        <img :src="logo" mt-12 w-140px h-140px>

        <div flex="~ row gap-4" mt-12>
          <button btn @click="consoleTry">
            Show Console
          </button>
          <button btn @click="create">
            Manipulate UI
          </button>
          <button btn @click="test">
            Test One
          </button>
        </div>

        <div mxa mt-10 flex="col ~ gap-4 center">
          <n-gradient-text type="success" :size="24">
            Vue 3 + Vite + Naive UI + Uno + VueUse
          </n-gradient-text>
          <n-rate />
        </div>
        <button flex="~ center gap-2" mt-12 @click="cancel">
          <div i-ph-hands-clapping icon-btn />
          <div icon-btn>
            See U Again
          </div>
        </button>
      </div>
    </n-config-provider>
  </div>
</template>

<style>

</style>
