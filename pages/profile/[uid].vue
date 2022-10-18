<template>
    <div class="container mx-auto">
        <Navbar />
        <div class="section p-10 max-w-6xl m-auto">
            <div class="flex gap-5 justify-center">
                <div
                    class="inline-flex overflow-hidden relative justify-center items-center w-[100px] h-[100px] bg-gray-100 rounded-full dark:bg-gray-600">
                    <span class="font-medium text-gray-600 dark:text-gray-300">BY</span>
                </div>
                <div>
                    <h1 class="text-3xl font-bold">BYTAN</h1>
                    <p class="text-sm text-slate-600">@bytan</p>
                    <div class="flex gap-3 mt-3">
                        <button class="btn" @click="">
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>

            <div class="tabs font-semibold mt-10">
                <a @click="toggleTab(0)"
                    :class="{'tab text-3xl tab-active': openTab === 0, 'tab text-3xl': openTab !== 0}">My recipes</a>
                <a @click="toggleTab(1)"
                    :class="{'tab text-3xl tab-active': openTab === 1, 'tab text-3xl': openTab !== 1}">Liked recipes</a>
            </div>

            <div
                :class="{'h-[100px] bg-blue mt-10 px-[1rem]' : openTab === 0, 'h-[100px] bg-blue mt-10 px-[1rem] hidden' : openTab !== 0 }">
                You have not created any recipes</div>
            <div
                :class="{'h-[100px] bg-blue mt-10 px-[1rem]' : openTab === 1, 'h-[100px] bg-blue mt-10 px-[1rem] hidden' : openTab !== 1 }">
                You have not liked any recipes.</div>
        </div>
    </div>
</template>

<script setup>
const route = useRoute();
const openTab = ref(0);
const userProfile = ref({});

onMounted(async () => {
    const { data: tempUserProfile } = await useFetch("/api/getProfileByHandle", {
        method: "GET",
        params: {
            id: route.params.uid,
        },
    });

    userProfile.value = tempUserProfile.value["Items"][0];

    console.log(userProfile.value);
});


const toggleTab = (index) => {
    openTab.value = index;
};

</script>