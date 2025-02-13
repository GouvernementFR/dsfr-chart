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
                  >
                    Représentations graphiques disponibles
                  </button>
                  <div
                    id="sidemenu-representations-graphiques"
                    class="fr-collapse fr-collapse--expanded"
                  >
                    <ul class="fr-sidemenu__list">
                      <li
                        v-for="(section, i) in chartExamples"
                        :key="section.title"
                        class="fr-sidemenu__item"
                      >
                        <template v-if="section.graphs.length === 1">
                          <a
                            class="fr-sidemenu__link"
                            :href="'#' + encodeURIComponent(section.title.replace(/ /g, '-'))"
                            target="_self"
                          >
                            {{ section.title }}
                          </a>
                        </template>
                        <template v-else>
                          <button
                            class="fr-sidemenu__btn"
                            aria-expanded="false"
                            :aria-controls="`sidemenu-${i}`"
                          >
                            {{ section.title }}
                          </button>
                          <div
                            :id="`sidemenu-${i}`"
                            class="fr-collapse"
                          >
                            <ul class="fr-sidemenu__list">
                              <template v-for="(graph, j) in section.graphs">
                                <li
                                  v-if="graph.heading"
                                  :key="graph.heading"
                                  class="fr-sidemenu__item"
                                >
                                  <a
                                    :id="`sidemenu-${i}.${j}`"
                                    class="fr-sidemenu__link"
                                    :href="'#' + encodeURIComponent(graph.heading.replace(/ /g, '-'))"
                                    target="_self"
                                  >
                                    {{ graph.heading }}
                                  </a>
                                </li>
                              </template>
                            </ul>
                          </div>
                        </template>
                      </li>
                    </ul>
                  </div>
                </li>
                <li class="fr-sidemenu__item">
                  <button
                    class="fr-sidemenu__btn"
                    aria-expanded="false"
                    aria-controls="sidemenu-99"
                  >
                    Databox
                  </button>
                  <div
                    id="sidemenu-99"
                    class="fr-collapse"
                  >
                    <ul class="fr-sidemenu__list">
                      <li class="fr-sidemenu__item">
                        <a
                          id="sidemenu-99.1"
                          class="fr-sidemenu__link"
                          href="#Databox-simple"
                          target="_self"
                        >
                          Databox simple
                        </a>
                      </li>
                      <li class="fr-sidemenu__item">
                        <a
                          id="sidemenu-99.2"
                          class="fr-sidemenu__link"
                          href="#Databox-complète-multi-source"
                          target="_self"
                        >
                          Databox complète multi source
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li class="fr-sidemenu__item">
                  <a
                    class="fr-sidemenu__link"
                    href="#Couleurs"
                    target="_self"
                  >
                    Les couleurs
                  </a>
                </li>
                <li class="fr-sidemenu__item">
                  <a
                    class="fr-sidemenu__link"
                    href="#Accessibilité"
                    target="_self"
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
  divergentDescending: 'Palette séquentielle divergente',
};
</script>
