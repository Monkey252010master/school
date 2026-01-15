export function decodeRaceCode(code) {
  try {
    const [hp, weight, grip] = atob(code).split("|");
    return { hp: Number(hp), weight: Number(weight), grip: Number(grip) };
  } catch {
    return null;
  }
}