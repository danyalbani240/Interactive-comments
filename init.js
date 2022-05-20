import "./style.css";
console.log(1);
import {
  createCommentElements,
  createUserCommentElement,
} from "./modules/comment";
let user;
let currentComment = null;
let currentUserCommentData = null;
let lasCommentId = null;
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
      lasCommentId = res[res.length - 1].id;
      res.reverse().forEach((comment) => {
        createCommentElements(comment);
      });
    });
}

//adding newComment By User

document
  .querySelector("button.add-new-comment")
  .addEventListener("click", () => {
    let input = document.querySelector(".user-new-comment-input");
    if (input.value === "") {
      return;
    } else {
      let newCommentData = {
        id: ++lasCommentId,
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
  lasCommentId,
  setCurrentComment,
  setCurrentUserCommentData,
};
