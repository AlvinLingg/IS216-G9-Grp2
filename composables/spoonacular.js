let rotatingApiKey = [
  "1e8aa973fadf4c31abf5e308dccafda7",
  "c289e5d9fb424c119062224ee8fbb2f6",
  "3782981a622a4494b42ebadb4539d2ff",
  "b0a472a003a1473ab852f3b58113c40a",
  "13c8088b320b4405b0e97fe0a92c1ce4",
  "4d0942790e7a416aae65fbe85928171c",
  "6696c652a3be4db6a2cd1824f7baea8b",
  "c22fa54c9a804d74890774ceae0fef5d",
  "30688f7e6c9f4ad196b66f0df72a4738",
  "a860a8c74b4b4486b720489bdf725ea2",
  "68a68b250d204394a1682647a6dd070e",
  "c21c98fdd76344339b22475b8c366a95",
  "e922e57d86ba4149961c79b3d5541710",
  "8347a2bc42d442a5a0c1248fe0e2d59d",
  "8347a2bc42d442a5a0c1248fe0e2d59d",
  "968f2f73b7214545b22871c6c8cd418c",
  "200af3cc45874d948a4ad0fa16b49362",
  "3b92f3f9eac44246afe26b5cce93ec46",
];

let baseURL = "https://api.spoonacular.com";

export const getValidApiKey = async (apiIndex, number) => {
  let data = $fetch("/recipes/random", {
    initialCache: false,
    server: true,
    method: "GET",
    baseURL: baseURL,
    params: {
      apiKey: rotatingApiKey[apiIndex],
      number: number,
    },
  })
    .then((res) => {
      return apiIndex;
    })
    .catch((err) => {
      if (apiIndex < rotatingApiKey.length - 1) {
        return getValidApiKey(apiIndex + 1, number);
      } else {
        return null;
      }
    });
  return data;
};

export const getRandomRecipe = async (apiIndex, number) => {
  let data = $fetch("/recipes/random", {
    method: "GET",
    baseURL: baseURL,
    params: {
      apiKey: rotatingApiKey[apiIndex],
      number: number,
    },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (apiIndex < rotatingApiKey.length - 1) {
        return getRandomRecipe(apiIndex + 1, number);
      } else {
        return null;
      }
    });

  return data;
};

export const getPopularRecipes = async (apiIndex, number, offset) => {
  let data = $fetch("/recipes/complexSearch", {
    method: "GET",
    baseURL: baseURL,
    params: {
      apiKey: rotatingApiKey[apiIndex],
      sort: "popularity",
      sortDirection: "desc",
      number: number,
    },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (apiIndex < rotatingApiKey.length - 1) {
        return getPopularRecipes(apiIndex + 1, number, offset);
      } else {
        return null;
      }
    });
  return data;
};

export const getRecipeInformation = async (apiIndex, id) => {
  let data = $fetch(`/recipes/${id}/information`, {
    method: "GET",
    baseURL: baseURL,
    params: {
      apiKey: rotatingApiKey[apiIndex],
    },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (apiIndex < rotatingApiKey.length - 1) {
        return getRecipeInformation(apiIndex + 1, id);
      } else {
        return null;
      }
    });
  return data;
};

export const getRecipeInformationBulk = async (apiIndex, ids) => {
  let data = $fetch("/recipes/informationBulk", {
    method: "GET",
    baseURL: baseURL,
    params: {
      apiKey: rotatingApiKey[apiIndex],
      ids: ids,
    },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (apiIndex < rotatingApiKey.length - 1) {
        return getRecipeInformationBulk(apiIndex + 1, ids);
      } else {
        return null;
      }
    });
  return data;
};

export const analyzeRecipeInstructions = async (apiIndex, id) => {
  let data = $fetch(`/recipes/${id}/analyzedInstructions`, {
    method: "GET",
    baseURL: baseURL,
    params: {
      apiKey: rotatingApiKey[apiIndex],
    },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (apiIndex < rotatingApiKey.length - 1) {
        return analyzeRecipeInstructions(apiIndex + 1, id);
      } else {
        return null;
      }
    });
  return data;
};

export const findByIngredients = async (apiIndex, ingredients, number) => {
  let data = $fetch("/recipes/findByIngredients", {
    initialCache: false,
    method: "GET",
    baseURL: baseURL,
    params: {
      apiKey: rotatingApiKey[apiIndex],
      ingredients: ingredients,
      number: number,
    },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (apiIndex < rotatingApiKey.length - 1) {
        return findByIngredients(apiIndex + 1, ingredients, number);
      } else {
        return null;
      }
    });
  return data;
};

export const searchRecipe = async (apiIndex, query, number, offset) => {
  let data = $fetch("/recipes/complexSearch", {
    initialCache: false,
    method: "GET",
    baseURL: baseURL,
    params: {
      apiKey: rotatingApiKey[apiIndex],
      query: query,
      number: number,
      offset: offset,
    },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (apiIndex < rotatingApiKey.length - 1) {
        return searchRecipe(apiIndex + 1, query, number, offset);
      } else {
        return null;
      }
    });
  return data;
};

export const searchRecipeComplex = async (
  apiIndex,
  cuisine,
  intolerance,
  sort,
  sortDirection,
  number,
  offset
) => {
  let data = $fetch("/recipes/complexSearch", {
    initialCache: false,
    method: "GET",
    baseURL: baseURL,
    params: {
      apiKey: rotatingApiKey[apiIndex],
      cuisine: cuisine,
      intolerance: intolerance,
      sort: sort,
      sortDirection: sortDirection,
      number: number,
      offset: offset,
    },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (apiIndex < rotatingApiKey.length - 1) {
        return searchRecipeComplex(
          apiIndex + 1,
          cuisine,
          intolerance,
          sort,
          sortDirection,
          number,
          offset
        );
      } else {
        return null;
      }
    });
  return data;
};

export const getSimilarRecipes = async (apiIndex, id, number) => {
  let data = $fetch(`/recipes/${id}/similar`, {
    initialCache: false,
    method: "GET",
    baseURL: baseURL,
    params: {
      apiKey: rotatingApiKey[apiIndex],
      number: number,
    },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (apiIndex < rotatingApiKey.length - 1) {
        return getSimilarRecipes(apiIndex + 1, id, number);
      } else {
        return null;
      }
    });
  return data;
};
