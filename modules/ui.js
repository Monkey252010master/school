export function wait(ms) {
  return new Promise(res => setTimeout(res, ms));
}

export async function runStagingTree() {
  const bulbs = {
    pre: document.querySelector(".bulb.pre"),
    stage: document.querySelector(".bulb.stage"),
    y1: document.querySelector(".bulb.yellow1"),
    y2: document.querySelector(".bulb.yellow2"),
    y3: document.querySelector(".bulb.yellow3"),
    green: document.querySelector(".bulb.green")
  };

  Object.values(bulbs).forEach(b => b.classList.remove("on"));

  bulbs.pre.classList.add("on");
  await wait(400);

  bulbs.stage.classList.add("on");
  await wait(400);

  bulbs.y1.classList.add("on");
  await wait(300);

  bulbs.y2.classList.add("on");
  await wait(300);

  bulbs.y3.classList.add("on");
  await wait(300);

  bulbs.green.classList.add("on");
}