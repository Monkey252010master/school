// Car + parts + synergy + boost limits

export const cars = [
  { id: "mustang_gt", name: "2018 Mustang GT", hp: 460, weight: 3700, drive: "RWD", category: "muscle", engineCode: "coyote" },
  { id: "camaro_ss", name: "2019 Camaro SS", hp: 455, weight: 3685, drive: "RWD", category: "muscle", engineCode: "lt1" },
  { id: "challenger_hellcat", name: "2019 Challenger Hellcat", hp: 717, weight: 4480, drive: "RWD", category: "muscle", engineCode: "hellcat" },

  { id: "supra_mk4", name: "1998 Supra MK4", hp: 320, weight: 3400, drive: "RWD", category: "jdm", engineCode: "2jz" },
  { id: "supra_a90", name: "2020 Supra A90", hp: 382, weight: 3374, drive: "RWD", category: "jdm", engineCode: "b58" },
  { id: "gtr_r35", name: "2017 GT-R R35", hp: 565, weight: 3900, drive: "AWD", category: "jdm", engineCode: "vr38" },

  { id: "silverado_1500", name: "Chevy Silverado 1500", hp: 355, weight: 4800, drive: "4WD", category: "truck", engineCode: "truck_v8" },
  { id: "ram_trx", name: "Ram TRX", hp: 702, weight: 6350, drive: "4WD", category: "truck", engineCode: "hellcat" },

  { id: "model_s_plaid", name: "Tesla Model S Plaid", hp: 1020, weight: 4766, drive: "AWD", category: "electric", engineCode: "electric" },

  { id: "c7_z06", name: "Corvette C7 Z06", hp: 650, weight: 3536, drive: "RWD", category: "exotic", engineCode: "lt4" },
  { id: "c8_z51", name: "Corvette C8 Z51", hp: 495, weight: 3647, drive: "RWD", category: "exotic", engineCode: "lt2" },

  { id: "pro_mod", name: "Pro Mod Drag Car", hp: 2500, weight: 2400, drive: "RWD", category: "drag", engineCode: "promod" },
  { id: "top_fuel", name: "Top Fuel Dragster", hp: 11000, weight: 2300, drive: "RWD", category: "drag", engineCode: "topfuel" }
];

export const engines = [
  { id: "stock", name: "Stock Engine", hpAdd: 0 },
  { id: "street_tune", name: "Street Tune", hpAdd: 60 },
  { id: "race_tune", name: "Race Tune", hpAdd: 120 },
  { id: "big_single", name: "Big Single Turbo", hpAdd: 250, fiType: "big_turbo" },
  { id: "twin_turbo", name: "Twin Turbo Kit", hpAdd: 350, fiType: "twin_turbo" },
  { id: "blower", name: "Roots Supercharger", hpAdd: 300, fiType: "supercharger" },
  { id: "procharger", name: "Centrifugal Supercharger", hpAdd: 280, fiType: "supercharger" }
];

export const tires = [
  { id: "street", name: "Street Tires", grip: 1.0, type: "street" },
  { id: "sport", name: "Sport Tires", grip: 1.15, type: "sport" },
  { id: "drag_radial", name: "Drag Radials", grip: 1.35, type: "drag" },
  { id: "slicks", name: "Full Slicks", grip: 1.5, type: "slick" }
];

export const drivetrains = [
  { id: "rwd", name: "RWD", launch: 1.00 },
  { id: "fwd", name: "FWD", launch: 0.90 },
  { id: "awd", name: "AWD", launch: 1.15 },
  { id: "4wd", name: "4WD", launch: 1.20 }
];

export const pistons = [
  { id: "cast", name: "Cast Pistons", hpMult: 1.0, strength: "weak" },
  { id: "forged", name: "Forged Pistons", hpMult: 1.05, strength: "strong" },
  { id: "ultra_forged", name: "Ultra Forged Pistons", hpMult: 1.08, strength: "very_strong" }
];

export const rods = [
  { id: "stock_rods", name: "Stock Rods", hpMult: 1.0, strength: "weak" },
  { id: "h_beam", name: "H-Beam Rods", hpMult: 1.04, strength: "strong" },
  { id: "i_beam", name: "I-Beam Rods", hpMult: 1.06, strength: "very_strong" }
];

export const cams = [
  { id: "stock_cam", name: "Stock Camshaft", hpMult: 1.0, level: "stock" },
  { id: "street_cam", name: "Street Cam", hpMult: 1.03, level: "street" },
  { id: "race_cam", name: "Race Cam", hpMult: 1.07, level: "race" }
];

export const forcedInduction = [
  { id: "none_fi", name: "None", hpAdd: 0, fiType: "none" },
  { id: "small_turbo", name: "Small Turbo", hpAdd: 80, fiType: "small_turbo" },
  { id: "big_turbo", name: "Big Turbo", hpAdd: 180, fiType: "big_turbo" },
  { id: "compound_turbo", name: "Compound Turbo", hpAdd: 320, fiType: "compound" },
  { id: "small_blower", name: "Small Supercharger", hpAdd: 100, fiType: "supercharger" },
  { id: "big_blower", name: "Big Supercharger", hpAdd: 220, fiType: "supercharger" }
];

export const nitrous = [
  { id: "no_nitrous", name: "No Nitrous", hpAdd: 0, shot: 0 },
  { id: "50_shot", name: "50 Shot", hpAdd: 50, shot: 50 },
  { id: "100_shot", name: "100 Shot", hpAdd: 100, shot: 100 },
  { id: "200_shot", name: "200 Shot", hpAdd: 200, shot: 200 }
];

export const fuels = [
  { id: "pump_91", name: "Pump 91", hpMult: 1.0, fuelCode: "pump" },
  { id: "pump_93", name: "Pump 93", hpMult: 1.02, fuelCode: "pump" },
  { id: "e85", name: "E85", hpMult: 1.06, fuelCode: "e85" },
  { id: "race_gas", name: "Race Gas", hpMult: 1.08, fuelCode: "race_gas" },
  { id: "methanol", name: "Methanol", hpMult: 1.12, fuelCode: "methanol" }
];

export const gears = [
  { id: "street_gears", name: "Street Gears", accelMult: 1.0 },
  { id: "drag_gears", name: "Drag Gears", accelMult: 1.05 },
  { id: "short_gears", name: "Short Gears", accelMult: 1.08 }
];

export const suspensions = [
  { id: "stock_susp", name: "Stock Suspension", launchMult: 1.0, type: "stock" },
  { id: "drag_susp", name: "Drag Suspension", launchMult: 1.08, type: "drag" },
  { id: "coilovers", name: "Adjustable Coilovers", launchMult: 1.04, type: "sport" }
];

// Boost limits per engine
export const boostLimits = {
  "2jz":     { safe: 20, warn: 28, danger: 35 },
  "b58":     { safe: 16, warn: 24, danger: 30 },
  "vr38":    { safe: 18, warn: 25, danger: 30 },
  "coyote":  { safe: 10, warn: 15, danger: 20 },
  "lt1":     { safe: 8,  warn: 12, danger: 16 },
  "lt2":     { safe: 10, warn: 15, danger: 20 },
  "lt4":     { safe: 12, warn: 18, danger: 22 },
  "hellcat": { safe: 14, warn: 18, danger: 22 },
  "truck_v8":{ safe: 8,  warn: 12, danger: 16 },
  "promod":  { safe: 30, warn: 40, danger: 50 },
  "topfuel": { safe: 50, warn: 60, danger: 70 },
  "electric":{ safe: 0,  warn: 0,  danger: 0 }
};

// Synergy dictionary
export const synergy = {
  "2jz+big_turbo":        { hpMult: 1.15, spool: 1.10, safeBoost: 8 },
  "2jz+twin_turbo":       { hpMult: 1.10, spool: 1.15, safeBoost: 5 },
  "2jz+supercharger":     { hpMult: 0.90, spool: 0.85 },

  "coyote+supercharger":  { hpMult: 1.12, torque: 1.08, safeBoost: 4 },
  "coyote+big_turbo":     { hpMult: 1.10, spool: 0.95 },

  "hellcat+supercharger": { hpMult: 1.15, torque: 1.10, safeBoost: 6 },
  "hellcat+big_turbo":    { hpMult: 1.05, spool: 0.90 },

  "vr38+twin_turbo":      { hpMult: 1.12, spool: 1.12, safeBoost: 6 },
  "vr38+big_turbo":       { hpMult: 1.08, spool: 1.05 },

  "any+e85":              { hpMult: 1.06, safeBoost: 4 },
  "any+race_gas":         { hpMult: 1.08, safeBoost: 6 },
  "any+methanol":         { hpMult: 1.12, safeBoost: 10 },

  "forged_pistons+h_beam_rods": { hpMult: 1.03, safeBoost: 3 },
  "ultra_forged+i_beam_rods":   { hpMult: 1.05, safeBoost: 5 },

  "cast_pistons+big_turbo":     { hpMult: 0.90, dnf: 0.30 },
  "cast_pistons+nitrous":       { hpMult: 0.95, dnf: 0.25 },

  "race_cam+big_turbo":         { hpMult: 1.05, spool: 1.05 },
  "race_cam+twin_turbo":        { hpMult: 1.07, spool: 1.03 },
  "street_cam+supercharger":    { torque: 1.03 },
  "stock_cam+big_turbo":        { spool: 0.85 },

  "truck+supercharger":         { torque: 1.10, launchMult: 1.05 },
  "truck+big_turbo":            { hpMult: 1.10, launchMult: 0.95, dnf: 0.10 },

  "muscle+supercharger":        { torque: 1.08 },
  "muscle+nitrous":             { hpMult: 1.10 },

  "jdm+twin_turbo":             { spool: 1.10, hpMult: 1.05 },
  "jdm+big_turbo":              { hpMult: 1.12 },

  "rwd+drag_susp+slicks":       { launchMult: 1.15, gripMult: 1.10 },
  "rwd+stock_susp+slicks":      { wreck: 0.10 },

  "awd+drag_radials":           { launchMult: 1.05 },
  "awd+slicks":                 { launchMult: 1.10 },

  "fwd+high_hp":                { wreck: 0.20, gripMult: 0.90 },

  "4wd+stock_susp":             { wreck: 0.15 },

  "big_turbo+stock_rods":       { dnf: 0.20 },
  "big_turbo+stock_pistons":    { dnf: 0.25 },

  "nitrous+stock_rods":         { dnf: 0.20 },
  "nitrous+stock_pistons":      { dnf: 0.25 },

  "forged_pistons+h_beam_rods+race_cam": { hpMult: 1.10, safeBoost: 5 },
  "e85+big_turbo+drag_susp":             { hpMult: 1.12, launchMult: 1.10 },
  "methanol+twin_turbo+slicks":          { hpMult: 1.15, gripMult: 1.10 },

  "street_tires+high_hp":       { gripMult: 0.85, wreck: 0.10 },
  "stock_susp+high_torque":     { wreck: 0.15 }
};

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

// Apply synergy helpers
function applySynergy(build, selection) {
  let hpMult = 1;
  let gripMult = 1;
  let launchMult = 1;
  let extraSafeBoost = 0;
  let dnfChance = 0;
  let wreckChance = 0;
  let synergyScore = 0;

  const engineCode = build.car.engineCode;
  const fi = build.fi;
  const fuel = build.fuel;
  const pist = build.pistons;
  const rod = build.rods;
  const cam = build.cam;
  const tire = build.tire;
  const susp = build.suspension;
  const carCat = build.car.category;
  const drive = build.drivetrainName;

  function addSynergy(key, weight = 1) {
    const s = synergy[key];
    if (!s) return;
    if (s.hpMult) hpMult *= s.hpMult;
    if (s.gripMult) gripMult *= s.gripMult;
    if (s.launchMult) launchMult *= s.launchMult;
    if (s.safeBoost) extraSafeBoost += s.safeBoost;
    if (s.dnf) dnfChance += s.dnf;
    if (s.wreck) wreckChance += s.wreck;
    synergyScore += weight;
  }

  if (fi && fi.fiType && engineCode) {
    addSynergy(`${engineCode}+${fi.fiType}`, 2);
  }

  if (fuel) {
    addSynergy(`any+${fuel.fuelCode}`, 1.5);
  }

  if (pist && rod) {
    addSynergy(`${pist.id}+${rod.id}`, 2);
  }

  if (pist && fi && fi.fiType === "big_turbo") {
    addSynergy(`${pist.id}+big_turbo`, 2);
  }

  if (cam && fi && fi.fiType) {
    addSynergy(`${cam.level}+${fi.fiType}`, 1.5);
  }

  if (carCat && fi && fi.fiType) {
    addSynergy(`${carCat}+${fi.fiType}`, 1.5);
  }

  if (carCat && selection.nitrousName !== "No Nitrous") {
    addSynergy(`${carCat}+nitrous`, 1.5);
  }

  if (drive && susp && tire) {
    addSynergy(`${drive}+${susp.type}+${tire.type}`, 2);
  }

  if (drive === "FWD" && build.hp > 600) {
    addSynergy("fwd+high_hp", 1.5);
  }

  if (drive === "4WD" && susp.type === "stock") {
    addSynergy("4wd+stock_susp", 1.5);
  }

  if (tire.type === "street" && build.hp > 600) {
    addSynergy("street_tires+high_hp", 1.5);
  }

  if (susp.type === "stock" && build.hp * 5252 / build.weight > 400) {
    addSynergy("stock_susp+high_torque", 1.5);
  }

  if (pist && rod && cam) {
    addSynergy(`${pist.id}+${rod.id}+${cam.level}`, 3);
  }

  if (fuel && fi && fi.fiType === "big_turbo" && susp.type === "drag") {
    addSynergy(`${fuel.fuelCode}+big_turbo+drag_susp`, 3);
  }

  if (fuel && fi && fi.fiType === "twin_turbo" && tire.type === "slick") {
    addSynergy(`${fuel.fuelCode}+twin_turbo+slicks`, 3);
  }

  return { hpMult, gripMult, launchMult, extraSafeBoost, dnfChance, wreckChance, synergyScore };
}

export function getBuild(selection) {
  const car = getCarByName(selection.carName);
  const engine = getEngineByName(selection.engineName);
  const tire = getTireByName(selection.tireName);
  const drivetrain = getDrivetrainByName(selection.drivetrainName);

  if (!car || !engine || !tire || !drivetrain) return null;

  const pist = getByName(pistons, selection.pistonsName);
  const rod = getByName(rods, selection.rodsName);
  const cam = getByName(cams, selection.camName);
  const fi = getByName(forcedInduction, selection.forcedInductionName);
  const nit = getByName(nitrous, selection.nitrousName);
  const fuel = getByName(fuels, selection.fuelName);
  const gear = getByName(gears, selection.gearName);
  const susp = getByName(suspensions, selection.suspensionName);

  let hp = car.hp + engine.hpAdd;
  let weight = car.weight - selection.weightReduction;
  if (weight < car.weight * 0.7) weight = car.weight * 0.7;

  hp += selection.boostLevel * 8;

  let grip = tire.grip;
  let launch = drivetrain.launch;
  let drivetrainName = drivetrain.name;

  if (selection.advancedOn) {
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

  const baseBuild = {
    car,
    engine,
    tire,
    drivetrain,
    drivetrainName,
    pistons: pist,
    rods: rod,
    cam,
    fi,
    nitrous: nit,
    fuel,
    gear,
    suspension: susp,
    hp,
    weight,
    grip,
    launch
  };

  const synergyResult = applySynergy(baseBuild, selection);

  hp *= synergyResult.hpMult;
  grip *= synergyResult.gripMult;
  launch *= synergyResult.launchMult;

  const pw = hp / weight;

  const limits = boostLimits[car.engineCode] || { safe: 10, warn: 15, danger: 20 };
  const safeBoost = limits.safe + synergyResult.extraSafeBoost;
  const warnBoost = limits.warn + synergyResult.extraSafeBoost;
  const dangerBoost = limits.danger + synergyResult.extraSafeBoost;

  let dnfChance = synergyResult.dnfChance;
  let wreckChance = synergyResult.wreckChance;

  if (selection.boostLevel > safeBoost) dnfChance += 0.05;
  if (selection.boostLevel > warnBoost) dnfChance += 0.10;
  if (selection.boostLevel > dangerBoost) dnfChance += 0.20;

  const handlingFactor = (hp / weight) * (1 / grip);
  if (handlingFactor > 0.25) wreckChance += 0.05;
  if (handlingFactor > 0.35) wreckChance += 0.10;

  const synergyScore = synergyResult.synergyScore;
  const rankScore = pw + synergyScore * 0.1 + (grip - 1) + (launch - 1);

  let rank = "bronze";
  if (rankScore > 0.35) rank = "silver";
  if (rankScore > 0.45) rank = "gold";
  if (rankScore > 0.55) rank = "platinum";
  if (rankScore > 0.65) rank = "diamond";

  return {
    car,
    engine,
    tire,
    drivetrain,
    drivetrainName,
    pistons: pist,
    rods: rod,
    cam,
    fi,
    nitrous: nit,
    fuel,
    gear,
    suspension: susp,
    hp,
    weight,
    grip,
    launch,
    pw,
    advancedOn: selection.advancedOn,
    synergyScore,
    dnfChance,
    wreckChance,
    rank,
    safeBoost,
    warnBoost,
    dangerBoost,
    boostLevel: selection.boostLevel
  };
}

// Ranked rival generator
export function generateRankedOpponent(myBuild) {
  const myCar = myBuild.car;
  const sameClass = cars.filter(c => c.category === myCar.category && c.id !== myCar.id);
  const rivalCar = sameClass.length ? sameClass[Math.floor(Math.random() * sameClass.length)] : myCar;

  const rankMult = {
    bronze: 1.02,
    silver: 1.04,
    gold: 1.06,
    platinum: 1.08,
    diamond: 1.10
  }[myBuild.rank] || 1.04;

  const hp = myBuild.hp * rankMult;
  const weight = myBuild.weight * 1.0;
  const grip = myBuild.grip * (1 + (rankMult - 1) * 0.7);
  const launch = myBuild.launch * (1 + (rankMult - 1) * 0.7);

  return {
    car: rivalCar,
    hp,
    weight,
    grip,
    launch,
    dnfChance: 0,
    wreckChance: 0,
    rank: myBuild.rank
  };
}