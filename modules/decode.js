export function decodeRaceCode(code) {
  try {
    const [hp, weight, grip, launch] = atob(code).split("|");
    return {
      hp: Number(hp),
      weight: Number(weight),
      grip: Number(grip),
      launch: Number(launch)
    };
  } catch {
    return null;
  }
}