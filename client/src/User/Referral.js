import React, {useEffect} from "react";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {getUserDetails} from "../services/user.service";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Toast} from "primereact/toast";
function Referral() {

    const [referralLink, setReferralLink] = React.useState({});
    const ref = React.useRef();

    useEffect(() => {
        getUserDetails().then(response => {
            setReferralLink(`http://localhost:3000/?referrer=${response.data.user._id}`);
        });
    }, []);

    return (
        <div className="flex col-12 lg:col-6 xl:col-4">
            <Toast ref={ref} />
            <CopyToClipboard text={referralLink} onCopy={() => {
                ref.current.show({severity: 'info', summary: 'Copied', detail: 'Referral link copied to clipboard'});
            }}>
                <div className="p-inputgroup">
                    <div className="p-inputgroup">
                        <InputText placeholder="Keyword" value={referralLink}/>
                        <Button icon="pi pi-copy" className="p-button-warning"/>
                    </div>
                </div>
            </CopyToClipboard>
        </div>
    )
}

export default Referral;