const axios = require('axios')

exports.searchMovie = async (query) => {
  try {
    const res = await axios(
      `https://api.themoviedb.org/3/search/movie?api_key=3951320f561eee83f44ed08fc503df73&language=en-US&query=${query}&page=1&include_adult=false`
    )
    return res.data
  } catch (err) {
    console.log(err)
  }
}
