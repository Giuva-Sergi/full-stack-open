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

console.log(favoriteBlog([]));

module.exports = { dummy, totalLikes, favoriteBlog };
