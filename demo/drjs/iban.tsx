import React from 'react';
import ReactDOM from 'react-dom/client';
import {DigitalRiverContainer, ElementEventArgument, ElementOnChangeArgument, ElementOptions} from "../../src";
import demoConfigJson from "../../configuration/demo.config.json";
import {IBAN} from "../../src/drjs/components/iban.tsx";

const elementType = 'iban';
const defaultKey = demoConfigJson.publicApiKey;
const locale = demoConfigJson.locale;
const IBANDemo = ({}) => {

    const ibanOptions: ElementOptions = {};

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
            <IBAN ibanOptions={ibanOptions} onChange={onChange} onReady={onReady} onFocus={onFocus} onBlur={onBlur}/>
        </DigitalRiverContainer>
    );
}

ReactDOM.createRoot(document.getElementById(elementType)!).render(
    <React.StrictMode>
        <IBANDemo/>
    </React.StrictMode>
)