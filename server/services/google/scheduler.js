const scheduler = require('@google-cloud/scheduler');

// config
const {
  GCLOUD_PROJECT_ID,
  GCLOUD_DEFAULT_LOCATION,
  GCLOUD_PUBSUB_TOPIC
} = process.env;

const DEFAULT_TIMER = "0 * * * *";

const client = new scheduler.CloudSchedulerClient();

async function createJob(id) {
  const parent = client.locationPath(GCLOUD_PROJECT_ID, GCLOUD_DEFAULT_LOCATION);

  await client.createJob({
    parent,
    job: {
      name: id,
      schedule: DEFAULT_TIMER,
      state: "DISABLED",
      pubsubTarget: {
        topicName: GCLOUD_PUBSUB_TOPIC, // TODO: Get this dynamically rather than using env
        attributes: {
          id,
          oauthKey: "placeholder",
          oauthSecret: "placeholder",
          repeatAllowance: 0
        }
      }
    }
  });
}

async function updateJob(id, options) {
  const job = client.jobPath(GCLOUD_PROJECT_ID, GCLOUD_DEFAULT_LOCATION, id);

  const { schedule, enabled, repeatAllowance } = options;
  const updateMask = generateUpdateMask(options);

  const state = enabled ? "ENABLED" : "DISABLED";

  await client.updateJob({
    job: {
      name: job,
      schedule,
      state,
      pubsubTarget: {
        attributes: {
          repeatAllowance
        }
      }
    },
    updateMask
  });
}

function generateUpdateMask(options) {
  const mask = [];

  if (options.schedule) {
    mask.push('schedule');
  }

  if (options.enabled) {
    mask.push('state');
  }

  if (options.repeatAllowance) {
    mask.push('pubsubTarget.attributes.repeatAllowance');
  }

  return mask;
}

module.exports = {
  createJob,
  updateJob
}