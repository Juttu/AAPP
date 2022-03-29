import React, {useEffect, useMemo, useState} from "react";
import {Button} from "primereact/button";
import {getUserReward, addUserReward} from "../services/reward.service";
import {BlockUI} from "primereact/blockui";
import Wheel from "./Wheel";

function Reward() {

    const [mustSpin, setMustSpin] = useState(false);
    const [rewards, setRewards] = useState([]);
    const [prizeNumber, setPrizeNumber] = useState(-1);
    const [blockSpin, setBlockSpin] = useState(false);
    const prizeData = useMemo(() => [
        {option: 'Tata Motors'},
        {option: 'ITC'},
        {option: 'SBI'},
        {option: 'Tesla Motors'},
        {option: 'Netflix'},
    ], []);

    useEffect(() => {
        getUserReward().then(response => {
            const {rewardObj, isEligible} = response.data;
            if (rewardObj) {
                setRewards(rewardObj.rewards);
            }
            setBlockSpin(!isEligible);
        });
    }, [rewards, prizeData]);

    const handleSubmit = async () => {
        setMustSpin(false);
        setBlockSpin(true);
        await addUserReward({reward: prizeData[prizeNumber].option});
    };

    const handleSpinClick = () => {
        const newPrizeNumber = Math.floor(Math.random() * prizeData.length)
        setPrizeNumber(newPrizeNumber)
        setMustSpin(true)
    }

    return (
        <React.Fragment>
            <div className="grid">
                <div className="col-12 lg:col-6 h-screen flex flex-column justify-content-center align-items-center">
                    <BlockUI template={<i className="pi pi-lock" style={{'fontSize': '3rem'}}/>} blocked={blockSpin}>
                        <Wheel items={prizeData.map(v => v.option)} onSelectItem={console.log} />
                        <div className="w-full flex justify-content-center">
                            <Button label="Get my reward" className="mt-4" onClick={handleSpinClick}/>
                        </div>
                    </BlockUI>
                </div>
                <div className="col-12 lg:col-6 h-screen flex flex-column justify-content-center align-items-center">
                    {blockSpin &&
                        <div className="w-full flex justify-content-center">Refer your friends or family to earn more
                            spins!
                        </div>
                    }
                    {!mustSpin &&
                        <div>
                            My rewards:
                            {rewards.map((reward, index) =>
                                <div key={index}
                                     className="w-full flex justify-content-center">{reward}
                                </div>)}
                        </div>
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default Reward;