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
import {

  RedditShareButton,
  TelegramShareButton,

  TwitterShareButton,

  WhatsappShareButton,
  WhatsappIcon
} from "react-share";
import {classNames} from "primereact/utils";


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
        <Register/>
      </div>
    )
  }
  return null;

}


function InfoSection({bgImg, imgUrl, vidUrl, title, description, isEven}: any) {
  return (
    <div className={classNames("w-full flex flex-column-reverse", isEven ? "lg:flex-row" : "lg:flex-row-reverse")}
         style={{backgroundImage: `url(${bgImg})`}}>
      <div className="col-12 lg:col-6 flex flex-column align-items-center justify-content-center">
        <div className="w-full flex justify-content-center"
             style={{backgroundColor: "#101010", borderRadius: '25px'}}>
          {vidUrl && <video autoPlay loop muted playsInline className="w-20rem">
              <source src={vidUrl['webm']} type="video/webm"/>
              <source src={vidUrl['mp4']} type="video/mp4"/>
          </video>}
          {imgUrl && <Image height="600px" src={imgUrl} alt=""/>}
        </div>
      </div>
      <div className="col-12 lg:col-6 text-black-alpha-90 flex flex-column justify-content-center align-items-center">
        <div style={{fontSize: "46px"}}
             className="text-center">
          {title}
        </div>
        <div style={{fontSize: "30px", width: '80%'}}
             className="mt-8 mx-auto">
          {description}
        </div>
      </div>
    </div>
  )
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

    if (!auth.isLoggedIn) {
      setMessages([
        ...messages,
        {
          severity: "error",
          summary: "Join Early Access",
          detail: "Join Early Access to spin me and win stock rewards ",
        },
      ])
      return;
    }
    if (!auth.isRegistered) {
      setMessages([
        ...messages,
        {
          severity: "error",
          summary: "Fill details",
          detail: "Tell me your name to spin me",
        },
      ])
      return;
    }
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
      const rewardAdded = await rewardService.addUserReward({reward});
      if (rewardAdded) setRemainingRewards(remainingRewards - 1);
    }
  }

  return (
    <SectionDiv className="flex justify-content-center">
      <div className="grid flex lg:flex-row-reverse justify-content-center my-8 align-items-center w-full h-full">
        <div className="flex flex-column align-items-center justify-content-center">
          <Reward remainingRewards={remainingRewards} onSpinReward={onSpinReward}/>
        </div>
        <div className="lg:w-6rem"/>
        <div style={{maxWidth: '600px'}}>
          <div style={{color: "white", textAlign: "center"}}
               className="text-center lg:text-left"><h1>payBIS</h1></div>
          <AuthBlock auth={auth} loading={userLoadable.state === 'loading'}
                     login={{onLoginSuccess}}/>
          {auth.isLoggedIn && auth.isRegistered && userLoadable.state === 'hasValue' && userLoadable.contents &&
              <React.Fragment>
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

                  <div className="bg-white mt-4 flex justify-content-center align-items-center"
                       style={{borderRadius: '20px'}}>
                      <WhatsappShareButton url={referralLink} title={"Share this link to get a chance to spin more"}>
                          <div className="text-center lg:text-left mt-1 mr-2"><WhatsappIcon
                              style={{borderRadius: '50%'}} size={40}/></div>
                      </WhatsappShareButton>
                  </div>

              </React.Fragment>}
        </div>
      </div>
      <div className="text-black-alpha-90 text-center w-full flex justify-content-center align-items-center bg-white"
           style={{height: "130px"}}>
        <h2 style={{textAlign: "center", fontSize: "32px"}}
            className="my-0">payBIS - Exclusively built for young adults to manage their money</h2>
      </div>

      <InfoSection
        bgImg={require("../assets/c1.png")}
        vidUrl={{ mp4: require("../assets/credit1.mp4"), webm: require("../assets/credit1.mp4") }}
        title="Pay using Bank account or UPI Credit anywhere"
        isEven
        description="No need to wait for micro-loan approvals when you can pay instantly with our UPI credit at a very low interest rate."
      />

      <InfoSection
        bgImg={require("../assets/c2.png")}
        vidUrl={{ mp4: require("../assets/Spllit_bill_willframe.mp4"), webm: require("../assets/Spllit_bill_willframe.mp4") }}
        title="Split your bills"
        description="No more hesitation to ask your money back from your friends. Simply split the bill instantly at the time of payment, payBIS will remind them."
      />

      <InfoSection
        bgImg={require("../assets/c1.png")}
        vidUrl={{ mp4: require("../assets/budget_resized.mp4"), webm: require("../assets/budget_resized.mp4") }}
        title="Make a Quick Budget"
        isEven
        description="Step away from traditional budget plan, with our 3 - Step Budgeting process keep track of your expenses, investments while also limiting your expenses. Get stock rewards and much more when you create a budget"
      />

      <InfoSection
        bgImg={require("../assets/c2.png")}
        vidUrl={{ mp4: require("../assets/invest.mp4"), webm: require("../assets/invest.mp4") }}
        title="Investing made easy"
        description="Having trouble wrapping your head around stocks and crypto???...Simply invest in expert created portfolios and track them in payBIS."
      />

      <InfoSection
        bgImg={require("../assets/c1.png")}
        imgUrl={require("../assets/friends_investments.png")}
        title="Socialising Investments"
        isEven
        description="Confused where to invest ??...With payBIS you can view, react, and directly invest in the portfolios invested by your friends."
      />
    </SectionDiv>
  )

}

export default Home;