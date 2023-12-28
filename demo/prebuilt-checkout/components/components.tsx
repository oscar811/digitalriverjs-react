import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import {
    CheckoutSession,
    CheckoutSessionLink,
    DigitalRiverContainer,
    PaymentSourceData,
    useDigitalRiverContext,
} from "../../../src";

import {
    Address,
    Compliance,
    Components,
    ComponentSuccessResponse,
    ComponentTypeSupportedDone,
    InvoiceAttribute,
    OrderSummary,
    Payment,
    Shipping,
    TaxExemption,
    TaxIdentifier,
    ThankYou,
    useComponentsContext,
    Wallet
} from "../../../src/prebuilt-checkout/components";

import demoConfigJson from "../../../configuration/demo.config.json";

const elementType = 'components';

const defaultKey = demoConfigJson.publicApiKey;//"pk_test_043daebbe86f415ca166934a3a64c776";
const locale = demoConfigJson.locale;
//const defaultKey = null;
const ComponentsDemo = ({}) => {

    const [publicApiKey, setPublicApiKey] = React.useState<string>(localStorage.getItem('publicApiKey') || defaultKey);
    const [currentPublicApiKey, setCurrentPublicApiKey] = React.useState<string>(localStorage.getItem('publicApiKey') || defaultKey);


    useEffect(() => {
        if (publicApiKey != defaultKey) {
            if (publicApiKey) {
                localStorage.setItem('publicApiKey', publicApiKey);
            } else {
                //localStorage.removeItem('publicApiKey');
            }
        }
    }, []);
    const InnerComponents = ({}) => {

        const drContext = useDigitalRiverContext();
        const [sourceData, setSourceData] = React.useState<PaymentSourceData>();
        const [checkoutSessionLink, setCheckoutSessionLink] = React.useState<CheckoutSessionLink | any>();
        const [ready, setReady] = React.useState(true);
        const [checkoutSession, setCheckoutSession] = React.useState<CheckoutSession>();

        const nextButtonStyle = {
            float: 'right'
        };
        let _checkoutSessionLink: CheckoutSessionLink | any = null;

        useEffect(() => {
            if (checkoutSessionLink && checkoutSessionLink.id) {
                localStorage.setItem('checkoutSessionId', checkoutSessionLink.id);
                localStorage.setItem('checkoutSessionLink', JSON.stringify(checkoutSessionLink));
            } else {
                // localStorage.removeItem('checkoutSessionLink');
                // localStorage.removeItem('checkoutSessionId');
                // localStorage.removeItem('bcCartId');
            }
            if (publicApiKey != defaultKey) {
                if (publicApiKey) {
                    localStorage.setItem('publicApiKey', publicApiKey);
                } else {
                    //localStorage.removeItem('publicApiKey');
                }
            }
        }, [checkoutSessionLink, publicApiKey]);


        useEffect(() => {
            const checkoutSessionLinkString = localStorage.getItem('checkoutSessionLink');
            if (checkoutSessionLinkString) {
                setCheckoutSessionLink(JSON.parse(checkoutSessionLinkString));
                _checkoutSessionLink = checkoutSessionLink;
            } else {
                setCheckoutSessionLink(null);
            }
        }, []);


        const onSuccess = (data: ComponentSuccessResponse) => {
            console.log('onSuccess', data);
        }

        const onChange = (data: CheckoutSession) => {
            console.log('onChange', data);
            setCheckoutSession(data);
        }

        const onReady = (data: CheckoutSession) => {
            console.log('onReady', data);
            setReady(true);
            setCheckoutSession(data);
        }

        const render = () => {

        }

        //if(!checkoutSessionLink || !currentPublicApiKey) return null;
        return (
            <>
                <label>Public Api Key: <input type="text" defaultValue={publicApiKey} onBlur={(event) => {
                    if (event.target.value) {
                        setPublicApiKey(event.target.value);
                        //setCurrentPublicApiKey(event.target.value);
                    }
                }}/></label>
                &nbsp;&nbsp;
                <button onClick={async () => {

                    const checkoutSession = await fetch('/api/checkout-session');
                    const checkoutSessionJson = await checkoutSession.json();
                    localStorage.setItem('checkoutSessionId', checkoutSessionJson.id);
                    _checkoutSessionLink = ({
                        id: checkoutSessionJson.id,
                        link: `https://checkout.digitalriverws.com/${checkoutSessionJson.id}?pk_key=${publicApiKey}`
                    });
                    setCheckoutSessionLink(_checkoutSessionLink);
                }}>
                    Create Checkout Session
                </button>
                &nbsp;&nbsp;
                <label>Upstream Token: <input type={"text"} defaultValue={localStorage.getItem('bcCartId') || ''}
                                              onBlur={(event) => {
                                                  if (event.target.value && event.target.value.length) {
                                                      localStorage.setItem('bcCartId', event.target.value);
                                                      if (event.target.value && drContext.digitalRiverCheckout) {
                                                          drContext.digitalRiverCheckout.createCheckoutSessionWithUpstreamToken(event.target.value).then((link) => {
                                                              localStorage.setItem('checkoutSessionLink', JSON.stringify(link));
                                                              _checkoutSessionLink = link;
                                                          });
                                                      }
                                                  } else {
                                                      localStorage.removeItem('bcCartId');
                                                      localStorage.removeItem('checkoutSessionLink');
                                                  }
                                              }}/></label>
                &nbsp;/&nbsp;
                <label>Checkout Session ID: <input type={"text"}
                                                   defaultValue={localStorage.getItem('checkoutSessionId') || ''}
                                                   onBlur={(event) => {
                                                       console.log('onBlur', event.target.value);
                                                       if (event.target.value && event.target.value.length) {
                                                           _checkoutSessionLink = ({
                                                               id: event.target.value,
                                                               link: `https://checkout.digitalriverws.com/${event.target.value}?pk_key=${publicApiKey}`
                                                           });
                                                       } else {
                                                           localStorage.removeItem('checkoutSessionLink');
                                                       }
                                                   }}/></label>
                &nbsp;&nbsp;
                <button onClick={() => {
                    const checkoutSessionLinkString = localStorage.getItem('checkoutSessionLink');
                    if (!_checkoutSessionLink && checkoutSessionLinkString) {
                        _checkoutSessionLink = JSON.parse(checkoutSessionLinkString);
                    }
                    console.log('_checkoutSessionLink', _checkoutSessionLink);
                    if (_checkoutSessionLink) {
                        if (_checkoutSessionLink?.error) {
                            alert(JSON.stringify(_checkoutSessionLink.error));
                        } else {
                            setCheckoutSessionLink(_checkoutSessionLink);
                        }
                    }
                }}>Render
                </button>
                <Components checkoutSessionLink={checkoutSessionLink} onReady={onReady} onChange={onChange}
                            onSuccess={onSuccess}>
                    <>{
                        ready ? (
                            <>
                                <Wallet/>
                                <OrderSummary/>
                                <Address/>
                                <NextButton style={nextButtonStyle} componentType={ComponentTypeSupportedDone.Address}>Address
                                    Done</NextButton>
                                <Shipping/>
                                <NextButton style={nextButtonStyle} componentType={ComponentTypeSupportedDone.Shipping}>Shipping
                                    Done</NextButton>
                                <TaxIdentifier/>
                                <TaxExemption/>
                                <InvoiceAttribute/>
                                <Payment/>
                                <ThankYou/>
                                <pre>
                                {JSON.stringify(sourceData, null, 2)}
                            </pre>
                            </>) : null
                    }</>
                    <Compliance/>
                </Components>
            </>
        );
    };


    const NextButton = ({componentType, children, style}: NextButtonProps) => {
        const componentsContext = useComponentsContext();

        const onClick = async () => {
            const feedback = await componentsContext.done(componentType);
            console.log(feedback);
        }

        return (
            <button onClick={onClick} style={style}>{children}</button>
        );
    }

    return (
        <DigitalRiverContainer publicApiKey={publicApiKey}
                               locale={locale}
                               enableDigitalRiverCheckout={true}
                               enableDigitalRiver={true}>
            <InnerComponents/>
        </DigitalRiverContainer>
    )
}

export interface NextButtonProps {
    componentType: ComponentTypeSupportedDone,
    children?: React.ReactElement | React.ReactElement[] | string;
    style?: any;
}

ReactDOM.createRoot(document.getElementById(elementType)!).render(
    <React.StrictMode>
        <ComponentsDemo/>
    </React.StrictMode>
)