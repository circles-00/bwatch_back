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
