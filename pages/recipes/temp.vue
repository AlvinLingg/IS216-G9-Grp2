<template>
    <div class="container mx-auto">
        <Navbar />
        <div class="section p-10 max-w-6xl m-auto">
            <div>
                <h1 class="text-5xl font-bold">Create a new recipe</h1>

                <!-- Upload Image -->
                <input type="file" ref="fileUploadInput" accept="image/png, image/gif, image/jpeg" multiple
                    @change="handleFileSelection" />

                <button class="btn mt-2" @click="handleUpload">CREATE</button>
            </div>

        </div>
    </div>
    <button @click="showMessageFromBackend">Show message from backend</button>

    <img v-for="imageUrl in fileUrls" :src="imageUrl" />
</template>

<script setup>
import ingredients from "../../data/ingredients.json"
let uploadedFiles = ref();
let heyaa = ref("");

const handleFileSelection = (e) => {
    console.log(e.target.files);
    uploadedFiles.value = e.target.files;
}

const handleUpload = async () => {

    // loop through each file -> fetch s3 url, upload fetchs3 upload

    let formData = new FormData();
    for (let file of uploadedFiles.value) {
        formData.append("files", file);
    }

    await useFetch("/api/test", {
        headers: {
            "Content-Disposition": formData
        },
        method: "POST",
        body: formData
    })

    // for (let file of uploadedFiles.value) {

    //     const { data: s3Url } = await useFetch("/api/s3Url", {
    //         method: "post",

    //     });
    //     console.log(s3Url.value);
    //     fileSet.add(s3Url.value);
    //     // console.log(s3Url.value);

    //     // const { data: uploadedUrl, error } = await useFetch(s3Url.value, {
    //     //     method: "put",
    //     //     headers: {
    //     //         "Content-Type": "multipart/form-data"
    //     //     },
    //     //     body: uploadedFiles.value[0],
    //     // });

    //     // console.log(uploadedUrl.value);
    //     // fileUrls.push(s3Url.value.split("?")[0]);
    // }
    // console.log(fileUrls);
    // console.log("sett", fileSet);
}


</script>