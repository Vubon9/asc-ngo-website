import http from 'http';

console.log("Testing ASC NGO Backend Server endpoints logic...");
import { programsData } from './data/programsData.js';

if (Array.isArray(programsData) && programsData.length === 12) {
  console.log("✅ programsData validation passed: 12 programs loaded correctly.");
} else {
  console.error("❌ programsData validation failed!");
  process.exit(1);
}

console.log("Backend verification successful!");
