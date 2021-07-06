const axios = require('axios')

exports.searchMovie = async (query) => {
  try {
    const res = await axios(
      `${process.env.EXT_API_URL}search/movie?api_key=${process.env.EXT_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
    )
    return res.data
  } catch (err) {
    console.log(err)
  }
}

exports.popularMovies = async () => {
  try {
    const res = await axios(
      `${process.env.EXT_API_URL}movie/popular?api_key=${process.env.EXT_API_KEY}&language=en-US&page=1`
    )
    return res.data
  } catch (err) {
    console.log(err)
  }
}
