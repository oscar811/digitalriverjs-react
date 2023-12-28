import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import {DigitalRiverContainer, ElementEventArgument, ElementSourceEventArgument, PaymentSourceData} from "../../src";
import {AmazonPay,} from "../../src/drjs/components";
import {PaymentContext} from "../../src/digitalriver";
import demoConfigJson from "../../configuration/demo.config.json";

const elementType = 'amazonpay';
const defaultKey = demoConfigJson.publicApiKey;
const locale = demoConfigJson.locale;
const AmazonPayDemo = ({}) => {

    const [sourceData, setSourceData] = React.useState<PaymentSourceData>();
    const [paymentSessionId, setPaymentSessionId] = React.useState();

    useEffect(() => {
        fetch(`/api/payment-session?country=US&type=physical&apiKey=${defaultKey}`).then((response) => {
            return response.json();
        }).then((data) => {
            setPaymentSessionId(data.session.id);
        });
    }, []);
    const onReady = (data: ElementEventArgument) => {
        console.log('onReady', data);
    };

    const onError = (error: any) => {
        alert(error);
    }
    const onSuccess = (event: ElementSourceEventArgument) => {
        const source = event as PaymentSourceData;

        console.log('event', event);
        setSourceData(source);
    }

    if (!paymentSessionId) return null;

    return (
        <DigitalRiverContainer publicApiKey={defaultKey} locale={locale}>
            <PaymentContext country={"US"}
                            sessionId={paymentSessionId}
                            returnUrl={location.href}
                            cancelUrl={location.href}>
                <AmazonPay
                    onReady={onReady}
                    onSuccess={onSuccess}
                    onError={onError}
                    resultReturnUrl={location.href}
                />
                <pre>
                    {JSON.stringify(sourceData, null, 2)}
                </pre>
            </PaymentContext>
        </DigitalRiverContainer>
    );
}

ReactDOM.createRoot(document.getElementById(elementType)!).render(
    <React.StrictMode>
        <AmazonPayDemo/>
    </React.StrictMode>
)