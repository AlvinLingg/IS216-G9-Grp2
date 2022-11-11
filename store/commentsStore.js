import { defineStore } from "pinia";

export const useCommentsStore = defineStore("comments", () => {
  const comments = ref([]);
  const commentsScore = ref({});
  function setCommentsScore(scoreObject) {
    commentsScore.value = scoreObject;
  }
  function setComments(newComments) {
    comments.value = newComments;
  }
  function addNewComment(newComment) {
    comments.value.unshift(newComment);
  }
  function getDateDifference(dateIsoString) {
    const currentDateTime = new Date();
    const pastDate = new Date(dateIsoString);
    const diffMs = currentDateTime - pastDate;
    const diffYrs = Math.floor(diffMs / 31536000000); // years
    const diffDays = Math.floor(diffMs / 86400000); // days
    const diffHrs = Math.floor(diffMs / 3600000); // hours
    const diffMins = Math.round(diffMs / 60000); // minutes
    if (diffMins < 60) {
      if (diffMins < 1) {
        return "Just now";
      } else if (diffMins < 2) {
        return `${diffMins} min. ago`;
      } else {
        return `${diffMins} mins ago`;
      }
    } else if (diffHrs < 24) {
      if (diffHrs < 2) {
        return `${diffHrs} hr. ago`;
      } else {
        return `${diffHrs} hrs ago`;
      }
    } else if (diffDays < 365) {
      if (diffDays < 2) {
        return `${diffDays} day ago`;
      } else {
        return `${diffDays} days ago`;
      }
    } else {
      if (diffYrs < 2) {
        return `${diffYrs} yr ago`;
      } else {
        return `${diffYrs} yrs ago`;
      }
    }
  }

  return {
    comments,
    commentsScore,
    addNewComment,
    getDateDifference,
    setComments,
    setCommentsScore,
  };
});
