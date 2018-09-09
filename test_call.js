const speechOptions = { pitch: 'high', volume: 'loud', rate: 'x-slow' };

VoxEngine.addEventListener(AppEvents.CallAlerting, event => {
  const tones = [];
  let hashedCount = 0;
  const { call } = event;
  call.answer();
  call.say('Please, enter 2 numbers, separated by #', Language.UK_ENGLISH_MALE, speechOptions);
  call.handleTones(true);
  call.addEventListener(CallEvents.ToneReceived, e => {
    const { tone } = e;
    if (tone === '#') hashedCount++;
    if (hashedCount >= 2) {
      const sum = tones.join('').split('#').reduce((res, num) => res + parseInt(num, 10), 0);
      call.say(sum.toString(), Language.UK_ENGLISH_MALE, speechOptions);
    }
    tones.push(e.tone);
  });
});
