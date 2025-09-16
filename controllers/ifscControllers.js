// import Ifsc from "../models/Ifsc.js";

// // Main search endpoint
// export const searchIfsc = async (req, res) => {
//   try {
//     const { q } = req.query;
//     if (!q) return res.json([]);

//     const regex = new RegExp(q, "i"); // case-insensitive regex

//     const results = await Ifsc.find({
//       $or: [
//         { IFSC: regex },
//         { BANK: regex },
//         { BRANCH: regex },
//         { STATE: regex },
//         { CITIES: { $elemMatch: { $regex: regex } } } // ✅ FIX
//       ],
//     }).limit(20);

//     res.json(results);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };



// // Autocomplete endpoint (only bank/branch/city names)
// export const autocompleteIfsc = async (req, res) => {
//   try {
//     const { q } = req.query;
//     if (!q) return res.json([]);

//     const regex = new RegExp(q, "i");

//     const results = await Ifsc.find({
//       $or: [
//         { BANK: { $regex: regex } },
//         { BRANCH: { $regex: regex } },
//         { CITIES: { $elemMatch: { $regex: regex } } } // ✅ FIX
//       ],
//     })
//       .limit(10)
//       .select("BANK BRANCH CITIES IFSC");

//     res.json(results);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


