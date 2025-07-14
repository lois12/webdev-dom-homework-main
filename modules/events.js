import { nameInput, commentInput, commentBtn, commentList } from "./dom.js";
import { commentsArray } from "./data.js";
import { getCurrentDate, cleanHtml } from "./useful_func.js";
import { updateComments } from "./update_comments.js";

function addNewComment(event) {
    event.preventDefault();
    const currentName = nameInput.value.trim();
    const currentComment = cleanHtml(commentInput.value.trim());

    if (!currentName || !currentComment) {
        alert("Пожалуйста, заполните все поля");
        return;
    }

    const newComment = {
        id: Date.now(),
        name: currentName,
        text: currentComment,
        date: getCurrentDate(),
        likes: 0,
        isLiked: false,
    };

    commentsArray.push(newComment);
    updateComments();

    nameInput.value = "";
    commentInput.value = "";
}

function likeComment(event) {
    if (event.target.classList.contains("like-button")) {
        const commentElement = event.target.closest(".comment");
        const commentId = parseInt(commentElement.dataset.id);
        const commentIndex = commentsArray.findIndex((c) => c.id === commentId);

        if (commentIndex !== -1) {
            const comment = commentsArray[commentIndex];
            comment.isLiked = !comment.isLiked;
            comment.likes += comment.isLiked ? 1 : -1;
            updateComments();
        }
    }
}

function replyToComment(commentId) {
    const comment = commentsArray.find((c) => c.id === commentId);
    if (comment) {
        nameInput.value = "";
        commentInput.value = ` ${cleanHtml(comment.text)}\n\n`;
        commentInput.focus();
    }
}
export function initEvents() {
    commentBtn.addEventListener("click", addNewComment);
    commentList.addEventListener("click", (event) => {
        const target = event.target;
        if (target.classList.contains("comment-text")) {
            const commentElement = target.closest(".comment");
            const commentId = parseInt(commentElement.dataset.id);
            replyToComment(commentId);
        }
    });
    commentList.addEventListener("click", likeComment);
}
