// Car + parts database

export const cars = [
  { id: "mustang_gt", name: "2018 Mustang GT", hp: 460, weight: 3700, drive: "RWD", category: "muscle" },
  { id: "camaro_ss", name: "2019 Camaro SS", hp: 455, weight: 3685, drive: "RWD", category: "muscle" },
  { id: "challenger_hellcat", name: "2019 Challenger Hellcat", hp: 717, weight: 4480, drive: "RWD", category: "muscle" },
  { id: "supra_mk4", name: "1998 Supra MK4", hp: 320, weight: 3400, drive: "RWD", category: "jdm" },
  { id: "supra_a90", name: "2020 Supra A90", hp: 382, weight: 3374, drive: "RWD", category: "jdm" },
  { id: "gtr_r35", name: "2017 GT-R R35", hp: 565, weight: 3900, drive: "AWD", category: "jdm" },
  { id: "silverado_1500", name: "Chevy Silverado 1500", hp: 355, weight: 4800, drive: "RWD", category: "truck" },
  { id: "ram_trx", name: "Ram TRX", hp: 702, weight: 6350, drive: "4WD", category: "truck" },
  { id: "model_s_plaid", name: "Tesla Model S Plaid", hp: 1020, weight: 4766, drive: "AWD", category: "electric" },
  { id: "c7_z06", name: "Corvette C7 Z06", hp: 650, weight: 3536, drive: "RWD", category: "exotic" },
  { id: "c8_z51", name: "Corvette C8 Z51", hp: 495, weight: 3647, drive: "RWD", category: "exotic" },
  { id: "pro_mod", name: "Pro Mod Drag Car", hp: 2500, weight: 2400, drive: "RWD", category: "drag" },
  { id: "top_fuel", name: "Top Fuel Dragster", hp: 11000, weight: 2300, drive: "RWD", category: "drag" }
];

export const engines = [
  { id: "stock", name: "Stock Engine", hpAdd: 0 },
  { id: "street_tune", name: "Street Tune", hpAdd: 60 },
  { id: "race_tune", name: "Race Tune", hpAdd: 120 },
  { id: "big_single", name: "Big Single Turbo", hpAdd: 250 },
  { id: "twin_turbo", name: "Twin Turbo Kit", hpAdd: 350 },
  { id: "blower", name: "Roots Supercharger", hpAdd: 300 },
  { id: "procharger", name: "Centrifugal Supercharger", hpAdd: 280 }
];

export const tires = [
  { id: "street", name: "Street Tires", grip: 1.0 },
  { id: "sport", name: "Sport Tires", grip: 1.15 },
  { id: "drag_radial", name: "Drag Radials", grip: 1.35 },
  { id: "slicks", name: "Full Slicks", grip: 1.5 }
];

export const drivetrains = [
  { id: "auto", name: "Automatic", launch: 1.0 },
  { id: "manual", name: "Manual", launch: 0.95 },
  { id: "dual_clutch", name: "Dual Clutch", launch: 1.05 }
];

// Advanced parts
export const pistons = [
  { id: "cast", name: "Cast Pistons", hpMult: 1.0 },
  { id: "forged", name: "Forged Pistons", hpMult: 1.05 },
  { id: "ultra_forged", name: "Ultra Forged Pistons", hpMult: 1.08 }
];

export const rods = [
  { id: "stock_rods", name: "Stock Rods", hpMult: 1.0 },
  { id: "h_beam", name: "H-Beam Rods", hpMult: 1.04 },
  { id: "i_beam", name: "I-Beam Rods", hpMult: 1.06 }
];

export const cams = [
  { id: "stock_cam", name: "Stock Camshaft", hpMult: 1.0 },
  { id: "street_cam", name: "Street Cam", hpMult: 1.03 },
  { id: "race_cam", name: "Race Cam", hpMult: 1.07 }
];

export const forcedInduction = [
  { id: "none_fi", name: "None", hpAdd: 0 },
  { id: "small_turbo", name: "Small Turbo", hpAdd: 80 },
  { id: "big_turbo", name: "Big Turbo", hpAdd: 180 },
  { id: "compound_turbo", name: "Compound Turbo", hpAdd: 320 },
  { id: "small_blower", name: "Small Supercharger", hpAdd: 100 },
  { id: "big_blower", name: "Big Supercharger", hpAdd: 220 }
];

export const nitrous = [
  { id: "no_nitrous", name: "No Nitrous", hpAdd: 0 },
  { id: "50_shot", name: "50 Shot", hpAdd: 50 },
  { id: "100_shot", name: "100 Shot", hpAdd: 100 },
  { id: "200_shot", name: "200 Shot", hpAdd: 200 }
];

export const fuels = [
  { id: "pump_91", name: "Pump 91", hpMult: 1.0 },
  { id: "pump_93", name: "Pump 93", hpMult: 1.02 },
  { id: "e85", name: "E85", hpMult: 1.06 },
  { id: "race_gas", name: "Race Gas", hpMult: 1.08 },
  { id: "methanol", name: "Methanol", hpMult: 1.12 }
];

export const gears = [
  { id: "street_gears", name: "Street Gears", accelMult: 1.0 },
  { id: "drag_gears", name: "Drag Gears", accelMult: 1.05 },
  { id: "short_gears", name: "Short Gears", accelMult: 1.08 }
];

export const suspensions = [
  { id: "stock_susp", name: "Stock Suspension", launchMult: 1.0 },
  { id: "drag_susp", name: "Drag Suspension", launchMult: 1.08 },
  { id: "coilovers", name: "Adjustable Coilovers", launchMult: 1.04 }
];

export function getCarByName(name) {
  return cars.find(c => c.name === name);
}

export function getEngineByName(name) {
  return engines.find(e => e.name === name);
}

export function getTireByName(name) {
  return tires.find(t => t.name === name);
}

export function getDrivetrainByName(name) {
  return drivetrains.find(d => d.name === name);
}

export function getByName(list, name) {
  return list.find(x => x.name === name);
}

export function getBuild(selection) {
  const car = getCarByName(selection.carName);
  const engine = getEngineByName(selection.engineName);
  const tire = getTireByName(selection.tireName);
  const drivetrain = getDrivetrainByName(selection.drivetrainName);

  if (!car || !engine || !tire || !drivetrain) return null;

  let hp = car.hp + engine.hpAdd;
  let weight = car.weight - selection.weightReduction;
  if (weight < car.weight * 0.7) weight = car.weight * 0.7;

  hp += selection.boostLevel * 8;

  let grip = tire.grip;
  let launch = drivetrain.launch;

  if (selection.advancedOn) {
    const pist = getByName(pistons, selection.pistonsName);
    const rod = getByName(rods, selection.rodsName);
    const cam = getByName(cams, selection.camName);
    const fi = getByName(forcedInduction, selection.forcedInductionName);
    const nit = getByName(nitrous, selection.nitrousName);
    const fuel = getByName(fuels, selection.fuelName);
    const gear = getByName(gears, selection.gearName);
    const susp = getByName(suspensions, selection.suspensionName);

    if (pist) hp *= pist.hpMult;
    if (rod) hp *= rod.hpMult;
    if (cam) hp *= cam.hpMult;
    if (fi) hp += fi.hpAdd;
    if (nit) hp += nit.hpAdd;
    if (fuel) hp *= fuel.hpMult;
    if (gear) launch *= gear.accelMult;
    if (susp) launch *= susp.launchMult;

    grip *= 1 + (selection.boostLevel / 100);
  }

  const pw = hp / weight;

  return {
    car,
    engine,
    tire,
    drivetrain,
    hp,
    weight,
    grip,
    launch,
    pw,
    advancedOn: selection.advancedOn
  };
}