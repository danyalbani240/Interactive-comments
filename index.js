//1-getting data
//2-adding the comments on screen
//3-adding events for reply delete and ...
// Getting Data From The Api

let data = null;
fetch("http://localhost:3000/comments")
  .then((res) => res.json())
  .then((res) => (data = res));
// making Comments
