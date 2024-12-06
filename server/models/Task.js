const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  company_name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  importancy: { type: String, enum: ["low", "medium", "high"], required: true },
  deadline: { type: Date, required: true },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
  sub_tasks: [
    {
      title: { type: String, required: true },
      description: { type: String },
      assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      status: {
        type: String,
        enum: ["pending", "in-progress", "completed"],
        default: "pending",
      },
      deadline: { type: Date },
      required_skills: { type: [String], default: [] },
      links: { type: [String], default: [] },
      daily_updates: [
        {
          date: { type: Date, default: Date.now },
          update_content: { type: String },
          progress_percentage: { type: Number, default: 0 },
        },
      ],
      comments: [
        {
          user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          content: { type: String },
          timestamp: { type: Date, default: Date.now },
        },
      ],
      is_satisfied: { type: Boolean, default: false },
    },
  ],
  total_progress_percentage: { type: Number, default: 0 },
  hr_satisfaction: { type: Boolean, default: false },
});

// Middleware to update task status if all sub-tasks are completed
taskSchema.pre("save", function (next) {
  const task = this;
  if (task.sub_tasks.every((subTask) => subTask.status === "completed")) {
    task.status = "completed";
  }
  next();
});

module.exports = mongoose.model("Task", taskSchema);
