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
  getBuild,
  generateRankedOpponent
} from "./modules/build.js";
import { generateRaceCode } from "./modules/encode.js";
import { decodeRaceCode } from "./modules/decode.js";
import { simulateDragLive } from "./modules/dragSim.js";
import { runStagingTree, applyTheme } from "./modules/ui.js";

const carCategorySelect = document.getElementById("carCategory");
const carInput = document.getElementById("carInput");
const carList = document.getElementById("carList");

const engineSelect = document.getElementById("engineSelect");
const tireSelect = document.getElementById("tireSelect");
const drivetrainSelect = document.getElementById("drivetrainSelect");

const pistonsSelect = document.getElementById("pistonsSelect");
const rodsSelect = document.getElementById("rodsSelect");
const camSelect = document.getElementById("camSelect");
const forcedInductionSelect = document.getElementById("forcedInductionSelect");
const nitrousSelect = document.getElementById("nitrousSelect");
const fuelSelect = document.getElementById("fuelSelect");
const gearSelect = document.getElementById("gearSelect");
const suspensionSelect = document.getElementById("suspensionSelect");

const weightReductionRange = document.getElementById("weightReduction");
const weightReductionValue = document.getElementById("weightReductionValue");
const boostLevelRange = document.getElementById("boostLevel");
const boostLevelValue = document.getElementById("boostLevelValue");

const statsDiv = document.getElementById("stats");
const generateCodeBtn = document.getElementById("generateCode");
const myRaceCodeInput = document.getElementById("myRaceCode");
const friendCodeInput = document.getElementById("friendCode");
const raceFriendBtn = document.getElementById("raceFriendBtn");
const raceSoloBtn = document.getElementById("raceSoloBtn");
const raceOutput = document.getElementById("raceOutput");
const barYou = document.getElementById("barYou");
const barFriend = document.getElementById("barFriend");

const advancedToggle = document.getElementById("advancedToggle");
const advancedTuningSection = document.getElementById("advancedTuning");
const tuningModeLabel = document.getElementById("tuningModeLabel");

// Helpers
function populateDatalist(datalist, list) {
  datalist.innerHTML = "";
  list.forEach(item => {
    const opt = document.createElement("option");
    opt.value = item.name;
    datalist.appendChild(opt);
  });
}

function populateSelect(select, list) {
  select.innerHTML = "";
  list.forEach(item => {
    const opt = document.createElement("option");
    opt.value = item.name;
    opt.textContent = item.name;
    select.appendChild(opt);
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

// Populate controls
populateDatalist(carList, cars);
populateSelect(engineSelect, engines);
populateSelect(tireSelect, tires);
populateSelect(drivetrainSelect, drivetrains);
populateSelect(pistonsSelect, pistons);
populateSelect(rodsSelect, rods);
populateSelect(camSelect, cams);
populateSelect(forcedInductionSelect, forcedInduction);
populateSelect(nitrousSelect, nitrous);
populateSelect(fuelSelect, fuels);
populateSelect(gearSelect, gears);
populateSelect(suspensionSelect, suspensions);
refreshCarList();

// Defaults
carInput.value = cars[0].name;
engineSelect.value = engines[0].name;
tireSelect.value = tires[0].name;
drivetrainSelect.value = "RWD";

pistonsSelect.value = pistons[0].name;
rodsSelect.value = rods[0].name;
camSelect.value = cams[0].name;
forcedInductionSelect.value = forcedInduction[0].name;
nitrousSelect.value = nitrous[0].name;
fuelSelect.value = fuels[0].name;
gearSelect.value = gears[0].name;
suspensionSelect.value = suspensions[0].name;

weightReductionValue.textContent = `${weightReductionRange.value} lb`;
boostLevelValue.textContent = `${boostLevelRange.value} psi`;

// Events
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
  engineSelect,
  tireSelect,
  drivetrainSelect,
  pistonsSelect,
  rodsSelect,
  camSelect,
  forcedInductionSelect,
  nitrousSelect,
  fuelSelect,
  gearSelect,
  suspensionSelect
].forEach(el => {
  el.addEventListener("change", updateBuildStats);
  el.addEventListener("blur", updateBuildStats);
});

advancedToggle.addEventListener("change", () => {
  const advancedOn = advancedToggle.checked;

  tuningModeLabel.textContent = advancedOn
    ? "Advanced Tuning"
    : "Simple Tuning";

  advancedTuningSection.classList.toggle("hidden", !advancedOn);
  applyTheme(advancedOn);
  updateBuildStats();
});

// Initial theme
applyTheme(false);
advancedToggle.checked = false;
advancedTuningSection.classList.add("hidden");
tuningModeLabel.textContent = "Simple Tuning";

function getSelection() {
  return {
    carName: carInput.value,
    engineName: engineSelect.value,
    tireName: tireSelect.value,
    drivetrainName: drivetrainSelect.value,
    weightReduction: Number(weightReductionRange.value),
    boostLevel: Number(boostLevelRange.value),
    advancedOn: advancedToggle.checked,
    pistonsName: pistonsSelect.value,
    rodsName: rodsSelect.value,
    camName: camSelect.value,
    forcedInductionName: forcedInductionSelect.value,
    nitrousName: nitrousSelect.value,
    fuelName: fuelSelect.value,
    gearName: gearSelect.value,
    suspensionName: suspensionSelect.value
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
Drivetrain: ${build.drivetrainName}

Horsepower: ${build.hp.toFixed(0)} hp
Weight: ${build.weight.toFixed(0)} lb
Power/Weight: ${build.pw.toFixed(3)}
Grip: ${build.grip.toFixed(2)}
Launch Factor: ${build.launch.toFixed(2)}

Boost: ${build.boostLevel.toFixed(0)} psi
Safe Boost: ${build.safeBoost.toFixed(0)} psi
Warn Boost: ${build.warnBoost.toFixed(0)} psi
Danger Boost: ${build.dangerBoost.toFixed(0)} psi

Synergy Score: ${build.synergyScore.toFixed(1)}
DNF Risk: ${(build.dnfChance * 100).toFixed(1)}%
Wreck Risk: ${(build.wreckChance * 100).toFixed(1)}%
Rank: ${build.rank.toUpperCase()}

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
    launch: myBuild.launch,
    dnfChance: myBuild.dnfChance,
    wreckChance: myBuild.wreckChance
  };

  const friendSimBuild = {
    hp: friendDecoded.hp,
    weight: friendDecoded.weight,
    grip: friendDecoded.grip,
    launch: friendDecoded.launch,
    dnfChance: 0.02,
    wreckChance: 0.02
  };

  const [myRun, frRun] = await Promise.all([
    simulateDragLive(mySimBuild, barYou),
    simulateDragLive(friendSimBuild, barFriend)
  ]);

  const resultText = formatRaceResults("Friend", myRun, frRun);
  raceOutput.textContent = resultText;
}

raceFriendBtn.addEventListener("click", handleRaceFriend);

async function handleRaceSolo() {
  raceOutput.textContent = "Staging...";
  await runStagingTree();

  const myBuild = updateBuildStats();
  if (!myBuild) {
    raceOutput.textContent = "Your build is incomplete.";
    return;
  }

  barYou.style.width = "0%";
  barFriend.style.width = "0%";

  const mySimBuild = {
    hp: myBuild.hp,
    weight: myBuild.weight,
    grip: myBuild.grip,
    launch: myBuild.launch,
    dnfChance: myBuild.dnfChance,
    wreckChance: myBuild.wreckChance
  };

  const rival = generateRankedOpponent(myBuild);

  const rivalSimBuild = {
    hp: rival.hp,
    weight: rival.weight,
    grip: rival.grip,
    launch: rival.launch,
    dnfChance: rival.dnfChance,
    wreckChance: rival.wreckChance
  };

  const [myRun, rivalRun] = await Promise.all([
    simulateDragLive(mySimBuild, barYou),
    simulateDragLive(rivalSimBuild, barFriend)
  ]);

  const resultText = formatRaceResults(`Rival (${rival.car.name})`, myRun, rivalRun);
  raceOutput.textContent = resultText;
}

raceSoloBtn.addEventListener("click", handleRaceSolo);

function formatRaceResults(opponentLabel, myRun, oppRun) {
  if (myRun.dnf || myRun.wreck || oppRun.dnf || oppRun.wreck) {
    let msg = "";

    if (myRun.dnf) msg += "YOU DNF: " + myRun.reason + "\n";
    if (myRun.wreck) msg += "YOU WRECKED: " + myRun.reason + "\n";

    if (oppRun.dnf) msg += `${opponentLabel} DNF: ${oppRun.reason}\n`;
    if (oppRun.wreck) msg += `${opponentLabel} WRECKED: ${oppRun.reason}\n`;

    if (!msg) msg = "Both cars failed for unknown reasons.";
    return msg;
  }

  const winner = myRun.ft1320 < oppRun.ft1320 ? "YOU WIN" : `${opponentLabel.toUpperCase()} WINS`;

  return `Your Run:
60ft: ${myRun.ft60.toFixed(2)}
330ft: ${myRun.ft330.toFixed(2)}
1/8: ${myRun.ft660.toFixed(2)} @ ${myRun.trap.toFixed(1)} mph
1000ft: ${myRun.ft1000.toFixed(2)}
1/4: ${myRun.ft1320.toFixed(2)}

${opponentLabel}:
60ft: ${oppRun.ft60.toFixed(2)}
330ft: ${oppRun.ft330.toFixed(2)}
1/8: ${oppRun.ft660.toFixed(2)} @ ${oppRun.trap.toFixed(1)} mph
1000ft: ${oppRun.ft1000.toFixed(2)}
1/4: ${oppRun.ft1320.toFixed(2)}

${winner}`;
}

import { synergy } from "./modules/build.js";

const openDictionaryBtn = document.getElementById("openDictionaryBtn");
const dictionaryOverlay = document.getElementById("dictionaryOverlay");
const dictionaryText = document.getElementById("dictionaryText");
const closeDictionaryBtn = document.getElementById("closeDictionaryBtn");

openDictionaryBtn.addEventListener("click", () => {
  dictionaryOverlay.classList.remove("hidden");

  const entries = Object.entries(synergy);
  const formatted = entries.map(([key, val]) => {
    return `${key}:\n  ${Object.entries(val).map(([k, v]) => `${k}: ${v}`).join("\n  ")}`;
  }).join("\n\n");

  dictionaryText.textContent = formatted;
});

closeDictionaryBtn.addEventListener("click", () => {
  dictionaryOverlay.classList.add("hidden");
});



updateBuildStats();