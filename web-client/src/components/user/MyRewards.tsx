import React from "react";
import {useEffect, useState} from "react";
import RewardService from "services/reward.service";

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
            <h3>{reward}</h3>
          </div>
        );
      })}
    </React.Fragment>
  )

}

export default MyRewards;