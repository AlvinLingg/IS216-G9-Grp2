<script setup>
import { useCommentsStore } from "~/store/commentsStore";

const route = useRoute();
const recipeId = route.params.rid;
const {
  data: commentsArray,
  pending,
  refresh: refreshCommentsFetch,
} = await useFetch("/api/getCommentsForRecipe", {
  method: "GET",
  params: { recipeId: recipeId },
  initialCache: false,
});

const commentsStore = useCommentsStore();
commentsStore.setComments([]);
commentsStore.setComments(commentsArray.value);
const childComments = ref([]);

const populateChildComments = () => {
  let tempArray = [];
  commentsArray.value
    .filter((comment) => comment.parentCommentId == "0")
    .forEach((element) => {
      tempArray.push(element);
    });
  childComments.value = tempArray;
};

const refreshComments = () => {
  refreshCommentsFetch();
};

watch(commentsArray, () => {
  populateChildComments();
});

populateChildComments();
</script>

<template>
  <!-- TODO: Upvoting and Downvoting -->
  <div class="container mx-auto">
    <LoginModal />
    <!-- TODO: Add gif here maybe? -->
    <div v-if="pending">Loading Comments...</div>
    <div v-else>
      <h1
        v-if="commentsArray.length > 0"
        class="text-3xl font-semibold leading-relaxed"
      >
        Comments({{ commentsArray.length }})
      </h1>
      <h1 v-else class="text-3xl font-semibold leading-relaxed">
        No comments yet!<br />
        Be the first to say something!
      </h1>
      <CommentsForm @refreshComments="refreshComments()" />
      <div class="child-comments">
        <div v-for="comment in childComments">
          <Comment :comment-Id="comment.commentId" :current-comment="comment" />
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
