import React from 'react';
import ReactDOM from 'react-dom/client';
import {DigitalRiverContainer, ElementEventArgument, ElementOnChangeArgument} from "../../src";
import demoConfigJson from "../../configuration/demo.config.json";
import {OnlineBanking, OnlineBankingOptions} from "../../src/drjs/components";

const elementType = 'onlineBanking';
const defaultKey = demoConfigJson.publicApiKey;
const locale = demoConfigJson.locale;
const OnlineBankingDemo = ({}) => {

    const onlineBankingOptions: OnlineBankingOptions = {
        onlineBanking: {
            currency: "USD",
            country: "US"
        }
    };

    const onChange = (data: ElementOnChangeArgument) => {
        console.log('onChange', data);
    };

    const onReady = (data: ElementEventArgument) => {
        console.log('onReady', data);
    };

    const onFocus = (data: ElementEventArgument) => {
        console.log('onFocus', data);
    };

    const onBlur = (data: ElementEventArgument) => {
        console.log('onBlur', data);
    };


    return (
        <DigitalRiverContainer publicApiKey={defaultKey} locale={locale}>
            <OnlineBanking onlineBankingOptions={onlineBankingOptions} onChange={onChange} onReady={onReady}
                           onFocus={onFocus} onBlur={onBlur}/>
        </DigitalRiverContainer>
    );
}

ReactDOM.createRoot(document.getElementById(elementType)!).render(
    <React.StrictMode>
        <OnlineBankingDemo/>
    </React.StrictMode>
)