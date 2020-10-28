const pool = require("../pool.js");
const util = require("../utilities");
const request = require("request");

const activeDrives = (req,res) => {
    var user_id = req.params.user_id;
    console.log(user_id);
    pool.query(
        'SELECT * FROM campaign',
        (err, result) => {
            if (err) throw err;
            else
            {
                // console.log(result.rows); 
                var campaignItems = result.rows;
                res.render('user_enroll', {campaignItems:campaignItems,user_id:user_id});
            }
            
        });
};

const participateCampaign = (req,res) => {
    var user_id = req.params.user_id;
    var campaign_id = req.body.enroll;
    // console.log(typeof(user_id));
    pool.query(
        'INSERT INTO campaign_participation (user_id, campaign_id) VALUES ($1, $2)',
        [user_id.toString(), campaign_id.toString()],
    (err,result) => {
        if(err) throw err;
        else
        {
            res.redirect("/user/drives/enroll/" +user_id);
        }
    });
      
};

const filterCampaign = (req,res) => {
    var buf = parseFloat(req.body.distance)*1000;
    var user_id = req.params.user_id;
    // console.log(typeof(buf));
    pool.query (
        'SELECT * FROM campaign,users WHERE st_intersects(campaign.geolocation,st_buffer(users.geolocation,$1))',
        [buf],
    
    (err, result) => {
        if (err) throw err;
        else {
        console.log(result.rows);
        var campaignItems = result.rows;
        res.render('user_enroll',{campaignItems:campaignItems,user_id:user_id});
        }
        
    });

};

module.exports = { activeDrives, participateCampaign, filterCampaign };