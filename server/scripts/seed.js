const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const connectDB = require('../config/database');


dotenv.config();

const seedUsers = [
  {
    name: 'Admin User',
    email: 'admin@test.az',
    password: 'admin123',
    isActive: true
  },
  {
    name: 'Test User',
    email: 'demo@test.az',
    password: 'test123',
    isActive: true
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    console.log('🌱 Verilənlər bazasına istifadəçi əlavə edilməsi başladı...');
    
    // Clear existing users
    await User.deleteMany({});
    console.log('✅ Cleared existing users');
    
    // Create new users
    for (const userData of seedUsers) {
      const user = new User(userData);
      await user.save();
      console.log(`✅ Əlavə edilən istifadəçi: ${user.email}`);
    }
    
    console.log('🎉 Verilənlər bazasına istifadəçi əlavə edilməsi uğurla yekunlaşdı!');
    console.log('\n📋 Əlavə edilən istifadəçilər:');
    seedUsers.forEach(user => {
      console.log(`   E-poçt: ${user.email} | Şifrə: ${user.password}`);
    });
    
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Verilənlər bazasına istifadəçi əlavə edilməsi zamanı xəta baş verdi:', error.message);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();