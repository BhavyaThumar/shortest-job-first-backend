const mongoose = require("mongoose");

const processSchema = new mongoose.Schema({
  pid: Number,
  arriavlTime: Number,
  burstTime: Number,
  completionTime: Number,
  turnAroundTime: Number,
  waitingTime: Number,
  responseTime: Number,
  isCompleted: Boolean,
});

const responseSchema = new mongoose.Schema(
  {
    result: [processSchema],
    averages: {
      completionTime: Number,
      waitingTime: Number,
      turnAroundTime: Number,
      responseTime: Number
    }
  },

  {
    timestamps: true,
  }
);

module.exports = { Response: mongoose.model("Response", responseSchema) };
