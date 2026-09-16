const state = { hunger: 72, thirst: 64, fun: 80, clean: 88, coins: 120 };
const messages = {
  feed: ['งั่มๆ อร่อยมากเลย! 🥕', 'โมจิแก้มตุ่ยแล้วนะ'],
  water: ['จิบน้ำแล้วสดชื่นจัง 💧', 'ขอบคุณสำหรับน้ำเย็นๆ!'],
  play: ['เย่! เล่นกันอีกครั้งได้ไหม 🎾', 'โมจิวิ่งจนหางฟูเลย!'],
  clean: ['ตัวหอมฟุ้งแล้ว ขอบคุณนะ 🫧', 'ห้องสะอาดน่านอนที่สุดเลย']
};
const clamp = value => Math.max(0, Math.min(100, value));

function render() {
  ['hunger', 'thirst', 'fun', 'clean'].forEach(key => {
    document.getElementById(key).style.width = state[key] + '%';
    document.getElementById(key + 'Text').textContent = state[key] + '%';
  });
  document.getElementById('coins').textContent = state.coins;
  const average = (state.hunger + state.thirst + state.fun + state.clean) / 4;
  const mood = document.getElementById('mood');
  mood.textContent = average > 75 ? 'มีความสุขมาก' : average > 45 ? 'อารมณ์ดี' : 'ขอการดูแลหน่อย';
  mood.style.background = average > 45 ? '#ffe2ea' : '#fff0c7';
}

function doAction(action) {
  const changes = {
    feed: { hunger: 18, coins: -5 }, water: { thirst: 22, coins: -3 },
    play: { fun: 20, hunger: -4, thirst: -3 }, clean: { clean: 24, coins: -2 }
  }[action];
  Object.entries(changes).forEach(([key, amount]) => {
    state[key] = key === 'coins' ? Math.max(0, state[key] + amount) : clamp(state[key] + amount);
  });
  document.getElementById('speech').textContent = messages[action][Math.floor(Math.random() * messages[action].length)];
  document.getElementById('log').textContent = messages[action][0] + '  (-' + Math.abs(changes.coins || 0) + ' เหรียญ)';
  const hamster = document.getElementById('hamster');
  hamster.classList.remove('happy');
  void hamster.offsetWidth;
  hamster.classList.add('happy');
  render();
}

document.querySelectorAll('[data-action]').forEach(button => button.addEventListener('click', () => doAction(button.dataset.action)));
setInterval(() => {
  state.hunger = clamp(state.hunger - 1); state.thirst = clamp(state.thirst - 1);
  state.fun = clamp(state.fun - 1); state.clean = clamp(state.clean - .5); render();
}, 7000);
render();