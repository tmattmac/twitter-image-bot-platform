const {
  updateJob,
  createJob,
  getJob,
} = require('../services/google/scheduler');
const {
  scheduleObjectToText,
  scheduleTextToObject,
  validateSchedule,
} = require('../helpers/scheduleUtils');

/**
 * options:
 *    startTime
 *    frequency
 *    timeZone?
 *    enabled?
 */

async function updateSchedule(req, res, next) {
  try {
    const { options } = req.body;
    if (!options) {
      throw new Error('missing required "options" key in request body');
    }
    validateSchedule(options);
    if (options.enabled && !(typeof options.enabled === 'boolean')) {
      throw new Error('enabled option must be a boolean (true/false)');
    }
    options.schedule = scheduleObjectToText(options);

    const job = await updateJob(req.user.id, options);
    console.dir(job);
    res.send({ message: 'Job updated successfully' });
  } catch (err) {
    next(err);
  }
}

/**
 * / -> {
 *    schedule: {
 *      startTime: '00:00' (str),
 *      frequency: 8 (int),
 *      enabled: true (boolean)
 *    }
 * }
 */

async function getSchedule(req, res, next) {
  try {
    const job = await getJob(req.user.id);
    const { enabled } = job.pubsubTarget.attributes;
    const { schedule } = job;

    const scheduleInfo = scheduleTextToObject(schedule);
    scheduleInfo.enabled = enabled === 'true';
    res.send({ options: scheduleInfo });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  updateSchedule,
  getSchedule,
};
