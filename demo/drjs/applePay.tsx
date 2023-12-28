import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import demoConfigJson from "../../configuration/demo.config.json";
import {
    DigitalRiverContainer,
    ElementEventArgument,
    ElementSourceEventArgument,
    ElementSourceEventResponseStatus,
    PaymentSourceData,
    UpdatePaymentRequest,
    UpdatePaymentRequestStatus
} from "../../src";
import {
    ApplePay,
    ApplePayButtonColor,
    ApplePayButtonType,
    ApplePayClickEvent,
    ApplePayPaymentRequest,
    ApplePayShippingAddressChangeEvent,
    ApplePayShippingOptionChangeEvent
} from "../../src/drjs/components";

const elementType = 'applepay';
const defaultKey = demoConfigJson.publicApiKey;
const locale = demoConfigJson.locale;
const ApplePayDemo = ({}) => {

    const [sourceData, setSourceData] = React.useState<PaymentSourceData>();
    const [paymentRequest, setPaymentRequest] = React.useState<ApplePayPaymentRequest>();

    useEffect(() => {
        fetch(`/api/payment-session?country=US&type=physical&apiKey=${defaultKey}`).then((response) => {
            return response.json();
        }).then((data) => {
            console.log('data', data);
            const _paymentRequest: ApplePayPaymentRequest = {
                sessionId: data.session.id,
                country: "US",
                currency: "USD",
                total: {
                    label: "Order Total",
                    amount: 48
                },
                displayItems: [
                    {
                        label: "Product 1",
                        amount: 10,
                    },
                    {
                        label: "Product 2",
                        amount: 15,
                    },
                    {
                        label: "Product 2",
                        amount: 15,
                    }
                ],
                shippingOptions: [
                    {
                        id: "overnight-shipping",
                        label: "Overnight Shipping",
                        amount: 10,
                        detail: "Get this in 1 business day."
                    },
                    {
                        id: "default-shipping",
                        label: "Default Shipping",
                        amount: 2,
                        detail: "Get this in 7 business day.",
                        selected: true
                    },
                ],
                style: {
                    buttonType: ApplePayButtonType.Plain,
                    buttonColor: ApplePayButtonColor.Dark,
                    //buttonLanguage: "en"
                },
                requestShipping: true,
                waitOnClick: true,
            };
            console.log('_paymentRequest', _paymentRequest);
            setPaymentRequest(_paymentRequest);
        });
    }, []);

    const calculatePaymentRequest = (paymentRequest: ApplePayPaymentRequest | UpdatePaymentRequest) => {
        let amount = 0;

        if (paymentRequest.displayItems) {
            paymentRequest.displayItems.forEach((displayItem) => {
                amount += displayItem.amount;
            })
        }

        if (paymentRequest.shippingOptions) {
            const shippingOption = paymentRequest.shippingOptions.find((shippingOption) => {
                return shippingOption.selected;
            });
            if (shippingOption) {
                amount += shippingOption.amount;
            }
        }

        paymentRequest.total = {
            label: "Order Total",
            amount: amount
        }

        return paymentRequest;
    }


    const onClick = (data: ApplePayClickEvent) => {
        console.log('onClick', data);
        let _paymentRequest: ApplePayPaymentRequest = Object.assign({}, paymentRequest);
        data.updateWith(_paymentRequest);
    };

    const onReady = (data: ElementEventArgument) => {
        console.log('onReady', data);
    };

    const onCancel = (data: ElementEventArgument) => {
        console.log('onCancel', data);
    };

    const onShippingAddressChange = (data: ApplePayShippingAddressChangeEvent) => {
        console.log('shippingAddress', data.shippingAddress);
        let updatePaymentRequest: UpdatePaymentRequest = Object.assign({
            status: UpdatePaymentRequestStatus.Success
        }, paymentRequest);


        updatePaymentRequest = calculatePaymentRequest(updatePaymentRequest) as UpdatePaymentRequest;
        data.updateWith(updatePaymentRequest);
    };

    const onShippingOptionChange = (data: ApplePayShippingOptionChangeEvent) => {
        console.log('shippingOption', data.shippingOption);
        let updatePaymentRequest: UpdatePaymentRequest = Object.assign({
            status: UpdatePaymentRequestStatus.Success
        }, paymentRequest);

        updatePaymentRequest.shippingOptions?.forEach((shippingOption) => {
            shippingOption.selected = data.shippingOption.id === shippingOption.id;
        });

        updatePaymentRequest = calculatePaymentRequest(updatePaymentRequest) as UpdatePaymentRequest;
        data.updateWith(updatePaymentRequest);
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
        <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"en-US"}>
            <ApplePay
                paymentRequest={paymentRequest}
                onClick={onClick}
                onReady={onReady}
                onCancel={onCancel}
                onShippingAddressChange={onShippingAddressChange}
                onShippingOptionChange={onShippingOptionChange}
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
        <ApplePayDemo/>
    </React.StrictMode>
)