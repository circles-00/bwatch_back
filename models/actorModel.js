const axios = require('axios')

exports.singleActor = async (id) => {
  try {
    const res = await axios(
      `${process.env.EXT_API_URL}person/${id}?api_key=${process.env.EXT_API_KEY}&language=en-US`
    )
    return res.data
  } catch (err) {
    console.log(err)
  }
}
