export function generateRaceCode(build) {
  const raw = `${build.hp}|${build.weight}|${build.grip}`;
  return btoa(raw);
}