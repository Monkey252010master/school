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
  generateRankedOpponent,
  synergy
} from "./modules/build.js";

import { generateRaceCode } from "./modules/encode.js";
import { decodeRaceCode } from "./modules/decode.js";
import { simulateDragLive } from "./modules/dragSim.js";
import { runStagingTree, applyTheme } from "./modules/ui.js";


// ===============================
// ELEMENT REFERENCES
// ===============================

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


// ===============================
// SYNERGY DICTIONARY OVERLAY
// ===============================

const openDictionaryBtn = document.getElementById("openDictionaryBtn");
const dictionaryOverlay = document.getElementById("dictionaryOverlay");
const dictionaryText = document.getElementById("dictionaryText");
const closeDictionaryBtn = document.getElementById("closeDictionaryBtn");

openDictionaryBtn.addEventListener("click", () => {
  dictionaryOverlay.classList.remove("hidden");

  // Format synergy dictionary nicely
  const entries = Object.entries(synergy);
  const formatted = entries
    .map(([key, val]) => {
      const inner = Object.entries(val)
        .map(([k, v]) => `  ${k}: ${v}`)
        .join("\n");
      return `${key}:\n${inner}`;
    })
    .join("\n\n");

  dictionaryText.textContent = formatted;
});

closeDictionaryBtn.addEventListener("click", () => {
  dictionaryOverlay.classList.add("hidden");
});


// ===============================
// HELPERS
// ===============================

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


// ===============================
// INITIAL POPULATION
// ===============================

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

carInput.value = cars[0].name;


// ===============================
// UPDATE BUILD STATS
// ===============================

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
    statsDiv.textContent = "Incomplete build.";
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
Launch: ${build.launch.toFixed(2)}

Boost: ${build.boostLevel} psi
Safe Boost: ${build.safeBoost} psi
Warn Boost: ${build.warnBoost} psi
Danger Boost: ${build.dangerBoost} psi

Synergy Score: ${build.synergyScore.toFixed(1)}
DNF Risk: ${(build.dnfChance * 100).toFixed(1)}%
Wreck Risk: ${(build.wreckChance * 100).toFixed(1)}%
Rank: ${build.rank.toUpperCase()}`;

  return build;
}


// ===============================
// EVENT LISTENERS
// ===============================

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


// ===============================
// GENERATE RACE CODE
// ===============================

generateCodeBtn.addEventListener("click", () => {
  const build = updateBuildStats();
  if (!build) return;
  myRaceCodeInput.value = generateRaceCode(build);
});


// ===============================
// RACE FRIEND
// ===============================

async function handleRaceFriend() {
  if (!friendCodeInput.value.trim()) {
    raceOutput.textContent = "Enter a friend code.";
    return;
  }

  raceOutput.textContent = "Staging...";
  await runStagingTree();

  const myBuild = updateBuildStats();
  if (!myBuild) return;

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

  raceOutput.textContent = formatRaceResults("Friend", myRun, frRun);
}

raceFriendBtn.addEventListener("click", handleRaceFriend);


// ===============================
// RACE SOLO (RANKED OPPONENT)
// ===============================

async function handleRaceSolo() {
  raceOutput.textContent = "Staging...";
  await runStagingTree();

  const myBuild = updateBuildStats();
  if (!myBuild) return;

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

  raceOutput.textContent = formatRaceResults(`Rival (${rival.car.name})`, myRun, rivalRun);
}

raceSoloBtn.addEventListener("click", handleRaceSolo);


// ===============================
// FORMAT RESULTS
// ===============================

function formatRaceResults(label, myRun, oppRun) {
  if (myRun.dnf || myRun.wreck || oppRun.dnf || oppRun.wreck) {
    let msg = "";

    if (myRun.dnf) msg += "YOU DNF: " + myRun.reason + "\n";
    if (myRun.wreck) msg += "YOU WRECKED: " + myRun.reason + "\n";

    if (oppRun.dnf) msg += `${label} DNF: ${oppRun.reason}\n`;
    if (oppRun.wreck) msg += `${label} WRECKED: ${oppRun.reason}\n`;

    return msg || "Both cars failed.";
  }

  const winner = myRun.ft1320 < oppRun.ft1320 ? "YOU WIN" : `${label.toUpperCase()} WINS`;

  return `Your Run:
60ft: ${myRun.ft60.toFixed(2)}
330ft: ${myRun.ft330.toFixed(2)}
1/8: ${myRun.ft660.toFixed(2)} @ ${myRun.trap.toFixed(1)} mph
1000ft: ${myRun.ft1000.toFixed(2)}
1/4: ${myRun.ft1320.toFixed(2)}

${label}:
60ft: ${oppRun.ft60.toFixed(2)}
330ft: ${oppRun.ft330.toFixed(2)}
1/8: ${oppRun.ft660.toFixed(2)} @ ${oppRun.trap.toFixed(1)} mph
1000ft: ${oppRun.ft1000.toFixed(2)}
1/4: ${oppRun.ft1320.toFixed(2)}

${winner}`;
}


// ===============================
// INITIALIZE
// ===============================

updateBuildStats();