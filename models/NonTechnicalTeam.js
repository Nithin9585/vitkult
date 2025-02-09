import mongoose from 'mongoose';

const NonTechnicalTeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  regNo: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  branch: { type: String, required: true },
  selectedTeam: { type: String, required: true },
  reason: { type: String, required : true },
  role :{
    type : String,
    required : true
  },
  contribution : {
    type : String,
    required : true
  }

});

const NonTechnicalTeam = mongoose.models.NonTechnicalTeam || mongoose.model('NonTechnicalTeam', NonTechnicalTeamSchema);
export default NonTechnicalTeam;
