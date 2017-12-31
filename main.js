var posts = [];
var postId = 0;
var commentId = 0;

// database functions
function addPost(text) {
    postId++;
    var post = {text: text, id: postId, comments: []};
    posts.push(post);
}

function findElementIndex(array, elementId) {
    return array.findIndex(function(element) {
        return element.id === elementId;
    });
}

function removePost(id) {
    posts.splice(findElementIndex(posts, id), 1);
}

function addComment(commentName, commentText, postId) {
    commentId++;
    var comment = {name: commentName, comment: commentText, id: commentId};
    posts[findElementIndex(posts, postId)].comments.push(comment);
}

function removeComment(postId, commentId) {
    var postIndex = findElementIndex(posts, postId);
    var postComments = posts[postIndex].comments;
    var commentIndex = findElementIndex(postComments, commentId);
    postComments.splice(commentIndex, 1);
}

// view functions
function renderPosts() {    
    $('.posts').empty();
    for (var i=0; i < posts.length; i++) {
        var post = posts[i];
        var html = `<div class="post" data-id="${post.id}">
                        <div class="post-body">
                            <p class="post-text">${post.text}</p>
                            <div class="post-link remove-post">Remove</div>
                            <div class="post-link add-comment">Comment</div>
                            <ul class="list-group comments"> ${renderComments(post.comments)} </ul>
                        </div> 
                    </div>`;
        $('.posts').append(html);
    }
}

function renderComments(comments) {
    var html = "";
    for (var i=0; i < comments.length; i++) {
        var comment = comments[i];
        html += `<li class="list-group-item comment" data-id="${comment.id}">
                    <p> <span class="name">${comment.name}</span>${comment.comment}</p>
                    <div class="post-link remove-comment">Remove</div>
                </li>`;
    }
    return html;
}

// on-click functions
$('button.add-post').click(function() {
    addPost($('#post-name').val());
    renderPosts();
    $('#post-name').val('');
});

$('.posts').on('click', 'div.remove-post', function() {
    removePost($(this).closest('div.post').data().id);
    renderPosts();
});

$('.posts').on('click', 'div.add-comment', (function() {
    // open a comment form only if it's not opened yet
    if ($(this).closest('div.post-body').find('.write-comment').length === 0) {
        $(this).closest('div.post-body').append(`<div class="write-comment">
                                                    <input type="text" class="form-control comment-name" placeholder="What's your name?">
                                                    <input type="text" class="form-control comment-text" placeholder="Write a comment...">
                                                    <button class="btn btn-primary" type="button">Post</button>
                                                </div>`);
    }
}));

$('.posts').on('click', '.write-comment button', function() {
    var name = $(this).closest('div.write-comment').find('.comment-name').val();
    var text = $(this).closest('.post-body').find('.comment-text').val();
    var id = $(this).closest('.post').data().id;
    addComment(name, text, id);
    renderPosts();
});

$('.posts').on('click', 'div.remove-comment', function() {
    var postId = $(this).closest('.post').data().id;
    var commentId = $(this).parent().data().id;
    removeComment(postId, commentId);
    renderPosts();
});