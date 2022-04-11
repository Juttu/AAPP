import {Menubar} from 'primereact/menubar';
import React from "react";
import styled from "styled-components";
import {devices} from "utils/primevariables.util";
import {useRecoilValue} from "recoil";
import {authState} from "recoil/atoms";
import {Button} from "primereact/button";
import AuthService from "services/auth.service";
import MyRewards from "components/user/MyRewards";
import {Dialog} from "primereact/dialog";
import {Link, useNavigate} from "react-router-dom";
import {classNames} from "primereact/utils";
import {PopupButton} from "@typeform/embed-react";

const CustomMenubar = styled(Menubar)`
  background-color: #de1f54;
  border: 0;
  border-bottom: 1px solid var(--surface-card);
  height: 4.5rem;
  border-radius: 0 0 0px 0px;
  position: fixed;
  width: 100%;
  z-index: 999;
  .p-menuitem-icon,
  .p-menuitem-text {
    color: var(--text-primary);
  }
  .p-menubar-button {
    margin-left: 1rem;
  }
  @media screen and ${devices.over.lg} {
    .p-menubar-start {
      width: 25%;
      text-align: center;
    }
    .p-menubar-root-list {
      margin-left: auto;
    }
    .p-menubar-end {
      margin-left: 0;
    }
  }
`

const IconButton = styled(Button)`
  :focus {
    outline: none;
    box-shadow: none;
  }
`

function TopBar() {

  const template = (item: any, options: any) => {
    return (
      <Link to={`${item.url}`} role="menuitem" className={options.className} target={item.target}
                onClick={options.onClick}>
        <span className={classNames(options.iconClassName, 'text-white')}/>
        <span className="p-menuitem-text">{item.label}</span>
      </Link>
    );
  }

  const auth = useRecoilValue(authState);
  const history = useNavigate();
  const [rewardsDialog, setRewardsDialog] = React.useState(false);
  const authService: AuthService = AuthService.Instance;
  const items = [
    auth.isLoggedIn && {
      label: 'My rewards',
      icon: 'pi pi-fw pi-star',
      template: (item: any, options: any) => {
        return (
          <div role="menuitem" className={classNames(options.className, 'border-primary w-full')} onClick={options.onClick}>
            <span className={classNames(options.iconClassName, 'text-white')}/>
            <span className="p-menuitem-text">{item.label}</span>
          </div>
        );
      },
      command: () => {
        setRewardsDialog(true );
      }
    },
    {
      label: 'Content',
      icon: 'pi pi-fw pi-cog',
      url: '/custom',
      template
    },
    {
      label: 'Let\'s build payBIS together',
      template: (item: any, options: any) => {
        return (
          <PopupButton id="wLftItmg"
                       as={Button as any}
                       className='bg-white cursor-pointer border-white mx-5 p-2'
                       size={60}
                       style={{fontSize: 13, borderRadius: '18px', width:"210px"}} >
            <span style={{fontSize:"15px", fontWeight:"bold"}} className="text-black-alpha-90">{item.label}</span>
          </PopupButton>
        );
      },
    }
  ]
  return (
    <div className="w-full flex justify-content-center">
      <Dialog breakpoints={{'960px': '75vw'}} style={{width: '50vw'}} visible={rewardsDialog}
              header="My rewards!"
              modal={true}
              onHide={() => setRewardsDialog(false)}>
        <MyRewards />
      </Dialog>
      <CustomMenubar model={items as any} start={
        <div className="cursor-pointer hidden lg:inline-block" onClick={() => history("/")}>
          {/* <h1 className="my-0">payBIS</h1> */}
          <div style={{color:"white",textAlign:"center", fontSize:"20px"}} className="my-0"><h1>payBIS</h1> </div>

        </div>
      } end={
        <React.Fragment>
          {!auth.isLoggedIn && <span onClick={() => {
                                         window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                                       }}
                                       className='bg-white p-2 cursor-pointer border-white mr-2 text-black-alpha-90'
                                       style={{fontSize: 15, borderRadius: '18px',fontWeight:"bold"}} >
              Join Early Access
          </span>}
          {auth.isLoggedIn && <IconButton name="logout"
                                          icon="pi pi-sign-out"
                                          onClick={() => authService.logOut()}
                                          className="mb-1 p-button-rounded p-button-text text-white"/>}

        </React.Fragment>
      } />
    </div>
  );
}

export default TopBar;