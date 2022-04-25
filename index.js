//1-getting data
//2-adding the comments on screen
//3-adding events for reply delete and ...

// Getting Data From The Api
let data = null;
fetch("http://localhost:3000/comments")
  .then((res) => res.json())
  .then((res) => loadComments(res));

// adding data on screen
function loadComments(comments) {
  comments.forEach((comment) => {
    createComment(comment);
  });
}

function createComment(commentData) {
  let comment = document.createElement("div");
  comment.classList = "flex flex-col max-w-3xl mx-auto w-11/12 my-2";
  console.log(commentData);
  comment.innerHTML = `<div class="flex items-center bg-white rounded">
  <div
    class="bg-purple-50 w-20 h-20 ml-2 rounded hidden md:flex flex-col items-center justify-between"
  >
    <img src="./images/icon-plus.svg" class="cursor-pointer" alt="" />
    <span class="text-purple-700 font-bold">12</span>
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
      <div class="text-purple-700 cursor-pointer">
        <img
          src="./images/icon-reply.svg"
          class="w-4 mr-1 inline-block align-middle"
          alt="reply"
        /><span class="inline-block font-bold">Reply</span>
      </div>
    </div>
  </div>
</div>`;
  console.log(comment);
}
