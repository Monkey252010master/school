// --- Data ---

const cars = [
  {
    id: 'supra98',
    name: '1998 Toyota Supra',
    baseHp: 320,
    baseWeight: 3400,
    dragCoef: 0.31,
    drive: 'RWD'
  },
  {
    id: 'mustang14',
    name: '2014 Mustang GT',
    baseHp: 420,
    baseWeight: 3600,
    dragCoef: 0.32,
    drive: 'RWD'
  },
  {
    id: 'gtr17',
    name: '2017 Nissan GT-R',
    baseHp: 565,
    baseWeight: 3900,
    dragCoef: 0.27,
    drive: 'AWD'
  }
];

const engines = [
  { id: 'stock', name: 'Stock', hpAdd: 0, weightAdd: 0 },
  { id: 'stage1', name: 'Stage 1 Tune', hpAdd: 60, weightAdd: 0 },
  { id: 'bigTurbo', name: 'Big Turbo Kit', hpAdd: 180, weightAdd: 60 },
  { id: 'raceBuild', name: 'Full Race Build', hpAdd: 320, weightAdd: 80 }
];

const tires = [
  { id: 'street', name: 'Street Tires', grip: 1.0 },
  { id: 'sport', name: 'Sport Tires', grip: 1.2 },
  { id: 'drag', name: 'Drag Radials', grip: 1.5 }
];

// --- DOM ---

const carSelect = document.getElementById('carSelect');
const engineSelect = document.getElementById('engineSelect');
const tireSelect = document.getElementById('tireSelect');
const runSimBtn = document.getElementById('runSim');

const statHp = document.getElementById('statHp');
const statWeight = document.getElementById('statWeight');
const statPw = document.getElementById('statPw');
const statGrip = document.getElementById('statGrip');
const stat060 = document.getElementById('stat060');
const statQuarter = document.getElementById('statQuarter');
const statTop = document.getElementById('statTop');
const statScore = document.getElementById('statScore');
const simResult = document.getElementById('simResult');

// --- Init dropdowns ---

function populateSelect(select, items, labelKey = 'name', valueKey = 'id') {
  items.forEach(item => {
    const opt = document.createElement('option');
    opt.value = item[valueKey];
    opt.textContent = item[labelKey];
    select.appendChild(opt);
  });
}

populateSelect(carSelect, cars);
populateSelect(engineSelect, engines);
populateSelect(tireSelect, tires);

// --- Helpers ---

function getSelectedCar() {
  return cars.find(c => c.id === carSelect.value);
}

function getSelectedEngine() {
  return engines.find(e => e.id === engineSelect.value);
}

function getSelectedTire() {
  return tires.find(t => t.id === tireSelect.value);
}

// --- Core calculations ---

function calculateBuild() {
  const car = getSelectedCar();
  const engine = getSelectedEngine();
  const tire = getSelectedTire();

  if (!car || !engine || !tire) return;

  const hp = car.baseHp + engine.hpAdd;
  const weight = car.baseWeight + engine.weightAdd;
  const grip = tire.grip * (car.drive === 'AWD' ? 1.1 : 1.0);
  const pw = hp / weight; // hp per lb

  // Very rough fake formulas just to feel right
  const zeroToSixty = (6.8 - pw * 2.4 - (grip - 1) * 0.6).toFixed(2);
  const quarterMile = (weight / hp * 0.18 + 9.2 - (grip - 1) * 0.3).toFixed(2);
  const topSpeed = Math.round(150 + (hp - 300) * 0.09 - car.dragCoef * 20);

  const score = Math.round(
    (1000 / zeroToSixty) +
    topSpeed * 0.4 +
    grip * 15 -
    weight * 0.01
  );

  // Update UI
  statHp.textContent = `${hp} hp`;
  statWeight.textContent = `${weight} lb`;
  statPw.textContent = pw.toFixed(3);
  statGrip.textContent = grip.toFixed(2);

  stat060.textContent = `${zeroToSixty}s`;
  statQuarter.textContent = `${quarterMile}s`;
  statTop.textContent = `${topSpeed} mph`;
  statScore.textContent = score;

  return { car, hp, weight, grip, zeroToSixty, quarterMile, topSpeed, score };
}

function runSimulation() {
  const result = calculateBuild();
  if (!result) return;

  simResult.textContent =
    `You built a ${result.car.name} making ${result.hp} hp at ${result.weight} lb. ` +
    `0–60 in ${result.zeroToSixty}s, 1/4 mile in ${result.quarterMile}s, ` +
    `top speed around ${result.topSpeed} mph. Build score: ${result.score}.`;
}

// --- Events ---

carSelect.addEventListener('change', calculateBuild);
engineSelect.addEventListener('change', calculateBuild);
tireSelect.addEventListener('change', calculateBuild);
runSimBtn.addEventListener('click', runSimulation);

// Initial calc
calculateBuild();