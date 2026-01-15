export async function simulateDragLive(build, barElement) {
  let distance = 0;
  let speed = 0;
  let time = 0;

  const dt = 0.01;
  const totalDistance = 1320;

  const tractionLimit = build.grip * 1.2;

  const checkpoints = {
    ft60: null,
    ft330: null,
    ft660: null,
    ft1000: null,
    ft1320: null,
    trap: null
  };

  while (distance < totalDistance) {
    const force = (build.hp * 5252) / Math.max(speed, 1);
    let accel = force / build.weight;

    if (accel > tractionLimit) accel = tractionLimit;

    speed += accel * dt * 32;
    distance += speed * dt;
    time += dt;

    // update progress bar
    const pct = (distance / totalDistance) * 100;
    barElement.style.width = pct + "%";

    if (!checkpoints.ft60 && distance >= 60) checkpoints.ft60 = time;
    if (!checkpoints.ft330 && distance >= 330) checkpoints.ft330 = time;
    if (!checkpoints.ft660 && distance >= 660) checkpoints.ft660 = time;
    if (!checkpoints.ft1000 && distance >= 1000) checkpoints.ft1000 = time;

    await new Promise(res => setTimeout(res, 10));
  }

  checkpoints.ft1320 = time;
  checkpoints.trap = speed * 0.681818;

  return checkpoints;
}