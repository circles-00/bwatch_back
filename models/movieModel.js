const axios = require('axios')

exports.singleMovie = async (id) => {
  try {
    const res = await axios(
      `${process.env.EXT_API_URL}movie/${id}?api_key=${process.env.EXT_API_KEY}&language=en-US`
    )
    return res.data
  } catch (err) {
    console.log(err)
  }
}

exports.recommendedMovies = async (id) => {
  try {
    const res = await axios(
      `${process.env.EXT_API_URL}movie/${id}/recommendations?api_key=${process.env.EXT_API_KEY}&language=en-US&page=1`
    )
    return res.data
  } catch (err) {
    console.log(err)
  }
}

//https://api.themoviedb.org/3/movie/top_rated?api_key=3951320f561eee83f44ed08fc503df73&language=en-US&page=1
exports.topMovies = async () => {
  try {
    const res = await axios(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=3951320f561eee83f44ed08fc503df73&language=en-US&page=1`
    )
    return res.data
  } catch (err) {
    console.log(err)
  }
}

exports.searchMovie = async (query) => {
  try {
    const res = await axios(
      `${process.env.EXT_API_URL}search/movie?api_key=${process.env.EXT_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
    )
    return res.data.results
  } catch (err) {
    console.log(err)
  }
}

exports.popularMovies = async () => {
  try {
    const res = await axios(
      `${process.env.EXT_API_URL}movie/popular?api_key=${process.env.EXT_API_KEY}&language=en-US&page=1`
    )
    return res.data.results
  } catch (err) {
    console.log(err)
  }
}

exports.upcomingMovies = async () => {
  try {
    const res = await axios(
      `${process.env.EXT_API_URL}movie/upcoming?api_key=${process.env.EXT_API_KEY}&language=en-US&page=1`
    )
    return res.data.results
  } catch (err) {
    console.log(err)
  }
}
