import mongoose from 'mongoose';

const EventManagemnetSchema = new mongoose.Schema({
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
  },
  previouswork : {
    type : String,
    required : true

  },
  linkedin : {
    type : String,
    required : true
  }

});

const EventManagementTeam = mongoose.models.EventManagementTeam || mongoose.model('EventManagementTeam', EventManagemnetSchema);
export default EventManagementTeam;
