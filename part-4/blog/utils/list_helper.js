const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, val) => {
    return val.likes + acc;
  }, 0);
};

module.exports = { dummy, totalLikes };
