<script>
import { svgMixins } from '@/utils/global.js';

export default {
  mixins: [svgMixins],
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
};
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 43 50"
  >
    <g
      fill="#5C68E5"
      :stroke="config.colorStroke"
      stroke-width="0.2%"
    >
      <path
        class="FR-972"
        d="m35.1 48 1.4-.1 1.1-.5 1-1.4 1.2-3 1.2-.5v-.7l-.6-1.2-.3-1.7-.6-1.4-1.2-.6.3-.5.1-.3.3-.3.6-.3-.8-1.1-.3-1.2v-1.3l.4-1.3-1.3.7.1-.8-.1-1-.3-.7-.7-.3-1-.3-.3-.6-.2-.7-.2-.5-2-1.2-.8-.8-.6-1.5.6-.3.3-.2.4-.2h.7l-3.3-1.5-.8 1.2-.9-.3-.1-.9 1.2-.6-.8-.8 2.7-1.5-.5-.6-.6-.3-.7-.1-.9.4-.2-2.3.3-1.9.8-.6 1.1 2 2.1-2.2-.2-.6.3-.4.6-.4.6-.6h-2.3l-2.3.6-2 1-1.4 1.2-1.7-3.6-1.2-.3-.5-.7-.2-.9-.4-.8-1.6-1-3.8-1.8-4.4-2.8L9.1 0 5.7.1 1.8 2.3l-.9.8-.6 1.1L0 5.6l.3 1.5.7 1.2 2.8 3 .7 1 .6 1.2.2 1.3-.2.6-.3.7-.2.7.4.7.4.5.3.5.3.5v.7l.8 1.8 1.7 1.7 3.5 2.5.4.4.6 1.2.4.5.6.1 2.1-.1h2.1l1.1-.2 1.5-.5.2 1.7.7 1.4.8 1.1.3.6-.7 1.5-1.4.6-1.5-.5-1.1-1.6-.8.9-2.6 1.2-2.7 2.9.9.5.5.4.1.4-.1.7 2.2 3.1.8.5 1.5-.2 2.4-1 1.5-.3 5.8.8 2.7-.5.6.2-.1 1 1.6.1 1.6-1 1.3-.5 1 1.4-.1 1.5-1 .6-1.1.3-.6 1.1.4 1.5z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
    </g>
  </svg>
</template>
