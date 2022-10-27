<script setup>
import { useCommentsStore } from "~/store/commentsStore";
import { useUserStore } from "~/store/userStore";

const route = useRoute();
const recipeId = route.params.rid;
const userStore = useUserStore();
const commentsStore = useCommentsStore();

const {
  data: commentsArray,
  pending,
  refresh: refreshCommentsFetch,
} = await useFetch("/api/getCommentsForRecipe", {
  method: "GET",
  params: { recipeId: recipeId },
  initialCache: false,
});

const { data: voteData, refresh: refreshVotesFetch } = await useFetch(
  "/api/getCommentScore",
  {
    method: "GET",
    params: {
      recipeId: recipeId,
      userId: !userStore.user ? null : userStore.user.uniqueUserId,
    },
    initialCache: false,
  }
);
commentsStore.setCommentsScore(voteData);

commentsStore.setComments([]);
commentsStore.setComments(commentsArray.value);
const childComments = ref([]);

const populateCommentsStore = () => {
  let tempArray = [];
  commentsArray.value
    .filter((comment) => comment.parentCommentId == "0")
    .forEach((element) => {
      tempArray.push(element);
    });
  childComments.value = tempArray;

  commentsStore.setCommentsScore(voteData);
};

const refreshComments = () => {
  refreshCommentsFetch();
  refreshVotesFetch();
};

watch(commentsArray, () => {
  populateCommentsStore();
});

populateCommentsStore();
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
