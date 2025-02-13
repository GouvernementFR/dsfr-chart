<template>
  <button
    class="fr-display-button fr-background-default--grey fr-btn fr-btn--lg fr-icon-theme-fill fr-btn--secondary"
    aria-controls="fr-theme-modal"
    data-fr-opened="false"
    data-fr-js-modal-button="true"
    style="z-index: 999;"
  >
    Paramètres d’affichage
  </button>

  <dialog
    id="fr-theme-modal"
    class="fr-modal"
    role="dialog"
    aria-labelledby="fr-theme-modal-title"
  >
    <div class="fr-container fr-container--fluid fr-container-md">
      <div class="fr-grid-row fr-grid-row--center">
        <div class="fr-col-12 fr-col-md-6 fr-col-lg-4">
          <div class="fr-modal__body">
            <div class="fr-modal__header">
              <button
                class="fr-btn--close fr-btn"
                aria-controls="fr-theme-modal"
                title="Fermer"
              >
                Fermer
              </button>
            </div>
            <div class="fr-modal__content">
              <h2
                id="fr-theme-modal-title"
                class="fr-modal__title"
              >
                Paramètres d’affichage
              </h2>
              <div
                id="fr-display"
                class="fr-display"
              >
                <div class="fr-form-group">
                  <fieldset class="fr-fieldset">
                    <legend
                      id="-legend"
                      class="fr-fieldset__legend fr-text--regular"
                    >
                      Choisissez un thème pour personnaliser l’apparence du site.
                    </legend>
                    <div class="fr-fieldset__content">
                      <div class="fr-radio-group fr-radio-rich">
                        <input
                          id="fr-radios-theme-light"
                          value="light"
                          type="radio"
                          name="fr-radios-theme"
                        >
                        <label
                          class="fr-label"
                          for="fr-radios-theme-light"
                        >
                          Thème clair
                        </label>
                        <div class="fr-radio-rich__img">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="fr-artwork"
                            width="80px"
                            height="80px"
                            viewBox="0 0 80 80"
                          >
                            <use
                              class="fr-artwork-decorative"
                              :xlink:href="`/src/assets/img/light.svg#artwork-decorative`"
                            />
                            <use
                              class="fr-artwork-minor"
                              :xlink:href="`/src/assets/img/light.svg#artwork-minor`"
                            />
                            <use
                              class="fr-artwork-major"
                              :xlink:href="`/src/assets/img/light.svg#artwork-major`"
                            />
                          </svg>
                        </div>
                      </div>
                      <div class="fr-radio-group fr-radio-rich">
                        <input
                          id="fr-radios-theme-dark"
                          value="dark"
                          type="radio"
                          name="fr-radios-theme"
                        >
                        <label
                          class="fr-label"
                          for="fr-radios-theme-dark"
                        >
                          Thème sombre
                        </label>
                        <div class="fr-radio-rich__img">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="fr-artwork"
                            width="80px"
                            height="80px"
                            viewBox="0 0 80 80"
                          >
                            <use
                              class="fr-artwork-decorative"
                              :xlink:href="`/src/assets/img/dark.svg#artwork-decorative`"
                            />
                            <use
                              class="fr-artwork-minor"
                              :xlink:href="`/src/assets/img/dark.svg#artwork-minor`"
                            />
                            <use
                              class="fr-artwork-major"
                              :xlink:href="`/src/assets/img/dark.svg#artwork-major`"
                            />
                          </svg>
                        </div>
                      </div>
                      <div class="fr-radio-group fr-radio-rich">
                        <input
                          id="fr-radios-theme-system"
                          value="system"
                          type="radio"
                          name="fr-radios-theme"
                        >
                        <label
                          class="fr-label"
                          for="fr-radios-theme-system"
                        >
                          Système
                          <span class="fr-hint-text">
                            Utilise les paramètres système.
                          </span>
                        </label>
                        <div class="fr-radio-rich__img">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="fr-artwork"
                            width="80px"
                            height="80px"
                            viewBox="0 0 80 80"
                          >
                            <use
                              class="fr-artwork-decorative"
                              :xlink:href="`/src/assets/img/system.svg#artwork-decorative`"
                            />
                            <use
                              class="fr-artwork-minor"
                              :xlink:href="`/src/assets/img/system.svg#artwork-minor`"
                            />
                            <use
                              class="fr-artwork-major"
                              :xlink:href="`/src/assets/img/system.svg#artwork-major`"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.fr-display-button {
  position: fixed;
  bottom: 3.5rem;
  right: 2rem;
}
</style>
