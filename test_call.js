const speechOptions = { pitch: 'high', volume: 'loud', rate: 'x-slow' };

VoxEngine.addEventListener(AppEvents.CallAlerting, event => {
  const tones = [];
  const { call } = event;
  call.answer();
  call.say('Please, enter 2 numbers from your keyboard', Language.UK_ENGLISH_MALE, speechOptions);
  call.handleTones(true);
  call.addEventListener(CallEvents.ToneReceived, e => {
    tones.push(parseInt(e.tone, 10));
    if (tones.length >= 2) {
      const sum = tones.reduce((res, t) => res + t, 0);
      call.say(sum.toString(), Language.UK_ENGLISH_MALE, speechOptions);
    }
  });
});
