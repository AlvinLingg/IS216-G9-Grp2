<template>
    <div class="container mx-auto">
        <Navbar />
        <div class="section p-10 max-w-6xl m-auto">
            <Form @submit="handleSubmit" :validation-schema="schema" v-slot="{errors}">
                <h1 class="text-5xl font-bold">Create a new recipe</h1>

                <!-- Upload Image -->

                <div class="mt-5">
                    <label class="label-title text-slate-600">
                        Upload Image
                    </label>
                    <div class="w-32 h-32 border-2 border-dashed rounded-xl p-8 mt-2 cursor-pointer text-[#a5a5a5] hover:bg-blue-50 hover:border-blue-500 hover:text-blue-500"
                        @click="$refs.fileUploadInput.click()">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                            stroke="currentColor">
                            <path strokeLinecap=" round" strokeLinejoin="round"
                                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                    </div>

                    <input class="hidden" type="file" ref="fileUploadInput" accept="image/png, image/gif, image/jpeg"
                        multiple @change="handleFileSelection" />

                    <div class="grid grid-cols-3 gap-5 mt-5">
                        <div v-for="(url, index) in objectURLs" class="w-full border p-5 rounded-xl flex indicator">
                            <span class="indicator-item badge bg-[#e94249] border-[#e94249] py-3 cursor-pointer"
                                @click="removeImage(index)">x</span>
                            <div class="flex flex-row gap-5">
                                <img :src="url" :alt="index" class="rounded-xl object-cover w-12 h-12" />
                                <div class="flex flex-col justify-center">
                                    <span class="font-bold truncated">{{uploadedFiles[index].name}}</span>
                                    <span>{{formatBytes(uploadedFiles[index].size)}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <span class="text-red-500 text-sm">{{ errors.images }}</span>
                </div>

                <!-- Recipe Name -->
                <div class="mt-5">
                    <div class="grid grid-cols-3 gap-5">
                        <div class="flex flex-col col-span-3">
                            <label for="search" class="label-title text-slate-600">Recipe Name</label>
                            <Field type="text" class="p-3 mb-0.5 mt-2 w-full border border-gray-300 rounded"
                                name="recipeName" />
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
                        <input type="text" id="search" placeholder="Type here..." v-model="searchTerm"
                            class="p-3 mb-0.5 w-16S0 border border-gray-300 rounded" />
                    </div>
                    <ul v-if="searchIngredients.length"
                        class="rounded bg-white border border-gray-300 px-4 py-2 space-y-1 z-10 absolute">
                        <li class="px-1 pt-1 pb-2 font-bold border-b border-gray-200">
                            Showing {{ searchIngredients.length }} of {{ ingredients.length }} results
                        </li>
                        <li v-for="ingredient in searchIngredients" @click="selectIngredient(ingredient)"
                            class="cursor-pointer hover:bg-gray-100 p-1">
                            {{ ingredient }}
                        </li>
                    </ul>
                    <div class="flex text-lg pt-2 items-center" v-for="(item, key, index) in selectedIngredients"
                        :key="index">
                        <input class="input input-bordered w-full max-w-xs mr-4" type="number" placeholder="0"
                            @change="updateIngredientInput($event, key)" />
                        <select class="select select-bordered w-full max-w-xs mr-4"
                            @change="updateIngredientSelect($event, key)">
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
                        <span class="badge py-3 cursor-pointer bg-[#e94249] border-[#e94249]"
                            @click="removeIngredient(key)">remove</span>
                    </div>
                </div>

                <!-- Recipe Additional Information - Serving Size, Expected Cooking Time, Difficulty -->
                <div class="mt-5">
                    <div class="grid grid-cols-3 gap-5">
                        <div class="flex flex-col">
                            <label for="search" class="label-title text-slate-600">Serving size</label>
                            <Field type="number" class="p-3 mb-0.5 mt-2 w-full border border-gray-300 rounded"
                                name="servingSize" />
                            <span class="text-red-500 text-sm">{{ errors.servingSize }}</span>
                        </div>
                        <div class="flex flex-col">
                            <label for="search" class="label-title text-slate-600">Expected cooking time</label>
                            <Field type="number" class="p-3 mb-0.5 mt-2 w-full border border-gray-300 rounded"
                                name="cookingTime" /><span class="text-red-500 text-sm">{{ errors.cookingTime }}</span>
                        </div>
                        <div class="flex flex-col">
                            <label for="search" class="label-title text-slate-600">Difficulty</label>
                            <Field as="select" class="select select-bordered mb-0.5 mt-2 w-full border"
                                name="difficulty">
                                <option value="easy">Easy</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="hard">Hard</option>
                            </Field><span class="text-red-500 text-sm">{{ errors.difficulty }}</span>

                        </div>
                    </div>
                </div>

                <div class="form-control my-2.5 ">
                    <label class="label-title text-slate-600">Instructions</label>
                    <button class="btn mt-2" @click.prevent="addStep">Add a step</button>
                    <div v-for="(instructionStep, index) in instructionsSteps" class="mt-5">
                        <div
                            class=" w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                            <div class="flex justify-between items-center py-2 px-3 border-b dark:border-gray-600">
                                <span class="font-bold text-slate-600">Step {{ index + 1}}</span><span
                                    class="badge py-3 cursor-pointer font-bold text-slate-800 bg-transparent border-none"
                                    @click="removeStep(index)">x</span>
                            </div>
                            <div class="py-2 px-4 bg-white rounded-b-lg dark:bg-gray-800">
                                <textarea id="editor" rows="4"
                                    class="block px-0 w-full text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                                    placeholder="Describe the steps..." required :value="instructionStep"
                                    @input="updateSteps($event, index)"></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <button class="btn mt-2">CREATE</button>
            </Form>











        </div>
    </div>
</template>

<script setup>
import ingredients from "../../data/ingredients.json"
import { Form, Field, validate } from 'vee-validate';


import * as yup from 'yup';

// define validation schema
const schema = yup.object({
    recipeName: yup.string().required("Please enter a recipe name"),
    servingSize: yup.number().required("Serving size is required"),
    cookingTime: yup.number().required("Cooking time is required"),
    difficulty: yup.string().required("Difficulty is required"),
});


let fileUploadInput = ref("");
let uploadedFiles = ref([]);
let objectURLs = ref([]);

let searchTerm = ref("");
let selectedIngredients = ref(new Object());

let instructionsSteps = ref([]);

const searchIngredients = computed(() => {
    if (searchTerm.value === "") {
        return []
    }
    let matches = 0;
    return ingredients.filter((x) => {
        if (x.includes(searchTerm.value.toLowerCase()) && matches < 10) {
            matches++
            return x;
        }
    })
});

const selectIngredient = (ingredient) => {
    selectedIngredients.value[ingredient] = {
        amount: 0,
        unit: "tsp"
    };
    searchTerm.value = ''
}

const removeIngredient = (key) => {
    delete selectedIngredients.value[key];
}

const addStep = (e) => {
    e.preventDefault();
    instructionsSteps.value.push('');
}

const removeStep = (index) => {
    instructionsSteps.value.splice(index, 1);
}

const updateSteps = (e, index) => {
    instructionsSteps.value[index] = e.target.value;
}

const handleFileSelection = (e) => {
    console.log(e.target.files);
    console.log(schema);
    if (e.target.files.length + objectURLs.value.length > 5) {
        alert("You can only upload 5 images at a time");
        return;
    }

    for (const file of e.target.files) {
        objectURLs.value.push(URL.createObjectURL(file));
        uploadedFiles.value.push(file);
    }
}



const removeImage = (index) => {
    objectURLs.value.splice(index, 1);
    uploadedFiles.value.splice(index, 1);
}


const formatBytes = (bytes, decimals = 2) => {
    if (!+bytes) return '0 Bytes';

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

const updateIngredientInput = (e, key) => {
    selectedIngredients.value[key].amount = e.target.value;
    console.log("hh", selectedIngredients.value);
}

const updateIngredientSelect = (e, key) => {
    selectedIngredients.value[key].unit = e.target.value;
    console.log("ee", selectedIngredients.value);
}

const handleSubmit = async (values) => {
    // console.log(values);
    // if (uploadedFiles.value.length === 0) {
    //     alert("Please upload at least one image");
    //     return;
    // }

    // if (Object.keys(selectedIngredients.value).length === 0) {
    //     alert("Please select at least one ingredient");
    //     return;
    // }

    // if (instructionsSteps.value.length === 0) {
    //     alert("Please specify at least one step");
    //     return;
    // }

    // let temp = {
    //     ...values,
    //     ingredientsNeeded: selectedIngredients.value,
    //     instructions: instructionsSteps.value,
    // }


    // Upload files to S3
    let formData = new FormData();
    for (const file of uploadedFiles.value) {
        formData.append("files", file);
    }
    let { data: uploadResponse } = await useFetch("/api/upload", {
        headers: {
            "Content-Disposition": formData
        },
        method: "POST",
        body: formData
    })

    // update db -> send to api
    await useFetch("/api/createRecipe", {
        method: "POST",
        body: {
            ...values,
            ingredientsNeeded: selectedIngredients.value,
            instructions: instructionsSteps.value,
            images: uploadResponse.value.urls
        }
    })
}

</script>