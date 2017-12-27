var posts = [];
var postId = 0;
var commentId = 0;

function addPost(text) {
    postId++;
    var post = {text: text, id: postId, comments: []};
    posts.push(post);
}

function renderPosts() {
    $('.posts').find('p').remove();
    for (var i=0; i < posts.length; i++) {
        var currPost = posts[i];
        $('.posts').append('<p class="post" data-index="' + i + '" data-id="' + currPost.id + 
        '"> ' + currPost.text + ' <a class="comment" href="#">Comment</a> ' + 
        '<button class="btn btn-danger remove" type="button">REMOVE</button> </p>');
    }
}

function removePost(postIndex) {
    posts.splice(postIndex, 1);
}

function addComment(commentText, postIndex) {
    commentId++;
    var comment = {comment: commentText, id: commentId};
    posts[postIndex].comments.push(comment);
}

// TODO write renderComments function
function renderComments() {
    $('.posts').find('p').remove();
    for (var i=0; i < posts.length; i++) {
        var currPost = posts[i];
        $('.posts').append('<p class="post" data-index="' + i + '" data-id="' + currPost.id + 
        '"> <button class="btn btn-danger remove" type="button">REMOVE</button> ' + currPost.text + 
        ' <a class="comment" href="#">Comment</a> </p>');
    }
}

$('button.add-post').click(function() {
    addPost($('#post-name').val());
    renderPosts();
    $('#post-name').val('');
});

$('.posts').on('click', 'button.remove', (function() {
    removePost($(this).closest('p').data().index);
    renderPosts();
}));

$('.posts').on('click', 'a.comment', (function() {
    $(this).closest('p').append('<div class="form-group">' + '<h4>Add a Comment</h4>' + 
    '<input type="text" id="comment-name" class="form-control" placeholder="Comment Text, User Name"> </div>' + 
    '<button class="btn btn-primary add-comment" type="button">Post comment</button>');
}));

$('.posts').on('click', 'button.add-comment', function() {
    var currPost = $(this).closest('p');
    addComment(currPost.find('input#comment-name').val(), currPost.data().index);
    // renderComments();
});

