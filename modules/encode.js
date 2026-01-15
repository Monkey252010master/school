export function generateRaceCode(build) {
  const raw = [
    build.hp.toFixed(1),
    build.weight.toFixed(1),
    build.grip.toFixed(3),
    build.launch.toFixed(3)
  ].join("|");
  return btoa(raw);
}