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
    :viewBox="config.viewBox"
  >
    <g
      fill="#5C68E5"
      :stroke="config.colorStroke"
      stroke-width=".2%"
    >
      <path
        class="FR-2A"
        :style="{ display: config.displayDep['FR-2A'] }"
        d="M930 907v3l3 3 6 4 1 3-4 1-5 1v2l2 2v8l8 2 3 1 2 4-2 2-2 1-3 4-2 3 1 6h6l1 1 5-2 2 1-3 6 3 2-5 3-2 7 8 2 11 1-5 5s-2-1-3-1v1c0 2-3 6-3 7l4 3 6 4 12 4 4 1 3 2-2 3h6l1 3h5l2-7-4-1 5-5-1-2v-3l7-4v-4h-4l-3 2v-4h5l2-4 2-13-1-5v-5l-7 4h-7l-1-5 1-1-2-2-1-9-1-2h-4l-2-1v-6l-2-2-2-1-4-5v-3h-5l-2-5h-6l-4-4 1-2-2-1h-5l-2-1h-8v-2z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-2B"
        :style="{ display: config.displayDep['FR-2B'] }"
        d="m990 834-5 4v4l3 3-3 3 1 3-2 2v3l4 4v5l-2 4-3 1-3-3h-5l-1-1h-4l-4 4-2 6-9 2-7 6-2 4-3-1-2-2-1 6-3 1v6l1 3-4 3-1 3h4v2h7l2 1h6l2 1-1 2 4 4h6l2 5h5v3l3 5 3 1 2 2v6l2 2h4l1 1 1 9 2 2-1 1 1 5h7l7-4-1-11 9-12v-20l-4-7-1-22-2-4-5-4-1-13 2-6-2-10-2-8-2-2z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-13"
        :style="{ display: config.displayDep['FR-13'] }"
        d="m686 750-10 5-3 20-11-2-3 8 3 4-12 7-3 8h11l15 1 3 3h-5l-4 6 16 3 12-2-7-6 5-4 7 3 3 7 20 1 6-3 1 4-6 5h8l-1 4-2 2h17l9 3 1 1v-7l3-3 3-2v-2l-3-2h-3l-2-2 3-3v-1l-3-1v-3h7l2-1-6-6v-7l-4-3 3-7 8-5-6-4-4 3-10 3-7-1-15-6h-8l-7-3-3-4-5-6-13-5h-1z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-84"
        :style="{ display: config.displayDep['FR-84'] }"
        d="M699 697h-5l-4 6 1 7 6 1-1 2-5 1-5 5-1-2 1-7-2-2-10 1-2 4 1 1 6 10v8l11 11v4l-4 3 13 5 5 6 3 4 7 3h9l14 6 8 1 9-3 4-3 1-2-7-9h-9v-3l3-3v-4l-6-3-1-5 4-2v-4l-4-1-1-5h-3l-6-5-1-4-10-1-7-1-1-4 2-5-4 4-8-1-1-3 5-6z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-83"
        :style="{ display: config.displayDep['FR-83'] }"
        d="M830 756h-6l-2 2h-10l-9 6-6-4-9 3-1 4-7 5-12-8-9 3-1 2 7 4-8 6-4 6 4 3v7l6 6-2 1h-7v3l4 1v1l-3 3 1 2h3l3 2v2l-3 2-3 3v7l1 2 6 2 2 8 4 1 4-3 6-4 11 1v3l-4 2h9l-2-2-1-5 5-3 5 2h2l2 3 3-2v-5l3-2h8l2-4 5 2 6-3v-9h-8l6-3 3-4 1-6 10-1 6-7-4-4v-2l-2-2 2-2v-4l-5-2h-2l-4-3v-8l-5-1-4-1-1-4z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-04"
        :style="{ display: config.displayDep['FR-04'] }"
        d="m841 665-4 6-5 4-2 3-5 1v3l-2 2-2 5h-11l-6-3-4 3-6-1-2 3h2v6h-1l-6-3v-3l-4-3h-2v4h-3l-6 4-4 6-1 4h2l1 5h-2l-4-3-2 1 1 2 5 7-3 1-3-2h-6l-6 6v2l-2-3-3-2-2 5-3 3h-2l1 5 4 1v4l-4 2 1 5 6 3v4l-3 3v3h8l8 9 9-3 12 8 7-5 1-4 10-3 5 4 9-6h10l2-2h6l-2-4 2-2v-2h5l1-2 5-3 4 3 2-2-6-5-6-6-3-1v-5l-4-6 2-8 1-5 4-3v-4l5-3h1v-7l5-1-3-3-3-1-2-4 1-4 7-7-1-5h1z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-06"
        :style="{ display: config.displayDep['FR-06'] }"
        d="M841 698h-1l-5 3v4l-4 3-1 5-2 8 4 6v5l3 1 6 6 6 5-2 2-4-3-5 3-1 2h-5v2l-2 2 2 4-4 2 1 4h4l5 2v7l4 4h2l5 2v3l-2 3 2 1v3l4 4 1-9 7 2 2-3h4v-11l9-1 7-6h6l1-4 6-4-4-8 6-5-1-5 8-3 2-8-1-5-2-3-2-5h-5l-17 6h-5l-10-7-9-3h-5v-6z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-05"
        :style="{ display: config.displayDep['FR-05'] }"
        d="m810 619-3 1-1 6-6 1-1-6-2-2-7 1-2 2-2 8 1 2h8l1 5 3 1v8h-7l-2 3-9-1-4 4-4-2-4 4 1 3-2 3h-10v4l3 2-1 2-6 3-7 1-3 6v5l4 3-4 5-5-3h-6v3l3 3-4 3 1 6 13 3 2 5h3l-1 11 6-5h6l3 2 3-1-5-7-1-2 2-1 4 3h2l-1-5h-2l1-4 4-6 6-4h3v-4h2l4 3v3l6 3h2l-1-6h-2l2-3 6 1 4-3 6 3h11l2-5 2-2v-3l5-1 1-3 6-4 4-6 5 1 3-4h4v-3l-5-3-1-10-4-1h-5l-10-4-1-11-6-2-1-4-3-5z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-48"
        :style="{ display: config.displayDep['FR-48'] }"
        d="m577 643-10 4-3 6-7-4-5 16-5 12 7 9v7l5 4v8l2 13 6 2-1 4 9-1 3 1-2 2 11 7 10-2 1-2-1-3 4-1 6 5 9 1 4-7v-5l3-3-2-1v-7l-6-6h5l2-2 2-4-2-1 1-7-6-7-3-13-9-12-7 2-1-6h-4v5l-10 3z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-03"
        :style="{ display: config.displayDep['FR-03'] }"
        d="m541 451-5 6h-3l-3 4-3-4-10 9v6l2 2v2l-5 4-5-1-9 2-4 5-2 4 4 6v4l3 4 2-4 3 5 4 2 4 9v3l6 4 3-1 2-6h2v-3l4-1 1 2 5-5h5l1 2-2 3 3 5 1 2 9 5 12 2h3l5 1 4-3 3 2 1 4 4 1h6l1 4 5 2v-2h9l-1-21-2-5 1-4 6-1 8-6v-14l-3-4h-5l-2-3h-7l-1-2v-5l-8-14-3-2-7 9-3 1-1-5-3-2-2 3h-5l-1-3-4 2-3 2-5-4-6-3v-5z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-30"
        :style="{ display: config.displayDep['FR-30'] }"
        d="m624 696-2 4-2 2h-5l6 6v7l2 1-3 3v5l-4 7-9-1-6-5-4 1 1 3-1 3-10 1-11-7-2 2v5l-4 1 1 4 5 1h6l1 7-6 3v4l5 2v2l2 2 2-2h3l1 3h4l2-7h3l5-6h6l1 9 2 3 4-2 6 3 2 4 11 6 4 10v4l-7 4-5 4 6 1v7h13l3-8 12-7-3-4 3-8 11 2 2-20 15-8v-4l-11-11v-8l-6-10-13-7-1 5-5 1-2-6-5 1-1 7-4-1-8-6-4 2v-10z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-11"
        :style="{ display: config.displayDep['FR-11'] }"
        d="m491 802-1 7-6-2h-7v-3l-4 1-7 2-3-4-5 4 2 4-6 2-1 6-5 2 5 5-1 3 17 8 2 13v6l1 9h-9l-3 4 12 9 7-3 8 9-1 1h1l15-7-4-5v-6h34l-1-5 8-4 10 7 4 2v-22l-4 1-4-6 3-5 6 6 6-4 3-4 1-4h-5l-1-5h-5l-4-7-4 1-3-2-1-6-2 1 1 4h-5v6l-7 3-3-7-5 3-4-3-1-5 3-4-2-4h-11l-11-2z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-34"
        :style="{ display: config.displayDep['FR-34'] }"
        d="m604 747-5 6h-3l-2 7h-4l-1-3h-3l-2 2-2-2v-3l-5-2v2l-7 1-3 3 1 6h-5l-6-3h-3v4l1 10h-10l-2 4-13 5-5-4-3 5-2 5 6 5-2 7-8 2 2 4-3 4 1 5 4 3 5-3 3 7 7-3v-6h5l-1-4 2-1 1 6 3 2 4-1 4 7h5l1 5h5v-2l13-3 1-4h11l3-4 19-16 12-8h5l5-4 7-4v-5l-4-9-11-6-2-5-6-3-4 2-2-2-1-9z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-66"
        :style="{ display: config.displayDep['FR-66'] }"
        d="m539 858-8 4 1 5h-34v6l4 5-15 7h-14l-1 3-6 2-4 4-12 2 1 4 6 5 10 3v6l6 5h5l6-8 7-1 12 4 10 8 3-3h3l2 2 2-2 1-5 11-2 3-5 6-2h7l5 5 6 1v-6l-3-4-5-2-1-32-5-2z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-15"
        :style="{ display: config.displayDep['FR-15'] }"
        d="m512 590-1 4 2 5-2 2h-4l-4-4-3-2v10l-7 5-4 6 1 6-2 3-2 6h-2l-3 4 2 2 1 4-4 3 1 12 7 5-5 10 5 2-2 6 4 1 3-5h5l1 1h11l2-4 3-1 1-8h2v-9l11-9 1 1 1 7 7-1 1 10h4l1 11 3 3 5-11 5-16 7 4 3-7 9-3v-3l-2-3-4-2 2-3-2-2h2l3-2-4-1-2-2-1-7-2-2-2-6h-8l-2-5h-2l-2 3-5-1-5-7-2-1-4-2-2 3h-6l-3-7z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-43"
        :style="{ display: config.displayDep['FR-43'] }"
        d="m571 595-2 2v2h-4l-4 3-6 1-2 2h1l2 5h8l2 6 2 2 1 7 1 2 5 1-3 2h-2l2 2-2 3 4 2 2 3v3h1l6 17 9-3 1-5h4l1 6 7-2 8 10 6-8 9-7h9l3-9h5l1-7h5l-1-2-1-5 2-4 5-2 2-8-5-6h-6l1-6-11-5h-4l-8 6-8-2-1 2-5-2-3-3-2 4-5-1-3-2-2 5-4-2-2-4h-3l-2-2-4 1h-5l-2-1-2 1z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-63"
        :style="{ display: config.displayDep['FR-63'] }"
        d="m537 509-5 5v-2l-5 1v3h-2l-2 6-3 1-5-4v8l3 4 1 7-4 3-1 5-4 2-7 4 1 3 8 9 1 5-3 5v5l2 3 1 6-1 2 11 4 3 6h6l2-2 4 1 2 1 5 7 5 1 2-3h1l2-2 6-1 4-3h4v-3l2-1 1 2 2-1 2 1h5l4-2 2 3h3l2 4 4 1 2-4 3 2 5 1 2-4 3 3 5 1 1-1-2-1-1-4 6-7-3-12-9-6-4-9-5-6 2-8 3-3-6-5v-1l-5-2-2-4h-5l-4-1-1-4-3-2-4 2-5-1-4 1-11-2-9-5-1-3-3-4 2-4-1-1z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-65"
        :style="{ display: config.displayDep['FR-65'] }"
        d="m315 784-3 2 6 10-3 4 2 4 5 6-4 5-5 13-10 8 2 5-2 2-5-1-2 12-3 2v7h1l6 3 7 6 1 4 5 5h5l12-5 5 6 7 1 2-4 4 1 7 1-1-19h4l3 1 2-2v-4l5-2-2-7-2-2-4 2 2-4-1-4-6-4 1-3 3-6 4-1v-3l3-3 1-3-6-3h-9l-1-3h-5l-1-3h-5l-1 1h-5v-3l-4-2 1-1 1-4-1-1-2-5-4-1-4-2v-6z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-64"
        :style="{ display: config.displayDep['FR-64'] }"
        d="m302 785-5 3-10-1-1-1-7 2-5 1-4-3-5 2-1-2h-5l-3 2h-9l-4 3h-9l-1 2-2-1 2-3-4-3-6 5h-9l-11-5-1 3-8 10-7 3h-4v4l4 4h6l1 5 5 1 1-4 7 3 4 1 1 5-2 2v7l-5 2v3l3 4 6 2 1-6 3-3-1 5 3 3h6l3 4 9 2 8 5h14l1 7 9 7 4 5 4-2 3-1 2 2 3-2 7-4v-7l3-2 2-12 5 1 2-2-2-5 9-8 6-13 4-5-5-6-2-4 3-4-6-10-9-1z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-40"
        :style="{ display: config.displayDep['FR-40'] }"
        d="m243 684-12 6h-3l-6 34-8 32-3 12-2 9-6 9 11 5h9l6-5 4 4-2 2 2 1 1-2h9l4-4 9 1 3-2h5l1 2 5-2 3 3 6-1 7-2 1 1 10 1 5-3-2-5 2-7 4-4-1-7 3-3-5-7 4-4 4-1 4 2 5-5 1 6 2 2 4-1v-4l1-3-1-2 1-7 4-4-2-3h-4l-5-2-7 1-2-8-4-6h-2l1 6v2l-7 1-6-3-2-8-4-5h-3l-1-3-3-2-6-2 2-2v-2l-2-2-3-1h-6l-4 4h-3l-4-3-6 3-3-2 2-3 1-5z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-33"
        :style="{ display: config.displayDep['FR-33'] }"
        d="m245 575-6 9-2 30-4 30-4 24v6l3-8 5-6 7 6 1 2 2 3-9 1-2-3-3 2-1 5-4 6v8h3l11-6 7 2-1 4-2 4 3 1 6-2 4 3h3l3-4 7-1 2 2 2 2v2l-1 2 6 2 3 2v3h4l4 5 2 8 6 2h6v-8h2l3 5 6-1 3-3-1-3-2-2 1-4h3l4-2-2-4-1-4 3-5 5-8 4-4 3-1v-4h-3l-2-4 1-3 5-1 3-1 4-1-1-7 4-2-5-3-4 5h-11l-1-2-4-2 3-3v-4l-1-2v-1l3-3 1-5 2-6-2-3h-4l-2-2-1 4-4-2-5 2-4-1-9-8h-5l-1-12-10-1v-5l-2 1h-10v3l3 10v11l-1 2-2-8-5-20-19-17 1-7-4-1z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-24"
        :style="{ display: config.displayDep['FR-24'] }"
        d="m372 566-3 6h-6v9l-17 12v12l-7 7-3 3-7-1-4 7-1 2 1 3h4l2 3-2 5-1 6-3 2v2l1 1v4l-2 3 3 2 1 3 11-1 4-5 5 3-4 2 1 7 5 4 1 7 5 2 3-3h8l3-3h3v3h8l1-2h3l3 3v3l-3 1 1 2 4 1 4-4h4l3 3 5 2 1-1 3-3 1-6h7l6-8h-3v-4l6-1v-4l3-1 4-6-4-4v-4l3-2-3-5v-8h-8l-3-2 3-3-4-4 3-3-3-2v-5l7-6-4-3-2-6-8-1-2-2 5-2-2-3-8-1-2-7-11-1-3 3-2 1-3-4 1-4-2-4z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-47"
        :style="{ display: config.displayDep['FR-47'] }"
        d="M345 664h-4l-3 1-5 1-1 4 2 3 3 1v3l-3 1-3 4-6 8-2 5 1 5 1 3-4 2h-3l-1 4 3 2v3l-3 3-5 1v1l2 8 7-1 5 2h4l2 3-4 4-1 7 1 2 1-3 5 4 5-6 3 4 6-1 7-1 2-5 11-1 6 5 2-2 3-1-1-5 5-1 7-2-2-4 3-3 1-6-4-5 3-8 6 3 7-1-3-8-3-11h7l2-4-6-2-3-3h-4l-4 4-4-1-1-2 3-1v-3l-3-3-3-1-2 2h-7v-2h-2l-4 3h-8l-3 3-5-2-1-7-5-4z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-46"
        :style="{ display: config.displayDep['FR-46'] }"
        d="m441 634-7 4h-1l-3 2v4l4 4-4 6-3 1v4l-6 1v3l3 1-6 8h-8v6l-3 3-2 5h-7l3 11 3 7 4-1 1 2-3 3 2 4h3l3 4h3l2-3 1 1v3l1 4h7l5-5 3-1 1 2 2 4h3l1-7 5 1 3-4 6 1 8-4v1l2-2-3-5-1-7 4-3h2l6-6h3l1-2h7l2-2 1-2-3-1 2-6-5-2 5-10-6-5-2-13-6-2-4 4-2-3-6 6h-4l-8-10z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-09"
        :style="{ display: config.displayDep['FR-09'] }"
        d="m422 817-2 2-1 1 5 4 1 2-1 2-8 1-2 3v1l3 1 2 2-2 3h-2l-4-3-4-2-5 1-7 4v7l2 1-1 5-8 2-4 4v7l2 1-3 3 1 1 11 3h5l7 7h15l6 9 6-2 15 2 1 7 12-2 4-4 6-2 1-3 14-1-8-9-7 3-12-9 3-4h9l-1-9v-6l-2-13-17-8v-3l-3-4-3 1-4 1-7-4h-2l3 4-1 2h-6l-1-4-3-5z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-32"
        :style="{ display: config.displayDep['FR-32'] }"
        d="m368 735-11 1-2 5-7 1-6 1-3-4-5 6-5-4-2 6v4l-4 1-2-2-1-6-5 5-4-2-4 1-4 4 5 8-3 2 1 7-4 4-2 7 3 5 9 1 3-2h6v6l4 2 4 1 2 5 1 1-1 4-1 1 4 2v3h5l1-1h5l1 3h5l1 3h9l6 3 1-1 4-2 6-8 12 1 5 3 2-2 3-8 3-7 7-3 3-2-1-2-3-1-2-3h-2l-4-4v-3l-6-6-1-3-3 1-1-2 2-3-3-3v-4l-2-3h-7v-4l4-3v-4l4-1-2-2-3 2h-5l-2-2h-1l-1 2z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-31"
        :style="{ display: config.displayDep['FR-31'] }"
        d="m437 754-5 2-2 3-2-2-4-1v3l-3 1 4 2-3 4-8 2-3-4h-4l-2 1h-10l-1 1 1 3 6 6v3l4 4h2l2 3 3 1 1 2-3 2-7 3-3 7-3 8-2 2-5-3-12-1-7 8-3 2-2 4-3 3v3l-4 1-3 6-1 3 6 4 1 4-2 4 4-2 2 2 2 7-5 2v4l-2 2-3-2h-4l1 20 14 1 1-18 5 1 8 4 3-3-2-1v-7l4-4 8-2 1-5-2-1v-7l7-4 5-1 4 2 4 3h2l2-3-2-2-3-1v-1l2-3 8-1 1-2-1-2-5-4 1-1 2-2h3l3 5 1 4h6l1-3-3-3h2l7 4 4-1 3-1-1-1 5-2 1-5 6-3-2-4 5-4 3 4 7-2h2v-7h-4l-5-1-4-5-2-3-8-3-2-3 2-1v-4l-2-2-4-6v-4l-1-1-4-4-2-5z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-82"
        :style="{ display: config.displayDep['FR-82'] }"
        d="m391 703-3 8 4 5-1 6-3 3 2 4-7 2-5 1 1 5-3 1 2 2h5l3-2 2 2-4 1v4l-4 3v4h7l2 3v4l3 3-2 3 1 2 4-2h10l2-1h4l3 4 8-2 3-4-4-2 3-1v-3l4 1 2 2 2-3 5-2 2 1 2-3-3-3h6l2-4 4-4h-4l2-5 11-2 4-2 5-2 2-2-2-5 3-6h-6v-8l-8 3-5-1-4 4-5-1-1 7h-3l-1-4-1-2-3 1-6 5h-7l-1-4v-4l-3 3h-3l-3-4h-3l-2-4 3-3v-2h-5v2l-7 1z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-12"
        :style="{ display: config.displayDep['FR-12'] }"
        d="m529 645-11 9v9h-2l-1 8-3 1-2 4h-11l-1-1h-5l-3 5h-1l-1 2-2 2h-7l-1 2h-3l-6 6h-2l-4 3 1 7 3 5-2 2v8h5l-3 6 3 6 3-2 1 3 4-4h6l7 4 10 2 4 7 6 2 3 8-1 3 4 7v3l7 9 6 3 4-1 2-3 3 1 6 4h10l-1-11v-3h3l6 3h5l-1-6 3-3 7-1v-5l6-3-1-7h-6l-5-1-1-4 4-1v-5l4-4-3-1-9 1 1-4-6-2-2-13v-8l-5-4 1-7-11-13-1-10h-4l-1-11-8 1v-6z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-81"
        :style="{ display: config.displayDep['FR-81'] }"
        d="M484 726h-6l-4 4-1-3-3 2-1-1-1 2-5 2-5 2-11 2-1 5h4l-4 4-2 4h-6l3 3-2 3 1 1 1 4 4 5 1 1 1 4 3 5 3 3v4l-3 1 2 3 8 4 2 2 4 5 5 1h4v7l2-1v3h7l6 2 1-7h3l11 2h11l8-2 2-7-6-5 2-5 3-5 5 4 13-5 2-4-6-4-3-1-2 3-4 1-6-3-7-9v-4l-4-6 1-3-3-7-6-3-4-7-10-2z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-01"
        :style="{ display: config.displayDep['FR-01'] }"
        d="M692 478h-4l-2 5-7 26-1 3-1 8-2 3v12l-1 3 7 4h3l4 4 1 6 5-1 7 2v-1h4l5 4 4-2 3-7 2-3 3 1 3 2 2 5 14 18 5-3v-7h5v-12l3-2v-11l1 1v-4l-2-4 1-10 4 2 2-3 3-1 4-3h-4v-7l4-3h7v-4l-2-1 5-7-1-2-6-4-15 17h-10v-5l-6-2-7 7-5 1v-5l-5-2-7-10-7-3-2-5h-3l-4 2-3 1z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-38"
        :style="{ display: config.displayDep['FR-38'] }"
        d="m719 544-2 3-3 7-4 2-5-4h-4v5l5 4-8 10-10 3-8 2 5 5 1 3-8 4v11h-1l2 5 7 2 4-2 5-3 7 5h6l3 6-1 3v6l-1 6v1h3l6 2 9 2 3-2 2-3h1v29l2 2h5l5 3 4 3h3l2 2 7 1v-1l-3-2v-4h10l2-3-1-3 4-4 4 2 4-4 9 1 2-3h7v-8l-3-1-1-5h-8l-1-2 2-8 2-2-2-3-4-2-2 2 1-3v-3l-3-3 1-8 4-2-1-5-7-7h-3l-2 3-5-7-2 1-3 5 2 3-1 1-3-2-10-2-4-8v-3l-4-5-1-2-14-18-2-5-3-2z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-74"
        :style="{ display: config.displayDep['FR-74'] }"
        d="m808 484-8 2-8 6-2-3h-4l-4 8 1 3 4 4-8 4-4 5h-8l-4 3-4 1-1 3-4-2-1 10 2 4v4l3 2v10l7 2 3 5h6l2-2h3l5 6 2 2 6-1 2-3 2-7 3-2 3-8 4-3 2 1 1 2-2 3 4 4h5l4 6-1 2 4-3 3-3 2 1v-7l12-5 2-3-1-8-8-8-3 1v-9l-6-3-1-3 4-4v-5l-6-7v-5z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-42"
        :style="{ display: config.displayDep['FR-42'] }"
        d="m611 506-6 1-1 4 2 5 1 21h-9v3l6 5-3 3-2 8 5 6 4 9 9 6 3 12-6 7 1 4 10 3 8-6h3l12 5-1 6h6l5 5h3l6-2 2-7 9-5v-11h1l-5-1-3 2-4-2 4-5-1-4-12-2-10-9v-3l2-2v-3l-3-2 3-3v-5l-5-4v-5l-3-3v-4l-2-5 3-3v-7h7l2-2-2-4v-4l-2-1-1 7h-4l-3 3-2-2-12-2-4 3h-3l-1-3-5-1-1-5z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-69"
        :style="{ display: config.displayDep['FR-69'] }"
        d="M671 501h-4l-3 4-2-3-4 3-4-3h-4l-1 1-1 4 2 2v3l2 4-1 2h-8v7l-3 3 2 6v3l3 3v5l5 4v5l-3 4 3 1v3l-2 2v3l10 9 12 2 1 4-4 4 4 2 3-1 5 1 7-4-1-3-5-5 8-2 10-3 8-10-5-4v-4l-7-2-5 1-1-6-4-4h-3l-7-4 1-3v-12l2-3 1-8-1 2h-3l-1-7z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-73"
        :style="{ display: config.displayDep['FR-73'] }"
        d="M754 535v11l-3 2v12h-5v7l-5 3 1 2 4 5v3l5 8 9 2 3 2 1-1-2-3 3-5 2-1 5 7 2-3h3l7 7 1 5-4 2-1 8 3 3v3l-1 3 2-2 4 2 2 3 7-1 2 2 1 6 6-1 1-6 3-1h7l11-4 4 2h4v-4l5-3 2-2 9-3 1-7-1-2 5-9-5-2-2-5-9-6s1-11-1-13c-2 0-7 1-7 1l-5-7v-5l-2-1-3 3-4 3 1-2-4-6h-5l-4-4 2-3-1-2-3-1-3 3-3 8-3 2-2 7-2 3-6 1-2-2-5-6h-3l-2 2h-6l-3-5-7-2v-10z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-07"
        :style="{ display: config.displayDep['FR-07'] }"
        d="m677 599-8 5-2 7-6 2h-3l-2 9-5 2-2 4 1 5 1 2h-6v7h-5l-3 9h-9l-9 7-6 8 1 2 3 13 6 6-1 8 8 5v10l4-2 8 6 4 1 1-7 5-1 2 5h5l1-5 12 6 2-4 5-1v-7l-1-2h-2v-3l2-3-2-3 1-7 4-5v-8l-1-9 3-1 1-4 3-7 2-5-3-8-2-6-3-11v-15h-1z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-26"
        :style="{ display: config.displayDep['FR-26'] }"
        d="m695 601-5 3-4 2-5-2v15l3 11 2 6 3 8-2 5-3 7-1 4-4 1 2 9v8l-4 5-1 7 1 3-1 3v3h2l1 2v7h5l2 2-1 7 1 2 5-5 5-1 1-2-6-1-1-7 4-6h5l5 5-5 6 1 3 8 1 4-4-2 5v4l8 1 10 1 2 4 5 5h5l3-3 2-6 3 3 2 3 1-14h-3l-2-5-13-3-1-6 4-3-4-3 1-3h6l5 3 4-5-4-3v-5l3-6 7-1 6-3 1-1-7-1-2-2h-3l-4-3-5-3h-5l-2-2v-29h-1l-2 3-3 2-9-2-6-2-3 1v-2l1-6v-5l1-4-4-6h-5z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-17"
        :style="{ display: config.displayDep['FR-17'] }"
        d="m260 492-5 1-11 6 3 3-6 5-1 3-5 1-3-3-7-1-1-4-4-3-6 3 3 5h5l6 4 3 3 8-1 2 4 4 1 2 5 4 1-1 4-4-1-1 3 3 4-2 8h-4v5l1 2h-5l-1-3 4-4-2-3-1-1-1-9-6-1-5-6-1 13 8 6 1 7 2 8v8l5-1 7 6 5 3 1 4 4 1 11 11 3 13h10l2-2 1 5 9 1 1 12h6l8 9h4l5-2 4 2 3-6 2-5-7-5-2-3-4-4-7 1-3-1v-2l4-1v-1l-3-1-2-1 5-4v-3l-2-2 1-2 1-4-3-3-2-3-4-5-3-1 2-4h-1l-1-8-3-2 4-2h6l2-2h4l1 2h4l3-1 1-7 3-11-3-3-1-4-5-3-7-4-8 1-5-7h-7l-6-5v-2l-4-5-1-5-5-4-7 3z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-19"
        :style="{ display: config.displayDep['FR-19'] }"
        d="m475 561-1 3-6 2-3 4h-2l-4-1-3 4-4 1-3 5h-4l-2 2h-7l-3 4-2-1-5 6-5-2-2 5 2 4 4 3-7 6v5l3 2-3 3 4 4-3 3 3 2h8v8l3 5h1l7-4 10 4 7 10h4l6-6 2 3 4-4 5 2 1 1 4-3-1-4-2-2 3-4h2l2-6 2-3-1-6 4-6 7-5v-9l3 1 4 4h4l2-2-2-5 2-6-1-6-2-3v-5l3-5-1-5-1-1-3 3h-7l-3 3h-4l-4-3-1-3h-9l-2-2z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-23"
        :style="{ display: config.displayDep['FR-23'] }"
        d="m457 487-2 6h-6l-2-1h-4l-3-2-7 7v6l-4 8 1 5 5 1 3 8 3 3-1 15 7-2 2 3-4 4v3l4 1 6-1 2-3h1l-1 5 6 2 4 4v2h-2v4l2 2 1-1 6-1 1-4h3l2 2h9l2 3 3 3h4l3-3h7l3-3-7-8-1-3 7-4 4-2 1-5 4-3-1-7-3-4-1-11-4-9-4-2-3-5-2 4-3-4v-4l-4-6-12 1-7-2z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-87"
        :style="{ display: config.displayDep['FR-87'] }"
        d="m427 493-3 3-10-1h-1l-6 1-5 4v4h-7l-5 6-3 2 3 3-1 9-2 4 3 3h5l1 5 1 4-7 1-3 1 1 9-5 3-3 1-2 5h-3l-1 6h8l2 4-1 4 3 4 2-1 3-3 11 1 2 7 8 1 2 3-5 2 2 2 8 1v2l2-4 5 1 5-6 2 1 3-4h7l2-2h4l3-5 4-1 3-4 4 1h2l2-3-2-2v-4h2v-2l-4-4-6-2 1-5h-1l-2 3-7 1-3-1v-3l4-4-2-4-7 3 1-15-3-3-3-8-5-1-1-5 4-8v-6 1z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-86"
        :style="{ display: config.displayDep['FR-86'] }"
        d="m333 409-7 8-2 3 1 8h3v4l2 6 2 5-3 2 1 2-1 3v1l3 3v2l-2 3-4 6 4 2 2 3-2 4v2l-3 4v3h2v8l3 2-2 3 1 2 3 4 2-3v-1l3-2 2 2v5l-2 3-2 5 2 4 6 2-1 3-5 1 4 6 7-1 5-1 6 3 2-2-1-5 3-2 3 4 2 3 7-3 3-3h6l3 2 1-7-3-3 3-2 5-6h7v-5l5-3 9-2 1-5-4-2-2-8h-6l-3-4-7-5 1-5v-7l-6-6-1-5-6-7-3-8-2-1-3-4-3 2 1 3-9 3h-11v-12l-9-2v-4l-6-2-2-5h-3z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-16"
        :style="{ display: config.displayDep['FR-16'] }"
        d="m365 519-3 2 1 5-2 2-6-3-5 1-7 1-4-6h-2l-6 4-5 1v2l-3 4 1 1-4 3-2 11-1 7-3 1h-4l-1-2h-4l-2 2h-6l-4 2 3 2 1 8h1l-2 3 3 2 4 4 2 4 3 3-1 4-1 2 2 2v3l-5 3 2 2 3 1v1l-4 1v2l3 1 7-1 4 4 2 3 7 5 2-2 7 1 3-3 7-7v-12l17-12v-9h6l3-6h2l1-6h3l2-5 3-1 5-3-1-9 3-1 7-1-1-4-1-5h-5l-3-3 2-4v-3l-3-1h-6l-3 3-7 3-2-3z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-79"
        :style="{ display: config.displayDep['FR-79'] }"
        d="m320 416-10 1-9 1-10 1v5l-5 3-11-2-7 3 3 5v4l9 8-2 4 6 7-3 3 4 6 1 10-2 3 2 4-2 5v3l3-3 3 4-5 3-1 2-5 1-4 2h-1l1 6 4 4v2l5 5h8l5 7 8-1 7 4 5 3 1 4 3 3 3-2-1-2 3-4v-2l5-1 6-4 7-1 1-3-6-2-2-4 2-5 2-3v-6l-2-1-3 1v2l-2 3-3-4-1-2 2-3-3-2v-8h-2v-3l3-4v-2l2-4-2-3-4-2 4-6 2-3v-2l-3-3v-1l1-3-1-2 3-2-2-5-2-6v-4h-3l-1-8v1l-3-2z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-22"
        :style="{ display: config.displayDep['FR-22'] }"
        d="m113 220-3 3-8 1-2 2-6-4-7 5 2 4-5 7-2 9 5 1-1 4 3 2-2 3-3 1 1 4 4 1-4 1v5l3 3v11l-1 2 1 5 6 1v3l4 1 3-2 2 2 7 2 5-3 2-3h4l6 5 5-1 4 4h2l2 3h5l1-2 2 4 4 1 6-3v-4l4-1h3l3 5 7 1 4-4 4-9 5-2 2-3 3 2 6-1 2-16 1-7-1-4-3-1-2-11-3 3-7-1v4l-5 1v-5l-4-1-2 2v-7l-4 4-7-2-2 5-13 7v4h-3v-7l-8-4 1-6-7-5v-6l-5-1v-6l-4-1 1-4h-8l-1 4z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-85"
        :style="{ display: config.displayDep['FR-85'] }"
        d="m240 417-2 3h-6l3 3-2 6-6 2-2-2 1-6-1-3h-4l-2 2 1 9 3 4-3 3-5-1-7-2-2-6h-5l-6-3-2-4-7-4-10 14-1 9 11 10v4h3l7 20 7 4 8 7h8l3 7h8l4 6 8 4v-6l2 2 11-6 5-1 2 6 7-3 6 4 4-2 5-1 1-2 5-3-3-4-3 3v-3l2-5-2-4 2-3-1-10-4-6 3-3-6-7 2-4-9-8v-4l-3-5-5-4h-9l-3-2-4-1-5-4z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-50"
        :style="{ display: config.displayDep['FR-50'] }"
        d="m205 136-1 3 7 7v7l-3 4 2 2h1v7l2 6 8 9 2 9 2 2v13l4 9v10l-4 9 5 13 8 2v4l-3 2h-7l1 4 2 7 6 5 3 1 3-4h3l4-5 4 3h4l3 1v1l6 1 4-3 5 2 6-5 2-7v-3l1-3-4-4-9-6h-7l-7-9 6-2 2-5-3-2 3-3 2 2 5-3 3-4 1-5-2-4 2-2-3-4 3-4-3-3-2 4-5-3-7-6v-3l2-3v-3h-4v-8l-10-11 3-8h4l-3-9-16-1-8 6-9-6z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-56"
        :style="{ display: config.displayDep['FR-56'] }"
        d="m88 289-6 3h-4l-5 3v3l3 7 1 5 10 2 4 4 2-3 3 4-2 2v5h-3l-2 4h-4l-2 7 4 6 6 2 2-4-1 4 5 2 7 7 2 4-1 5-1 4 5 4 2-3-2-3v-6l4 1 2-5 1 3 4 4 3-4-3-5 4 6 5-1-1-3 5 2 4 4-2 3-5-2-5-2-3 3 4 2 3 5 20-2 5 1-2 2v4h2l3-3 2 2h6l7-4 10-3 1-11 2-1-4-7 3-3-1-1-1-2 3-1 3-4-1-3h-3l-1-4 2-3-3-6-4-2h-5l-2-1v-2l3-2 1-6-1-4-1 1h-7l-3-6h-3l-4 1v4l-6 4-4-2-2-4-2 2h-4l-2-3h-2l-4-4-5 1-6-5-5 1-1 3-6 3-7-3-1-2-3 2h-4v-3l-6-2z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-29"
        :style="{ display: config.displayDep['FR-29'] }"
        d="m60 231-5 4-4-2-8 1-1 4-5 1-1-4-8 1v3h-6l-2-2-3 2-1 4H7l-6 6 5 4-6 4 2 4-2 7 6 1 2-2 1 1 14-1 9-7-8 8 1 3 7-3-1 5h7v3l-8-1-7-2-9-3-5 5 7 3-1 9 2-1 4-6 8 4 3 1 2 5-2 4h-9l-8 1-12 1-2 3 3 2h4l4 3 4-1 8 9 2 9-3 5 8 2h8l2-4-4-4 4 1h3l6 3h3v-7l2 7 5 7 10 1v-2l2 3 7 1h4l1 1 1-7h4l3-4h2l1-5 1-2-3-3-2 2-4-4-9-1-2-6-3-7v-2l5-4h4l6-3-1-4 1-2v-11l-3-3v-5l4-1-4-1-1-4 3-1 2-3-3-2 1-4-5-1 2-9-6-4-10 1v7h-3v-3h-5z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-35"
        :style="{ display: config.displayDep['FR-35'] }"
        d="m199 244-4 3 3 12 3 1 1 3-1 7-2 16-6 1-3-2-2 3-5 2-4 9-3 3 1 3-1 6-3 3v2l2 1h5l5 2 3 6-3 3 1 4h4v4l-3 3-3 2 2 1v2l-3 2 4 7 7-3 22-2 2-4 3-3 8-1 1-4h5l3 5 8 2 1-3 2-7 5-11 2-2 6 1v-10l-2-2v-11l-1-3v-6l3-4v-7l-2-1 1-11-3-1h-4l-4-3-4 5h-3l-3 4h-3l-6-6-2-7-1-4h-18l-7-4 5-6z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-44"
        :style="{ display: config.displayDep['FR-44'] }"
        d="m230 336-1 4-8 1-3 4-1 3-23 2-9 5-1 10-10 4-7 3h-5l-3-2-3 3h-1l1 1-6 7 1 1 2 3-4 5 4 2 7 2v-3l4 5h7l5-5h6l-7 3 1 4 1 3-4 4h-4l1 5 7-1 10 9h-1l7 4 2 4 6 3h5l2 6 7 2 5 1 3-3-3-4-1-9 2-2h4l1 3-1 6 2 2 6-2 2-6-3-3h6l2-3h2l5 4 3 1v-4l-2-4h-6l2-2v-3l3-1 1-4-1-1v-5h-4l-4-5v-3l4-3 8-1h11l4-2-1-7-6-5h-6l-2-1v-6l4-4-3-4-3-6-3-3v-4l-1-1-7-2-3-4z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-49"
        :style="{ display: config.displayDep['FR-49'] }"
        d="m247 341-1 2h-1v5l4 2 3 7 3 4-4 4v6l2 1 6-1 6 5 1 8-4 2h-11l-8 1-4 2v4l4 5h4v5l2 1-2 4-3 1v3l-2 2h6l3 4v4l3 2h9l5 4 7-3 11 2 5-3v-5l10-1 9-1 10-1 1 3 3 2 2-4 7-8h3l4-15 5-6v-8l4-5v-2l-2-2 1-3-5-1-15-10-14-4h-5v-4l-4-2h-3l-6-3-5 5h-9l-4-2-11-4-2 3-6-3h-6z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-72"
        :style="{ display: config.displayDep['FR-72'] }"
        d="M358 273h-9l-10 9h-5l-7 2-2 4-1 7 1 5-6 5-1 3 1 3-2 3 1 2h-6l-1 3 3 6-1 2-2 2-5 1-1 1 2 2v11l-1 3 3 2v4h5l14 4 15 10 5 1 3-4 7 5h4l-2-8 4 3 2-3 11-3-2-5 3-3 5-2 5-6v-7h4l1-5 1-8-4-3 3-5 4-6-5-3-5-1-5-7h-1l-1 3v-2h-7l-4-6-6-2-2-13z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-53"
        :style="{ display: config.displayDep['FR-53'] }"
        d="M321 263h-3l-2 4-5 2-10-1-10 5-3-2-6 4-4-3-2-5-6-2-3 3-6-1-1 10 2 1v7l-3 4v6l1 3v11l2 2v10l-6-1-2 2-5 11-2 7-1 1 7 1h5l6 4 3-3 10 4 5 2h9l4-5 7 3h4l1-3v-11l-2-2 1-2h5l2-2 1-2-3-6 1-3h6l-1-2 2-4-1-2 1-3 6-5-1-4 1-8 2-4 7-2h-1l-2-6-5-2-1-8z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-14"
        :style="{ display: config.displayDep['FR-14'] }"
        d="m359 173-9 2-13 8-16 6-12-7-30-4-7-4-10 3v4l-2 2v3l7 7 5 2 2-4 3 3-3 4 3 4-2 2 2 4-1 5-3 5-5 2-2-1-3 2 3 3-2 4-6 2 7 9h7l5 4 7-3 6-6 7 2 7-4 4-2 4 5 7-2 6 4 7-3 7-5 4-5h3l1 3h2l1-3 7-1 2 1 7-1 2-4-1-3-4-1v-3l3-2 1-4-2-8-5-7 4-2v-1l-4-1z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-61"
        :style="{ display: config.displayDep['FR-61'] }"
        d="m366 223-7 1-2-1-7 1-1 3h-2l-1-3h-3l-4 5-7 5-7 3-6-4-7 2-4-5-4 2-7 4-7-2-6 6-7 3 4 2 4 4-1 3v3l-2 7-6 6 2 4 4 3 6-4 3 2 10-5 10 1 5-2 2-4h3l4 3 1 8 5 2 2 6h6l10-9h9l3 4 2 13 6 2 4 6h7v2l1-4h1l6 8 3 1v-9l-2-3-1-3 6-3 5-1 4-5-1-13-8-7v-6l-6-4 2-4-2-5-5-2-3-3-2-5-10-1-3-4z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-28"
        :style="{ display: config.displayDep['FR-28'] }"
        d="m441 225-2 2v6l-8 4v5l-2 2h-9l-4-1-13 7h-5l-5 4 1 1v6l8 7v13l-3 5-6 1-5 3 1 3 2 3v9h1l5 3-2 3 4 2 5-1h4v1l-4 2 3 1h5l2 5 3 1 2 5 8 3 5-1 4-4 4 1 1-2v-3l2-1 3 2 3-2v-2l2-2 3 1 2 2 4-2h5l3-3 2-7h3l-1-7 3-3-1-2 1-1h-1l-1-9-1-2-1-4-7-2-3-4-1-7-5-1v-4l-6-4-2-6 2-4-2-3v-4l1-4-3-3-1-4z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-89"
        :style="{ display: config.displayDep['FR-89'] }"
        d="m572 283-3 3-14-1-6 3-3 6 3 3-4 5-4 4 7 6 2 6 4 5v6l-9 8 3 4v5l-6 4h-7l1 4 5 6 1 6 1 4-2 1 5 1h3l2-3h2l3 2-1 3 3 2h3l5 3 2-1 2 2 2-1 3-2 4 1 2-1v-6h1l1 3 4 3v4h6l8 7 5 1v-3l2-3 1 3-1 2 1 2 3-1h3v5l3 2 2-1 6-4v-1l-4-2v-4l4-1 1-2-1-2v-4l3-4 4-9 1-4 3-1v-1l-2-1v-3l5-3 1-5-2-3h-3l-1-1v-4l4-3v-3l-1-2-2 4-2-1-2-4-8 4-14-1-2-4-4-5v-7l-6-7-4 3-6-5 1-10-9-10h-5l-2-2z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-70"
        :style="{ display: config.displayDep['FR-70'] }"
        d="m766 317-6 1-2 3-3 3-3-3-1 1 1 2-4 2 1 3-3 2v5h-6v2l-5 1v5h4l-2 2-1 8h-3l-6 1-6-1-5 1v4l4 1 3 6 1 3-5 5-2 1-2 2 4 1 1 6h3l1 8 1 1v1l3 1 3 3h5l2-2h6l7-6h2l3-2 7 1 6-5 4-1 2-4 3-1 3-5 5-4 5-1 3 3 7-1v-4l3-1 2-3h4l3-3v-9l-1-6v-4l3-2 3-2-12-7-3-3-3-2-3 1-1 2-2 2h-2l-6-6h-7l-4 2-2 1-5-4v-4z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-76"
        :style="{ display: config.displayDep['FR-76'] }"
        d="m431 106-2 3-16 12-27 7-18 6-15 8-9 13-1 10 7 6 10 2h-1l8-1 4-4 3-1 4 6h5l2 4 8-1 9 6-5 2 4 3h2l3 5h4l1-3-3-2 9-3 9-1 2-6 5-4 8-1 10 5 5 1 1-3 3-5 1-2h-3v-6l-2-4 1-7 1-4h-2l1-4 4-4-4-6-1-7-16-15-2-4h-4z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-27"
        :style="{ display: config.displayDep['FR-27'] }"
        d="m374 167-3 1-4 4-8 1 1 14 4 1v1l-4 2 5 7 2 8-1 4-3 2v3l4 1 1 3-3 9 3 3 10 1 2 5 3 3 5 2 2 5-2 4 5 3 5-4h5l13-7 4 2h9l2-3v-5l8-4v-6l1-2v-1l2-2-3-1v-2l-2-3 2-2 10-3 2-4 2-8 3-4 1-4 3 2 2-1-1-3-1-8-4-3-5-1-10-5-8 1-5 3-2 7-9 1-9 3 3 2-1 3h-4l-3-5h-2l-4-3 5-2-9-6-8 1-2-4h-5z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-37"
        :style="{ display: config.displayDep['FR-37'] }"
        d="m376 356 1 2-11 3-2 3-4-3 2 8h-4l-7-5-4 7 2 2v2l-4 5 1 8-6 7-4 14 2 6 6 2v4l9 2v12h10l10-3-1-4 3-1 3 4 2 1 3 8 6 7 1 5 5 6 3-1 4-3 3-15 2-5 1-7 6-2 4 1 2 2 3-4 3-3v-3h3l1-3-3-4 1-2-2-2-6-8h-7l-2-3v-12l-3-8v-9l-4-1-4-3h-1l-4 3-2-2-1-3 3-2v-1l-1-1z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-45"
        :style="{ display: config.displayDep['FR-45'] }"
        d="m490 289-5 4-10 1-1 1 1 2-3 3 1 7h-3l-2 7-3 3h-5l-4 2-2-2-3-1-2 2v3l-3 1-3-2-2 1v3l-1 2h4v2l-2 4v2h2l2 2v2l-4 4 2 5v2l4 3h4l3 3 1 4 3 4 4-1 2-3h5l2 2h3l2-2h13l3 5 4 1 3 3h4l1-2h2l3 4h6l2 2 4 6 2 1h2v-5h3l2 3 2 1 4-1-1-1v-4l7-2-1-4-1-6-5-6-1-4h8l5-4v-5l-3-4 9-8v-6l-4-5-2-6-7-6-9 5v-3h-4l-1 3h-14l-4 2-3-2 6-4-1-7-4-2-4-5-9-1z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-36"
        :style="{ display: config.displayDep['FR-36'] }"
        d="m455 401-3 1h-4l-6 2-1 3-1-1h-6l-3 2-3 1-1 2 3 4-1 3h-3v3l-3 3-3 4-2-2-4-1-6 2-1 7-2 5-3 15-4 3-3 1h1v7l-1 5 7 5 3 4h6l2 8 4 2-1 6h-3 1l10 1 3-3 6 5 7-8 3 2h4l2 1h6l2-6 18 3 7 1h3l1-3 3-4v-3l-3-4 1-1v-5l2-2v-1l-3-2-1-4-5-3v-3l4-2v-2l-4-3-1-2 3-1-1-2 5-4-1-1h-3l-2-2v-2l2-3v-2l-4-6v-5l-2-1h-5l-4 1h-5l-2-2-1-2 4-3v-4l-5-4z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-41"
        :style="{ display: config.displayDep['FR-41'] }"
        d="m395 311-2 3-3 5 4 3-1 8-1 5h-4v7l-5 6-5 2-3 3 1 3 18 1 1 1v1l-3 2 1 3 2 2 4-3h1l4 3 4 1v9l3 7v13l2 3h7l6 9 1 1h1l3-1 3-2h6l1 1 1-3 6-2h4l3-1 3 3 5 4 5-1v-4l2-3h2l2 2 7-1 5-2-1-2-1-2v-3l3-6 5-2v-4l1-2-3-1-2-4-4-1-1-2 5-4 5-3-3-4h-13l-2 2h-3l-2-2h-5l-2 3-4 1-3-4-1-4-3-3h-4l-4-3v-2l-2-5 4-4v-2l-2-2h-2v-2l2-3v-3h-3l-5-1-4 4-5 1-8-2-2-6-3-1-2-4h-5l-3-2 4-2v-1h-4l-5 1z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-18"
        :style="{ display: config.displayDep['FR-18'] }"
        d="m493 363-5 3-5 4v2l5 1 2 4 3 1-1 2v4l-5 2-3 6v3l1 2 1 2-5 2-7 1-2-2h-2l-2 3v4l-5 1v4l-4 3 1 2 2 2h5l4-1h5l2 2v4l4 6v2l-2 3v2l2 2h3l1 1-5 4 1 2-3 1 1 2 4 3v2l-4 2v3l5 3 1 4 3 2v1l-2 2v5l-1 1 3 4v3l-3 4v3l8-1 2-4 4-5 9-2 5 1 5-4v-2l-2-2v-6l10-9 3 4 3-4h3l5-6h9v2l3-9-2-3v-5l1-9-4-4 1-9-4-7v-5l-6-5-2-5 4-4v-7l-4-4-4 1-1-1-3-3h-3v5h-2l-2-1-4-6-2-2h-6l-3-4h-2l-1 2h-4l-3-3-4-1z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-21"
        :style="{ display: config.displayDep['FR-21'] }"
        d="M655 320v5l-5 2h-12l1 3v3l-4 2v5l1 1h3l2 2-1 6-5 3v3l2 1v1l-3 1-1 4-4 8-3 5v4l1 2-1 2-4 1v4l4 2 1 3-1 4v3l2 3 5 1 2 4v1l-2 1v3h1l7 8 7-1 6 5 5 4v4l5 1 4 3 11-3 8-3h3l1-2h4l3 2 4-1 4-3 3 1v-1l3-1-1-2-1-2 2-3 6-3v-3l3-3 2-2-1-3 1-4 1-6h1v-2l-1-1-1-8h-3l-1-5-4-2 2-2 2-1 5-5-1-3-3-6-4-1-1 4-8 2-1-2-6-8-3 2h-4l-2-3-6 1v-7l-3-2 4-5-8-11-6-7-6-3z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-58"
        :style="{ display: config.displayDep['FR-58'] }"
        d="m551 369-2 3h-3l-5-1-5 1v4l5 5v7l-4 4 2 5 6 5v5l4 7-1 9 4 4-1 9v5l2 3-3 9v3l6 3 5 4 3-2 4-2 1 3h5l2-3 3 2 1 5 3-1 7-9 3 2 1 1 5-3h3l2 4h3l3-3h3l3-3 2-1 1-2 5 1 1-2-3-2v-2l4-2v-2l-4-2v-8l-2-1 2-3 1-1 2-3-2-1-2-3 3-4 4-2h5v-4l2-1v-1l-2-4-6-1-1-3v-3l1-4-1-2-6 4-2 1-3-2v-5h-3l-3 1-1-2 2-2-2-3-2 3v3h-5l-8-8h-6v-4l-4-3-1-3h-1v6l-2 1-4-1-3 2h-2l-2-1-2 1-5-3h-3l-3-2 1-3-3-2z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-71"
        :style="{ display: config.displayDep['FR-71'] }"
        d="M633 413v1h-5l-4 2-3 4 2 3 2 1-1 3-2 1-2 3 2 2v7l4 2v2l-4 2v2l3 2-1 2-5-1-1 2-2 1-3 3h-3l-3 3h-3l-2-4h-3l-5 3 7 13v5l1 2h7l2 3h5l3 4v14l-8 6h1l1 6 5 1 1 3h3l4-3 12 2 2 2 3-3h4l2-11 1-1h4l4 3 4-3 2 3 3-4h4l2 6 1 7h3l2-5 7-26 2-5h4l4 3 3-1 4-2h3l2 5 2 1 10-1 4-3-2-2-4-2-1-5 4-3 1-6-3-5-2-3 1-1v-4l-3-2v-3l8-1 1-3h-3l-2-2h-4l-3-6h-3v-4l-3-1-4 3-4 1-3-1-4-1-1 2h-3l-8 3-11 3-4-3-5-1v-4l-5-4-6-5-7 1-7-8z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-39"
        :style="{ display: config.displayDep['FR-39'] }"
        d="M725 394v1h-1l-1 6-1 4 1 3-2 2-3 3v3l-6 3-2 3 1 2 1 2-3 1v5h3l3 6h4l2 2h3l-1 3-8 1v3l3 2v4l-1 1 2 3 3 5-1 6-4 3 1 5 4 2 2 2-4 3-10 1 5 2 7 10 5 2v5l5-1 7-7 6 2v5h10l15-17v-8l6-6-4-2 1-2h-5v-3l3-3-1-2-2-4 7-2 2-4 1-4-5-5-4-1-8-2v-8l-1-5-6 1-10-4 1-3 3-6v-3l-2-4-5-3v-6h-4l-1 2h-5l-3-3z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-51"
        :style="{ display: config.displayDep['FR-51'] }"
        d="m607 176-4 2 1 4h-8l-7 5v9l5 3 2 4h-9v4l3 2-2 2-3 2 1 2h4l2 3-3 2-3 7-5 3-2 4-2 2 1 2-3 2-1 5 3 2 1 5-2 3 2 3h5v1h1l7 7 8-2 11-7h6l6-4 7-4h6l1 7 6 10h8l10-2 7 3 8-6 1-9 8-1v-6l-7-5v-3l2-5-2-2 2-5 4-2 3-9-6 1 4-4-3-8-2-5 3-3-2-1-1-2-3-3-4 4h-1l-2-2h-8l-2 2h-2l-3-5h-4l-2 1h-4l-6-5-4-1-2-2-7-5h-9v3l-2 1z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-60"
        :style="{ display: config.displayDep['FR-60'] }"
        d="m459 141-2 2-1 4h2l-1 4-1 7 2 4v6h3l-1 2-3 5-1 3 4 3 1 8 1 3-2 1-3-2-1 4 2 3 2 4 10 1 7-1 4-4 6 4 3 2 4-1 4-2 8 4 8 5 2 3 4-3 4 2 2 2 4-1 2-3 5 3 6-2 3 1 4-3 2-1h1l1-5-3-3-4-3-2 3-1 1-1-6 4-1-1-5h-4l2-4 6-1 2-9 4-2-5-3 2-3v-11l-1-9-8 1-5-1-9 3-9 8-6-3h-7l-5-5-9-3-13 1-3-2h-6l-5 1-2-1v-4l-1-1z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-62"
        :style="{ display: config.displayDep['FR-62'] }"
        d="m482 9-20 3-16 13v50l5 1 2 4 4-1 3-3 3 1 7 5 2-1 2 4 7 3v4l5 2 4-2 9-1 2 2 5-2 2 4-6 3v5l2 2h2l1-3 3-2 3 2 8 3h3v-4l5 3v3l-2 3 4-2 3-1 2 2v3l5-3h9l2-4-1-2h-7l-2-1 4-2h6l1-6 2-2v-3l-4-3h-5l-1-1 3-2 1-2-3-2-3-4v-2l5-3 1-2-4-2-2-4-6-1-7-2v-7l4-3-2-4h-3l-3 4-11-1-9-2-5-5v-5l4-1-4-3h-8l-4-12-8-12z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-59"
        :style="{ display: config.displayDep['FR-59'] }"
        d="m512 0-11 6-18 2h-2l8 12 4 12h8l4 3-4 1v5l5 5 9 2 11 1 3-4h3l2 4-4 3v7l7 2h6l2 5 4 2-1 2-5 2v3l3 4 3 2-1 2-3 2 1 1h5l4 3v3l-2 2-1 6h-6l-4 2h6l3 1 1 2-2 4 3 3 3 1 3-2h4l1 2h1l5-3 4 3 6-4h2l3 2 6-4 2 1 2 2h9v3l4-3h2l2 4 7 2 2-1h-1v-4l7-4-1-7-7-2 2-1v-5l5-4-1-3-12-9-20 1-2 4h-3l1-13-6-7-5 1-2-3-7 3-3-3h-5l-1-5-1-14-3-2v-2h-2l-1-4h-5l-9 3-4 5h-5l-2-3-1-4-4-4h-5l-2-4v-6l2-4-1-6z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-02"
        :style="{ display: config.displayDep['FR-02'] }"
        d="m591 107-6 5-3-3h-2l-6 4-4-3-5 3h-1l-1-2h-4l-3 2v5l-4 5v5l-3 3v5l2 7 2 13v11l-2 3 5 3-4 2-2 9-6 1-2 4h4l1 5-4 1 1 6 1-1 2-3 4 3 3 3-1 5 3 3 1 8 10 9 3 1 2 4 6 2 1-1 2-4 5-3 3-7 3-2-2-3h-4l-1-2 3-2 2-2-3-2v-4h9l-2-4-5-3v-9l7-6h8l-1-3 4-2 7 4 2-1v-12l1-4 1-5-4-3 1-3 6-1v-5l6-3 1-4-2-3 1-6 3-2-3-7 1-6h-7l-2 1-7-2-2-4h-2l-4 4-1-4h-8l-2-2z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-80"
        :style="{ display: config.displayDep['FR-80'] }"
        d="m446 75-1 12 8 7v4l-10-6-12 14 3 1h4l2 4 16 15 1 7 4 6-2 2h5l1 1v4l2 1 5-1h6l3 2 13-1 9 3 5 5h7l6 3 9-8 9-3 5 1 8-1-1-4-2-7v-4l3-4v-5l4-5v-5l-3-1-4-3h-8l-6 3v-3l-1-2-3 1-4 2 2-3v-3l-5-3v4h-3l-8-3-3-2-3 2-1 3h-2l-2-2v-5l6-4-2-3-5 2-2-2-9 1-4 2-5-2v-4l-7-3-2-4-2 1-7-5-3-1-3 3-4 1-2-4z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-08"
        :style="{ display: config.displayDep['FR-08'] }"
        d="m663 96-3 5-4 3v8l-4 3-8 2-4 2-5-4h-7l-1 7 3 6-3 3v5l1 3-1 4-6 3v5l-6 1-1 3 4 3-1 4-1 5v9h9l7 5 2 2 4 1 6 5h4l2-1h4l3 5h2l2-3 8 1 2 2h1l4-4 3 3v-2l5-2 2-2-2-4v-2l4-3 1-8-4-5 1-3 4-6 1 1h6l2 2 3-2 3-4h-3l-1-7-3-3-10-1-2-4-3-3-12-1-1-8 2-2v-3l-6-4 1-4 2-3-3-2 4-4v-6l-1-2h-6z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-10"
        :style="{ display: config.displayDep['FR-10'] }"
        d="m629 249-7 4-6 4h-6l-11 7-8 2-7-7h-1v1l-5 3v4l-3 3-2 8v5l2 2h4l10 10-2 10 7 5 4-3 5 7 1 7 4 5 2 4 14 1 8-4 2 4h2l2-4h12l5-2v-5h11l1 1-1-5-3-2 4-3 6-1 3-3-1-13-1-8-7-2-6-9v-6l2-4-3-1-10 2h-8l-6-10-1-7z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-52"
        :style="{ display: config.displayDep['FR-52'] }"
        d="m684 251-8 1-1 9-8 6-4-2-2 4v6l6 9 7 2 1 8 1 13-3 3-6 1-4 3 3 2 1 5 5 2 6 7 8 11-4 5 3 2v7l6-1 2 3h4l3-1 6 7 1 2 8-2 1-4v-4l5-1 6 1 6-1h3l1-8 2-2h-4v-5l5-1v-2h6v-5l3-2-1-3h1l-3-3-4 1v-7l-10-5 2-10 4-2-1-3-5-1-1-5h-5l-5-6-5-1-3-4 3-3-7-8-4-1-8-4-5-5-7-1z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-67"
        :style="{ display: config.displayDep['FR-67'] }"
        d="m872 200-7 2-3 5v6l-3 2h-2l-5-3-4 3h-4l-4-4-7-1-3-2-2-5-3 3-2 9-5 1v5l5 2 4 2-2 4 3 2 6-4 10 5-4 8v3l3 3-2 7-7 8-4-1 3 3-2 6 2 10 6 2v1h5l3 3 3 4h7l3 9 6 2v-1l9-18-1-11 5-14 1-12 9-7v-4l4-5h2l4-3-1-6 3-9 5-1-5-4-9-1-8-4-5 3-3-3z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-54"
        :style="{ display: config.displayDep['FR-54'] }"
        d="m726 156-4 4h-7l-2 2v5l2 3-1 2-1 3 1 1 2-1 1-3 4-1 6-1 3 2 1 3 1 3v3l2 2v2l-2 2v5l2 2v7l2 2 3 2-1 2 4 4-3 4v2l4 2v2h-4l-2 2v2l3 3-3 7-2 6 1 4v6l1 3h2l2 2h-4l-2 2v2l3 3v5l4-1h5v6h2l-2 2v2l3 1 3 3 12-1 2-4h6l2-2 3 2 3-1h5l4-1 4-3 2 2v-5l3-1 1 5h5l4 1h2l6-2 3-3 3-3 5-2 4-1-2-2h5l-5-2-6-4-5-4h-6l-7-4h-5v-2l-8-4-10-4h-4l-2-5-7-9h-7l-3-4h-6l1-6-8-4 1-5h4v-4l1-3-3-3 3-5-2-5-2-2-5-10 2-3v-5h-5l-7-7z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-77"
        :style="{ display: config.displayDep['FR-77'] }"
        d="m552 208-2 1-4 3-3-1-6 2-5-3-2 3h-4l-2-1-4-2-4 3v-1l-2 10 3 13v8l-3 8v4l-3 3 2 10-1 2-2 9 3 3-8 6v7l2 3 4 2 1 7-6 4 3 3 4-3h14l1-3h4v3l9-5 4-4 4-5-3-3 3-6 6-3 14 1 3-3h1v-6l2-7 3-3v-4l5-3v-2h-6l-1-3 2-3-1-5-3-2 1-5 3-2-1-2 1-1-6-2-2-4-3-1-10-9-1-8z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-68"
        :style="{ display: config.displayDep['FR-68'] }"
        d="M844 282h-5l-4 8-4 8 1 6-4 8-6 5v14l-4 4v1l1 2 6 1 6 5 2 2-1 4-2 4 1 4 5-1 1 4 2 8 4-1-1 4 3 2h13l7-5 1-8 3-5-5-5-2-6 3-4v-9l2-4v-8l3-4-4-5v-11l-5-2-4-9h-7l-3-4z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-55"
        :style="{ display: config.displayDep['FR-55'] }"
        d="m705 152-3 5-3 2-3-3h-5l-1-1-4 7-1 2 4 6-1 7-4 3v2l2 4-2 2-5 2 1 4 2 1-3 3 2 5 3 8-4 4 6-1-3 9-4 2-2 6 2 1-2 5v3l7 5 1 13 7 1 5 5 8 4 4 1 7 8-1 1 7-1v-3l7-1v-3h2v2l5-1 3-3h-1v-5l-4-3v-2l3-2h4l-2-2h-1l-2-3v-6l-1-4 2-6 3-7-3-3v-2l2-2h4v-2l-4-2v-2l3-4-4-4 1-2-3-2-2-2v-7l-2-2v-5l2-2v-2l-2-1v-4l-1-3-1-3-3-2-6 2h-4l-2 3-1 2-1-2 1-2 1-3-2-3v-4h-2l-1-7-3-3h-2z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-57"
        :style="{ display: config.displayDep['FR-57'] }"
        d="M765 160h-5l-4 4-1 1h-6l-2-2h-1v6l-2 2 5 10 2 2 2 5-3 5 3 3-1 3v4h-4v5l7 4v6h5l3 4h7l7 9 2 5h5l9 4 8 4v2h5l7 4h6l6 4 5 4 5 2 6-7 2-7-2-3-1-3 5-8-10-5-6 4-4-2 2-4-4-2-5-2v-5l5-1 2-9 3-3 2 5 4 2 7 1 3 4h4l4-3 5 3h2l3-2v-6l3-5-3-3-7-5-3-4-8 1-5 5h-13l-3-2c-.9-2-2.3-3.7-4-5h-1c-2 0-5-2-5-2l-5 2v4l-6 1-4-7-2-1v-5l-5-2-1-9-3-3-8-4h-3l-1 1h-4l-5-4z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-88"
        :style="{ display: config.displayDep['FR-88'] }"
        d="m832 262-4 1-5 2-3 4-3 2-6 2h-2l-4-1h-5l-1-5-3 1v5l-2-2-4 3-4 1h-5l-3 1-3-2-2 2h-6l-2 4-12 1-2-3-4-1v-2l2-2h-2v-6h-6l-2 1-3 3-5 2v-3h-2v3l-7 1v3l-7 1-2 3 3 3 5 1 5 6h5l1 5 5 1 1 3-4 2-2 10 10 5v7l4-1 3 3 3-2-1-2 1-1 3 3 4-3 1-3 6-1 2 1v4l5 4 2-1 4-2h7l6 6h2l2-2 1-2 3-1 3 2 3 3 12 6 4-4v-14l6-5 4-8-1-6 4-8 4-9-7-2-1-10 2-6z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-91"
        :style="{ display: config.displayDep['FR-91'] }"
        d="m491 244-3 2-4 1-1 4-5 3-1 4 3 4-4 5h-5l2 3-2 3-1 5 2 1v4l1 2 1 9 11-1 5-4 4 3 9 1 2 2v-7l8-6-3-3 2-9 1-2-2-10 3-3v-4l-4-2h-7l-3-2-3 1-6-3z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-78"
        :style="{ display: config.displayDep['FR-78'] }"
        d="m449 211-10 3-2 2 2 3v2l3 1-2 2v2l1-1 3 4 1 4 3 3-1 4v4l2 3-2 4 2 6 6 4v4h5l1 8 3 4 6 1 1-5 2-3-2-3h5l4-5-3-4 1-4 5-3 1-4 4-1 3-2v1-1l-3-3-2-6 3-7-1-5-7-4h-8l-9-6-6 2z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-95"
        :style="{ display: config.displayDep['FR-95'] }"
        d="m456 195-3 4-2 8-2 4 9 4 6-2 9 6h8l7 4 1 5h1l6-3 10-1 5-2 4-3 1-7-2-2-8-5-8-4-4 2-4 1-3-2-6-4-4 4-7 1-10-1-2-4z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-93"
        :style="{ display: config.displayDep['FR-93'] }"
        d="m515 219-4 3-5 2-10 1 1 1h1v3h-1v2h5l1 2 1 4 1-1 2-1h2l3 2 2 2 1 1h2v-5l-3-13z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-75"
        :style="{ display: config.displayDep['FR-75'] }"
        d="M502 231h-5l-2 1-1 1h-1l-2 2v2l3 1 4 2h3l2-1 4 1v-3h-2v1h-2l1-1-1-4z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-92"
        :style="{ display: config.displayDep['FR-92'] }"
        d="m496 225-6 3h-1l-3 7 2 6 3 4 5 4 2-1-1-2 1-3-1-1 1-2-4-2-3-1v-2l2-2h1l1-1 2-1v-2h1v-3h-1z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-94"
        :style="{ display: config.displayDep['FR-94'] }"
        d="m507 235-2 1-1 1-1 1h2v-1h2v3l-4-1-2 1h-3l-1 2 1 1-1 3 1 2 1-1 4 2h7l4 2 3-8v-3h-2l-1-1-2-2-3-2z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-25"
        :style="{ display: config.displayDep['FR-25'] }"
        d="m811 361-1 1h-4l-2 3-3 1v4l-7 1-3-3-5 1-5 4-3 5-3 1-2 4-4 1-6 5h-7l-3 1h-2l-7 6h-3v6l5 3 2 3v4l-3 6-1 3 10 4 6-1 1 6v7l8 2 4 1 5 5-1 4-2 4-7 2 2 4 1 2-3 3v3h5l22-21-1-17 8-4 6-3 5-4v-8l5-2 12-13-2-5 4-1 4-6-2-3-9 2v-1l8-10z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
      <path
        class="FR-90"
        :style="{ display: config.displayDep['FR-90'] }"
        d="m818 336-3 2-3 2v5l1 5v9l-2 2 22 11 1-2 5-1-2-8-1-4-5 1-1-4 2-4v-4l-1-2-6-5-6-1z"
        @click="onclick($event)"
        @dblclick="ondblclick()"
        @mouseenter="onenter($event)"
        @mouseleave="onleave($event)"
      />
    </g>
  </svg>
</template>
