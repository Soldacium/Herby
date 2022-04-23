import { Ref, ref } from "vue";
import type { PossibleTranslations } from "../models/translations.type";

interface Translation {
  "home-search": {
    home: {
      about: {
        title: string;
        description: string;
        buttonText: string;
      };
      features: {
        feature1: {
          title: string;
          description: string;
        };
        feature2: {
          title: string;
          description: string;
        };
        feature3: {
          title: string;
          description: string;
        };
        feature4: {
          title: string;
          description: string;
        };
      };
      explore: {
        title: string;
        description: string;
        buttonText: string;
      };
      newest: {
        title: string;
      };
      suggestion: {
        title: string;
        desciprion: string;
        inputPlaceholder: string;
        textareaPlaceholder: string;
        buttonText: string;
      };
    };
    search: {
      description: string;
    };
  };
  nav: {
    home: string;
    search: string;
    saved: string;
    about: string;
    add: string;
  };
}

const translations: { [key: string]: Translation } = {
  pl: {
    "home-search": {
      home: {
        about: {
          title: "string",
          description: "string",
          buttonText: "string",
        },
        features: {
          feature1: {
            title: "string",
            description: "string",
          },
          feature2: {
            title: "string",
            description: "string",
          },
          feature3: {
            title: "string",
            description: "string",
          },
          feature4: {
            title: "string",
            description: "string",
          },
        },
        explore: {
          title: "string",
          description: "string",
          buttonText: "string",
        },
        newest: {
          title: "Nowe herby",
        },
        suggestion: {
          title: "string",
          desciprion: "string",
          inputPlaceholder: "string",
          textareaPlaceholder: "string",
          buttonText: "string",
        },
      },
      search: {
        description: "string",
      },
    },
    nav: {
      home: "string",
      search: "string",
      saved: "string",
      about: "string",
      add: "string",
    },
  },
};

const translation: Ref<Translation> = ref(translations.pl);

const changeTranslation = (translationKey: PossibleTranslations) => {
  translation.value = translations[translationKey];
};

export { translation, changeTranslation, PossibleTranslations };
