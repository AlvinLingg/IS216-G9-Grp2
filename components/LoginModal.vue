<script setup>
const userCookie = useCookie("user");

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

const email = ref("");
const { $magic } = useNuxtApp();

const userLogin = async () => {
  // TODO: Add logic to validate email

  try {
    await $magic.auth.loginWithMagicLink({
      email: email.value,
    });
    let metadata = await $magic.user.getMetadata();

    const { data } = await useFetch("/api/userLogin", {
      method: "POST",
      body: {
        email: metadata.email,
        uniqueUserId: metadata.issuer,
      },
    });

    userCookie.value = data.value;
    // TODO: Add alert to say login successful, refreshing page in X seconds
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

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
      <h3 class="text-lg font-bold">
        Enter your email below to login/register!
      </h3>
      <p class="py-4">
        <input
          type="text"
          placeholder="email@example.com"
          class="input input-bordered input-md w-full max-w-xs mr-[10px]"
          v-model="email"
        /><input type="submit" value="Submit" class="btn" @click="userLogin" />
      </p>
    </div>
  </div>
</template>
