// Getting Data From The Api

let data = null;
fetch("http://localhost:3000/comments")
	.then((res) => res.json())
	.then((res) => (data = res));
// making Comments
