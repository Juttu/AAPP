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

const CustomMenubar = styled(Menubar)`
  background-color: #F23467;
  border: 0;
  border-bottom: 1px solid var(--surface-card);
  height: 4rem;
  border-radius: 0 0 6px 6px;
  position: fixed;
  width: 100%;
  z-index: 999;
  @media screen and ${devices.over.lg} {
    justify-content: space-around;
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

  const auth = useRecoilValue(authState);
  const [rewardsDialog, setRewardsDialog] = React.useState(false);
  const authService: AuthService = AuthService.Instance;
  const items = [
    {
      label: 'My rewards',
      icon: 'pi pi-fw pi-star',
      command: () => {
        setRewardsDialog(true );
      }
    },
  ]
  return (
    <div className="w-full flex justify-content-center">
      <Dialog breakpoints={{'960px': '75vw'}} style={{width: '50vw'}} visible={rewardsDialog}
              header="My rewards!"
              modal={true}
              onHide={() => setRewardsDialog(false)}>
        <MyRewards />
      </Dialog>
      <CustomMenubar model={items} end={
        <React.Fragment>
          {auth.isLoggedIn && <IconButton name="logout"
                                          icon="pi pi-sign-out"
                                          onClick={() => authService.logOut()}
                                          className="p-button-rounded p-button-text"/>}
        </React.Fragment>
      } />
    </div>
  );
}

export default TopBar;