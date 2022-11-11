<script setup>
import AngleLine from "~icons/clarity/angle-line";
import { useUserStore } from "~/store/userStore";
import { useCommentsStore } from "~/store/commentsStore";

const props = defineProps({
  commentId: {
    type: String,
  },
});

const commentsStore = useCommentsStore();
const route = useRoute();
const rid = route.params.rid;
const userStore = useUserStore();

const vote = ref(0);
const voteCount = ref(0);

const handleUpvote = () => {
  if (vote.value === 1) {
    vote.value = 0;
    voteCount.value -= 1;
  } else if (vote.value === 0) {
    vote.value = 1;
    voteCount.value += 1;
  } else if (vote.value === -1) {
    vote.value = 1;
    voteCount.value += 2;
  }
  postVoteToApi(vote.value);
};
const handleDownvote = () => {
  if (vote.value === -1) {
    vote.value = 0;
    voteCount.value += 1;
  } else if (vote.value === 0) {
    vote.value = -1;
    voteCount.value -= 1;
  } else if (vote.value === 1) {
    vote.value = -1;
    voteCount.value -= 2;
  }
  postVoteToApi(vote.value);
};

const postVoteToApi = (voteValue) => {
  useFetch("/api/voteComment", {
    method: "POST",
    body: {
      recipeId: rid,
      commentId: props.commentId,
      userId: userStore.user.uniqueUserId,
      vote: voteValue,
    },
    initialCache: false,
  });
};
vote.value = commentsStore.commentsScore.value[props.commentId].userVote;
voteCount.value = commentsStore.commentsScore.value[props.commentId].voteCount;
</script>

<template>
  <div class="vote-section inline-flex">
    <!-- Upvote -->
    <AngleLine
      width="20"
      height="20"
      class="cursor-pointer hover:text-green-300 "
      :class="vote === 1 ? 'text-green-500' : ''"
      @click="handleUpvote"
    />
    <!-- Vote Count -->
    <span class="mx-1 my-auto">{{ voteCount }}</span>
    <!-- Downvote -->
    <AngleLine
      width="20"
      height="20"
      class="rotate-180 cursor-pointer hover:text-red-400"
      :class="vote === -1 ? 'text-red-600' : ''"
      @click="handleDownvote"
    />
  </div>
</template>

<style></style>
