import { nameInput, commentInput, commentBtn, commentList } from "./dom.js";
import { commentsArray } from "./data.js";
import { getCurrentDate, cleanHtml } from "./useful_func.js";
import { updateComments } from "./update_comments.js";

function addNewComment(event) {
    event.preventDefault();
    console.log("Кликая по кнопке комментирования...");

    const currentName = nameInput.value.trim();
    const currentComment = cleanHtml(commentInput.value.trim());

    if (currentName.length < 3 || currentComment.length < 3) {
        alert("Имя и текст комментария должны содержать минимум 3 символа");
        return;
    }

    const newComment = {
        text: currentComment,
        name: currentName
    };

    console.log("Отправляемый объект:", newComment);

    fetch('https://wedev-api.sky.pro/api/v1/qwerty/comments', {
        method: "POST",
      
        body: JSON.stringify(newComment),
    })
    .then(response => {
        if (!response.ok) {
        
            response.text().then(bodyText => {
                console.error("Ошибка сервера:", response.status, bodyText);
            });
            throw new Error('Ошибка сервера');
        }
        return response.json();
    })
    .then(data => {
        console.log("Комментарий успешно отправлен:", data);
        updateComments(); // 
        nameInput.value = "";
        commentInput.value = "";
    })
    .catch(error => {
        console.error("Ошибка при отправке комментария:", error.message);
        alert("Возникла ошибка при отправке комментария.");
    });
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
        commentInput.value = `${cleanHtml(comment.text)}\n\n`;
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
initEvents()

