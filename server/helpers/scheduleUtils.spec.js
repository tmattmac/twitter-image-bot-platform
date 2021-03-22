const { scheduleTextToObject, scheduleObjectToText } = require('./scheduleUtils');

describe('#scheduleTextToObject', () => {
  test('frequency < 10, startTime < 10:00', () => {
    const result = scheduleTextToObject('every 8 hours from 3:15 to 3:14');
    expect(result).toEqual({
      frequency: 8,
      startTime: '3:15'
    });
  });

  test('frequency > 10, startTime > 10:00', () => {
    const result = scheduleTextToObject('every 12 hours from 22:00 to 21:59');
    expect(result).toEqual({
      frequency: 12,
      startTime: '22:00'
    });
  });

  test('startTime < 1', () => {
    const result = scheduleTextToObject('every 6 hours from 00:30 to 00:29');
    expect(result).toEqual({
      frequency: 6,
      startTime: '00:30'
    });
  });

  test('frequency and startTime start with same number', () => {
    const result = scheduleTextToObject('every 3 hours from 3:40 to 3:39');
    expect(result).toEqual({
      frequency: 3,
      startTime: '3:40'
    });
  });

  test('completely invalid text', () => {
    expect(() => scheduleTextToObject('unrelated')).toThrow();
  });

  test('invalid frequency', () => {
    expect(() => scheduleTextToObject('every 48 hours from 11:25 to 11:24')).toThrow();
  });

  test('indivisible frequency', () => {
    expect(() => scheduleTextToObject('every 15 hours from 18:15 to 18:14')).toThrow();
  });

  test('invalid startTime', () => {
    expect(() => scheduleTextToObject('every 1 hours from 28:12 to 23:16')).toThrow();
  });

  // test('invalid end time', () => {
  //   expect(() => scheduleTextToObject('every 2 hours from 22:00 to 24:00')).toThrow();
  // });
});

describe('#scheduleObjectToText', () => {
  test('frequency < 10, startTime < 10:00', () => {
    const result = scheduleObjectToText({
      frequency: 8,
      startTime: '3:15'
    });
    expect(result).toBe('every 8 hours from 3:15 to 3:14');
  });

  test('frequency > 10, startTime > 10:00', () => {
    const result = scheduleObjectToText({
      frequency: 12,
      startTime: '22:00'
    });
    expect(result).toBe('every 12 hours from 22:00 to 21:59');
  });

  test('startTime < 1', () => {
    const result = scheduleObjectToText({
      frequency: 6,
      startTime: '00:30'
    });
    expect(result).toBe('every 6 hours from 00:30 to 00:29');
  });

  test('startTime = 00:00', () => {
    const result = scheduleObjectToText({
      frequency: 2,
      startTime: '00:00'
    });
    expect(result).toBe('every 2 hours from 00:00 to 23:59');
  })

  test('invalid frequency', () => {
    expect(() => scheduleObjectToText({
      frequency: 48,
      startTime: '11:00'
    })).toThrow();
  });

  test('indivisible frequency', () => {
    expect(() => scheduleObjectToText({
      frequency: 15,
      startTime: '00:15'
    })).toThrow();
  });

  test('wrong format startTime', () => {
    expect(() => scheduleObjectToText({
      frequency: 8,
      startTime: 'blah'
    })).toThrow();
  });

  test('invalid startTime', () => {
    expect(() => scheduleObjectToText({
      frequency: 1,
      startTime: '24:00'
    })).toThrow();
  });
});