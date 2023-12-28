import React from 'react';
import ReactDOM from 'react-dom/client';
import {DigitalRiverContainer} from "../../src";
import demoConfigJson from "../../configuration/demo.config.json";

const paymentType = 'dynamic-pricing';

const defaultKey = demoConfigJson.publicApiKey;
const locale = demoConfigJson.locale;
const DynamicPricingDemo = () => {

    return (
        <DigitalRiverContainer publicApiKey={defaultKey} enableDynamicPricing={true} locale={locale}>
            <span id="DR-currencySelector"/>
        </DigitalRiverContainer>
    );
}

ReactDOM.createRoot(document.getElementById(paymentType)!).render(
    <React.StrictMode>
        <DynamicPricingDemo/>
    </React.StrictMode>
)