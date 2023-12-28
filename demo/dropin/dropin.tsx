import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import {AddressEntry, DigitalRiverContainer, PaymentComponentContext, PaymentSourceData,} from "../../src";
import demoConfigJson from "../../configuration/demo.config.json";
import {
    DropIn,
    DropInOnCancelArgument,
    DropInOnErrorArgument,
    DropInOnReadyArgument,
    DropInOptions
} from "../../src/dropin";

const paymentType = 'dropin';
const defaultKey = demoConfigJson.publicApiKey;
const locale = demoConfigJson.locale;
const DropInDemo = () => {

    let paymentComponent: PaymentComponentContext;
    const [sourceData, setSourceData] = React.useState<PaymentSourceData>();
    const [dropInConfig, setDropInConfig] = React.useState<DropInOptions>();

    useEffect(() => {
        fetch(`/api/payment-session?country=US&type=physical&apiKey=${defaultKey}`).then((response) => {
            return response.json();
        }).then((data) => {
            const _dropInConfig: DropInOptions = {
                sessionId: data.session.id,
                //billingAddress: billingAddress,
                options: {
                    redirect: {
                        disableAutomaticRedirects: true,
                        returnUrl: location.href,
                        cancelUrl: location.href,
                    }
                },
                onSuccess(source: PaymentSourceData) {
                    console.log('onSuccess', source);
                    setSourceData(source);
                },
                onError(error: DropInOnErrorArgument) {
                    console.log('onError', error);
                },
                onCancel(data: DropInOnCancelArgument) {
                    console.log('onCancel', data);
                },
                onReady(data: DropInOnReadyArgument) {
                    console.log('onReady', data);
                }
            };
            setDropInConfig(_dropInConfig);
        });
    }, []);
    const createSource = async () => {
        try {
            const _sourceData = await paymentComponent.createSource(paymentType);
            setSourceData(_sourceData);
            console.log('createSource', paymentComponent, _sourceData);
        } catch (e) {
            console.error('SourceError', e);
        }
    }

    const billingAddress = demoConfigJson.defaultAddress.billTo['us'] as AddressEntry;


    if (!dropInConfig) return null;
    return (
        <DigitalRiverContainer publicApiKey={defaultKey} locale={locale}>
            <DropIn dropInConfiguration={dropInConfig}/>
            <pre>
                {JSON.stringify(sourceData, null, 2)}
            </pre>
        </DigitalRiverContainer>
    );
}

ReactDOM.createRoot(document.getElementById(paymentType)!).render(
    <React.StrictMode>
        <DropInDemo/>
    </React.StrictMode>
)