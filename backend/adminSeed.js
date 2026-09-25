require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./src/models/User");

const seedAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB for admin seeding...");

  const adminEmail = "admin@example.com";
  const existingAdmin = await User.findOne({ email: adminEmail });

  if (existingAdmin) {
    console.log("Admin user already exists. Email: admin@example.com, Password: admin123");
    // Just in case it's not admin
    if (existingAdmin.role !== "admin") {
      existingAdmin.role = "admin";
      await existingAdmin.save();
      console.log("Updated role to admin for existing user");
    }
  } else {
    const hashedPassword = await bcrypt.hash("admin123", 12);
    await User.create({
      name: "Super Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });
    console.log("Created admin user. Email: admin@example.com, Password: admin123");
  }

  process.exit(0);
};

seedAdmin();
