import React from 'react';
import ReactDOM from 'react-dom/client';
import {DigitalRiverContainer, PaymentSourceData, useDigitalRiverContext,} from "../../src";
import demoConfigJson from "../../configuration/demo.config.json";
import {PrebuiltCheckoutConfiguration} from "../../src/prebuilt-checkout";

const elementType = 'prebuilt-checkout';
const defaultKey = demoConfigJson.publicApiKey;
const locale = demoConfigJson.locale;
const PrebuiltCheckoutDemo = () => {

    const drContext = useDigitalRiverContext();
    const [sourceData, setSourceData] = React.useState<PaymentSourceData>();


    const configuration: PrebuiltCheckoutConfiguration = {
        "options": {
            //"expressCheckout": ["payPal"],// array for listing express checkout. Values: "applePay","payPal","googlePay"
            "language": "en-US",
            "style": {
                "modal": {
                    "themeColor": {
                        "primary": "#00a7e1",
                        "highlight": "#002f57",
                        "headerBackground": "#fff",
                        "mainBackground": "#fff",
                        "orderSummaryBackground": "#eee",
                        "linkTextColor": "#003058",
                        "stepperBorder": "#00a7e1",
                        "footer": {
                            "background": "#001c33",
                            "linkText": "#fff"
                        }
                    },
                    "borderRadius": "8px",
                    "fontFamily": "Montserrat, sans-serif",
                    "fontVariant": "normal",
                    "letterSpacing": "1px"
                },
                "textField": {
                    "base": {
                        "color": "#000",
                        "fontFamily": "Arial, Helvetica, sans-serif",
                        "fontSize": "20px",
                        "fontVariant": "normal",
                        "letterSpacing": "1px"
                    },
                    "borderRadius": '4px'
                }
            }
        }
    };

    return (
        <>
            <button onClick={async () => {

                const checkoutSession = await fetch('/api/checkout-session');
                const checkoutSessionJson = await checkoutSession.json();
                const modal = await drContext.digitalRiverCheckout.createModal(checkoutSessionJson.id, configuration);
            }}>
                Pre-Built Checkout
            </button>
            <pre>
                {JSON.stringify(sourceData, null, 2)}
            </pre>
        </>
    );
}

ReactDOM.createRoot(document.getElementById(elementType)!).render(
    <React.StrictMode>
        <DigitalRiverContainer publicApiKey={defaultKey} locale={locale} enableDigitalRiverCheckout={true}>
            <PrebuiltCheckoutDemo/>
        </DigitalRiverContainer>
    </React.StrictMode>
)