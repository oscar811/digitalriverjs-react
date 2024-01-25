import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    AddressEntry,
    DigitalRiverContainer,
    ElementEventArgument,
    ElementOnChangeArgument,
    PaymentComponentContext,
    PaymentSourceData
} from "../../src";
import demoConfigJson from "../../configuration/demo.config.json";
import {Konbini, OnlineBanking, OnlineBankingOptions} from "../../src/drjs/components";
import {PaymentContext, usePaymentContext} from "../../src/digitalriver";

const elementType = 'onlineBanking';
const defaultKey = demoConfigJson.publicApiKey;
const locale = demoConfigJson.locale;
const OnlineBankingDemo = ({}) => {

    let paymentComponent: PaymentComponentContext;
    const [sourceData, setSourceData] = React.useState<PaymentSourceData>();
    const billingAddress = demoConfigJson.defaultAddress.billTo['us'] as AddressEntry;

    const createSource = async () => {
        try {
            const _sourceData = await paymentComponent.createSource(elementType);
            setSourceData(_sourceData);
            console.log('createSource', paymentComponent, _sourceData);
        } catch (e) {
            console.error('SourceError', e);
        }
    }

    const PaymentMethod = () => {
        paymentComponent = usePaymentContext();
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

        return (<OnlineBanking onlineBankingOptions={onlineBankingOptions} onChange={onChange} onReady={onReady}
                               onFocus={onFocus} onBlur={onBlur}/>);
    };

    return (
        <DigitalRiverContainer publicApiKey={defaultKey} locale={locale}>
            <PaymentContext billingAddress={billingAddress} amount={100} currency={"USD"}>
                <PaymentMethod/>
                <button onClick={createSource}>Create Source</button>
                <pre>
                    {JSON.stringify(sourceData, null, 2)}
                </pre>
            </PaymentContext>
        </DigitalRiverContainer>
    );
}

ReactDOM.createRoot(document.getElementById(elementType)!).render(
    <React.StrictMode>
        <OnlineBankingDemo/>
    </React.StrictMode>
)