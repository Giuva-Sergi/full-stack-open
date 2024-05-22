const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, val) => {
    return val.likes + acc;
  }, 0);
};

const favoriteBlog = (blogs) => {
  const likes = blogs.reduce((acc, currVal) => {
    if (currVal.likes > acc) {
      acc = currVal.likes;
    }
    return acc;
  }, 0);

  return blogs.find((blog) => blog.likes === likes);
};

const mostBlogs = (blogs) => {
  const groupedByAuthor = _.groupBy(blogs, "author");
  const authorArticleCount = _.mapValues(
    groupedByAuthor,
    (articles) => articles.length
  );

  const mostBlogAuthor = _.maxBy(
    _.keys(authorArticleCount),
    (author) => authorArticleCount[author]
  );

  return { author: mostBlogAuthor, count: authorArticleCount[mostBlogAuthor] };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
