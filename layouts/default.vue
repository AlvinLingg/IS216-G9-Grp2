<template>
    <div>
        <div class="w-full sticky top-0 z-50 bg-white" :style="{boxShadow:'rgb(0 0 0 / 4%) 0px 4px 15px'}">
            <Navbar />
        </div>
        <div class="pt-[3rem]">
            <slot />
        </div>
    </div>
</template>