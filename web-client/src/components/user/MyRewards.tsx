import React from "react";
import {useEffect, useState} from "react";
import RewardService from "services/reward.service";
import "./box.css"
function MyRewards() {

  const rewardService: RewardService = RewardService.Instance;
  const [rewards, setRewards] = useState([]);


  useEffect(() => {
    rewardService.getUserReward().then(({ rewardObj }) => {
      setRewards(rewardObj.rewards);
    });
  }, []);

  return (
    <React.Fragment>
      {rewards.map((reward, idx) => {
        return (
          <div key={idx}>
            <div className="card card-1"><h3 style={{color:"black"}}>{reward}</h3></div>
            
          </div>
        );
      })}
    </React.Fragment>
  )

}

export default MyRewards;