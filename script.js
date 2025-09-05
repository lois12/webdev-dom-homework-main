/* document.addEventListener("DOMContentLoaded", () => {
    const commentsArray = [
        {
            id: 1,
            name: "Иван Иванов",
            text: "Первый комментарий!",
            date: "12.02.22 12:18",
            likes: 1023,
            isLiked: true,
        },
        {
            id: 2,
            name: "Марина Петрова",
            text: "Хорошее начало!",
            date: "13.02.22 19:22",
            likes: 3,
            isLiked: true,
        },
    ];

    const nameInput = document.getElementById("name__txt");
    const commentInput = document.getElementById("comment__txt");
    const commentBtn = document.getElementById("comment__btn");
    const commentList = document.querySelector(".comments");

    function getCurrentDate() {
        const date = new Date();
        return `${date.toLocaleDateString("ru-RU")} ${date.toLocaleTimeString("ru-RU")}`;
    }

    function createCommentHTML(comment) {
        return `
      <li class="comment" data-id="${comment.id}">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${comment.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button class="like-button ${comment.isLiked ? "-active-like" : ""}"></button>
          </div>
        </div>
      </li>
    `;
    }

    function updateComments() {
        commentList.innerHTML = commentsArray.map(createCommentHTML).join("");
    }

    function cleanHtml(text) {
        return text.replace(/</g, "<").replace(/>/g, ">");
    }

    function replyToComment(commentId) {
        const comment = commentsArray.find((c) => c.id === commentId);
        if (comment) {
            nameInput.value = "";
            commentInput.value = ` ${cleanHtml(comment.text)}\n\n`;
            commentInput.focus();
        }
    }

    // Назначаем обработчик кликов на комментарии
    commentList.addEventListener("click", (event) => {
        const target = event.target;
        if (target.classList.contains("comment-text")) {
            const commentElement = target.closest(".comment");
            const commentId = parseInt(commentElement.dataset.id);
            replyToComment(commentId);
        }
    });

    // Обработчик кликов по лайкам
    commentList.addEventListener("click", (event) => {
        if (event.target.classList.contains("like-button")) {
            const commentElement = event.target.closest(".comment");
            const commentId = parseInt(commentElement.dataset.id);
            const commentIndex = commentsArray.findIndex(
                (c) => c.id === commentId,
            );

            if (commentIndex !== -1) {
                const comment = commentsArray[commentIndex];
                comment.isLiked = !comment.isLiked;
                comment.likes += comment.isLiked ? 1 : -1;
                updateComments();
            }
        }
    });

    // Обработчик добавления нового комментария
    commentBtn.addEventListener("click", (event) => {
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
    });

    // Прорисовка комментариев при загрузке страницы
    updateComments();
});



    
 */