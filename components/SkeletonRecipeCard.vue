<script setup>

const props = defineProps({
    noOfLines: {
        type: Number,
        default: 1,
        required: true,
    },
})
</script>

<template>
    <div class="border shadow rounded-2xl p-2 max-w-sm w-full mx-auto">
        <div class="animate-pulse">
            <div class="rounded-lg w-full bg-slate-200 h-[200px]"></div>
            <div class="flex-1 mt-[1rem] pb-2">
                <div v-for="n in noOfLines" class="h-2 bg-slate-200 rounded mt-2" :key="n"></div>
            </div>
        </div>
    </div>
</template>