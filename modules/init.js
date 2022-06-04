import { createCommentElements, createUserCommentElement } from "./comment.js";

let user;
let currentComment = null;
let currentUserCommentData = null;
fetch("http://localhost:3000/currentUser")
  .then((res) => res.json())
  .then((data) => {
    user = data.username;
    loadComments();
  });

function loadComments() {
  fetch("http://localhost:3000/comments")
    .then((res) => res.json())
    .then((res) => {
      res.reverse().forEach((comment) => {
        //loading the initial comments
        createCommentElements(comment);
      });
    });
}

//handle newComment By User
document
  .querySelector("button.add-new-comment")
  .addEventListener("click", () => {
    let input = document.querySelector(".user-new-comment-input");
    if (input.value === "") {
      return;
    } else {
      let newCommentData = {
        content: input.value,
        createdAt: "1 day ago",
        score: 0,
        user: {
          image: {
            png: `./images/avatars/image-${user}.png`,
            webp: `./images/avatars/image-${user}.webp`,
          },
          username: user,
        },
        replies: [],
      };
      let userNewCommentElement = createUserCommentElement(newCommentData);
      document.querySelector("#container").prepend(userNewCommentElement);
      //fetching data to server
      fetch("http://localhost:3000/comments", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCommentData),
      }).then((res) => res.json());
    }
  });

//closing the modals when clicking on the background of them.
document.querySelector(".modal-container").addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    document.querySelector(".popup").classList.add("hidden");
    e.currentTarget.classList.add("hidden");
    document.querySelector(".edit-reply-box").classList.add("hidden");
    document.querySelector(".reply-popup").classList.add("hidden");
  }
});
//setting the value of two variables from modules
function setCurrentComment(value) {
  currentComment = value;
}
function setCurrentUserCommentData(value) {
  currentUserCommentData = value;
}
export {
  user,
  currentComment,
  currentUserCommentData,
  setCurrentComment,
  setCurrentUserCommentData,
};
