<template>
  <div
    v-if="region.display !== 'none'"
    class="om fr-col-sm"
    :style="{ display: region.display }"
  >
    <span
      class="om_title fr-text--xs fr-my-1w"
      :style="{ color: dromColor }"
    >
      {{ region.name }}
    </span>
    <component
      :is="region.component"
      height="50"
      :config="config"
      :onclick="handleClick"
      :ondblclick="handleDblClick"
      :onenter="handleEnter"
      :onleave="handleLeave"
    />
  </div>
</template>

<script>
export default {
  name: 'DomTomRegion',
  props: {
    region: {
      type: Object,
      required: true,
    },
    config: {
      type: Object,
      required: true,
    },
    dromColor: {
      type: String,
      default: '#6b6b6b',
    },
  },
  emits: ['click', 'dblclick', 'enter', 'leave'],
  methods: {
    handleClick(e) {
      this.$emit('click', e);
    },
    handleDblClick(e) {
      this.$emit('dblclick', e);
    },
    handleEnter(e) {
      this.$emit('enter', e);
    },
    handleLeave(e) {
      this.$emit('leave', e);
    },
  },
};
</script>