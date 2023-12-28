import React from 'react';
import ReactDOM from 'react-dom/client';
import {AddressEntry, DigitalRiverContainer, PaymentComponentContext, PaymentSourceData,} from "../../src";
import {CardCvv, CardExpiration, CardNumber} from "../../src/drjs/components";
import demoConfigJson from "../../configuration/demo.config.json";
import {PaymentContext, usePaymentContext} from "../../src/digitalriver";

const paymentType = 'creditCard';
const defaultKey = demoConfigJson.publicApiKey;
const locale = demoConfigJson.locale;

const CreditCardDemo = ({}) => {

    let paymentComponent: PaymentComponentContext;
    const [sourceData, setSourceData] = React.useState<PaymentSourceData>();

    const createSource = async () => {
        try {
            const _sourceData = await paymentComponent.createSource(paymentType);
            setSourceData(_sourceData);
            console.log('createSource', paymentComponent, _sourceData);
        } catch (e) {
            console.error('SourceError', e);
        }
    }

    const PaymentMethod = () => {
        paymentComponent = usePaymentContext();
        return (<div>
            <label>CardNumber: <CardNumber elementId={"test-cardNumber"} options={styleOption}/> </label>
            <label>CardExpiration: <CardExpiration elementId={"test-cardExpiration"} options={styleOption}/> </label>
            <label>CardCvv: <CardCvv elementId={"test-cardCvv"} options={styleOption}/> </label>
        </div>);
    }

    const billingAddress = demoConfigJson.defaultAddress.billTo['us'] as AddressEntry;

    const styleOption = {
        style: {},
        classes: {
            base: "dr_creditCard",
            complete: "dr_complete",
            empty: "dr_empty",
            focus: "dr_focus",
            invalid: "dr_error",
            webkitAutofill: "autofill"
        }
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

ReactDOM.createRoot(document.getElementById(paymentType)!).render(
    <React.StrictMode>
        <CreditCardDemo/>
    </React.StrictMode>
)