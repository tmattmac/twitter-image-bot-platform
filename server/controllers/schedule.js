const { updateJob } = require('../services/google/scheduler');

async function updateSchedule(req, res, next) {
  const { options } = req.body;
  updateJob(req.user.id, options)
    .then(() => {
      res.send({ message: 'schedule updated' });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
}

module.exports = {
  updateSchedule
}