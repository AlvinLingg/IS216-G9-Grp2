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
  commentsStore.commentsState[props.commentId] = expanded.value;
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
      profilePicture: userStore.user.profilePicture,
      recipeId: props.currentComment.recipeId,
      userId: userStore.user.uniqueUserId,
    };
    commentsStore.commentsScore.value[commentId] = {
      userVote: 1,
      voteCount: 1,
    };
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
    commentDeleted.value = true;
    showDeleteConfirmation.value = false;
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
const submitted = ref(false);
const replied = ref(false);
const showDelete = userStore.user
  ? userStore.user.uniqueUserId === props.currentComment.userId
  : false;
const showDeleteConfirmation = ref(false);
const commentDeleted = ref(false);
const repliedComment = ref({});

if (props.commentId in commentsStore.commentsState) {
  expanded.value = commentsStore.commentsState[props.commentId];
} else {
  commentsStore.commentsState[props.commentId] = expanded.value;
}

const dateDifference = commentsStore.getDateDifference(
  props.currentComment.createdAt
);
</script>

<template>
  <div class="comment text-xs">
    <div>
      <svg
        src="~/assets/expand.svg"
        width="20"
        height="20"
        class="inline ml-[5px] mr-[10px] expand-button"
        :class="!expanded ? 'active' : ''"
        @click="
          () => {
            if (!expanded) {
              toggleCollapse();
            }
          }
        "
        x="0px"
        y="0px"
        viewBox="0 0 60 60"
        style="enable-background: new 0 0 60 60"
        xml:space="preserve"
      >
        <g>
          <path
            d="M59,22c-0.553,0-1-0.448-1-1V1c0-0.552,0.447-1,1-1s1,0.448,1,1v20C60,21.552,59.553,22,59,22z"
          />
          <path
            d="M59,2H39c-0.553,0-1-0.448-1-1s0.447-1,1-1h20c0.553,0,1,0.448,1,1S59.553,2,59,2z"
          />
          <path
            d="M35,26c-0.256,0-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414l24-24
  c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414l-24,24C35.512,25.902,35.256,26,35,26z"
          />
          <path
            d="M1,60c-0.553,0-1-0.448-1-1V39c0-0.552,0.447-1,1-1s1,0.448,1,1v20C2,59.552,1.553,60,1,60z"
          />
          <path
            d="M21,60H1c-0.553,0-1-0.448-1-1s0.447-1,1-1h20c0.553,0,1,0.448,1,1S21.553,60,21,60z"
          />
          <path
            d="M1,60c-0.256,0-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414l24-24
  c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414l-24,24C1.512,59.902,1.256,60,1,60z"
          />
        </g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
      </svg>

      <div
        class="profile-details inline-block"
        :class="!expanded ? 'active' : ''"
      >
        <nuxt-link
          v-if="props.currentComment.profileHandle !== '[deleted]'"
          :to="`/profile/${props.currentComment.profileHandle}`"
          class="text-blue-600 profile_handle"
        >
          <ProfileIcon
            :profilePicture="currentComment.profilePicture"
            :profileHandle="currentComment.profileHandle"
            :profilePage="false"
            class="mr-[3px]"
          />
          {{ props.currentComment.profileHandle }}
        </nuxt-link>
        <span v-else>[deleted]</span>
        <span
          :title="`${new Date(
            props.currentComment.createdAt
          ).toLocaleString()}`"
        >
          ·
          {{ dateDifference }}
        </span>
      </div>
    </div>
    <div v-if="expanded" class="grid grid-cols-[28px_calc(100%-28px)]">
      <div class="collapse-bar" @click="toggleCollapse">
        <a class="collapse-button"> </a>
      </div>
      <div class="comment-body pl-2">
        <p
          class="comment-text break-words text-base"
          :class="commentDeleted ? 'italic' : ''"
        >
          {{
            commentDeleted
              ? "Comment has been deleted"
              : props.currentComment.commentBody
          }}
        </p>

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
          />
        </div>

        <!-- MORE CHILD COMMENTS -->
        <div class="child-comment" v-for="comment in childComments">
          <Comment
            :comment-id="comment.commentId"
            :current-comment="comment"
            :key="comment.commentId"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-details {
  transition: all 0.5s;
  transform: translateX(-35px);
}
.profile-details.active {
  transform: translateX(0px);
}
.comment {
  margin: 10px 0px;
}
.collapse-bar {
  padding: 13px;
}
.collapse-bar:hover {
  cursor: pointer;
}
.expand-button {
  transition: all 0.5s;
  transform: translateX(-35px);
  fill: white;
}
.expand-button.active {
  fill: #7e7e7e;
  transform: translateX(0);
}
.expand-button.active:hover {
  fill: #ffd780;
  cursor: pointer;
}
.collapse-button {
  width: 2px;
  text-align: center;
  background-color: #e6e6e6;
  height: calc(100% - 4px);
  display: block;
  border-radius: 2px;
  margin: 2px 2px;
}
.collapse-bar:hover .collapse-button {
  background-color: #ffd780;
}

.profile_handle:hover {
  text-decoration: underline;
}

.comment-menu {
  color: #888888;
}
.comment-menu-item {
  cursor: pointer;
  margin: auto 5px;
}
.comment-menu-item:hover {
  text-decoration: underline;
}
</style>
