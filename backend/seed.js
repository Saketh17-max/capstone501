require("dotenv").config();
const mongoose = require("mongoose");
const Sport = require("./src/models/Sport");

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB for seeding...");

  const sports = [
    { name: "Football", description: "11v11 outdoor football" },
    { name: "Basketball", description: "5v5 indoor basketball" },
    { name: "Tennis", description: "Singles or Doubles tennis" },
    { name: "Badminton", description: "Indoor badminton" },
    { name: "Volleyball", description: "Indoor or beach volleyball" },
  ];

  for (const s of sports) {
    const existing = await Sport.findOne({ name: s.name });
    if (!existing) {
      await Sport.create(s);
      console.log("Created sport:", s.name);
    } else {
      console.log("Sport already exists:", s.name);
    }
  }

  console.log("Seeding complete.");
  process.exit(0);
};

seed();
