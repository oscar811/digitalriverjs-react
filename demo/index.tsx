import React from 'react';
import ReactDOM from 'react-dom/client';
import {DigitalRiverContainer} from "../src";
import demoConfigJson from "../configuration/demo.config.json";
import {Compliance, ComplianceOptions} from "../src/drjs/components";

const defaultKey = demoConfigJson.publicApiKey;
const locale = demoConfigJson.locale;
const Index = () => {

    const complianceOptions: ComplianceOptions = {
        compliance: {
            locale: "en-US",
            businessEntityCode: "DR_IRELAND-ENTITY"
        }
    };

    return (
        <>
            <DigitalRiverContainer publicApiKey={defaultKey} locale={locale} enableDigitalRiverCheckout={true}
                                   enableDigitalRiver={true} enableDynamicPricing={true}>
                <Compliance complianceOptions={complianceOptions}/>
            </DigitalRiverContainer>
        </>
    );
}

ReactDOM.createRoot(document.getElementById('app')!).render(
    <React.StrictMode>
        <Index/>
    </React.StrictMode>
)
