<script setup>
import { useCommentsStore } from "~/store/commentsStore";
import { useUserStore } from "~/store/userStore";
import { Form, Field } from "vee-validate";
import { v1 as uuidv1 } from "uuid";

const commentsStore = useCommentsStore();
const commentsArray = commentsStore.comments;
const userStore = useUserStore();

const props = defineProps({
  commentId: {
    type: String,
  },
  currentComment: {
    type: Object,
  },
});

const toggleCollapse = () => {
  expanded.value = !expanded.value;
};
const toggleReply = () => {
  showReply.value = !showReply.value;
};
const toggleDelete = () => {
  // TODO: add delete confirmation
};

const childComments = commentsArray.filter(
  (comment) => comment.parentCommentId === props.commentId
);

const addComment = async (values) => {
  submitted.value = true;
  // TODO: Call api to add comment, refresh page
  let commentBody = values.replyBody;
  const { data } = await useFetch("/api/addComment", {
    method: "POST",
    body: {
      recipeId: props.currentComment.recipeId,
      parentCommentId: props.commentId,
      commentId: uuidv1() + props.currentComment.recipeId,
      userId: userStore.user.uniqueUserId,
      commentBody: commentBody,
    },
  });
  if (data) {
    success.value = true;
  }
};

const validateReply = (value) => {
  if (!value) {
    return "Reply cannot be empty";
  }
  return true;
};

const expanded = ref(true);
const showReply = ref(false);
const success = ref(false);
const submitted = ref(false);

const dateDifference = commentsStore.getDateDifference(
  props.currentComment.createdAt
);
</script>

<template>
  <div class="comment">
    <div class="grid grid-cols-[20px_auto]">
      <!-- COLLAPSE BAR (+/-) -->
      <div class="collapse-bar">
        <!-- TODO: Make unhighlightable (how??) -->
        <a class="collapse-button" @click="toggleCollapse">
          {{ expanded ? "-" : "+" }}
        </a>
      </div>

      <!-- COMMENT BODY OPEN -->
      <div v-if="expanded" class="comment-body pl-2">
        <!-- COMMENTER's DETAILS -->
        <div class="profile-details">
          <p>{{ props.currentComment.profileHandle }} | {{ dateDifference }}</p>
        </div>

        <!-- COMMENT BODY -->
        <div class="comment-text">
          {{ props.currentComment.commentBody }}
        </div>

        <!-- REPLY/EDIT BUTTONS -->
        <!-- TODO: beautify, make underline when hovered -->
        <div class="reply-delete">
          <a @click="toggleReply"> reply </a>
          <a @click="toggleDelete">Delete</a>
        </div>
        <div v-if="success" class="text-green-300">
          Successfully added comment! refresh to view changes!
        </div>
        <!-- TODO: WHY TF DOES THIS SHOW?? -->
        <!-- <div v-if="submitted && !success" class="text-red-600">
          An error has occurred. Please refresh the page and try again.
        </div> -->
        <div v-if="showReply" class="reply">
          <div class="form-control">
            <label class="label">
              <span class="label-text"
                >Speaking as: {{ userStore.user.profileHandle }}</span
              >
            </label>
            <Form @submit="addComment">
              <Field
                name="replyBody"
                as="textarea"
                placeholder="Add a reply"
                class="textarea textarea-bordered w-11/12 mr-10"
                :rules="validateReply"
              />
              <input type="submit" value="Submit" class="btn btn-sm mr-1" />
              <!-- TODO: WHY IS THIS SUBMITTING??/ -->
              <button class="btn btn-sm" @click="toggleReply">Cancel</button>
            </Form>

            <label class="label"> </label>
          </div>
        </div>

        <!-- MORE CHILD COMMENTS -->
        <div class="new_comment" v-for="comment in childComments">
          <Comment :comment-id="comment.commentId" :current-comment="comment" />
        </div>
      </div>

      <!-- COMMENT BODY CLOSE -->
      <div v-else class="comment-body">CLOSED</div>
    </div>
  </div>
</template>

<style scoped>
.comment {
  border: 1px solid black;
  margin: 3px;
}

.collapse-button {
  text-align: center;
  background-color: #e6e6e6;
  height: calc(100% - 4px);
  display: block;
  border-radius: 3px;
  margin: 2px 2px;
}
.collapse-button:hover {
  background-color: #c72424;
  cursor: pointer;
}
</style>
