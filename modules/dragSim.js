export async function simulateDragLive(buildLike, barElement) {
  let distance = 0;
  let speed = 0;
  let time = 0;

  const dt = 0.01;
  const totalDistance = 1320;

  const hp = buildLike.hp;
  const weight = buildLike.weight;
  const grip = buildLike.grip;
  const launchMult = buildLike.launch || 1.0;

  const tractionLimit = grip * 1.3 * launchMult;

  const dnfChance = buildLike.dnfChance || 0;
  const wreckChance = buildLike.wreckChance || 0;

  const checkpoints = {
    ft60: null,
    ft330: null,
    ft660: null,
    ft1000: null,
    ft1320: null,
    trap: null,
    dnf: false,
    wreck: false,
    reason: ""
  };

  const dnfRoll = Math.random();
  const wreckRoll = Math.random();

  let dnfTriggered = false;
  let wreckTriggered = false;

  while (distance < totalDistance) {
    const force = (hp * 5252) / Math.max(speed, 1);
    let accel = force / weight;

    if (accel > tractionLimit) accel = tractionLimit;

    speed += accel * dt * 32;
    distance += speed * dt;
    time += dt;

    const pct = (distance / totalDistance) * 100;
    barElement.style.width = Math.min(pct, 100) + "%";

    if (!checkpoints.ft60 && distance >= 60) checkpoints.ft60 = time;
    if (!checkpoints.ft330 && distance >= 330) checkpoints.ft330 = time;
    if (!checkpoints.ft660 && distance >= 660) checkpoints.ft660 = time;
    if (!checkpoints.ft1000 && distance >= 1000) checkpoints.ft1000 = time;

    if (!dnfTriggered && dnfChance > 0 && time > 0.5) {
      if (dnfRoll < dnfChance) {
        dnfTriggered = true;
        checkpoints.dnf = true;
        checkpoints.reason = "Engine failure (too much stress / boost).";
        break;
      }
    }

    if (!wreckTriggered && wreckChance > 0 && time > 0.3) {
      if (wreckRoll < wreckChance) {
        wreckTriggered = true;
        checkpoints.wreck = true;
        checkpoints.reason = "Loss of control (traction / handling).";
        break;
      }
    }

    await new Promise(res => setTimeout(res, 3));
  }

  if (!checkpoints.dnf && !checkpoints.wreck) {
    checkpoints.ft1320 = time;
    checkpoints.trap = speed * 0.681818;
  }

  return checkpoints;
}