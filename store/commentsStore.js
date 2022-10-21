import { defineStore } from "pinia";

export const useCommentsStore = defineStore("comments", () => {
  const comments = ref([]);
  const currentDateTime = new Date();
  function setComments(newComments) {
    comments.value = newComments;
  }
  function getDateDifference(dateIsoString) {
    const pastDate = new Date(dateIsoString);
    const diffMs = currentDateTime - pastDate;
    const diffYrs = Math.floor(diffMs / 31536000000); // years
    const diffDays = Math.floor(diffMs / 86400000); // days
    const diffHrs = Math.floor(diffMs / 3600000); // hours
    const diffMins = Math.round(diffMs / 60000); // minutes
    if (diffMins < 60) {
      if (diffMins == 1) {
        return `${diffMins} minute ago`;
      } else {
        return `${diffMins} minutes ago`;
      }
    } else if (diffHrs < 24) {
      if (diffHrs == 1) {
        return `${diffHrs} hour ago`;
      } else {
        return `${diffHrs} hours ago`;
      }
    } else if (diffDays < 365) {
      if (diffDays == 1) {
        return `${diffDays} day ago`;
      } else {
        return `${diffDays} days ago`;
      }
    } else {
      if (diffYrs == 1) {
        return `${diffYrs} year ago`;
      } else {
        return `${diffYrs} years ago`;
      }
    }
  }

  return { comments, setComments, getDateDifference };
});