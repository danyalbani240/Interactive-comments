import "./style.css";
import { createCommentElements } from "./comment";
let user;
let currentComment = null;
let currentUserCommentData = null;
let lasCommentId = null;
fetch("http://localhost:3000/currentUser")
  .then((res) => res.json())
  .then((data) => (user = data.username));
let data = null;
fetch("http://localhost:3000/comments")
  .then((res) => res.json())
  .then((res) => loadComments(res.reverse()));

// adding data on screen
function loadComments(comments) {
  lasCommentId = comments.reverse()[comments.length - 1].id;
  comments.reverse().forEach((comment) => {
    createCommentElements(comment);
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
      console.log(newCommentData, lasCommentId);
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
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
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
