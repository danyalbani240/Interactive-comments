let user;
let currentComment = null;
let currentUserCommentData = null;
fetch("http://localhost:3000/currentUser")
  .then((res) => res.json())
  .then((data) => (user = data.username));
let data = null;
fetch("http://localhost:3000/comments")
  .then((res) => res.json())
  .then((res) => loadComments(res.reverse()));

// adding data on screen
function loadComments(comments) {
  comments.forEach((comment) => {
    createCommentElement(comment);
  });
}
// create Comment Element On first Load
function createCommentElement(commentData) {
  //checking if it's the logged in user comment or not
  if (commentData.user.username === user) {
    createUserCommentElement(commentData);
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
      let replies = createReplyElements(commentData.replies, commentData);
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
        currentComment = commentElement;
        createReplyBox(commentData);
      });
  }
}
//When User Creates Comment
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
      <span
        class="text-white bg-purple-700 mr-2 class rounded text-sm px-1 font-light"
        >You</span
      >
      <span class="text-sm">${commentData.createdAt}</span>
      <div
        class="text-purple-700 mx-2 cursor-pointer flex-1 justify-center hidden md:flex items-center"
      >
        <img class="mx-2" src="./images/icon-delete.svg" alt="delete" />
        <span class="text-red-600">Delete</span>
      </div>
      <div
        class="text-purple-700 cursor-pointer flex-1 justify-center hidden md:inline-flex items-center mx-2"
      >
        <img class="mx-2" src="./images/icon-edit.svg" alt="edit" />
        <span class="text-purple-600">Edit</span>
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
      <div class="flex flex-1 justify-evenly">
        <div class="flex items-center cursor-pointer">
          <img
            class="mx-2"
            src="./images/icon-delete.svg"
            alt="delete"
          />
          <span class="text-red-600">Delete</span>
        </div>
        <div class="flex items-center cursor-pointer">
          <img class="mx-2" src="./images/icon-edit.svg" alt="edit" />
          <span class="text-purple-600">Edit</span>
        </div>
      </div>
    </div>
  </div>
</div>`;
}

function createReplyElements(repliesData, commentData) {
  let repliesContainerElement = document.createElement("div");
  repliesContainerElement.classList =
    "flex flex-col comments-container border-l-2 border-gray-300 pl-5 mt-5";
  repliesData.forEach((replyData) => {
    if (replyData.user.username === user) {
      let replyElement = createUserReplyElement(replyData, commentData);
      repliesContainerElement.appendChild(replyElement);
    } else {
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
        class="text-purple-700 cursor-pointer flex-1 text-right hidden md:block"
      >
        <img
          src="./images/icon-reply.svg"
          class="w-4 mr-1 inline-block align-middle"
          alt="reply"
        /><span class="inline-block font-bold">Reply</span>
      </div>
    </div>
    <p class="mt-3 text-gray-500 md:mt-0">
      @${replyData.replyingTo} ${replyData.content}
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
      <div class="text-purple-700 cursor-pointer">
        <img
          src="./images/icon-reply.svg"
          class="w-4 mr-1 inline-block align-middle"
          alt="reply"
        /><span class="inline-block font-bold">Reply</span>
      </div>
    </div>
  </div>`;
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
                  class="text-purple-700 mx-2  delete-button-mob cursor-pointer flex-1 justify-center hidden md:flex items-center"
                >
                  <img
                    class="mx-2"
                    src="./images/icon-delete.svg"
                    alt="delete"
                  />
                  <span class="text-red-600">Delete</span>
                </div>
                <div
                  class="text-purple-700 cursor-pointer flex-1 justify-center hidden md:inline-flex items-center mx-2"
                >
                  <img class="mx-2" src="./images/icon-edit.svg" alt="edit" />
                  <span class="text-purple-600">Edit</span>
                </div>
              </div>
              <p class="mt-3 text-gray-500 md:mt-0">
              @${replyData.replyingTo} ${replyData.content}
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
                  <div class="flex items-center cursor-pointer">
                    <img class="mx-2" src="./images/icon-edit.svg" alt="edit" />
                    <span class="text-purple-600">Edit</span>
                  </div>
                </div>
              </div>
            </div>`;
  replyElement.querySelector(".delete-button").addEventListener("click", () => {
    if (currentUserCommentData == null) {
      currentUserCommentData = commentData;
    } else {
      replyElement.remove();
      let index = currentUserCommentData.replies.findIndex(
        (element) => element.id === replyData.id
      );
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
  });
  replyElement
    .querySelector(".delete-button-mob")
    .addEventListener("click", () => {
      if (currentUserCommentData == null) {
        currentUserCommentData = commentData;
      } else {
        replyElement.remove();
        let index = currentUserCommentData.replies.findIndex(
          (element) => element.id === replyData.id
        );
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
    });
  return replyElement;
}
function createReplyBox(commentData) {
  console.log("replyBox");
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
  console.log(replyBox.querySelector(".send-button"));
  replyBox.querySelector(".send-button").addEventListener("click", () => {
    replyBox.remove();

    return addNewReply(commentData, replyBox.querySelector("textarea").value);
  });
}
function addNewReply(commentData, text) {
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
  currentUserCommentData = {
    ...commentData,
    replies: [...commentData.replies, newReply],
  };
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
