export const cars = [
  { id: "supra", name: "1998 Supra", hp: 320, weight: 3400, drive: "RWD" },
  { id: "gtr", name: "2017 GT-R", hp: 565, weight: 3900, drive: "AWD" },
  { id: "mustang", name: "2014 Mustang GT", hp: 420, weight: 3600, drive: "RWD" }
];

export const engines = [
  { id: "stock", name: "Stock", hpAdd: 0, weightAdd: 0 },
  { id: "stage1", name: "Stage 1 Tune", hpAdd: 60, weightAdd: 0 },
  { id: "bigTurbo", name: "Big Turbo", hpAdd: 180, weightAdd: 40 },
  { id: "race", name: "Race Build", hpAdd: 320, weightAdd: 80 }
];

export const tires = [
  { id: "street", name: "Street Tires", grip: 1.0 },
  { id: "sport", name: "Sport Tires", grip: 1.2 },
  { id: "drag", name: "Drag Radials", grip: 1.5 }
];

export function getBuild(carId, engineId, tireId) {
  const car = cars.find(c => c.id === carId);
  const eng = engines.find(e => e.id === engineId);
  const tire = tires.find(t => t.id === tireId);

  const hp = car.hp + eng.hpAdd;
  const weight = car.weight + eng.weightAdd;
  const grip = tire.grip * (car.drive === "AWD" ? 1.1 : 1.0);
  const pw = hp / weight;

  return {
    car,
    engine: eng,
    tire,
    hp,
    weight,
    grip,
    pw,
    drive: car.drive
  };
}