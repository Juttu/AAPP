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
    .p-menubar-end {
      margin-left: auto;
      margin-right: 25%;
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
        <span className={options.iconClassName}/>
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
      command: () => {
        setRewardsDialog(true );
      }
    },
    {
      label: 'Custom',
      icon: 'pi pi-fw pi-cog',
      url: '/custom',
      template
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
        <div className="cursor-pointer" onClick={() => history("/")}>
          {/* <h1 className="my-0">payBIS</h1> */}
          <div style={{color:"white",textAlign:"center", fontFamily:"Lexend Deca,sans-serif",fontSize:"20px"}} className="my-0"><h1>payBIS</h1> </div>

        </div>
      } end={
        <React.Fragment>
          {auth.isLoggedIn && <IconButton name="logout"
                                          icon="pi pi-sign-out"
                                          onClick={() => authService.logOut()}
                                          className="p-button-rounded"/>}

        </React.Fragment>
      } />
    </div>
  );
}

export default TopBar;