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
    green: document.querySelector(".bulb.greenBulb"),
    red: document.querySelector(".bulb.redBulb")
  };

  Object.values(bulbs).forEach(b => b.classList.remove("on"));

  bulbs.pre.classList.add("on");
  await wait(300);

  bulbs.stage.classList.add("on");
  await wait(300);

  bulbs.y1.classList.add("on");
  await wait(250);

  bulbs.y2.classList.add("on");
  await wait(250);

  bulbs.y3.classList.add("on");
  await wait(250);

  bulbs.green.classList.add("on");
}

export function applyTheme(advancedOn) {
  if (advancedOn) {
    document.body.classList.remove("simpleMode");
    document.body.classList.add("advancedMode");
  } else {
    document.body.classList.remove("advancedMode");
    document.body.classList.add("simpleMode");
  }
}