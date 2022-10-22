<script setup>
import { v1 as uuidv1 } from "uuid";
import { useUserStore } from "~/store/userStore";
import { Form, Field } from "vee-validate";

const userStore = useUserStore();
const route = useRoute();
const recipeId = route.params.rid;

const validateComment = (value) => {
  if (!value) {
    return "A comment is needed!";
  }
  return true;
};

const addComment = async (values) => {
  // TODO: Callapi to add comment, refresh page
  let commentBody = values.commentBody;
  const { data } = await useFetch("/api/addComment", {
    method: "POST",
    body: {
      recipeId: recipeId,
      parentCommentId: "0",
      commentId: uuidv1() + recipeId,
      userId: userStore.user.uniqueUserId,
      commentBody: commentBody,
    },
  });
  if (data) {
    success.value = true;
  }
};

const success = ref(false);
</script>

<template>
  <div>
    <div v-if="!userStore.user">
      <a href="#login-register-modal">
        <div class="relative max-w-[500px] h-[100px] flex">
          <textarea
            class="textarea textarea-bordered w-full h-full top-0 left-0 cursor-pointer absolute"
          ></textarea>
          <div class="text-center z-10 mx-auto my-auto">
            <p>Have a comment?</p>
            <p class="btn">Sign in now!</p>
          </div>
        </div>
      </a>
    </div>
    <div>
      <Form @submit="addComment">
        <Field
          name="commentBody"
          as="textarea"
          placeholder="Add a comment"
          class="textarea textarea-bordered max-w-[500px] w-full h-[100px] mr-10"
          :rules="validateComment"
        />
        <input type="submit" value="Submit" class="btn btn-sm mr-1" />
      </Form>
      <div v-if="success" class="text-green-300">
        Successfully added comment! refresh to view changes!
      </div>
    </div>
  </div>
</template>

<style></style>
