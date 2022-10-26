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
      ridCidUid: `${rid}-${props.commentId}-${userStore.user.uniqueUserId}`,
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
      width="24"
      height="24"
      class="cursor-pointer hover:text-green-300 mx-1"
      :class="vote === 1 ? 'text-green-500' : ''"
      @click="handleUpvote"
    />
    <!-- Vote Count -->
    <span class="mx-1">{{ voteCount }}</span>
    <!-- Downvote -->
    <AngleLine
      width="24"
      height="24"
      class="rotate-180 cursor-pointer hover:text-red-400 mx-1"
      :class="vote === -1 ? 'text-red-600' : ''"
      @click="handleDownvote"
    />
  </div>
</template>

<style></style>
