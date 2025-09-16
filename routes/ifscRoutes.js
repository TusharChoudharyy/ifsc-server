// import express from "express";
// import Ifsc from "../models/Ifsc.js";

// const router = express.Router();

// // 1️⃣ Get all banks
// router.get("/banks", async (req, res) => {
//   const banks = await Ifsc.distinct("BANK");
//   res.json(banks.sort());
// });

// // 2️⃣ Get states by bank
// router.get("/states", async (req, res) => {
//   const { bank } = req.query;
//   if (!bank) return res.json([]);
//   const states = await Ifsc.distinct("STATE", { BANK: bank });
//   res.json(states.sort());
// });

// // 3️⃣ Get districts by bank + state
// router.get("/districts", async (req, res) => {
//   const { bank, state } = req.query;
//   if (!bank || !state) return res.json([]);
//   const districts = await Ifsc.distinct("CITIES", { BANK: bank, STATE: state });
//   res.json(districts.sort());
// });

// // 4️⃣ Get branches by bank + state + district (with pagination)
// router.get("/branches", async (req, res) => {
//   const { bank, state, district, page = 1, limit = 10 } = req.query;

//   if (!bank) return res.json({ branches: [], total: 0 });

//   const query = { BANK: bank };
//   if (state) query.STATE = state;
//   if (district) query.CITIES = district;

//   const skip = (parseInt(page) - 1) * parseInt(limit);

//   const branches = await Ifsc.find(
//     query,
//     "BANK BRANCH IFSC ADDRESS PHONE STATE CITIES"
//   )
//     .skip(skip)
//     .limit(parseInt(limit));

//   const total = await Ifsc.countDocuments(query);

//   res.json({ branches, total });
// });

// // 5️⃣ Get branch by IFSC
// router.get("/search", async (req, res) => {
//   const { ifsc } = req.query;
//   if (!ifsc) return res.status(400).json({ error: "IFSC code required" });

//   const branch = await Ifsc.findOne({ IFSC: ifsc.toUpperCase() });
//   if (!branch) return res.status(404).json({ error: "Branch not found" });

//   res.json(branch);
// });

// export default router;


import express from "express";
import Ifsc from "../models/Ifsc.js";

const router = express.Router();

// 1️⃣ Get all banks
router.get("/banks", async (req, res) => {
  const banks = await Ifsc.distinct("BANK");
  res.json(banks.sort());
});

// 2️⃣ Get states by bank
router.get("/states", async (req, res) => {
  const { bank } = req.query;
  if (!bank) return res.json([]);
  const states = await Ifsc.distinct("STATE", {
    BANK: { $regex: `^${bank}$`, $options: "i" },
  });
  res.json(states.sort());
});

// 3️⃣ Get districts by bank + state
router.get("/districts", async (req, res) => {
  const { bank, state } = req.query;
  if (!bank || !state) return res.json([]);
  const districts = await Ifsc.distinct("CITIES", {
    BANK: { $regex: `^${bank}$`, $options: "i" },
    STATE: { $regex: `^${state}$`, $options: "i" },
  });
  res.json(districts.sort());
});

// 4️⃣ Get branches by bank + state + district (with pagination)
router.get("/branches", async (req, res) => {
  const { bank, state, district, page = 1, limit = 10 } = req.query;

  if (!bank) return res.json({ branches: [], total: 0 });

  const query = {
    BANK: { $regex: `^${bank}$`, $options: "i" },
  };
  if (state) query.STATE = { $regex: `^${state}$`, $options: "i" };
  if (district) query.CITIES = { $regex: `^${district}$`, $options: "i" };

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const branches = await Ifsc.find(
    query,
    "BANK BRANCH IFSC ADDRESS PHONE STATE CITIES"
  )
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Ifsc.countDocuments(query);

  res.json({ branches, total });
});

// 5️⃣ Get branch by IFSC
router.get("/search", async (req, res) => {
  const { ifsc } = req.query;
  if (!ifsc) return res.status(400).json({ error: "IFSC code required" });

  const branch = await Ifsc.findOne({
    IFSC: { $regex: `^${ifsc}$`, $options: "i" },
  });
  if (!branch) return res.status(404).json({ error: "Branch not found" });

  res.json(branch);
});

export default router;
