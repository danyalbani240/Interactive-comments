import {
  user,
  currentComment,
  currentUserCommentData,
  setCurrentComment,
  setCurrentUserCommentData,
} from "./init";
function createReplyElement(replyData, commentData) {
  let replyElement = document.createElement("div");
  replyElement.classList = "flex bg-white my-2 items-center";
  replyElement.innerHTML = `<div
      class="bg-purple-50 w-20 h-20 ml-2 rounded hidden md:flex flex-col items-center justify-between"
    >
      <img src="./images/icon-plus.svg" class="cursor-pointer" alt="" />
      <span class="text-purple-700 font-bold">${replyData.score}</span>
      <img
        class="cursor-pointer"
        src="./images/icon-minus.svg"
        alt=""
      />
    </div>
    <div
      class="bg-white px-5 flex flex-col justify-evenly ml-2 md:ml-0 h-64 mb-2 rounded md:h-40"
    >
      <div class="flex items-center pr-20 md:pr-0 mt-3 text-gray-500">
        <img
          class="w-9 h-9 mr-2"
          src="${replyData.user.image.png}"
          alt="${replyData.user.username}"
        />
  
        <span class="font-bold text-gray-900 mr-2 text-center"
          >${replyData.user.username}</span
        >
  
        <span class="text-sm">${replyData.createdAt}</span>
        <div
          class="text-purple-700 cursor-pointer reply-button flex-1 text-right hidden md:block"
        >
          <img
            src="./images/icon-reply.svg"
            class="w-4 mr-1 inline-block align-middle "
            alt="reply"
          /><span class="inline-block font-bold">Reply</span>
        </div>
      </div>
      <p class="mt-3 text-gray-500 md:mt-0">
        @${replyData.replyingTo}, ${replyData.content}
      </p>
      <div class="flex justify-between mt-2 items-center md:hidden">
        <div
          class="bg-purple-50 w-20 h-9 rounded flex items-center justify-evenly"
        >
          <img
            src="./images/icon-plus.svg"
            class="cursor-pointer"
            alt=""
          />
          <span class="text-purple-700 font-bold">12</span>
          <img
            class="cursor-pointer"
            src="./images/icon-minus.svg"
            alt=""
          />
        </div>
        <div class="text-purple-700 cursor-pointer reply-button">
          <img
            src="./images/icon-reply.svg"
            class="w-4 mr-1 inline-block align-middle"
            alt="reply"
          /><span class="inline-block font-bold">Reply</span>
        </div>
      </div>
    </div>`;
  replyElement.querySelectorAll(".reply-button").forEach((element) => {
    element.addEventListener("click", () => {
      setCurrentComment(replyElement.parentElement.parentElement);

      replyToReply(replyData, commentData);
    });
  });
  return replyElement;
}

function loadReplyElements(repliesData, commentData) {
  let repliesContainerElement = document.createElement("div");
  repliesContainerElement.classList =
    "flex flex-col comments-container border-l-2 border-gray-300 pl-5 mt-5";
  repliesData.forEach((replyData) => {
    if (replyData.user.username === user) {
      let replyElement = createUserReplyElement(replyData, commentData);
      repliesContainerElement.appendChild(replyElement);
    } else {
      let replyElement = createReplyElement(replyData, commentData);
      repliesContainerElement.appendChild(replyElement);
    }
  });

  return repliesContainerElement;
}

function createUserReplyElement(replyData, commentData) {
  let replyElement = document.createElement("div");
  replyElement.classList = "flex bg-white my-2 items-center";
  replyElement.innerHTML = `
    <div
                class="bg-purple-50 w-20 h-20 ml-2 rounded hidden md:flex flex-col items-center justify-between"
              >
                <img src="./images/icon-plus.svg" class="cursor-pointer" alt="" />
                <span class="text-purple-700 font-bold">${replyData.score}</span>
                <img
                  class="cursor-pointer"
                  src="./images/icon-minus.svg"
                  alt=""
                />
              </div>
              <div
                class="bg-white ml-2 md:ml-0 my-2 md:w-full px-5 flex flex-col justify-evenly h-64 rounded md:h-40"
              >
                <div class="flex items-center md:pr-0 pr-14 mt-3 text-gray-500">
                  <img
                    class="w-9 h-9 mr-2"
                    src="${replyData.user.image.png}"
                    alt="${replyData.user.username}"
                  />
                  <span class="font-bold text-gray-900 text-center mr-2"
                    >
                    ${replyData.user.username}</span
                  >
                  <span
                    class="text-white bg-purple-700 mr-2 class rounded text-sm px-1 font-light"
                    >You</span
                  >
                  <span class="text-sm">${replyData.createdAt}</span>
  
                  <div
                    class="text-purple-700 mx-2  delete-button cursor-pointer flex-1 justify-center hidden md:flex items-center"
                  >
                    <img
                      class="mx-2"
                      src="./images/icon-delete.svg"
                      alt="delete"
                    />
                    <span class="text-red-600">Delete</span>
                  </div>
                  <div
                    class="text-purple-700 edit-button-mob cursor-pointer flex-1 justify-center hidden md:inline-flex items-center mx-2"
                  >
                    <img class="mx-2" src="./images/icon-edit.svg" alt="edit" />
                    <span class="text-purple-600">Edit</span>
                  </div>
                </div>
                <p class="mt-3 text-gray-500 md:mt-0 reply-content">
                @${replyData.replyingTo}, ${replyData.content}
                </p>
                <div class="flex justify-between mt-2 items-center md:hidden">
                  <div
                    class="bg-purple-50 w-20 h-9 rounded flex items-center justify-evenly"
                  >
                    <img
                      src="./images/icon-plus.svg"
                      class="cursor-pointer"
                      alt=""
                    />
                    <span class="text-purple-700 font-bold">  ${replyData.score}</span>
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
                      <span class="text-red-600 ">Delete</span>
                    </div>
                    <div class="flex items-center edit-button cursor-pointer">
                      <img class="mx-2" src="./images/icon-edit.svg" alt="edit" />
                      <span class="text-purple-600">Edit</span>
                    </div>
                  </div>
                </div>
              </div>`;

  //handle delete
  for (const element of replyElement.querySelectorAll(".delete-button")) {
    element.addEventListener("click", () => {
      if (currentUserCommentData == null) {
        setCurrentUserCommentData(commentData);
        element.click();
      } else {
        let index = currentUserCommentData.replies.findIndex(
          (element) => element.id === replyData.id
        );
        console.log(index, currentUserCommentData);
        currentUserCommentData.replies.splice(index, 1);
        fetch("http://localhost:3000/comments/" + commentData.id, {
          method: "PATCH",
          body: JSON.stringify({
            replies: currentUserCommentData.replies,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
      }
      replyElement.remove();
    });
  }

  //handle edit
  replyElement.querySelector(".edit-button").addEventListener("click", () => {
    let editBox = document.querySelector(".edit-reply-box");
    editBox.classList.toggle("hidden");
    editBox.querySelector("textarea").value =
      replyElement.querySelector(".reply-content").innerText;
    editBox.querySelector(".cancel").addEventListener("click", () => {
      editBox.classList.add("hidden");
    });
    editBox.querySelector("button.send-edit").addEventListener("click", () => {
      handleEdit(
        editBox.querySelector("textarea").value,
        replyData,
        commentData,
        replyElement
      );
    });
  });
  replyElement
    .querySelector(".edit-button-mob")
    .addEventListener("click", () => {
      let editBox = document.querySelector(".edit-reply-box");
      editBox.classList.toggle("hidden");
      editBox.querySelector("textarea").value =
        replyElement.querySelector(".reply-content").innerText;
      editBox.querySelector(".cancel").addEventListener("click", () => {
        editBox.classList.add("hidden");
      });
      editBox
        .querySelector("button.send-edit")
        .addEventListener("click", () => {
          handleEdit(
            editBox.querySelector("textarea").value,
            replyData,
            commentData,
            replyElement
          );
        });
    });
  return replyElement;
}
function createReplyBox(commentData) {
  let replyBox = document.createElement("div");
  replyBox.className =
    "bg-white py-4 mx-auto rounded flex  w-full mt-5 items-center max-w-3xl";

  replyBox.innerHTML = `
    <img
              class="w-9 h-9 mx-auto"
              src="./images/avatars/image-juliusomo.png"
              alt="account owner image"
            />
    <textarea
           
            name="reply"
            class="rounded border-2 w-10/12 mx-auto border-r-gray-400 resize-none outline-none px-2 focus:border-gray-600 py-2"
            id=""
            cols="20"
            rows="4"
          >@${
            currentComment.getElementsByClassName(
              "font-bold mr-2 text-gray-900 text-center"
            )[0].innerText
          },</textarea>
          
            
            <button
              class="text-white bg-purple-700 rounded px-4 py-2 text-sm h-10 font-bold mx-auto send-button"
            >
              Send
            </button>
         `;
  currentComment
    .getElementsByClassName("flex items-center bg-white rounded")[0]
    .after(replyBox);
  replyBox.querySelector(".send-button").addEventListener("click", () => {
    replyBox.remove();

    return addNewReply(commentData, replyBox.querySelector("textarea").value);
  });
}
function addNewReply(commentData, text) {
  console.log(commentData, text.split(",")[0]);
  const newReply = {
    id: +!!commentData.replies.id + 1,
    content: text.split(",")[1],
    createdAt: "1 week ago",
    replyingTo: text.split(",")[0].split("@")[1],
    user: {
      image: {
        png: `./images/avatars/image-${user}.png`,
        webp: `./images/avatars/image-${user}.web`,
      },
      username: `${user}`,
    },
    score: 0,
  };
  console.log(newReply);
  fetch("http://localhost:3000/comments/" + commentData.id, {
    method: "PATCH",
    body: JSON.stringify({
      replies: [...commentData.replies, newReply],
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .catch((e) => console.log(e));
  createNewReplyElement(newReply, commentData);
  setCurrentUserCommentData({
    ...commentData,
    replies: [...commentData.replies, newReply],
  });
}

function createNewReplyElement(replyData, commentData) {
  if (commentData.replies.length === 0) {
    let commentsContainerElement = document.createElement("div");
    commentsContainerElement.className =
      "flex flex-col comments-container border-l-2 border-gray-300 pl-5 mt-5";
    let replyElement = createUserReplyElement(replyData, commentData);
    commentsContainerElement.append(replyElement);
    currentComment.append(commentsContainerElement);
  } else {
    let replyElement = createUserReplyElement(replyData, commentData);
    currentComment.querySelector(".comments-container").append(replyElement);
  }
}
function handleEdit(newText, replyData, commentData, replyElement) {
  //chenge element locally on screen
  replyElement.querySelector(".reply-content").innerText = newText;
  document.querySelector(".edit-reply-box").classList.add("hidden");
  //fetch the newReply
  const newReplyData = { ...replyData, content: newText.split(",")[1] };
  let index = commentData.replies.findIndex(
    (element) => element.id === replyData.id
  );
  let newReplies = commentData.replies;
  newReplies.splice(index, 1, newReplyData);

  fetch("http://localhost:3000/comments/" + commentData.id, {
    method: "PATCH",
    body: JSON.stringify({
      replies: newReplies,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}
function replyToReply(replyingToData, commentData) {
  let replyBox = document.querySelector(".reply-popup");
  replyBox.classList.remove("hidden");
  replyBox.querySelector("textarea").value = replyingToData.user.username + ",";
  replyBox.querySelector(".cancel-button").addEventListener("click", () => {
    replyBox.classList.add("hidden");
  });
  replyBox.querySelector(".reply-button").addEventListener("click", () => {
    let newReplyData = {
      id: commentData.replies[commentData.replies.length - 1].id + 1,
      content: replyBox.querySelector("textarea").value.split(",")[1],
      createdAt: "1 days ago",
      score: 0,
      replyingTo: replyingToData.user.username,
      user: {
        image: {
          png: `./images/avatars/image-${user}.png`,
          webp: `./images/avatars/image-${user}.webp`,
        },
        username: user,
      },
    };
    let newReplyElement = createUserReplyElement(newReplyData, commentData);
    currentComment.querySelector(".comments-container").append(newReplyElement);
    //adding the new replies to database :
    fetch("http://localhost:3000/comments/" + commentData.id, {
      method: "PATCH",
      body: JSON.stringify({
        replies: [...commentData.replies, newReplyData],
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    setCurrentUserCommentData({
      ...commentData,
      replies: [...commentData.replies, newReplyData],
    });
    replyBox.classList.add("hidden");
  });
}
export {
  createReplyElement,
  loadReplyElements,
  createUserReplyElement,
  createReplyBox,
  addNewReply,
  createNewReplyElement,
  handleEdit,
  replyToReply,
};
