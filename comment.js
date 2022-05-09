import { user, currentComment, setCurrentComment } from "./init";
import { loadReplyElements, createReplyBox } from "./reply";
function createCommentElements(commentData) {
  //checking if it's the logged in user comment or not
  if (commentData.user.username === user) {
    let commentElement = createUserCommentElement(commentData);
    document.querySelector("#container").prepend(commentElement);
  } else {
    let commentElement = document.createElement("div");
    commentElement.classList = "flex flex-col max-w-3xl mx-auto w-11/12 my-2";

    commentElement.innerHTML = `<div class="flex items-center bg-white rounded">
    <div
      class="bg-purple-50 w-20 h-20 ml-2 rounded hidden md:flex flex-col items-center justify-between"
    >
      <img src="./images/icon-plus.svg" class="cursor-pointer" alt="" />
      <span class="text-purple-700 font-bold">${commentData.score}</span>
      <img class="cursor-pointer" src="./images/icon-minus.svg" alt="" />
    </div>
    <div
      class="bg-white flex flex-col justify-evenly h-60 md:h-40 rounded px-5 max-w-3xl"
    >
      <div class="flex items-center pr-20 md:pr-0 mt-3 text-gray-500">
        <img
          class="w-9 h-9 mr-2"
          src="${commentData.user.image.png}"
          alt="${commentData.user.username}"
        />
        <span class="font-bold mr-2 text-gray-900 text-center"
          >${commentData.user.username}</span
        >
        <span class="text-sm">${commentData.createdAt}</span>
        <div
          class="text-purple-700 cursor-pointer flex-1 text-right hidden md:block reply-el"
        >
          <img
            src="./images/icon-reply.svg"
            class="w-4 mr-1 inline-block align-middle"
            alt="reply"
          /><span class="inline-block font-bold ">Reply</span>
        </div>
      </div>
      <p class="mt-3 text-gray-500 md:mt-0">
        ${commentData.content}
      </p>
      <div class="flex justify-between mt-2 md:hidden items-center">
        <div
          class="bg-purple-50 w-20 h-9 rounded flex items-center justify-evenly"
        >
          <img
            src="./images/icon-plus.svg"
            class="cursor-pointer"
            alt=""
          />
          <span class="text-purple-700 font-bold">${commentData.score}</span>
          <img
            class="cursor-pointer"
            src="./images/icon-minus.svg"
            alt=""
          />
        </div>
        <div class="text-purple-700 cursor-pointer reply-el reply-mobile">
          <img
            src="./images/icon-reply.svg"
            class="w-4 mr-1 inline-block align-middle"
            alt="reply"
          /><span class="inline-block font-bold ">Reply</span>
        </div>
      </div>
    </div>
  </div>`;
    if (commentData.replies.length !== 0) {
      let replies = loadReplyElements(commentData.replies, commentData);
      commentElement.appendChild(replies);
    }
    document.querySelector("#container").prepend(commentElement);

    commentElement.querySelector(".reply-el").addEventListener("click", () => {
      currentComment = commentElement;
      createReplyBox(commentData);
    });

    commentElement
      .querySelector(".reply-mobile")
      .addEventListener("click", () => {
        setCurrentComment(commentElement);
        createReplyBox(commentData);
      });
  }
}
function createUserCommentElement(commentData) {
  let commentElement = document.createElement("div");
  commentElement.classList = "flex flex-col max-w-3xl mx-auto w-11/12 my-2";

  commentElement.innerHTML = `<div class="flex items-center bg-white rounded">
    <div
      class="bg-purple-50 w-20 h-20 ml-2 rounded hidden md:flex flex-col items-center justify-between"
    >
      <img src="./images/icon-plus.svg" class="cursor-pointer" alt="" />
      <span class="text-purple-700 font-bold">${commentData.score}</span>
      <img class="cursor-pointer" src="./images/icon-minus.svg" alt="" />
    </div>
    <div
      class="bg-white flex flex-col justify-evenly w-full h-60 md:h-40 rounded px-5 max-w-3xl"
    >
      <div class="flex items-center pr-20 md:pr-0 mt-3 text-gray-500">
        <img
          class="w-9 h-9 mr-2"
          src="${commentData.user.image.png}"
          alt="${commentData.user.username}"
        />
        <span class="font-bold mr-2 text-gray-900 text-center"
          >${commentData.user.username}</span
        >
        <span
          class="text-white bg-purple-700 mr-2 class rounded text-sm px-1 font-light"
          >You</span
        >
        <span class="text-sm">${commentData.createdAt}</span>
        <div
          class="text-purple-700 mx-2 delete-button cursor-pointer flex-1 justify-center hidden md:flex items-center"
        >
          <img class="mx-2" src="./images/icon-delete.svg" alt="delete" />
          <span class="text-red-600">Delete</span>
        </div>
        <div
          class="text-purple-700 edit-button cursor-pointer flex-1 justify-center hidden md:inline-flex items-center mx-2"
        >
          <img class="mx-2" src="./images/icon-edit.svg" alt="edit" />
          <span class="text-purple-600">Edit</span>
        </div>
      </div>
      <p class="mt-3 text-gray-500 md:mt-0 content">
      ${commentData.content}
      </p>
      <div class="flex justify-between mt-2 md:hidden items-center">
        <div
          class="bg-purple-50 w-20 h-9 rounded flex items-center justify-evenly"
        >
          <img
            src="./images/icon-plus.svg"
            class="cursor-pointer"
            alt=""
          />
          <span class="text-purple-700 font-bold">${commentData.score}</span>
          <img
            class="cursor-pointer"
            src="./images/icon-minus.svg"
            alt=""
          />
        </div>
        <div class="flex flex-1 justify-evenly">
          <div class="flex items-center delete-button cursor-pointer">
            <img
              class="mx-2"
              src="./images/icon-delete.svg"
              alt="delete"
            />
            <span class="text-red-600">Delete</span>
          </div>
          <div class="flex items-center edit-button cursor-pointer">
            <img class="mx-2" src="./images/icon-edit.svg" alt="edit" />
            <span class="text-purple-600">Edit</span>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  //handleDelete
  commentElement.querySelectorAll(".delete-button").forEach((element) => {
    element.addEventListener("click", () => {
      commentElement.remove();
      fetch("http://localhost:3000/comments/" + commentData.id, {
        method: "DELETE",
      });
    });
  });
  //handle user edit comment  :
  commentElement.querySelectorAll(".edit-button").forEach((element) => {
    element.addEventListener("click", () => {
      let editReplyBox = document.querySelector(".edit-reply-box ");
      editReplyBox.classList.remove("hidden");
      editReplyBox.querySelector("textarea").value =
        commentElement.querySelector("p.content").innerText;
      editReplyBox.querySelector(".send-edit").addEventListener("click", () => {
        fetch("http://localhost:3000/comments/" + commentData.id, {
          method: "PATCH",
          body: JSON.stringify({
            content: editReplyBox.querySelector("textarea").value,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        commentElement.querySelector("p.content").innerText =
          editReplyBox.querySelector("textarea").value;
        editReplyBox.classList.add("hidden");
      });
    });
  });
  return commentElement;
}
export { createCommentElements, createUserCommentElement };
