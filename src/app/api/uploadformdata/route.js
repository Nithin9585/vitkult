// src/app/api/uploadformdata/route.js
import { connectDB } from '@/helper/db';  // Connect to the DB (use your DB logic)
import TechnicalTeam from '../../../../models/TechnicalTeam';  // Import the correct model

// Handle POST request
export async function POST(req) {
  try {
    await connectDB();  // Connect to the DB

    // Parse the request body
    const {
      name,
      regNo,
      email,
      phoneNumber,
      branch,
      selectedTeam,
      reason,
      contribution,
      github,
      linkedin,
      codingProfile,
      previousWork,
    } = await req.json();  
    const newEntry = new TechnicalTeam({
      name,
      regNo,
      email,
      phoneNumber,
      branch,
      selectedTeam,
      reason: reason || null,
      contribution: contribution || null,
      github: github || null,
      linkedin: linkedin || null,
      codingProfile: codingProfile || null,
      previousWork: previousWork || null,
    });

    await newEntry.save();

    return new Response(JSON.stringify({ message: 'Form data submitted successfully!' }), { status: 201 });
  } catch (error) {
    console.error('Error saving form data:', error);
    return new Response(JSON.stringify({ message: 'Error submitting the form data.' }), { status: 500 });
  }
}

