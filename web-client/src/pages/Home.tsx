import React from "react";
import Login, {ILoginProps} from "components/auth/Login";
import {useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValue, useRecoilValueLoadable} from "recoil";
import {authState, messageState} from "recoil/atoms";
import Register from "components/user/Register";
import {currentUserQuery} from "recoil/selectors";
import {SectionDiv} from "components/styled/SectionDiv";
import {Image} from "primereact/image";
import Reward from "components/user/Reward";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import RewardService from "services/reward.service";

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
  const refreshUserLoadable = useRecoilRefresher_UNSTABLE(currentUserQuery);
  const rewardService: RewardService = RewardService.Instance;

  const onLoginSuccess = () => {
    refreshUserLoadable();
  }

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
    } else {
      await rewardService.addUserReward({ reward });
    }
  }

  return (
    <SectionDiv className="flex justify-content-center">
      <div className="grid flex lg:flex-row-reverse justify-content-center my-8 align-items-center w-full h-full">
        <div className="flex flex-column align-items-center justify-content-center">
          <Reward onSpinReward={onSpinReward} />
        </div>
        <div className="lg:w-6rem" />
        <div style={{ maxWidth: '600px' }}>
          <h1 style={{fontSize:'100px', color:'white'}} className="text-center lg:text-left">payBIS</h1>
          <AuthBlock auth={auth} loading={userLoadable.state === 'loading'}
                     login={{onLoginSuccess}} />
          {auth.isLoggedIn && auth.isRegistered && userLoadable.state === 'hasValue' && userLoadable.contents && <React.Fragment>
              <h3>Welcome, {userLoadable.contents.name}</h3>
              <CopyToClipboard text={`${window.location.origin}/${userLoadable.contents._id}`} onCopy={() => {
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
                          <InputText placeholder="Keyword" value={`${window.location.origin}/${userLoadable.contents._id}`}/>
                          <Button icon="pi pi-copy" className="p-button-warning"/>
                      </div>
                  </div>
              </CopyToClipboard>
          </React.Fragment>}
        </div>

      </div>

      <div className="grid mt-4 w-full">
        <div style={{
          backgroundImage: `url(${require('../assets/pay_bg.jpeg')})`,
        }} className="col-12 lg:col-12 flex flex-column align-items-center justify-content-center">
          <h2 className="mb-0">Track Expenses</h2>
          <p className="text-center">Keep track of shared expenses, balances, and who owes who.</p>
          <video autoPlay loop muted playsInline className="w-20rem" width="1000" height="580">
            <source src={require('../assets/credit_withframe.mp4')} type="video/webm" />
            <source src={require('assets/credit_withframe.mp4')} type="video/mp4" />
          </video>
        </div>
        <div style={{
          backgroundImage: `url(${require('../assets/split.jpeg')})`,
        }} className="col-12 lg:col-12 flex flex-column align-items-center justify-content-center">
          <h2 className="mb-0">Track Expenses</h2>
          <p className="text-center">Keep track of shared expenses, balances, and who owes who.</p>
          <video autoPlay loop muted playsInline className="w-20rem" width="1000" height="700">
            <source src={require('../assets/Spllit_bill_willframe.mp4')} type="video/webm" />
            <source src={require('assets/Spllit_bill_willframe.mp4')} type="video/mp4" />
          </video>
        </div>
  
        <div className="col-12 lg:col-6 flex flex-column align-items-center justify-content-center bg-green-400">
          <h2 className="mb-0">Track Expenses</h2>
          <p className="text-center">Keep track of shared expenses, balances, and who owes who.</p>
          <Image className="mt-2" src={'https://www.splitwise.com/assets/home_page/fixtures/asset1.png'} alt=""/>
        </div>
        <div className="col-12 lg:col-6 flex flex-column align-items-center justify-content-center bg-blue-400">
          <h2 className="mb-0">Track Expenses</h2>
          <p className="text-center">Keep track of shared expenses, balances, and who owes who.</p>
          <Image className="mt-2" src={'https://www.splitwise.com/assets/home_page/fixtures/asset1.png'} alt=""/>
        </div>
        <div className="col-12 lg:col-6 flex flex-column align-items-center justify-content-center bg-blue-400">
          <h2 className="mb-0">Track Expenses</h2>
          <p className="text-center">Keep track of shared expenses, balances, and who owes who.</p>
          <Image className="mt-2" src={'https://www.splitwise.com/assets/home_page/fixtures/asset1.png'} alt=""/>
        </div>
        <div className="col-12 lg:col-6 flex flex-column align-items-center justify-content-center bg-green-400">
          <h2 className="mb-0">Track Expenses</h2>
          <p className="text-center">Keep track of shared expenses, balances, and who owes who.</p>
          <Image className="mt-2" src={'https://www.splitwise.com/assets/home_page/fixtures/asset1.png'} alt=""/>
        </div>
      </div>
    </SectionDiv>
  )
  
}

export default Home;