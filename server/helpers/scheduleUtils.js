function getMinuteBefore(time) {
  if (!isValidTime(time)) throw new Error('invalid time format');
  let [hours, minutes] = time.split(':').map(num => +num);
  minutes--;
  if (minutes < 0) {
    hours--;
    minutes = 59;
  }
  if (hours < 0) {
    hours = 23;
  }
  return [hours, minutes].join(':').padStart(time.length, '0');
}

// https://stackoverflow.com/a/44118363
function isValidTimeZone(tz) {
  if (!Intl || !Intl.DateTimeFormat().resolvedOptions().timeZone) {
      throw 'Time zones are not available in this environment';
  }

  try {
      Intl.DateTimeFormat(undefined, {timeZone: tz});
      return true;
  }
  catch (ex) {
      return false;
  }
}

function isValidTime(time) {
  const regex = /^(\d{1,2}:[0-5]\d)$/;
  return regex.test(time) && +time.match(/\d{1,2}/)[0] < 24;
}

function validateSchedule(scheduleObject) {
  const { frequency, startTime, timeZone } = scheduleObject;
  if (frequency < 1 || frequency > 24 || 24 % frequency > 0) {
    throw new Error('invalid frequency provided; should be between 1-24 and divisible by 24');
  }
  if (!isValidTime(startTime)) {
    throw new Error('invalid startTime provided');
  }
  if (timeZone && !isValidTimeZone(timeZone)) {
    throw new Error('invalid timeZone provided');
  }
}

function scheduleTextToObject(scheduleText) {
  if (!/^(every \d{1,2} hours from \d{1,2}:[0-5]\d to \d{1,2}:[0-5]\d)$/.test(scheduleText)) {
    throw new Error('unexpected invalid schedule text');
  }
  const startTime = scheduleText.match(/(\d{1,2}:\d{2})/)[0];
  const frequency = +scheduleText.match(/(\d+)/)[0];
  if (24 % frequency > 0 || +startTime.match(/\d{1,2}/)[0] > 23) {
    throw new Error('unexpected invalid schedule text');
  }
  return { startTime, frequency };
}

function scheduleObjectToText(scheduleObject) {
  validateSchedule(scheduleObject);
  const { startTime, frequency } = scheduleObject;
  return `every ${frequency} hours from ${startTime} to ${getMinuteBefore(startTime)}`;
}

module.exports = {
  validateSchedule,
  scheduleTextToObject,
  scheduleObjectToText
}