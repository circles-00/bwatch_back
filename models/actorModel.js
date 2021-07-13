const axios = require('axios')

exports.singleActor = async (id) => {
  try {
    const res = await axios(
      `https://api.themoviedb.org/3/person/${id}?api_key=3951320f561eee83f44ed08fc503df73&language=en-US`
    )
    return res.data
  } catch (err) {
    console.log(err)
  }
}

exports.popularActors = async () => {
  try {
    const res = await axios(
      `https://api.themoviedb.org/3/person/popular?api_key=3951320f561eee83f44ed08fc503df73&language=en-US&page=1`
    )
    return res.data
  } catch (err) {
    console.log(err)
  }
}
