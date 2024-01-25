import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import {
    AddressEntry,
    DigitalRiverContainer, type DigitalRiverContext,
    ElementEventArgument,
    ElementOnChangeArgument,
    ElementOptions, ElementSourceEventArgument,
    PaymentComponentContext, PaymentMethods, PaymentSourceData, useDigitalRiverContext
} from "../../src";
import demoConfigJson from "../../configuration/demo.config.json";
import {PaymentContext, usePaymentContext} from "../../src/digitalriver";
import {
    ApplePay, ApplePayButtonColor, ApplePayButtonType, ApplePayPaymentRequest,
    CardCvv,
    CardExpiration,
    CardNumber,
    GooglePay,
    Konbini,
    OnlineBanking
} from "../../src/drjs/components";
import {Card} from "react-bootstrap";

const elementType = 'paymentList';
const defaultKey = demoConfigJson.publicApiKey;
const locale = demoConfigJson.locale;
const PaymentListDemo = ({}) => {


    let paymentComponent: PaymentComponentContext;
    let drContext: DigitalRiverContext;
    const [country, setCountry] = React.useState<string>('US');
    const [currency, setCurrency] = React.useState<string>('USD');
    const [totalAmount, setTotalAmount] = React.useState<number>(0);
    const [sourceData, setSourceData] = React.useState<PaymentSourceData>();
    const [paymentSessionId, setPaymentSessionId] = React.useState();
    const [paymentMethods, setPaymentMethods] = React.useState<PaymentMethods | null>();
    const [selectedPaymentMethod, setSelectPaymentMethod] = React.useState<string>();

    useEffect(() => {
        fetch(`/api/payment-session?country=${country}&type=physical&apiKey=${defaultKey}`).then((response) => {
            return response.json();
        }).then((data) => {
            setPaymentMethods(null);
            setPaymentSessionId(data.session.id);
            setCurrency(data.session.currency);
            setTotalAmount(Number(data.session.amount));
        });
    }, [country]);

    const createSource = async () => {
        try {
            if(selectedPaymentMethod) {
                const _sourceData = await paymentComponent.createSource(selectedPaymentMethod);
                setSourceData(_sourceData);
                console.log('createSource', paymentComponent, _sourceData);
            }else{
                alert('Please select payment method');
            }
        } catch (e) {
            console.error('SourceError', e);
        }
    }

    const onSuccess = (source: ElementSourceEventArgument)=> {
        setSourceData(source);
    }

    const PaymentList = () => {
        paymentComponent = usePaymentContext();
        drContext = useDigitalRiverContext();

        useEffect(() => {
            if(drContext && drContext.digitalRiver && !paymentMethods) {
                drContext.digitalRiver.retrieveAvailablePaymentMethods({
                    sessionId: paymentSessionId,
                }).then((_paymentMethods) => {
                    setPaymentMethods(_paymentMethods);
                });
            }
        }, [country]);


        if( (!paymentMethods || paymentMethods.paymentMethods?.length===0) ) return <></>;

        const paymentRequest = {
            sessionId: paymentSessionId,
            country: country,
            currency: currency,
            total: {
                label: "Order Total",
                amount: totalAmount
            },
            style: {
                buttonColor: 'light'
            },
            requestShipping: false,
        }

        return (<dl>
            {
                paymentMethods && paymentMethods.paymentMethods?.map((paymentMethod) => {
                    return (
                        <dt key={paymentMethod.type}>
                            <h2>
                                <label htmlFor={paymentMethod.type}>
                                <input type="radio" id={paymentMethod.type} name="paymentType" onClick={(event)=>{
                                    setSelectPaymentMethod(paymentMethod.type);
                                }} defaultChecked={paymentMethod.type===selectedPaymentMethod} />
                                    {paymentMethod.displayName}
                                </label>
                                <dd>
                                    {
                                        paymentMethod.type==='creditCard' && <div>
                                            <label>CardNumber: <CardNumber/> </label>
                                            <label>CardExpiration: <CardExpiration/> </label>
                                            <label>CardCvv: <CardCvv/> </label>
                                        </div>
                                    }
                                    {
                                        paymentMethod.type==='konbini' && <div>
                                            <Konbini />
                                        </div>
                                    }
                                    {
                                        paymentMethod.type==='applePay' && <div>
                                            <ApplePay paymentRequest={paymentRequest} onSuccess={onSuccess}/>
                                        </div>
                                    }
                                    {
                                        paymentMethod.type==='googlePay' && <div>
                                            <GooglePay paymentRequest={paymentRequest} onSuccess={onSuccess}/>
                                        </div>
                                    }
                                    {
                                        paymentMethod.type==='onlineBanking' && <div>
                                            <OnlineBanking onlineBankingOptions={{ onlineBanking: {
                                                    currency: 'USD',
                                                    country: 'US'
                                                }}}/>
                                        </div>
                                    }
                                </dd>
                            </h2>
                        </dt>);
                })
            }
        </dl>);
    }


    return (

        <DigitalRiverContainer publicApiKey={defaultKey} locale={locale}>
            <PaymentContext country={country}
                            sessionId={paymentSessionId}
                            returnUrl={location.href}
                            cancelUrl={location.href}>
                <label>
                    Country
                    <select onChange={(event)=>{
                        setCountry(event.target.value);
                    }}>
                        <option value="US" selected={country === 'US'}>US</option>
                        <option value="GB" selected={country === 'GB'}>GB</option>
                        <option value="IE" selected={country === 'IE'}>IE</option>
                        <option value="NL" selected={country === 'NL'}>NL</option>
                        <option value="JP" selected={country === 'JP'}>JP</option>
                    </select>
                </label>
                <PaymentList/>
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
        <PaymentListDemo/>
    </React.StrictMode>
)
