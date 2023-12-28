import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import demoConfigJson from "../../configuration/demo.config.json";
import {
    DigitalRiverContainer,
    ElementEventArgument,
    ElementSourceEventArgument,
    ElementSourceEventResponseStatus,
    PaymentSourceData,
} from "../../src";
import {PayPal, PayPalPaymentRequest} from "../../src/drjs/components";

const elementType = 'paypal';
const defaultKey = demoConfigJson.publicApiKey;
const locale = demoConfigJson.locale;
const PaypalDemo = ({}) => {

    const [sourceData, setSourceData] = React.useState<PaymentSourceData>();
    const [paymentRequest, setPaymentRequest] = React.useState<PayPalPaymentRequest>();

    useEffect(() => {
        fetch(`/api/payment-session?country=US&type=digital&apiKey=${defaultKey}`).then((response) => {
            return response.json();
        }).then((data) => {
            console.log('data', data);
            const _paymentRequest: PayPalPaymentRequest = {
                style: {
                    label: 'checkout',
                    size: 'responsive',
                    color: 'gold',
                    shape: 'pill',
                    layout: 'horizontal',
                    fundingicons: 'false',
                    tagline: 'false'
                },
                sourceData: {
                    type: "payPal",
                    sessionId: data.session.id,
                    payPal: {
                        returnUrl: location.href,
                        cancelUrl: location.href
                    }
                }
            };
            console.log('_paymentRequest', _paymentRequest);
            setPaymentRequest(_paymentRequest);
        });
    }, []);


    const onClick = (data: ElementEventArgument) => {
        console.log('onClick', data);
    };

    const onReady = (data: ElementEventArgument) => {
        console.log('onReady', data);
    };

    const onCancel = (data: ElementEventArgument) => {
        console.log('onCancel', data);
    };

    const onError = (error: any) => {
        alert(error);
    }
    const onSuccess = (event: ElementSourceEventArgument) => {
        const source = event as PaymentSourceData;

        console.log('event', event);
        setSourceData(source);
        let createdSuccess = true;
        if (createdSuccess) {
            event.complete(ElementSourceEventResponseStatus.Success);
        } else {
            event.complete(ElementSourceEventResponseStatus.Error);
        }
    }
    if (paymentRequest == null) return null;
    return (
        <DigitalRiverContainer publicApiKey={defaultKey} locale={locale}>
            <PayPal
                paymentRequest={paymentRequest}
                onClick={onClick}
                onReady={onReady}
                onCancel={onCancel}
                onSuccess={onSuccess}
                onError={onError}
            />
            <pre>
                {JSON.stringify(sourceData, null, 2)}
            </pre>
        </DigitalRiverContainer>
    );
}

ReactDOM.createRoot(document.getElementById(elementType)!).render(
    <React.StrictMode>
        <PaypalDemo/>
    </React.StrictMode>
)