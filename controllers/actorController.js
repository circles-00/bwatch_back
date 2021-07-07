const Actor = require('../models/actorModel')
const CatchAsync = require('../utils/catchAsync')

exports.getActor = CatchAsync(async (req, res, next) => {
  const data = await Actor.singleActor(req.params.id)

  res.status(200).json({
    status: 'success',
    data,
  })
})
