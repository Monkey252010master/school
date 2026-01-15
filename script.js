import {
  cars,
  engines,
  tires,
  drivetrains,
  pistons,
  rods,
  cams,
  forcedInduction,
  nitrous,
  fuels,
  gears,
  suspensions,
  getBuild
} from "./modules/build.js";
import { generateRaceCode } from "./modules/encode.js";
import { decodeRaceCode } from "./modules/decode.js";
import { simulateDragLive } from "./modules/dragSim.js";
import { runStagingTree, applyTheme } from "./modules/ui.js";

const carCategorySelect = document.getElementById("carCategory");
const carInput = document.getElementById("carInput");
const carList = document.getElementById("carList");

const engineInput = document.getElementById("engineInput");
const engineList = document.getElementById("engineList");

const tireInput = document.getElementById("tireInput");
const tireList = document.getElementById("tireList");

const drivetrainInput = document.getElementById("drivetrainInput");
const drivetrainList = document.getElementById("drivetrainList");

const pistonsInput = document.getElementById("pistonsInput");
const pistonsList = document.getElementById("pistonsList");

const rodsInput = document.getElementById("rodsInput");
const rodsList = document.getElementById("rodsList");

const camInput = document.getElementById("camInput");
const camList = document.getElementById("camList");

const forcedInductionInput = document.getElementById("forcedInductionInput");
const forcedInductionList = document.getElementById("forcedInductionList");

const nitrousInput = document.getElementById("nitrousInput");
const nitrousList = document.getElementById("nitrousList");

const fuelInput = document.getElementById("fuelInput");
const fuelList = document.getElementById("fuelList");

const gearInput = document.getElementById("gearInput");
const gearList = document.getElementById("gearList");

const suspensionInput = document.getElementById("suspensionInput");
const suspensionList = document.getElementById("suspensionList");

const weightReductionRange = document.getElementById("weightReduction");
const weightReductionValue = document.getElementById("weightReductionValue");
const boostLevelRange = document.getElementById("boostLevel");
const boostLevelValue = document.getElementById("boostLevelValue");

const statsDiv = document.getElementById("stats");
const generateCodeBtn = document.getElementById("generateCode");
const myRaceCodeInput = document.getElementById("myRaceCode");
const friendCodeInput = document.getElementById("friendCode");
const raceFriendBtn = document.getElementById("raceFriendBtn");
const raceOutput = document.getElementById("raceOutput");
const barYou = document.getElementById("barYou");
const barFriend = document.getElementById("barFriend");

const advancedToggle = document.getElementById("advancedToggle");
const advancedTuningSection = document.getElementById("advancedTuning");

// Populate datalists
function populateDatalist(datalist, list) {
  datalist.innerHTML = "";
  list.forEach(item => {
    const opt = document.createElement("option");
    opt.value = item.name;
    datalist.appendChild(opt);
  });
}

function filterCarsByCategory(category) {
  if (category === "all") return cars;
  return cars.filter(c => c.category === category);
}

function refreshCarList() {
  const category = carCategorySelect.value;
  const filtered = filterCarsByCategory(category);
  populateDatalist(carList, filtered);
}

populateDatalist(engineList, engines);
populateDatalist(tireList, tires);
populateDatalist(drivetrainList, drivetrains);
populateDatalist(pistonsList, pistons);
populateDatalist(rodsList, rods);
populateDatalist(camList, cams);
populateDatalist(forcedInductionList, forcedInduction);
populateDatalist(nitrousList, nitrous);
populateDatalist(fuelList, fuels);
populateDatalist(gearList, gears);
populateDatalist(suspensionList, suspensions);
refreshCarList();

// Default selections
carInput.value = cars[0].name;
engineInput.value = engines[0].name;
tireInput.value = tires[0].name;
drivetrainInput.value = drivetrains[0].name;

pistonsInput.value = pistons[0].name;
rodsInput.value = rods[0].name;
camInput.value = cams[0].name;
forcedInductionInput.value = forcedInduction[0].name;
nitrousInput.value = nitrous[0].name;
fuelInput.value = fuels[0].name;
gearInput.value = gears[0].name;
suspensionInput.value = suspensions[0].name;

weightReductionValue.textContent = `${weightReductionRange.value} lb`;
boostLevelValue.textContent = `${boostLevelRange.value} psi`;

weightReductionRange.addEventListener("input", () => {
  weightReductionValue.textContent = `${weightReductionRange.value} lb`;
  updateBuildStats();
});

boostLevelRange.addEventListener("input", () => {
  boostLevelValue.textContent = `${boostLevelRange.value} psi`;
  updateBuildStats();
});

carCategorySelect.addEventListener("change", () => {
  refreshCarList();
  const filtered = filterCarsByCategory(carCategorySelect.value);
  if (filtered.length > 0) carInput.value = filtered[0].name;
  updateBuildStats();
});

[
  carInput,
  engineInput,
  tireInput,
  drivetrainInput,
  pistonsInput,
  rodsInput,
  camInput,
  forcedInductionInput,
  nitrousInput,
  fuelInput,
  gearInput,
  suspensionInput
].forEach(input => {
  input.addEventListener("change", updateBuildStats);
  input.addEventListener("blur", updateBuildStats);
});

advancedToggle.addEventListener("change", () => {
  const advancedOn = advancedToggle.checked;
  advancedTuningSection.classList.toggle("hidden", !advancedOn);
  applyTheme(advancedOn);
  updateBuildStats();
});

applyTheme(false);
advancedToggle.checked = false;
advancedTuningSection.classList.add("hidden");

function getSelection() {
  return {
    carName: carInput.value,
    engineName: engineInput.value,
    tireName: tireInput.value,
    drivetrainName: drivetrainInput.value,
    weightReduction: Number(weightReductionRange.value),
    boostLevel: Number(boostLevelRange.value),
    advancedOn: advancedToggle.checked,
    pistonsName: pistonsInput.value,
    rodsName: rodsInput.value,
    camName: camInput.value,
    forcedInductionName: forcedInductionInput.value,
    nitrousName: nitrousInput.value,
    fuelName: fuelInput.value,
    gearName: gearInput.value,
    suspensionName: suspensionInput.value
  };
}

function updateBuildStats() {
  const selection = getSelection();
  const build = getBuild(selection);

  if (!build) {
    statsDiv.textContent = "Incomplete build. Check your selections.";
    return null;
  }

  statsDiv.textContent =
    `Car: ${build.car.name}
Engine: ${build.engine.name}
Tires: ${build.tire.name}
Drivetrain: ${build.drivetrain.name}

Horsepower: ${build.hp.toFixed(0)} hp
Weight: ${build.weight.toFixed(0)} lb
Power/Weight: ${build.pw.toFixed(3)}
Grip: ${build.grip.toFixed(2)}
Launch Factor: ${build.launch.toFixed(2)}

Mode: ${build.advancedOn ? "Advanced" : "Simple"}`;

  return build;
}

generateCodeBtn.addEventListener("click", () => {
  const build = updateBuildStats();
  if (!build) return;
  myRaceCodeInput.value = generateRaceCode(build);
});

async function handleRaceFriend() {
  if (!friendCodeInput.value.trim()) {
    raceOutput.textContent = "Enter a friend code first.";
    return;
  }

  raceOutput.textContent = "Staging...";
  await runStagingTree();

  const myBuild = updateBuildStats();
  if (!myBuild) {
    raceOutput.textContent = "Your build is incomplete.";
    return;
  }

  const friendDecoded = decodeRaceCode(friendCodeInput.value.trim());
  if (!friendDecoded) {
    raceOutput.textContent = "Invalid race code.";
    return;
  }

  barYou.style.width = "0%";
  barFriend.style.width = "0%";

  const mySimBuild = {
    hp: myBuild.hp,
    weight: myBuild.weight,
    grip: myBuild.grip,
    launch: myBuild.launch
  };

  const friendSimBuild = {
    hp: friendDecoded.hp,
    weight: friendDecoded.weight,
    grip: friendDecoded.grip,
    launch: friendDecoded.launch
  };

  const [myRun, frRun] = await Promise.all([
    simulateDragLive(mySimBuild, barYou),
    simulateDragLive(friendSimBuild, barFriend)
  ]);

  const winner = myRun.ft1320 < frRun.ft1320 ? "YOU WIN" : "FRIEND WINS";

  raceOutput.textContent =
    `Your Run:
60ft: ${myRun.ft60.toFixed(2)}
330ft: ${myRun.ft330.toFixed(2)}
1/8: ${myRun.ft660.toFixed(2)} @ ${myRun.trap.toFixed(1)} mph
1000ft: ${myRun.ft1000.toFixed(2)}
1/4: ${myRun.ft1320.toFixed(2)}

Friend:
60ft: ${frRun.ft60.toFixed(2)}
330ft: ${frRun.ft330.toFixed(2)}
1/8: ${frRun.ft660.toFixed(2)} @ ${frRun.trap.toFixed(1)} mph
1000ft: ${frRun.ft1000.toFixed(2)}
1/4: ${frRun.ft1320.toFixed(2)}

${winner}`;
}

raceFriendBtn.addEventListener("click", handleRaceFriend);

updateBuildStats();