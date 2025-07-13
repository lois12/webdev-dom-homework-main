import { commentsArray } from "./data.js";
import { updateComments } from "./update_comments.js";
import { initEvents } from "./events.js";

document.addEventListener("DOMContentLoaded", () => {
    commentsArray.push(
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
    );

    updateComments();
    initEvents();
});
