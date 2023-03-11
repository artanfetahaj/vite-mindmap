<template>
  <div class="container">
    <div class="left-top">
      <a href="https://github.com/hellowuxin/vue3-mindmap" target="_blank">GitHub</a>
    </div>
    <div class="right-top"><span>Props</span></div>
    <mindmap class="left-bottom" v-model="data" :branch="rangeList['branch'].value" :x-gap="rangeList['x-gap'].value"
      :y-gap="rangeList['y-gap'].value" :zoom="checkboxList['zoom'].value" :fit-btn="checkboxList['fit-btn'].value"
      :center-btn="checkboxList['center-btn'].value" :download-btn="checkboxList['download-btn'].value"
      :drag="checkboxList['drag'].value" :edit="checkboxList['edit'].value"
      :add-node-btn="checkboxList['add-node-btn'].value" :sharp-corner="checkboxList['sharp-corner'].value"
      :ctm="checkboxList['contextmenu'].value" :timetravel="checkboxList['timetravel'].value"
      @update:model-value="onChange" @select="onSelect" :locale="locale" :defalutScale="1.1" />
    <div class="right-bottom">
      <div>
        <label for="language-select">Language</label>
        <select id="language-select" v-model="locale">
          <option value="zh">简体中文</option>
          <option value="en">English</option>
          <option value="ptBR">Brazilian Portuguese</option>
        </select>
      </div>
      <div v-for="(item, key) in checkboxList" :key="key">
        <input type="checkbox" :name="key.toString()" v-model="item.value" :disabled="item.disabled">
        <label :for="key.toString()">{{ key }}</label>
      </div>
      <div v-for="(item, key) in rangeList" :key="key">
        <input type="range" :name="key" v-model.number="item.value" :min="item.min" :max="item.max">
        <label :for="key">{{ key }}（{{ item.value }}）</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import learn from './learn.json'
import { defineComponent, reactive, ref } from 'vue'
import Mindmap from './components/Mindmap'
import { Locale } from './components/Mindmap/interface'

type checkbox = { [key: string]: { value: boolean, disabled?: boolean } }

export default defineComponent({
  name: 'App',
  components: {
    Mindmap
  },
  setup() {
    const checkboxList = reactive<checkbox>({
      'center-btn': { value: true },
      'fit-btn': { value: true },
      timetravel: { value: true },
      'download-btn': { value: true },
      'add-node-btn': { value: true },
      keyboard: { value: false, disabled: true },
      zoom: { value: true },
      drag: { value: false },
      edit: { value: true },
      contextmenu: { value: true },
      'sharp-corner': { value: false },
      vertical: { value: false, disabled: true }
    })
    const rangeList = reactive({
      branch: { value: 2, min: 1, max: 6 },
      'x-gap': { value: 84, min: 0, max: 200 },
      'y-gap': { value: 18, min: 0, max: 100 }
    })
    const data = ref(learn)
    const onChange = (msg: any) => {
      // console.log(msg)
    }
    const onSelect = (msg: any) => {
      // console.log(msg)
    }
    const locale = ref<Locale>('zh')

    return {
      data,
      checkboxList,
      rangeList,
      onChange,
      onSelect,
      locale
    }
  }
})
</script>

<style lang="scss">
.container {
  width: 100%;
  height: calc(100vh - 16px);
  border-radius: 4px;
  border: thin solid rgba(0, 0, 0, .12);
  overflow: hidden;
  background-color: rgba(0, 0, 0, .12);
  display: grid;
  grid-template-columns: 75% 1px 25%;
  grid-template-rows: 48px 1px auto;
}

.right-top {
  grid-column: 3 / 4;
}

.left-bottom {
  grid-row: 3 / 4;
}

.right-bottom {
  grid-column: 3 / 4;
  grid-row: 3 / 4;
  background-color: white;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: scroll;

  div {
    display: flex;
    align-items: center;
    gap: 5px;
  }
}

.left-top,
.right-top {
  background-color: #eee;
  padding: 0 12px;
  display: flex;
  align-items: center;
}

input[type='checkbox'] {
  cursor: pointer;
}

input:disabled {
  cursor: not-allowed;
}

.Mindmap_svg_fgvb6 {
  background: radial-gradient(rgb(80, 80, 80) 1px, rgb(47, 49, 54) 1px) 0% 0% / 25px 25px rgb(47, 49, 54);

  .Mindmap_root_fgvb6>.Mindmap_content_fgvb6>.Mindmap_text_fgvb6>text {
    fill: #333
  }

  .Mindmap_text_fgvb6>rect {
    fill: rgba(255, 255, 255, 0.2);
  }

  text {
    fill: #fff;

    .l2{
      fill: #63ff63;
      font-size: 12px;
    }
    .l3{
      fill: #ff8585;
      font-size: 12px;
    }
  }
}
</style>
