<script setup>
import { useCommentsStore } from "~/store/commentsStore";
const route = useRoute();
const recipeId = route.params.rid;

const { data: commentsArray } = await useFetch("/api/getCommentsForRecipe", {
  method: "GET",
  params: { recipeId: recipeId },
});

console.log(commentsArray.value);

const commentsStore = useCommentsStore();
commentsStore.setComments([]);
commentsStore.setComments(commentsArray.value);
const childComments = commentsArray.value.filter(
  (comment) => comment.parentCommentId == 0
);
</script>

<template>
  <div class="container mx-auto">
    <div v-for="comment in childComments">
      <Comment :comment-Id="comment.commentId" :current-comment="comment" />
    </div>
  </div>
</template>

<style></style>
