import React from 'react';
import ReactDOM from 'react-dom/client';
import {DigitalRiverContainer, ElementEventArgument, ElementOnChangeArgument} from "../../src";
import demoConfigJson from "../../configuration/demo.config.json";
import {OfflineRefund, OfflineRefundOptions,} from "../../src/drjs/components";

const elementType = 'offlinerefund';
const defaultKey = demoConfigJson.publicApiKey;
const locale = demoConfigJson.locale;
const OfflineRefundDemo = ({}) => {

    const offlineRefundOptions: OfflineRefundOptions = {
        refundToken: ""
    };

    const onChange = (data: ElementOnChangeArgument) => {
        console.log('onChange', data);
    };

    const onReady = (data: ElementEventArgument) => {
        console.log('onReady', data);
    };


    return (
        <DigitalRiverContainer publicApiKey={defaultKey} locale={locale}>
            <OfflineRefund offlineRefundOptions={offlineRefundOptions} onChange={onChange} onReady={onReady}/>
        </DigitalRiverContainer>
    );
}

ReactDOM.createRoot(document.getElementById(elementType)!).render(
    <React.StrictMode>
        <OfflineRefundDemo/>
    </React.StrictMode>
)