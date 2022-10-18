<script setup>
import { ErrorMessage, Form, Field } from "vee-validate";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  NumberDictionary,
} from "unique-names-generator";

const userCookie = useCookie("user");
const { $magic } = useNuxtApp();
let loginSuccess = false;

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

    const { data: allProfileHandles } = await useFetch(
      "/api/getAllProfileHandle",
      {
        method: "GET",
      }
    );
    console.log("allprofilehandlesss", allProfileHandles);

    const { data: newCookie } = await useFetch("/api/userLogin", {
      method: "POST",
      body: {
        email: metadata.email,
        uniqueUserId: metadata.issuer,
        profileHandle: newProfileHandle,
      },
    });
    userCookie.value = newCookie.value;
    loginSuccess = true;
    setTimeout(() => {
      window.location.reload();
    }, 3000);
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

// TODO: update profile page
const updateEmail = async () => {
  try {
    await $magic.user.updateEmail({
      email: "wad2wadd2@gmail.com",
    });
  } catch (error) {
    console.log(error);
  }
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
    <div class="modal-box relative">
      <label
        for="login-register-modal"
        class="btn btn-sm btn-circle absolute right-2 top-2"
        >✕</label
      >
      <Form @submit="userLogin">
        <h3 class="text-lg font-bold">
          Enter your email below to login/register!
        </h3>
        <p class="py-4">
          <Field
            name="email"
            type="email"
            placeholder="email@example.com"
            :rules="validateEmail"
            class="input input-bordered input-md w-full max-w-xs mr-[10px]"
          /><input type="submit" value="Submit" class="btn" />
        </p>
        <ErrorMessage name="email" class="text-red-600" />
        <span v-if="loginSuccess"
          >Login Successful! Refreshing in 3 seconds!</span
        >
      </Form>
    </div>
  </div>
</template>
