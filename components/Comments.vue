<script setup>
import { useCommentsStore } from "~/store/commentsStore";
import { useUserStore } from "~/store/userStore";

const route = useRoute();
const recipeId = route.params.rid;
const userStore = useUserStore();
const commentsStore = useCommentsStore();
const parentCommentId = ref("0");

const { data: commentsArray, pending } = await useFetch(
  "/api/getCommentsForRecipe",
  {
    method: "GET",
    params: { recipeId: recipeId },
    initialCache: false,
  }
);

const { data: voteData } = await useFetch("/api/getCommentScore", {
  method: "GET",
  params: {
    recipeId: recipeId,
    userId: !userStore.user ? null : userStore.user.uniqueUserId,
  },
  initialCache: false,
});
commentsStore.setCommentsScore(voteData);

commentsStore.setComments([]);
commentsStore.setComments(commentsArray.value);
</script>

<template>
  <div class="container mx-auto">
    <LoginModal />
    <div v-if="pending">
      <div class="text-center py-6">
        <p class="font-bold text-3xl">Loading Comments...</p>
      </div>
      <div style="border-top-color: transparent" class="spinner"></div>
    </div>
    <div v-else>
      <h1
        v-if="commentsArray.length > 0"
        class="text-3xl font-semibold leading-relaxed mb-[10px]"
      >
        Comments ({{ commentsArray.length }})
      </h1>
      <h1 v-else class="text-3xl font-semibold leading-relaxed mb-[10px]">
        No comments yet!<br />
        Be the first to say something!
      </h1>
      <CommentsForm />
      <div class="child-comments">
        <div v-for="comment in commentsStore.comments">
          <Comment
            v-if="comment.parentCommentId == parentCommentId"
            :comment-Id="comment.commentId"
            :current-comment="comment"
            :key="comment.commentId"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
