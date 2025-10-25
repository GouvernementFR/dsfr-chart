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
      <div class="code-toolbar">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <pre><code v-html="formattedCode" /></pre>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  attributes: { type: Object, required: true },
  component: { type: Object, required: true },
});

const components = Array.isArray(props.component)
  ? props.component
  : [props.component];
const attributes = Array.isArray(props.attributes)
  ? props.attributes
  : [props.attributes];

const toKebabCase = (str) =>
  str
    .replace('dataBox', 'databox')
    .replace(/[A-Z]/g, (l) => `-${l.toLowerCase()}`)
    .replace(/^-/, '');

const tag = toKebabCase(components[0]?.name);
const id = Math.floor(Math.random() * 1000);

/**
 * Formate une valeur pour affichage multi-ligne avec indentation
 */
const formatValue = (value, baseIndent = 2) => {
  if (typeof value === "object") {
    const json = JSON.stringify(value, null, 2).split("\n");
    return json
      .map((line, index) => "&nbsp;".repeat(index > 0 ? baseIndent : 0) + line.replace(/ /g, "&nbsp;"))
      .join("<br>");
  }
  return String(value);
};

/**
 * Génère le code complet avec les <span> pour la coloration
 */
const formattedCode = (() => {
  let code = "";

  components.forEach((comp, i) => {
    // ouverture du tag
    code += `&lt;<span class="token tag">${toKebabCase(comp.name)}</span><br>`;

    const attrs = attributes[i];
    for (const [attr, value] of Object.entries(attrs)) {
      code += `&nbsp;&nbsp;<span class="token attr-name">${toKebabCase(attr)}</span><span class="token punctuation">=</span>'<span class="class">${formatValue(value)}</span>'<br>`;
    }

    // fermeture du tag
    code += `&gt;<br>&lt;/<span class="token tag">${toKebabCase(comp.name)}</span>&gt;`;
  });

  return code;
})();
</script>

<style>
.code-toolbar {
  background-color: #f5f2f0;
  overflow: auto;
  padding: 1rem;
  border-radius: 0.5rem;
  font-family: monospace;
  line-height: 1.4;
}

pre {
  margin: 0;
  white-space: pre;
}

.token.tag {
  color: #905;
}

.token.attr-name {
  color: #690;
}

.token.punctuation {
  color: #999;
}

.class {
  color: #000091;
}
</style>
