<template>
  <div class="container mx-auto">
    <Navbar />
    <div v-if="userStore.user === null" class="section p-10 max-w-6xl m-auto">
      <NoExist />
    </div>

    <div v-else class="section p-10 max-w-6xl m-auto">
      <h1 class="text-5xl font-bold">Edit Profile</h1>
      <div class="flex flex-col gap-5 mt-5 justify-center">
        <div class="form-control">
          <label class="label label-title text-slate-600">
            <span class="label-text">Profile Image</span>
          </label>

          <div
            class="w-32 h-32 border-2 border-dashed rounded-xl p-8 cursor-pointer text-[#a5a5a5] hover:bg-blue-50 hover:border-blue-500 hover:text-blue-500"
            @click="$refs.fileUploadInput.click()">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="{1.5}"
              stroke="currentColor">
              <path strokeLinecap=" round" strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          <input class="hidden" type="file" ref="fileUploadInput" accept="image/png, image/gif, image/jpeg"
            @change="handleFileSelection" />
        </div>

        <div class="form-control">
          <label class="label label-title text-slate-600">
            <span class="label-text">Display Name</span>
          </label>
          <input type="text" class="input input-bordered w-full" v-model="displayName" />
        </div>

        <div class="form-control">
          <label class="label label-title text-slate-600">
            <span class="label-text">Handle</span>
          </label>
          <input type="text" class="input input-bordered w-full" @change="validateHandle($event)"
            @keyup="validateHandle($event)" @paste="validateHandle($event)" v-model="userHandle" />
          <span v-if="!isHandleValid" class="mt-2 text-red-500 text-sm">That handle has been taken. Please choose
            another handle.</span>
          <span v-if="isHandleEmpty" class="mt-2 text-red-500 text-sm">Profile handle cannot be empty. Please choose
            a handle.</span>
        </div>
        <div class="w-[150px] self-end">
          <button class="btn btn-action primary-color" @click="saveProfile">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "~~/store/userStore";
const route = useRoute();
const userStore = useUserStore();
const isHandleValid = ref(true);
const isHandleEmpty = ref(false);
const userHandle = ref(userStore.user.profileHandle);
const displayName = ref(userStore.user.displayName);

const validateHandle = async (e) => {
  // make sure no illegal characters before sending api request
  // no spaces etc
  if (e.target.value.length === 0) {
    isHandleEmpty.value = true;
    return;
  }
  else {
    isHandleEmpty.value = false;
  }

  console.log("validateblock", e.target.value, userStore.user.profileHandle);
  if (userStore.user.profileHandle === e.target.value) {
    isHandleValid.value = true;
    return;
  }

  const { data } = await useFetch("/api/getProfileByHandle", {
    initialCache: false,
    method: "GET",
    params: {
      handle: e.target.value,
    },
  });
  console.log(userStore.user.profileHandle);
  console.log("hehe", data.value);
  if (data.value === undefined || data.value === null || Object.keys(data.value).length == 1) {
    isHandleValid.value = false;
  } else {
    isHandleValid.value = true;
  }
};

const handleFileSelection = (e) => {
  console.log(e.target.files[0]);
};

const saveProfile = () => {
  console.log("submitted hand", userHandle.value);
  console.log("submitted display", displayName.value);
}
</script>
