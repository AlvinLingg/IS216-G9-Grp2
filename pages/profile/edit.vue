
<template>
    <div class="container mx-auto">
        <Navbar />
        <div class="section p-10 max-w-6xl m-auto">
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
                    <input type="text" class="input input-bordered w-full" />
                </div>

                <div class="form-control">
                    <label class="label label-title text-slate-600">
                        <span class="label-text">Handle</span>
                    </label>
                    <input type="text" class="input input-bordered w-full" />
                </div>


                <div class="form-control">
                    <label class="label label-title text-slate-600">
                        <span class="label-text">Email Address</span>
                    </label>
                    <input type="text" class="input input-bordered w-full" disabled />
                </div>

                <div class="form-control">
                    <label class="label label-title text-slate-600">
                        <span class="label-text">Address</span>
                    </label>
                    <input type="text" class="input input-bordered w-full" />
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