<template>
  <div
    class="box-sample"
    :style="{ '--color-box': color }"
  >
    <div class="color-box-sample" />
    <p class="fr-my-2v">
      <strong class="block">{{ title }}</strong>
      <strong
        v-if="isLightTheme"
        class="block"
      >
        (thème clair)
      </strong>
      <strong
        v-else
        class="block"
      >
        (thème sombre)
      </strong>
    </p>
    <p>
      <span class="block">{{ color }}</span>
      <span class="block">{{ hexToRgb(color) }}</span>
      <span class="block">{{ rgbToHsl(color) }}</span>
    </p>
    <div class="box-children-sample">
      <div>
        <div
          class="color-box-sample--sm"
          :style="{ '--color-box': getHoverColor(color) }"
        />
        <p class="fr-my-2v">
          <strong class="block">hover</strong>
          <span class="block">{{ getHoverColor(color) }}</span>
          <span class="block">{{ hexToRgb(getHoverColor(color)) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import chroma from 'chroma-js';

defineProps({
  color: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  isLightTheme: {
    type: Boolean,
    default: true,
  },
});

function getHoverColor(color) {
  return chroma(color).darken(0.8).hex();
}

function hexToRgb(hex, string = true) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (string) {
    return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : null;
  }
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function rgbToHsl(hex) {
  hexToRgb(hex, false);
  let r = hexToRgb(hex, false).r;
  let g = hexToRgb(hex, false).g;
  let b = hexToRgb(hex, false).b;

  r /= 255;
  g /= 255;
  b /= 255;

  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  let d = max - min;
  let h;

  if (d === 0) h = 0;
  else if (max === r) h = ((g - b) / d) % 6;
  else if (max === g) h = (b - r) / d + 2;
  else if (max === b) h = (r - g) / d + 4;

  let l = (min + max) / 2;
  let s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));

  return `hsl(${parseInt(h * 60)}deg ${parseInt(s * 100)}% ${parseInt(l * 100)}%)`;
}
</script>

<style scoped>
.block {
  display: block;
}
.box-sample {
  padding: 10px;
  box-shadow: 0 0 0 1px lightgray;
  text-align: center;
  font-size: 14px;
}
.color-box-sample {
  width: auto;
  height: 100px;
  box-shadow: inset 0 0 0 1px lightgray;
  background-color: var(--color-box);
  margin: auto;
}
.box-children-sample {
  display: flex;
}
.box-children-sample > div {
  width: 100%;
}
.color-box-sample--sm {
  width: 100%;
  height: 30px;
  box-shadow: inset 0 0 0 1px lightgray;
  background-color: var(--color-box);
  margin: auto;
}
</style>
