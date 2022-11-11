<script setup>
import { useCommentsStore } from "~/store/commentsStore";
import { useUserStore } from "~/store/userStore";
import { Form, Field } from "vee-validate";
import { v4 as uuidv4 } from "uuid";

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
const toggleDeleteConfirmation = () => {
  showDeleteConfirmation.value = !showDeleteConfirmation.value;
};

const childComments = commentsArray.filter(
  (comment) => comment.parentCommentId === props.commentId
);

const addCommentReply = async (values) => {
  submitted.value = true;
  let commentBody = values.replyBody;
  let commentId = uuidv4() + props.currentComment.recipeId;
  const { data } = await useFetch("/api/addComment", {
    method: "POST",
    body: {
      recipeId: props.currentComment.recipeId,
      parentCommentId: props.commentId,
      commentId: commentId,
      userId: userStore.user.uniqueUserId,
      commentBody: commentBody,
    },
    initialCache: false,
  });
  if (data) {
    repliedComment.value = {
      commentBody: commentBody,
      commentId: commentId,
      createdAt: new Date().toISOString(),
      parentCommentId: props.commentId,
      profileHandle: userStore.user.profileHandle,
      recipeId: props.currentComment.recipeId,
      userId: userStore.user.uniqueUserId,
    };
    commentsStore.commentsScore.value[commentId] = {
      userVote: 1,
      voteCount: 1,
    };
    toastMessage.value = "Comment successfully submitted!";
    showToast();
    showReply.value = false;
    replied.value = true;
  }
};

const deleteComment = async () => {
  const { data } = await useFetch("/api/deleteComment", {
    method: "POST",
    body: {
      commentId: props.commentId,
      recipeId: props.currentComment.recipeId,
    },
    initialCache: false,
  });
  if (data) {
    toastMessage.value = "Comment successfully deleted!";
    commentDeleted.value = true;
    showDeleteConfirmation.value = false;
    showToast();
  }
};

const validateReply = (value) => {
  if (!value) {
    return "Reply cannot be empty";
  }
  return true;
};

const showToast = () => {
  success.value = true;
  setTimeout(() => {
    success.value = false;
  }, 5000);
};

const expanded = ref(true);
const showReply = ref(false);
const success = ref(false);
const submitted = ref(false);
const replied = ref(false);
const showDelete = userStore.user
  ? userStore.user.uniqueUserId === props.currentComment.userId
  : false;
const showDeleteConfirmation = ref(false);
const toastMessage = ref("");
const commentDeleted = ref(false);
const repliedComment = ref({});

const dateDifference = commentsStore.getDateDifference(
  props.currentComment.createdAt
);
</script>

<template>
  <div class="comment">
    <ToastCommentSuccess v-if="success" :toast-message="toastMessage" />
    <div class="grid grid-cols-[20px_calc(100%-20px)]">
      <!-- COLLAPSE BAR (+/-) -->
      <div class="collapse-bar">
        <!-- TODO: Try to save comments expanded/collapsed state -->
        <a class="collapse-button select-none" @click="toggleCollapse">
          {{ expanded ? "-" : "+" }}
        </a>
      </div>

      <!-- COMMENT BODY OPEN -->
      <div v-if="expanded" class="comment-body pl-2">
        <!-- COMMENTER's DETAILS -->
        <div class="profile-details">
          <p>
            <nuxt-link
              v-if="props.currentComment.profileHandle !== '[deleted]'"
              :to="`/profile/${props.currentComment.profileHandle}`"
              class="text-blue-600 profile_handle"
            >
              <ProfileIcon
                :profilePicture="currentComment.profilePicture"
                :profileHandle="currentComment.profileHandle"
                :profilePage="false"
              />
              {{ props.currentComment.profileHandle }}
            </nuxt-link>
            <span v-else>[deleted]</span>
            |
            <span
              :title="`${new Date(
                props.currentComment.createdAt
              ).toLocaleString()}`"
            >
              {{ dateDifference }}
            </span>
          </p>
        </div>

        <!-- COMMENT BODY -->
        <div class="comment-text break-words">
          {{
            commentDeleted
              ? "Comment has been deleted"
              : props.currentComment.commentBody
          }}
        </div>

        <!-- REPLY/DELETE BUTTONS -->
        <div class="comment-menu inline-flex">
          <CommentVote :commentId="props.commentId" />
          <a
            v-if="!userStore.user"
            href="#login-register-modal"
            class="comment-menu-item"
          >
            reply
          </a>
          <a
            v-else-if="!replied"
            @click="toggleReply"
            class="comment-menu-item"
          >
            reply
          </a>
          <a v-else class="comment-menu-item"> replied </a>
          <a
            v-if="showDelete && !commentDeleted"
            @click="toggleDeleteConfirmation"
            class="comment-menu-item"
            >delete</a
          >
          <div v-if="showDeleteConfirmation" class="inline text-rose-500">
            <span class="comment-menu-item" @click="deleteComment"> yes </span>
            /
            <span class="comment-menu-item" @click="toggleDeleteConfirmation">
              no
            </span>
          </div>
        </div>
        <div v-if="showReply" class="reply">
          <div class="form-control">
            <label class="label">
              <span class="label-text"
                >Speaking as: {{ userStore.user.profileHandle }}</span
              >
            </label>
            <Form @submit="addCommentReply">
              <Field
                name="replyBody"
                as="textarea"
                placeholder="Add a reply"
                class="textarea textarea-bordered max-w-[500px] w-full h-[100px] block"
                :rules="validateReply"
              />
              <div class="mt-1">
                <input type="submit" value="Submit" class="btn btn-sm mr-1" />
                <button class="btn btn-sm" @click="toggleReply">Cancel</button>
              </div>
            </Form>

            <label class="label"> </label>
          </div>
        </div>

        <!-- Newest Reply -->
        <div v-if="replied" class="replied-comment">
          <Comment
            :current-comment="repliedComment"
            :comment-id="repliedComment.commentId"
            :key="comment.commentId"
          />
        </div>

        <!-- MORE CHILD COMMENTS -->
        <div class="child-comment" v-for="comment in childComments">
          <Comment :comment-id="comment.commentId" :current-comment="comment" />
        </div>
      </div>

      <!-- COMMENT BODY CLOSE -->
      <div v-else class="comment-body pl-1">
        <div class="profile-details">
          <p>
            <nuxt-link
              v-if="props.currentComment.profileHandle !== '[deleted]'"
              :to="`/profile/${props.currentComment.profileHandle}`"
              class="text-blue-600 profile_handle"
            >
              <ProfileIcon
                :profilePicture="currentComment.profilePicture"
                :profileHandle="currentComment.profileHandle"
                :profilePage="false"
              />
              {{ props.currentComment.profileHandle }}
            </nuxt-link>
            <span v-else>[deleted]</span>
            |
            <span
              :title="`${new Date(
                props.currentComment.createdAt
              ).toLocaleString()}`"
            >
              {{ dateDifference }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.comment {
  border: 1px solid black;
  margin: 3px;
  margin-left: 0px;
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

.profile_handle:hover {
  text-decoration: underline;
}

.comment-menu {
  color: #888888;
}
.comment-menu-item {
  cursor: pointer;
  margin-left: 5px;
  margin-right: 5px;
}
.comment-menu-item:hover {
  text-decoration: underline;
}
</style>
