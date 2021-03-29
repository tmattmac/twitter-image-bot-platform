const scheduler = require('@google-cloud/scheduler');

// config
const {
  GCLOUD_PROJECT_ID,
  GCLOUD_DEFAULT_LOCATION,
  GCLOUD_PUBSUB_TOPIC,
} = process.env;

const DEFAULT_TIMER = 'every 1 hours from 00:00 to 23:59';

const client = new scheduler.CloudSchedulerClient();

async function createJob(id) {
  const parent = client.locationPath(
    GCLOUD_PROJECT_ID,
    GCLOUD_DEFAULT_LOCATION
  );
  const name = client.jobPath(GCLOUD_PROJECT_ID, GCLOUD_DEFAULT_LOCATION, id);

  const job = await client.createJob({
    parent,
    job: {
      name,
      description: 'Periodic image posting task',
      schedule: DEFAULT_TIMER,
      pubsubTarget: {
        topicName: GCLOUD_PUBSUB_TOPIC, // TODO: Get this dynamically rather than using env
        attributes: {
          enabled: false,
          id,
          repeatAllowance: 0,
        },
      },
    },
  });

  return job[0];
}

async function updateJob(id, options) {
  const name = client.jobPath(GCLOUD_PROJECT_ID, GCLOUD_DEFAULT_LOCATION, id);

  const { schedule, enabled, timeZone } = options;

  let job = await client.updateJob({
    job: {
      name,
      schedule,
      timeZone,
      pubsubTarget: {
        attributes: {
          enabled,
          id,
        },
      },
    },
    updateMask: {
      paths: ['schedule', 'pubsub_target.attributes', 'time_zone'],
    },
  });

  return job[0];
}

async function getJob(id) {
  const name = client.jobPath(GCLOUD_PROJECT_ID, GCLOUD_DEFAULT_LOCATION, id);
  const job = await client.getJob({ name });
  return job[0];
}

module.exports = {
  createJob,
  updateJob,
  getJob,
};
