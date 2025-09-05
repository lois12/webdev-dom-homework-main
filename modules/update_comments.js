 import { commentsArray } from "./data.js";
 import { commentList } from "./dom.js";
 

 

function loadDataFromServer() {
    return fetch('https://wedev-api.sky.pro/api/v1/qwerty/comments')
        .then(response => {
            if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
            return response.json(); 
        })
        .then(result => {
          console.log(result.comments);
            return result.comments; 
        })
        .catch(err => {
            console.error(err.message);
            return []; 
        });
}


export function updateComments() {
    loadDataFromServer().then(commentsArray => {
        commentList.innerHTML = commentsArray.map(createCommentHTML).join(""); 
    });
}

function createCommentHTML(comment) {
  console.log(comment);
    return `
      <li class="comment" data-id="${comment.id}">
        <div class="comment-header">
          <div>${comment.author.name}</div>
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