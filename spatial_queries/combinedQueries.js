const adminQueries = require("./adminQueries");
const userQueries = require("./userQueries");

module.exports = {
  userRegister: adminQueries.userRegister,
  activeDrives: userQueries.activeDrives,
  participateCampaign: userQueries.participateCampaign,
  filterCampaign: userQueries.filterCampaign
};
