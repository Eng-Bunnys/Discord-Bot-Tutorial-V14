const { Schema, model } = require("mongoose");

const KickSchema = new Schema(
  {
    userID: String,
    guildID: String,
    Cases: {
      type: Array,
      default: []
    },
    Reasons: {
      type: Array,
      default: []
    },
    TotalCases: {
      type: Number,
      default: 0
    }
  },
  {
    collection: "GBF Kick Docs"
  }
);

module.exports = model("GBF Kick Docs", KickSchema);
