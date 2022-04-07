import React, {useEffect, useState} from "react";
import Login, {ILoginProps} from "components/auth/Login";
import {useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValue, useRecoilValueLoadable} from "recoil";
import {authState, messageState} from "recoil/atoms";
import Register from "components/user/Register";
import {currentUserQuery} from "recoil/selectors";
import {SectionDiv} from "components/styled/SectionDiv";
import Reward from "components/user/Reward";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import RewardService from "services/reward.service";
import {Image} from "primereact/image";


interface IAuthBlockProps {
  auth: any;
  loading: boolean;
  login: ILoginProps;
}

function AuthBlock({auth, loading, login}: IAuthBlockProps) {

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!auth.isLoggedIn) {
    return <Login {...login} />;
  }
  if (!auth.isRegistered) {
    return (
      <div className="pt-4">
        <Register />
      </div>
    )
  }
  return null;

}

function Home() {

  const auth = useRecoilValue(authState);
  const [messages, setMessages] = useRecoilState(messageState);
  const userLoadable = useRecoilValueLoadable(currentUserQuery);
  const [remainingRewards, setRemainingRewards] = useState(0);
  const refreshUserLoadable = useRecoilRefresher_UNSTABLE(currentUserQuery);
  const rewardService: RewardService = RewardService.Instance;
  const [referralLink, setReferralLink] = React.useState('');

  const onLoginSuccess = () => {
    refreshUserLoadable();
  }

  useEffect(() => {
    if (!auth.isLoggedIn) return;
    const rewardService = RewardService.Instance;
    rewardService.getRemainingRewards().then(remaining => {
      setRemainingRewards(remaining);
    });
  }, [auth])

  useEffect(() => {
    if (userLoadable.state === 'hasValue' && auth.isLoggedIn) {
      setReferralLink(`${window.location.origin}?referrer=${userLoadable.contents._id}`);
    }
  }, [userLoadable])

  const onSpinReward = async (reward: string) => {
    if (reward === "RETRY") {
      setMessages([
        ...messages,
        {
          severity: "info",
          summary: "No reward!",
          detail: "You got no rewards, try spinning again!",
        },
      ])
    } else if (remainingRewards === 0) {
      setMessages([
        ...messages,
        {
          severity: "error",
          summary: "All rewards completed!",
          detail: "Send a referral to earn more rewards!",
        },
      ])
    } else {
      const rewardAdded = await rewardService.addUserReward({ reward });
      if (rewardAdded) setRemainingRewards(remainingRewards - 1);
    }
  }

  return (
    <SectionDiv className="flex justify-content-center">
      <div className="grid flex lg:flex-row-reverse justify-content-center my-8 align-items-center w-full h-full">
        <div className="flex flex-column align-items-center justify-content-center">
          <Reward remainingRewards={remainingRewards} onSpinReward={onSpinReward} />
        </div>
        <div className="lg:w-6rem" />
        <div style={{ maxWidth: '600px' }}>
          <h1 style={{fontSize:'100px', color:'white'}} className="text-center lg:text-left">payBIS</h1>
          <AuthBlock auth={auth} loading={userLoadable.state === 'loading'}
                     login={{onLoginSuccess}} />
          {auth.isLoggedIn && auth.isRegistered && userLoadable.state === 'hasValue' && userLoadable.contents && <React.Fragment>
              <h3>Welcome, {userLoadable.contents.name}</h3>
              <CopyToClipboard text={referralLink} onCopy={() => {
                setMessages([
                  ...messages,
                  {
                    severity: "success",
                    summary: "Link copied",
                    detail: "You can share this link with your friends",
                  },
                ])
              }}>
                  <div className="p-inputgroup">
                      <div className="p-inputgroup">
                          <InputText placeholder="Keyword" value={referralLink}/>
                          <Button icon="pi pi-copy" className="p-button-warning"/>
                      </div>
                  </div>
              </CopyToClipboard>
          </React.Fragment>}
        </div>

      </div>

      <div className="text-black-alpha-90 grid mt-4 w-full ">
      <div style={{textAlign:"center", height:"130px",
          backgroundImage: `url(${require('../assets/white.jpeg')})`,
        }} className="col-12 lg:col-12 flex flex-column align-items-center justify-content-center">
          <h2 style={{textAlign:"center", fontFamily:"Lexend Deca,sans-serif",fontSize:"32px"}} className="mb-0">payBIS - Exclusively built for young adults to manage their money</h2>
          
          
        </div>
        <div style={{
          backgroundImage: `url(${require('../assets/c1.png')})`,
        }} className="col-12 grid flex">
          <div className="col-12 lg:col-6 flex flex-column align-items-center justify-content-center">
            {/* <h2 className="mb-0">Track Expenses</h2> */}
            {/* <p className="text-center">Keep track of shared expenses, balances, and who owes who.</p> */}
            <div className="w-full flex justify-content-center" style={{ backgroundColor: "#101010", borderRadius: '25px' }}>
              <video autoPlay loop muted playsInline className="w-20rem">
                <source src={require('../assets/credit1.mp4')} type="video/webm" />
                <source src={require('assets/credit1.mp4')} type="video/mp4" />
              </video>
            </div>
          </div>
          <div style={{textAlign:"center", fontFamily:"Lexend Deca,sans-serif",fontSize:"42px"}} className="col-12 lg:col-6 flex justify-content-center align-items-center">Pay using Bank account or UPI Credit anywhere. 
              <div style={{textAlign:"center", fontFamily:"Lexend Deca,sans-serif",fontSize:"20px"}} className="col-12 lg:col-6 flex justify-content-center align-items-center">No need to wait for micro-loan approvals when you can pay instantly with our UPI credit at a very low interest rate.</div>
</div>
          
        </div>
        <div style={{
          backgroundImage: `url(${require('../assets/c2.png')})`,
        }} className="col-12 grid flex lg:flex-row-reverse">
          <div className="col-12 lg:col-6 flex flex-column align-items-center justify-content-center">
            {/* <h2 className="mb-0">Track Expenses</h2> */}
            {/* <p className="text-center">Keep track of shared expenses, balances, and who owes who.</p> */}
            <div className="w-full flex justify-content-center" style={{ backgroundColor: "#101010", borderRadius: '25px' }}>
              <video autoPlay loop muted playsInline className="w-20rem">
                <source src={require('../assets/Spllit_bill_willframe.mp4')} type="video/webm" />
                <source src={require('assets/Spllit_bill_willframe.mp4')} type="video/mp4" />
              </video>
            </div>
          </div>
          <div style={{textAlign:"center", fontFamily:"Lexend Deca,sans-serif",fontSize:"42px"}} className="col-12 lg:col-6 flex justify-content-center align-items-center">Split your bills 
              <div style={{textAlign:"center", fontFamily:"Lexend Deca,sans-serif",fontSize:"20px"}} className="col-12 lg:col-6 flex justify-content-center align-items-center">No more hesitation to ask your money back from your friends. 
Simply split the bill instantly at the time of payment, payBIS will remind them.</div>
</div>
        </div>
        <div style={{
          backgroundImage: `url(${require('../assets/c1.png')})`,
        }} className="col-12 grid flex">
          <div className="col-12 lg:col-6 flex flex-column align-items-center justify-content-center">
            {/* <h2 className="mb-0">Track Expenses</h2> */}
            {/* <p className="text-center">Keep track of shared expenses, balances, and who owes who.</p> */}
            <div className="w-full flex justify-content-center" style={{ backgroundColor: "#101010", borderRadius: '25px' }}>
              <video autoPlay loop muted playsInline className="w-20rem">
                <source src={require('../assets/budget.mp4')} type="video/webm" />
                <source src={require('assets/budget.mp4')} type="video/mp4" />
              </video>
            </div>
          </div>
          <div style={{textAlign:"center", fontFamily:"Lexend Deca,sans-serif",fontSize:"42px"}} className="col-12 lg:col-6 flex justify-content-center align-items-center">Make a Quick Budget 
              <div style={{textAlign:"center", fontFamily:"Lexend Deca,sans-serif",fontSize:"20px"}} className="col-12 lg:col-6 flex justify-content-center align-items-center">Step away from traditional budget plan, with our 3 - Step Budgeting process keep track of your expenses, investments while also limiting your expenses. Get stock rewards and much more when you create a budget.</div>
          </div>        </div>
        <div style={{
          backgroundImage: `url(${require('../assets/c2.png')})`,
        }} className="col-12 grid flex lg:flex-row-reverse">
          <div className="col-12 lg:col-6 flex flex-column align-items-center justify-content-center">
            {/* <h2 className="mb-0">Track Expenses</h2> */}
            {/* <p className="text-center">Keep track of shared expenses, balances, and who owes who.</p> */}
            <div className="w-full flex justify-content-center" style={{ backgroundColor: "#101010", borderRadius: '25px' }}>
              <video autoPlay loop muted playsInline className="w-20rem">
                <source src={require('../assets/invest.mp4')} type="video/webm" />
                <source src={require('assets/invest.mp4')} type="video/mp4" />
              </video>
            </div>
          </div>
          <div style={{textAlign:"center", fontFamily:"Lexend Deca,sans-serif",fontSize:"42px"}} className="col-12 lg:col-6 flex justify-content-center align-items-center">Investing made easy 
              <div style={{textAlign:"center", fontFamily:"Lexend Deca,sans-serif",fontSize:"20px"}} className="col-12 lg:col-6 flex justify-content-center align-items-center">Having trouble wrapping your head around stocks and crypto???...Simply invest in expert created portfolios and track them in payBIS.</div>
          </div>        </div>
        <div style={{
          backgroundImage: `url(${require('../assets/c1.png')})`,
        }} className="col-12 grid flex">
          <div className="col-12 lg:col-6 flex flex-column align-items-center justify-content-center">
            {/* <h2 className="mb-0">Track Expenses</h2> */}
            {/* <p className="text-center">Keep track of shared expenses, balances, and who owes who.</p> */}
            <div className="w-full flex justify-content-center" style={{ backgroundColor: "#101010", borderRadius: '25px' }}>
             
              <Image className="mt-2" src={require('../assets/friends_investments.png')} alt=""/>

            </div>
          </div>
          <div style={{textAlign:"center", fontFamily:"Lexend Deca,sans-serif",fontSize:"42px"}} className="col-12 lg:col-6 flex justify-content-center align-items-center">Socialising Investments
              <div style={{textAlign:"center", fontFamily:"Lexend Deca,sans-serif",fontSize:"20px"}} className="col-12 lg:col-6 flex justify-content-center align-items-center">Confused where to invest ??...With payBIS you can view, react, and directly invest in the portfolios invested by your friends</div>
          </div>         </div>
      </div>
    </SectionDiv>
  )
  
}

export default Home;