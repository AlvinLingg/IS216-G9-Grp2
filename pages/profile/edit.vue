
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

                </div>


                <div class="form-control">
                    <label class="label label-title text-slate-600">
                        <span class="label-text">Display Name</span>
                    </label>
                    <input type="text" class="input input-bordered w-full" :value="userStore.user.displayName" />
                </div>

                <div class="form-control">
                    <label class="label label-title text-slate-600">
                        <span class="label-text">Handle</span>
                    </label>
                    <input type="text" class="input input-bordered w-full" @change="validateHandle($event)"
                        @keyup="validateHandle($event)" v-model="userStore.user.profileHandle" />
                    <span v-if="!isHandleValid" class="mt-2 text-red-500 text-sm">That handle has been taken. Please
                        choose another
                        handle.</span>
                </div>


                <div class="form-control">
                    <label class="label label-title text-slate-600">
                        <span class="label-text">Address</span>
                    </label>
                    <input type="text" class="input input-bordered w-full" :value="userStore.user.address" />
                </div>
                <div class="w-[150px] self-end">
                    <button class="btn btn-action primary-color" @click="">
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

const validateHandle = async (e) => {
    // make sure no illegal characters before sending api request
    // no spaces etc

    const { data } = await useFetch("/api/getProfileByHandle", {
        initialCache: false,
        method: "GET",
        params: {
            handle: e.target.value
        }
    });

    if (data.value.Count == 1) {
        isHandleValid.value = false;
    } else {
        isHandleValid.value = true;
    }
}

console.log(userStore.user);

</script>