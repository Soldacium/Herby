import { Ref, ref } from "vue";
import type { PossibleTranslations } from "../models/translations.type";

interface Translation {
  homeSearch: {
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
  notFound: {
    title: string;
    description: string;
  };
  contribute: {
    basics: {
      title: string;
      namePlaceholder: string;
      placePlaceholder: string;
      countryPlaceholder: string;
    };
    optional: {
      title: string;
      descriptionPlaceholder: string;
    };
    submitInfo: {
      title: string;
      emailPlaceholder: string;
    };
    buttonText: string;
  };
  details: {
    variant: {
      variantNamePlaceholder: string;
      variantDesriptionPlaceholder: string;
      nextVariantText: string;
      buttonText: string;
      emailPlaceholder: string;
    };
  };
}

const translations: { [key: string]: Translation } = {
  pl: {
    homeSearch: {
      home: {
        about: {
          title: "O nas",
          description:
            "  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi reiciendis omnis debitis fugiat. Iste, iure voluptatem aspernatur corrupti esse quae ex unde accusantium est, ipsam harum necessitatibus ratione. Quia veniam itaque libero nisi ab, temporibus magnam maxime et aliquam aperiam explicabo ad quam corrupti aliquid totam accusantium minus, illum rem.",
          buttonText: "Więcej informacji",
        },
        features: {
          feature1: {
            title: "Kluby",
            description: "string",
          },
          feature2: {
            title: "Dodaj",
            description: "string",
          },
          feature3: {
            title: "Warianty",
            description: "string",
          },
          feature4: {
            title: "Ogólnodostępne",
            description: "string",
          },
        },
        explore: {
          title: "Poznaj",
          description:
            "  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi reiciendis omnis debitis fugiat. Iste, iure voluptatem aspernatur corrupti esse quae ex unde accusantium est, ipsam harum necessitatibus ratione. Quia veniam itaque libero nisi ab, temporibus magnam maxime et aliquam aperiam explicabo ad quam corrupti aliquid totam accusantium minus, illum rem.",
          buttonText: "Dowiedz się więcej",
        },
        newest: {
          title: "Nowe herby",
        },
        suggestion: {
          title: "Wspólnie twórzmy",
          desciprion: "Masz sugestię? Wyślij ją tutaj!",
          inputPlaceholder: "Tytuł",
          textareaPlaceholder: "Treść",
          buttonText: "Wyślij",
        },
      },
      search: {
        description: "Oficjalna strona dla oficjalnych herbów",
      },
    },
    nav: {
      home: "Strona główna",
      search: "Wyszukaj",
      saved: "Zapisane",
      about: "O nas",
      add: "Dodaj herb +",
    },
    notFound: {
      title: "Nie znaleziono!",
      description: "Czy na pewno tego szukałeś?",
    },
    contribute: {
      basics: {
        title: "Podstawy",
        namePlaceholder: "Nazwa klubu",
        placePlaceholder: "Lokalizacja",
        countryPlaceholder: "Państwo",
      },
      optional: {
        title: "Opcjonalne",
        descriptionPlaceholder: "Opis",
      },
      submitInfo: {
        title: "Informacje o dodającym",
        emailPlaceholder: "E-mail",
      },
      buttonText: "Wyślij zgłoszenie",
    },
    details: {
      variant: {
        variantNamePlaceholder: "Nazwa wariantu",
        variantDesriptionPlaceholder: "Opis (opcjonalnie)",
        nextVariantText: "Następny wariant",
        buttonText: "Dodaj warianty",
        emailPlaceholder: "E-mail",
      },
    },
  },
};

const translation: Ref<Translation> = ref(translations.pl);

const changeTranslation = (translationKey: PossibleTranslations) => {
  translation.value = translations[translationKey];
};

export { translation, changeTranslation, PossibleTranslations };
