<template>
  <div class="fr-container">
    <section class="fr-grid-row fr-grid-row--center fr-mt-4w fr-mt-md-8w">
      <Intro />

      <!-- SIDE MENU -->
      <div class="fr-col-12 fr-col-md-3">
        <nav
          class="fr-sidemenu fr-sidemenu--sticky-full-height"
          role="navigation"
          aria-labelledby="sidemenu-title"
        >
          <div class="fr-sidemenu__inner fr-mb-4w">
            <button
              class="fr-sidemenu__btn"
              aria-controls="sidemenu"
              aria-expanded="false"
              aria-current="true"
            >
              Dans cette rubrique
            </button>
            <div
              id="sidemenu"
              class="fr-collapse"
            >
              <p
                id="sidemenu-title"
                class="fr-sidemenu__title fr-sr-only"
              >
                Menu de navigation
              </p>
              <ul class="fr-sidemenu__list">
                <li class="fr-sidemenu__item">
                  <button
                    class="fr-sidemenu__btn"
                    aria-controls="sidemenu-representations-graphiques"
                    aria-expanded="true"
                    :aria-current="!['Databox', 'Couleurs', 'Accessibilité'].map(encodeURIComponent).includes(currentPage)"
                  >
                    Graphiques disponibles
                  </button>
                  <div
                    id="sidemenu-representations-graphiques"
                    class="fr-collapse fr-collapse--expanded"
                  >
                    <ul class="fr-sidemenu__list">
                      <li
                        v-for="(section, i) in chartExamples"
                        :key="i"
                        class="fr-sidemenu__item"
                      >
                        <a
                          class="fr-sidemenu__link"
                          :href="'#' + encodeURIComponent(section.title.replace(/ /g, '-'))"
                          target="_self"
                          :aria-current="currentPage === encodeURIComponent(section.title.replace(/ /g, '-'))"
                        >
                          {{ section.title }}
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li class="fr-sidemenu__item">
                  <a
                    class="fr-sidemenu__link"
                    href="#Databox"
                    :aria-current="currentPage === encodeURIComponent('Databox')"
                  >
                    Databox
                  </a>
                </li>
                <li class="fr-sidemenu__item">
                  <a
                    class="fr-sidemenu__link"
                    href="#Couleurs"
                    :aria-current="currentPage === encodeURIComponent('Couleurs')"
                  >
                    Les couleurs
                  </a>
                </li>
                <li class="fr-sidemenu__item">
                  <a
                    class="fr-sidemenu__link"
                    href="#Accessibilité"
                    :aria-current="currentPage === encodeURIComponent('Accessibilité')"
                  >
                    Accessibilité
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <div class="fr-col-12 fr-col-md-7">
        <h2 class="fr-h1">Graphiques disponibles</h2>

        <p>
          Ce catalogue présente l'ensemble des graphiques disponibles dans le module complémentaire au Système de design de l'État (DSFR) pour la visualisation de données. Les options de chacun des graphiques sont également présentés dans ce document.
        </p>

        <div
          v-for="section in chartExamples"
          :key="section.title"
          class="part_container"
        >
          <h2 :id="encodeURIComponent(section.title.replace(/ /g, '-'))">
            {{ section.title }}
          </h2>
          <p>
            {{ section.desc }}
          </p>
          <div
            v-for="graph in section.graphs"
            :key="graph.title"
          >
            <h3
              v-if="graph.heading"
              :id="encodeURIComponent(graph.heading.replace(/ /g, '-'))"
            >
              {{ graph.heading }}
            </h3>
            <p
              v-if="!graph.noPalette"
              class="fr-badge fr-badge--info fr-mt-1w fr-mb-1w"
            >
              {{ PALETTE_LABELS?.[graph.props.selectedPalette] ?? 'Palette par défaut' }}
            </p>
            <h3
              v-if="graph.title"
              class="fr-h6 fr-text--bold fr-mb-0"
            >
              {{ graph.title }}
            </h3>
            <p
              v-if="graph.desc"
              class="fr-text--sm"
            >
              {{ graph.desc }}
            </p>
            <component
              :is="graph.component"
              v-bind="graph.props"
            />
            <CodeBlock
              :component="graph.component"
              :attributes="graph.props"
            />
          </div>
        </div>

        <DataBoxSection />
        <ColorsSection />
        <AccessibilitySection />
      </div>
    </section>

    <DisplayMode />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { chartExamples } from './examples.js';
import Intro from './Intro.vue';
import CodeBlock from './CodeBlock.vue';
import DisplayMode from './DisplayMode.vue';
import DataBoxSection from './DataBoxSection.vue';
import ColorsSection from './ColorsSection.vue';
import AccessibilitySection from './AccessibilitySection.vue';

const PALETTE_LABELS = {
  default: 'Palette par défaut',
  neutral: 'Palette unicolore',
  sequentialDescending: 'Palette séquentielle',
  divergentAscending: 'Palette séquentielle divergente',
  divergentDescending: 'Palette séquentielle divergente',
};

const currentPage = ref(window.location.hash.slice(1));
window.addEventListener('hashchange', () => {
  currentPage.value = window.location.hash.slice(1);
})
</script>
