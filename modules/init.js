<<<<<<< HEAD:modules/init.js
import { createCommentElements, createUserCommentElement } from "./comment.js";
=======
import "./style.css";
import {
  createCommentElements,
  createUserCommentElement,
} from "./modules/comment";
document.querySelector("#app").innerHTML = `
<div class="container py-5 mx-auto flex flex-col" id="container">
      <div
        class="bg-white py-4 mx-auto rounded flex flex-col w-11/12 mt-5 max-w-3xl"
      >
        <textarea
          placeholder="Add a Comment"
          name="Add a Comment"
          class="rounded border-2 w-11/12 mx-auto border-r-gray-400 resize-none outline-none px-2 focus:border-gray-600 py-2 user-new-comment-input"
          id=""
          cols="30"
          rows="5"
        ></textarea>
        <div
          class="flex items-center mt-6 justify-between px-2 w-11/12 mx-auto"
        >
          <img
            class="w-9"
            src="./images/avatars/image-juliusomo.png"
            alt="account owner image"
          />
          <button
            class="text-white add-new-comment bg-purple-700 rounded px-4 py-2 text-sm h-10 font-bold"
          >
            Send
          </button>
        </div>
      </div>
    </div>
    <div class="modal-container fixed w-screen h-screen left-0 top-0 hidden">
      <div
        class="fixed z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 md:w-6/12 hidden h-44 bg-white rounded p-4 edit-reply-box"
      >
        <textarea
          class="w-full h-20 border-gray-200 focus:border-gray-400 outline-none rounded px-4 py-2 border-2 resize-none my-3"
          placeholder="Reply Text"
        ></textarea>
        <div class="flex justify-between">
          <button
            class="text-white bg-gray-600 cancel p-2 mt-2 cursor-pointer rounded"
          >
            CANCEL</button
          ><button
            class="text-white bg-purple-600 p-2 mt-2 send-edit cursor-pointer rounded"
          >
            Reply
          </button>
        </div>
      </div>
      <div
        class="fixed z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-56 shadow-md bg-white rounded reply-popup p-4 md:w-5/12 md:h-64 hidden"
      >
        <h2 class="text-xl font-bold">Reply</h2>
        <textarea
          class="w-full h-20 border-gray-200 focus:border-gray-400 outline-none rounded px-4 py-2 border-2 resize-none my-3"
          placeholder="Reply Text"
        ></textarea>
        <div class="flex justify-between">
          <button
            class="text-white bg-gray-600 p-2 mt-2 cancel-button cursor-pointer rounded"
          >
            CANCEL</button
          ><button
            class="text-white reply-button bg-purple-600 p-2 mt-2 cursor-pointer rounded"
          >
            Reply
          </button>
        </div>
      </div>
      <div
        class="fixed z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-44 bg-white rounded popup-delete popup p-4 hidden"
      >
        <h2 class="text-xl font-bold">Delete Comment</h2>
        <p class="text-gray-400 text-sm mt-2">
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div class="flex justify-between">
          <button
            class="text-white cancel bg-gray-600 p-2 mt-2 cursor-pointer rounded"
          >
            NO, CANCEL</button
          ><button
            class="text-white delete bg-red-600 p-2 mt-2 cursor-pointer rounded"
          >
            YES, DELETE
          </button>
        </div>
      </div>
    </div>`;
>>>>>>> 0e7d0652f4a44fb1c6c65f9ad47498ea26cd13a3:init.js
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
document.querySelector(".modal-container").addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    document.querySelector(".popup").classList.add("hidden");
    e.currentTarget.classList.add("hidden");
    document.querySelector(".edit-reply-box").classList.add("hidden");
    document.querySelector(".reply-popup").classList.add("hidden");
  }
});
export {
  user,
  currentComment,
  currentUserCommentData,
  lasCommentId,
  setCurrentComment,
  setCurrentUserCommentData,
};
