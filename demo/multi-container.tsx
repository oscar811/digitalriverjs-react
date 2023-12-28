import React from 'react';
import ReactDOM from 'react-dom/client';
import {DigitalRiverContainer, useDigitalRiverContext} from "../src";
import {Compliance, ComplianceOptions} from "../src/drjs/components";
import demoConfigJson from "../configuration/demo.config.json";

const defaultKey = demoConfigJson.publicApiKey;
const locale = demoConfigJson.locale;
const MultiContainer = () => {

    const complianceOptions: ComplianceOptions = {
        compliance: {
            locale: locale,
            businessEntityCode: "DR_IRELAND-ENTITY"
        }
    };


    const DigitalRiverContainerTester = ({elementId}: any) => {
        const drContext = useDigitalRiverContext();
        return (
            <Compliance complianceOptions={complianceOptions} elementId={elementId}/>
        )
    }

    return (
        <>
            <DigitalRiverContainer
                publicApiKey={defaultKey}
                enableDigitalRiverCheckout={false}
                enableDigitalRiver={true}
                enableDynamicPricing={false}
            >
                <DigitalRiverContainerTester elementId={"compliance-1"}/>
            </DigitalRiverContainer>
            <DigitalRiverContainer
                publicApiKey={defaultKey}
                enableDigitalRiverCheckout={true}
                enableDigitalRiver={true}
                enableDynamicPricing={true}
                currencySelectorElementId={"DR-currencySelector"}
            >
                <DigitalRiverContainerTester elementId={"compliance-2"}/>
                <span id="DR-currencySelector"/>
            </DigitalRiverContainer>
        </>
    );
}

ReactDOM.createRoot(document.getElementById('multi-container')!).render(
    <React.StrictMode>
        <MultiContainer/>
    </React.StrictMode>
)