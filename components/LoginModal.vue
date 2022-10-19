<script setup>
import { ErrorMessage, Form, Field } from "vee-validate";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
} from "unique-names-generator";

const userCookie = useCookie("user");
const { $magic } = useNuxtApp();
let loginSuccess = ref(false);
let emailSubmitted = ref(false);

const props = defineProps({
  modalName: {
    type: String,
    required: true,
  },
  mobile: {
    type: Boolean,
    required: true,
  },
});

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const userLogin = async (values) => {
  emailSubmitted.value = true;
  // Get all profile handles in DB
  const { data: allProfileHandles } = await useFetch(
    "/api/getAllProfileHandle",
    {
      method: "GET",
    }
  );

  // Generate new profile handle
  let newProfileHandle =
    uniqueNamesGenerator({
      dictionaries: [adjectives, colors],
      separator: "",
      style: "capital",
    }) + getRandomInt(1000);
  while (allProfileHandles.value.includes(newProfileHandle)) {
    newProfileHandle =
      uniqueNamesGenerator({
        dictionaries: [adjectives, colors],
        separator: "",
        style: "capital",
      }) + getRandomInt(1000);
  }

  try {
    await $magic.auth.loginWithMagicLink({
      email: values.email,
    });
    let metadata = await $magic.user.getMetadata();

    const { data: newCookie } = await useFetch("/api/userLogin", {
      method: "POST",
      body: {
        email: metadata.email,
        uniqueUserId: metadata.issuer,
        profileHandle: newProfileHandle,
      },
    });
    userCookie.value = newCookie.value;

    loginSuccess.value = true;
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  } catch (error) {
    console.log(error);
  }
};

const validateEmail = (value) => {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  if (!value) {
    return "Email is required";
  }
  if (!regex.test(value)) {
    return "This field must be a valid email";
  }

  return true;
};
</script>

<template>
  <label
    for="login-register-modal"
    class="btn modal-button"
    :class="mobile ? 'text-white mx-auto' : 'hidden lg:inline-flex'"
    >{{ props.modalName }}</label
  >

  <input type="checkbox" id="login-register-modal" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box max-w-sm relative py-[3rem] px-[2rem]">
      <label
        for="login-register-modal"
        class="btn btn-sm btn-ghost absolute right-2 top-2"
        >✕</label
      >
      <Form @submit="userLogin">
        <h3 class="text-2xl font-bold text-center">Sign In</h3>
        <div class="pt-4 px-4">
          <span class="text-sm text-slate-600"> Email Address </span>
          <Field
            name="email"
            type="email"
            placeholder="email@example.com"
            :rules="validateEmail"
            class="input input-bordered input-md w-full mt-1"
          />
          <ErrorMessage as="p" name="email" class="text-sm text-red-600 mt-1" />

          <div class="modal-action mt-5">
            <input
              v-if="!emailSubmitted"
              type="submit"
              value="Continue"
              class="btn-action primary-color"
            />
            <input
              v-else="!emailSubmitted"
              disabled
              value="Submitted. Please wait"
              class="btn-action primary-color"
            />
          </div>
          <div
            v-if="loginSuccess"
            class="bg-green-300 text-center p-3 mt-3 rounded-full"
          >
            <p>Login Successful!</p>
            <p>Refreshing...</p>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>
