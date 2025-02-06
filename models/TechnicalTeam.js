import mongoose from 'mongoose';

const TechnicalTeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  regNo: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  branch: { type: String, required: true },
  selectedTeam: { type: String, required: true },
  reason: { type: String, default: null },
  contribution: { type: String, default: null },
  github: { type: String, default: null },
  linkedin: { type: String, default: null },
  codingProfile: { type: String, default: null },
  previousWork: { type: String, default: null },
});

const TechnicalTeam = mongoose.models.TechnicalTeam || mongoose.model('TechnicalTeam', TechnicalTeamSchema);
export default TechnicalTeam;
