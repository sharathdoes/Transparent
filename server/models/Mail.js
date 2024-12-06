const mongoose = require("mongoose");

const mailSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  task_id: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
  request: { type: String, required: true },
  response: { type: String },
  is_satisfied: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Mail", mailSchema);
