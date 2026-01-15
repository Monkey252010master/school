import { cars, engines, tires, getBuild } from "./modules/build.js";
import { generateRaceCode } from "./modules/encode.js";
import { decodeRaceCode } from "./modules/decode.js";
import { simulateDragLive } from "./modules/dragSim.js";
import { runStagingTree } from "./modules/ui.js";

const carSelect = document.getElementById("carSelect");
const engineSelect = document.getElementById("engineSelect");
const tireSelect = document.getElementById("tireSelect");
const generateCodeBtn = document.getElementById("generateCode");
const myRaceCodeInput = document.getElementById("myRaceCode");
const friendCodeInput = document.getElementById("friendCode");
const raceFriendBtn = document.getElementById("raceFriendBtn");
const statsDiv = document.getElementById("stats");
const raceOutput = document.getElementById("raceOutput");

const barYou = document.getElementById("barYou");
const barFriend = document.getElementById("barFriend");

function populate(select, list) {
  list.forEach(item => {
    const opt = document.createElement("option");
    opt.value = item.id;
    opt.textContent = item.name;
    select.appendChild(opt);
  });
}

populate(carSelect, cars);
populate(engineSelect, engines);
populate(tireSelect, tires);

function updateBuildStats() {
  const build = getBuild(carSelect.value, engineSelect.value, tireSelect.value);

  statsDiv.textContent =
    `Car: ${build.car.name}
Engine: ${build.engine.name}
Tires: ${build.tire.name}

Horsepower: ${build.hp} hp
Weight: ${build.weight} lb
Power/Weight: ${build.pw.toFixed(3)}
Grip: ${build.grip.toFixed(2)}`;

  return build;
}

carSelect.addEventListener("change", updateBuildStats);
engineSelect.addEventListener("change", updateBuildStats);
tireSelect.addEventListener("change", updateBuildStats);

generateCodeBtn.addEventListener("click", () => {
  const build = updateBuildStats();
  myRaceCodeInput.value = generateRaceCode(build);
});

async function handleRaceFriend() {
  raceOutput.textContent = "Staging...";

  await runStagingTree();

  const myBuild = updateBuildStats();
  const friendBuild = decodeRaceCode(friendCodeInput.value.trim());

  if (!friendBuild) {
    raceOutput.textContent = "Invalid race code.";
    return;
  }

  barYou.style.width = "0%";
  barFriend.style.width = "0%";

  const [myRun, frRun] = await Promise.all([
    simulateDragLive(myBuild, barYou),
    simulateDragLive(friendBuild, barFriend)
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
