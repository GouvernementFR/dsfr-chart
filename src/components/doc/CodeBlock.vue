<template>
  <section class="fr-accordion fr-mt-4w fr-mb-6w">
    <h3 class="fr-accordion__title">
      <button
        class="fr-accordion__btn"
        aria-expanded="false"
        :aria-controls="'accordion-' + tag + '-' + id"
      >
        Extrait de code
      </button>
    </h3>
    <div
      :id="'accordion-' + tag + '-' + id"
      class="fr-collapse"
    >
      <!-- No indentation because it will be reflected in code pre -->
      <div class="code-toolbar">
        <pre><code><span
          v-for="(comp, i) in components"
          :key="i"
        >
    <!-- Tag open --><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>{{ toKebabCase(comp.name) }}</span></span>
  <template
            v-for="(value, attr, j) in attributes[i]"
            :key="j"
          >      <span class="token attr-name">{{ toKebabCase(attr) }}</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">'</span><span class="class">{{ value }}</span><span class="token punctuation">'</span></span>
  </template>  <span class="token punctuation">&gt;</span>
    <!-- Tag close --><span class="token tag"><span class="token punctuation">&lt;/</span>{{ toKebabCase(comp.name) }}</span><span class="token punctuation">&gt;</span>
</span></code></pre>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  attributes: {
    type: Object,
    required: true,
  },
  component: {
    type: Object,
    required: true,
  },
});

const components = Array.isArray(props.component) ? props.component : [props.component];
const attributes = Array.isArray(props.attributes) ? props.attributes : [props.attributes];

const toKebabCase = (str) => str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`).replace(/^-/, '');

const tag = toKebabCase(components[0]?.name);
const id = Math.floor(Math.random() * 1000);
</script>

<style scoped>
.code-toolbar {
  background-color: #f5f2f0;
  overflow: scroll;
}

.attr-name,
.builtin,
.char,
.inserted,
.selector,
.string {
  color: #690;
}

.punctuation {
  color: #999;
}

.tag {
  color: #905;
}

.class {
  color: #000091;
}
</style>
