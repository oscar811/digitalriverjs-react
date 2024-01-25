import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import {
    AddressEntry,
    DigitalRiverContainer,
    ElementEventArgument,
    PaymentComponentContext,
    PaymentSourceData
} from "../../src";
import demoConfigJson from "../../configuration/demo.config.json";
import {IDEAL, IDEALElementOptions, IDEALOnChangeArgument} from "../../src/drjs/components/ideal.tsx";
import {PaymentContext, usePaymentContext} from "../../src/digitalriver";
import {Konbini} from "../../src/drjs/components";

const elementType = 'ideal';
const defaultKey = demoConfigJson.publicApiKey;
const locale = demoConfigJson.locale;
const IDEALDemo = ({}) => {

    const [idealOptions, setIdealOptions] = React.useState<IDEALElementOptions>();
    useEffect(() => {
        fetch(`/api/payment-session?country=NL&type=physical&apiKey=${defaultKey}`).then((response) => {
            return response.json();
        }).then((data) => {
            console.log('data', data);
            const _idealOptions: IDEALElementOptions = {
                ideal: {
                    sessionId: data.session.id
                }
            };
            setIdealOptions(_idealOptions);
        });
    }, []);

    let paymentComponent: PaymentComponentContext;
    const [sourceData, setSourceData] = React.useState<PaymentSourceData>();
    const billingAddress = demoConfigJson.defaultAddress.billTo['jp'] as AddressEntry;
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
        const onChange = (data: IDEALOnChangeArgument) => {
            console.log('onChange', data);
        };

        const onReady = (data: ElementEventArgument) => {
            console.log('onReady', data);
        };

        return (<IDEAL idealOptions={idealOptions} onChange={onChange} onReady={onReady}/>);
    }

    return (
        <DigitalRiverContainer publicApiKey={defaultKey} locale={locale}>
            <PaymentContext billingAddress={billingAddress} sessionId={idealOptions?.ideal.sessionId} >
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
        <IDEALDemo/>
    </React.StrictMode>
)