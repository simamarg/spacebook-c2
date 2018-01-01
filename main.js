var SpacebookApp = function () {
  var posts = [
    // {text: "Hello world", id: 0, comments:[
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"}
    // ]}
  ];

  // the current id to assign to a post
  var currentId = 0;
  var $posts = $('.posts');

  var _findPostById = function (id) {
    for (var i = 0; i < posts.length; i += 1) {
      if (posts[i].id === id) {
        return posts[i];
      }
    }
  }

  var createPost = function (text) {
    var post = {
      text: text,
      id: currentId,
      comments: []
    }
    currentId += 1;
    posts.push(post);
  }

  var renderPosts = function () {
    $posts.empty();
    for (var i = 0; i < posts.length; i += 1) {
      var post = posts[i];

      // adding posts to the screen by using Handlebars
      var postItem = {id: post.id, postText: post.text};
      var source = $('#post-template').html();
      var template = Handlebars.compile(source);
      var newHTML = template(postItem);
      $posts.append(newHTML);
    }
  }

  var removePost = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    var id = $clickedPost.data().id;
    var post = _findPostById(id);
    posts.splice(posts.indexOf(post), 1);
    $clickedPost.remove();
  }

  var toggleComments = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    $clickedPost.find('.comments-container').toggleClass('show');
  }

  var createComment = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    var postId = $clickedPost.data().id;
    var post = _findPostById(postId);

    var commentText = $clickedPost.find('.comment-name').val();
    var comment = {text: commentText};
    posts[posts.indexOf(post)].comments.push(comment);
  }

  var renderComments = function () {
    this.renderPosts();
    for (i = 0; i < posts.length; i += 1) {
      var commentList = '';
      var postComments = posts[i].comments;

      // adding comments to the screen by using Handlebars
      var commentsData = {comment: []};
      for (j = 0; j < postComments.length; j += 1) {
        commentsData.comment.push({id: j, commentText: postComments[j].text});
      }
      var source = $('#comments-template').html();
      var template = Handlebars.compile(source);
      var newHTML = template(commentsData);
      var currentPost = '.post[data-id=' + posts[i].id + ']';
      $(currentPost).append(newHTML);
    }
  }

  var removeComment = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    var id = $clickedPost.data().id;
    var post = _findPostById(id);
    var commentIndex = $(currentPost).closest('li').data().id;
    posts[posts.indexOf(post)].comments.splice(commentIndex, 1);
  }

  return {
    createPost: createPost,
    renderPosts: renderPosts,
    removePost: removePost,
    createComment: createComment,
    renderComments: renderComments,
    removeComment: removeComment,
    toggleComments: toggleComments
  }
}

var app = SpacebookApp();

// immediately invoke the render method
app.renderPosts();

// Events
$('.add-post').on('click', function () {
  var text = $('#post-name').val();
  
  app.createPost(text);
  app.renderPosts();
  app.renderComments();
});

$('.posts').on('click', '.remove', function () {
  app.removePost(this);
});

$('.posts').on('click','.show-comments', function () {
  app.toggleComments(this);
});

$('.posts').on('click', '.add-comment', function () {
  app.toggleComments(this);
  app.createComment(this);
  app.renderComments();
});

$('.posts').on('click', '.remove-comment', function () {
  app.removeComment(this);
  app.renderComments();
});