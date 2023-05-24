document.addEventListener("DOMContentLoaded", function () {
	const postsList = document.getElementById("posts-list");
	const addPostForm = document.getElementById("add-post-form");

	// Fetch posts from API and display them
	fetch("https://jsonplaceholder.typicode.com/posts")
		.then((response) => response.json())
		.then((posts) => {
			posts.forEach((post) => {
				const postItem = createPostItem(post);
				postsList.appendChild(postItem);
			});
		});

	// Handle form submission
	addPostForm.addEventListener("submit", function (event) {
		event.preventDefault();
		const titleInput = document.getElementById("title-input");
		const contentInput = document.getElementById("content-input");

		const newPost = {
			title: titleInput.value,
			body: contentInput.value,
		};

		// Save new post to API
		fetch("https://jsonplaceholder.typicode.com/posts", {
			method: "POST",
			body: JSON.stringify(newPost),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((post) => {
				const postItem = createPostItem(post);
				postsList.appendChild(postItem);

				titleInput.value = "";
				contentInput.value = "";
			});
	});

	// Create a new post item element
	function createPostItem(post) {
		const postItem = document.createElement("li");
		postItem.className =
			"post flex flex-col gap-5 justify-center items-center text-center px-10 py-8 border-[3px] border-blue-200 rounded-3xl";

		const postTitle = document.createElement("h3");
		postTitle.textContent = post.title;
		postTitle.className = "text-2xl font-semibold";

		const postContent = document.createElement("p");
		postContent.textContent = post.body;
		postContent.className = "text-lg font-normal";

		const deleteButton = document.createElement("button");
		deleteButton.textContent = "Delete";
		deleteButton.className =
			"text-lg font-semibold btn btn-outline btn-error border-[3px]";
		deleteButton.addEventListener("click", function () {
			// Delete post from API
			fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
				method: "DELETE",
			})
				.then((response) => response.json())
				.then(() => {
					// Remove post item from UI
					postItem.remove();
				});
		});

		postItem.appendChild(postTitle);
		postItem.appendChild(postContent);
		postItem.appendChild(deleteButton);

		return postItem;
	}
});
