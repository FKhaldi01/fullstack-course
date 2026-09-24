const dummy = (_blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }

  return blogs.reduce((favorite, blog) => {
    return blog.likes > favorite.likes ? blog : favorite
  }, blogs[0])
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }

  const blogCounts = blogs.reduce((counts, blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + 1
    return counts
  }, {})

  const author = Object.keys(blogCounts).reduce((mostPopular, currentAuthor) => {
    return blogCounts[currentAuthor] > blogCounts[mostPopular]
      ? currentAuthor
      : mostPopular
  })

  return {
    author,
    blogs: blogCounts[author],
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }

  const likesByAuthor = blogs.reduce((likes, blog) => {
    likes[blog.author] = (likes[blog.author] || 0) + blog.likes
    return likes
  }, {})

  const author = Object.keys(likesByAuthor).reduce((mostLiked, currentAuthor) => {
    return likesByAuthor[currentAuthor] > likesByAuthor[mostLiked]
      ? currentAuthor
      : mostLiked
  })

  return {
    author,
    likes: likesByAuthor[author],
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
