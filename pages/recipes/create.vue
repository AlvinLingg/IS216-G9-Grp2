<template>
  <div class="container mx-auto">
    <div v-if="!userStore.user" class="section p-10 max-w-6xl m-auto">
      <NoExist
        errorTitle="User Not Found"
        errorMessage="Please login and try again!"
      />
    </div>
    <div v-else class="section p-10 max-w-6xl m-auto">
      <Form
        @submit="handleSubmit"
        :validation-schema="schema"
        v-slot="{ errors }"
      >
        <h1 class="text-5xl font-bold">Create a new recipe</h1>

        <!-- Upload Image -->

        <div class="mt-5">
          <label class="label-title text-slate-600"> Upload Image </label>
          <div
            class="w-32 h-32 border-2 border-dashed rounded-xl cursor-pointer text-[#a5a5a5] hover:bg-blue-50 hover:border-blue-500 hover:text-blue-500 mt-2"
            @click="$refs.fileUploadInput.click()"
          >
            <img
              v-if="uploadedFile !== null || previewURL !== null"
              :src="previewURL"
              alt=""
              class="rounded-xl hover:opacity-75 object-cover w-full h-full"
            />
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="{1.5}"
              class="p-8"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </div>

          <input
            class="hidden"
            type="file"
            ref="fileUploadInput"
            accept="image/png, image/gif, image/jpeg"
            @change="handleFileSelection"
          />
          <span class="text-red-500 text-sm">{{ errors.images }}</span>
        </div>

        <!-- Recipe Name -->
        <div class="mt-5">
          <div class="grid grid-cols-3 gap-5">
            <div class="flex flex-col col-span-3">
              <label for="search" class="label-title text-slate-600"
                >Recipe Name</label
              >
              <Field
                type="text"
                class="p-3 mb-0.5 mt-2 w-full border border-gray-300 rounded-lg"
                name="recipeName"
              />
              <span class="text-red-500 text-sm">{{ errors.recipeName }}</span>
            </div>
          </div>
        </div>

        <!-- Recipe Ingredients -->
        <div class="mt-5">
          <div class="flex flex-col gap-2">
            <label for="search" class="label-title text-slate-600">
              Which ingredients do you need?
            </label>
            <input
              type="text"
              id="search"
              placeholder="Type here..."
              v-model="searchTerm"
              class="p-3 mb-0.5 w-16S0 border border-gray-300 rounded-lg"
            />
          </div>
          <ul
            v-if="searchIngredients.length"
            class="rounded bg-white border border-gray-300 px-4 py-2 space-y-1 z-10 absolute"
          >
            <li class="px-1 pt-1 pb-2 font-bold border-b border-gray-200">
              Showing {{ searchIngredients.length }} of
              {{ ingredients.length }} results
            </li>
            <li
              v-for="ingredient in searchIngredients"
              @click="selectIngredient(ingredient)"
              class="cursor-pointer hover:bg-gray-100 p-1"
            >
              {{ ingredient }}
            </li>
          </ul>
          <div v-for="(item, key, index) in selectedIngredients" :key="index">
            <div class="flex text-lg pt-2 items-center">
              <input
                class="input input-bordered w-full max-w-xs mr-4 rounded-lg"
                type="number"
                placeholder="0"
                min="0.01"
                @change="updateIngredientInput($event, key)"
              />
              <select
                class="select select-bordered w-full max-w-xs mr-4"
                @change="updateIngredientSelect($event, key)"
              >
                <option value="teaspoon">tsp</option>
                <option value="tablespoon">tbsp</option>
                <option value="millilitre">ml</option>
                <option value="litre">l</option>
                <option value="milligram">mg</option>
                <option value="gram">g</option>
                <option value="kilogram">kg</option>
              </select>
              <span>of&nbsp;</span>
              <span class="mr-4">{{ key }}</span>
              <span
                class="badge py-3 cursor-pointer bg-[#e94249] border-[#e94249]"
                @click="removeIngredient(key)"
                >remove</span
              >
            </div>
            <span
              v-if="selectedIngredients[key].error"
              class="text-red-500 text-sm"
              >Ingredient value must be greater than 0</span
            >
          </div>
        </div>

        <!-- Recipe Additional Information - Serving Size, Expected Cooking Time, Difficulty -->
        <div class="mt-5">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div class="flex flex-col">
              <label for="search" class="label-title text-slate-600"
                >Serving size</label
              >
              <Field
                type="number"
                class="p-3 mb-0.5 mt-2 w-full border border-gray-300 rounded-lg"
                name="servingSize"
              />
              <span class="text-red-500 text-sm">{{ errors.servingSize }}</span>
            </div>
            <div class="flex flex-col">
              <label for="search" class="label-title text-slate-600"
                >Expected cooking time (Minutes)</label
              >
              <Field
                type="number"
                class="p-3 mb-0.5 mt-2 w-full border border-gray-300 rounded-lg"
                name="cookingTime"
              />
              <span class="text-red-500 text-sm">{{ errors.cookingTime }}</span>
            </div>
            <div class="flex flex-col">
              <label for="search" class="label-title text-slate-600"
                >Difficulty</label
              >
              <Field
                as="select"
                class="select select-bordered mb-0.5 mt-2 w-full border"
                name="difficulty"
              >
                <option value="easy">Easy</option>
                <option value="intermediate">Intermediate</option>
                <option value="hard">Hard</option> </Field
              ><span class="text-red-500 text-sm">{{ errors.difficulty }}</span>
            </div>
          </div>
        </div>

        <div class="form-control my-2.5">
          <label class="label-title text-slate-600">Instructions</label>
          <button class="btn mt-2 grey-color" @click.prevent="addStep">
            Add a step
          </button>
          <div
            v-for="(instructionStep, index) in instructionsSteps"
            class="mt-5"
          >
            <div class="w-full bg-gray-50 rounded-lg border border-gray-200">
              <div class="flex justify-between items-center py-2 px-3 border-b">
                <span class="font-bold text-slate-600"
                  >Step {{ index + 1 }}</span
                ><span
                  class="badge py-3 cursor-pointer font-bold text-slate-800 bg-transparent border-none"
                  @click="removeStep(index)"
                  >x</span
                >
              </div>
              <div class="py-2 px-4 bg-white rounded-b-lg">
                <textarea
                  id="editor"
                  rows="4"
                  class="block px-0 w-full text-sm text-gray-800 bg-white border-0 focus:outline-none"
                  placeholder="Describe the steps..."
                  required
                  :value="instructionStep"
                  @input="updateSteps($event, index)"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full mt-5 text-right">
          <button class="btn primary-color rounded-full">Create Recipe</button>
        </div>
      </Form>
    </div>
    <input
      type="checkbox"
      id="my-modal"
      class="modal-toggle"
      ref="cbStatusModal"
    />
    <StatusModal modalID="my-modal" :modalState="modalState" />
  </div>
</template>

<script setup>
import ingredients from "../../data/ingredients.json";
import { Form, Field, validate } from "vee-validate";
import { useUserStore } from "~/store/userStore";
import * as yup from "yup";

const userStore = useUserStore();

// define validation schema
const schema = yup.object({
  recipeName: yup.string().required("Please enter a recipe name"),
  servingSize: yup
    .number()
    .required("Serving size is required")
    .min(1, "Minimum serving size is 1"),
  cookingTime: yup
    .number()
    .required("Cooking time is required")
    .min(1, "Minimum cooking time is 1 min"),
  difficulty: yup.string().required("Difficulty is required"),
});

let fileUploadInput = ref("");
// let uploadedFiles = ref([]);
const uploadedFile = ref(null);
const previewURL = ref(null);
// let objectURLs = ref([]);

let searchTerm = ref("");
let selectedIngredients = ref(new Object());

let instructionsSteps = ref([]);

const cbStatusModal = ref(null);

const modalState = ref({
  status: "loading",
  title: "Loading",
  message: "Please wait...",
});

watch(uploadedFile, () => {
  previewURL.value = URL.createObjectURL(uploadedFile.value);
});

const searchIngredients = computed(() => {
  if (searchTerm.value === "") {
    return [];
  }
  let matches = 0;
  return ingredients.filter((x) => {
    if (x.includes(searchTerm.value.toLowerCase()) && matches < 10) {
      matches++;
      return x;
    }
  });
});

const selectIngredient = (ingredient) => {
  selectedIngredients.value[ingredient] = {
    amount: 0,
    unit: "tsp",
    error: false,
  };
  searchTerm.value = "";
};

const removeIngredient = (key) => {
  delete selectedIngredients.value[key];
};

const addStep = (e) => {
  e.preventDefault();
  instructionsSteps.value.push("");
};

const removeStep = (index) => {
  instructionsSteps.value.splice(index, 1);
};

const updateSteps = (e, index) => {
  instructionsSteps.value[index] = e.target.value;
};

const handleFileSelection = (e) => {
  // if (e.target.files.length + objectURLs.value.length > 5) {
  //   alert("You can only upload 5 images at a time");
  //   return;
  // }

  // for (const file of e.target.files) {
  //   objectURLs.value.push(URL.createObjectURL(file));
  //   uploadedFiles.value.push(file);
  // }
  uploadedFile.value = e.target.files[0];
};

// const removeImage = (index) => {
//   objectURLs.value.splice(index, 1);
//   uploadedFiles.value.splice(index, 1);
// };

// const formatBytes = (bytes, decimals = 2) => {
//   if (!+bytes) return "0 Bytes";

//   const k = 1024;
//   const dm = decimals < 0 ? 0 : decimals;
//   const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

//   const i = Math.floor(Math.log(bytes) / Math.log(k));

//   return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
// };

const updateIngredientInput = (e, key) => {
  selectedIngredients.value[key].amount = e.target.value;
  if (
    selectedIngredients.value[key].amount === "" ||
    Number(selectedIngredients.value[key].amount) <= 0
  ) {
    selectedIngredients.value[key].error = true;
  } else {
    selectedIngredients.value[key].error = false;
  }
};

const updateIngredientSelect = (e, key) => {
  selectedIngredients.value[key].unit = e.target.value;
};

const handleSubmit = async (values) => {
  if (uploadedFile.value === null) {
    modalState.value = {
      status: "failure",
      title: "Oops!",
      message: "Please upload an image for your recipe.",
    };
    cbStatusModal.value.checked = true;

    return;
  }

  if (Object.keys(selectedIngredients.value).length === 0) {
    modalState.value = {
      status: "failure",
      title: "Oops!",
      message: "Please select at least one ingredient.",
    };
    cbStatusModal.value.checked = true;
    return;
  }

  if (
    Object.values(selectedIngredients.value).filter((x) => x.amount <= 0)
      .length > 0
  ) {
    modalState.value = {
      status: "failure",
      title: "Oops!",
      message: "Please ensure ingredient values are valid.",
    };
    cbStatusModal.value.checked = true;
    for (let key in selectedIngredients.value) {
      if (selectedIngredients.value[key].amount <= 0) {
        selectedIngredients.value[key].error = true;
      }
    }
    return;
  }

  if (instructionsSteps.value.length === 0) {
    modalState.value = {
      status: "failure",
      title: "Oops!",
      message: "Please specify at least one step.",
    };
    cbStatusModal.value.checked = true;
    return;
  }

  modalState.value = {
    status: "loading",
    title: "Loading",
    message: "Please wait...",
  };
  cbStatusModal.value.checked = true;

  // Upload files to S3
  let formData = new FormData();
  formData.append("files", uploadedFile.value);
  let { data: uploadResponse } = await useFetch("/express/upload", {
    headers: {
      "Content-Disposition": formData,
    },
    method: "POST",
    body: formData,
  });

  // update db -> send to api
  $fetch("/api/createRecipe", {
    method: "POST",
    body: {
      ...values,
      ingredientsNeeded: selectedIngredients.value,
      instructions: instructionsSteps.value,
      image: uploadResponse.value.urls,
      userId: userStore.user.uniqueUserId,
    },
  })
    .then((res) => {
      modalState.value = {
        status: "success",
        title: "Success",
        message: "Recipe created successfully!",
      };
    })
    .catch((err) => {
      modalState.value = {
        status: "failure",
        title: "Oops!",
        message: "Failed to create recipe.",
      };
    });
};
</script>
