<script setup>
import { v1 as uuidv1 } from "uuid";
import { useUserStore } from "~/store/userStore";
import { Form, Field } from "vee-validate";
import { useCommentsStore } from "~/store/commentsStore";

const commentsStore = useCommentsStore();
const userStore = useUserStore();
const route = useRoute();
const recipeId = route.params.rid;
const emit = defineEmits(["refreshComments"]);

const validateComment = (value) => {
  if (!value) {
    return "A comment is needed!";
  }
  return true;
};

const addComment = async (values) => {
  let commentBody = values.commentBody;
  let commentId = uuidv1() + recipeId;
  const { data } = await useFetch("/api/addComment", {
    method: "POST",
    body: {
      recipeId: recipeId,
      parentCommentId: "0",
      commentId: commentId,
      userId: userStore.user.uniqueUserId,
      commentBody: commentBody,
    },
    initialCache: false,
  });
  if (data) {
    commentsStore.commentsScore.value[commentId] = {
      userVote: 1,
      voteCount: 1,
    };
    toastMessage.value = "Comment successfully submitted!";
    showToast();
    emit("refreshComments");
  }
};

const showToast = () => {
  success.value = true;
  setTimeout(() => {
    success.value = false;
  }, 5000);
};

const success = ref(false);
const toastMessage = ref("");
</script>

<template>
  <div>
    <ToastCommentSuccess v-if="success" :toast-message="toastMessage" />
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
    <div v-else>
      <Form @submit="addComment">
        <Field
          name="commentBody"
          as="textarea"
          placeholder="Add a comment"
          class="textarea textarea-bordered max-w-[500px] w-full h-[100px] mr-10 block"
          :rules="validateComment"
        />
        <input type="submit" value="Submit" class="btn btn-sm mr-1 mt-1 mb-3" />
      </Form>
    </div>
  </div>
</template>

<style></style>
