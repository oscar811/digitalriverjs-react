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
    GooglePay,
    GooglePayButtonColor,
    GooglePayButtonType,
    GooglePayClickEvent,
    GooglePayPaymentRequest,
    GooglePayShippingAddressChangeEvent,
    GooglePayShippingOptionChangeEvent
} from "../../src/drjs/components";

const elementType = 'googlepay';
const defaultKey = demoConfigJson.publicApiKey;
const locale = demoConfigJson.locale;
const GooglePayDemo = ({}) => {

    const [sourceData, setSourceData] = React.useState<PaymentSourceData>();
    const [paymentRequest, setPaymentRequest] = React.useState<GooglePayPaymentRequest>();

    useEffect(() => {
        fetch(`/api/payment-session?country=US&type=physical&apiKey=${defaultKey}`).then((response) => {
            return response.json();
        }).then((data) => {
            console.log('data', data);
            const _paymentRequest: GooglePayPaymentRequest = {
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
                    buttonType: GooglePayButtonType.Plain,
                    buttonColor: GooglePayButtonColor.Dark,
                    //buttonLanguage: "en"
                },
                requestShipping: true,
                waitOnClick: true,
            };
            console.log('_paymentRequest', _paymentRequest);
            setPaymentRequest(_paymentRequest);
        });
    }, []);


    const calculatePaymentRequest = (paymentRequest: GooglePayPaymentRequest | UpdatePaymentRequest) => {
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


    const onClick = (data: GooglePayClickEvent) => {
        console.log('onClick', data);
        let _paymentRequest: GooglePayPaymentRequest = Object.assign({}, paymentRequest);
        data.updateWith(_paymentRequest);
    };

    const onReady = (data: ElementEventArgument) => {
        console.log('onReady', data);
    };

    const onCancel = (data: ElementEventArgument) => {
        console.log('onCancel', data);
    };

    const onShippingAddressChange = (data: GooglePayShippingAddressChangeEvent) => {
        console.log('shippingAddress', data.shippingAddress);
        let updatePaymentRequest: UpdatePaymentRequest = Object.assign({
            status: UpdatePaymentRequestStatus.Success
        }, paymentRequest);


        updatePaymentRequest = calculatePaymentRequest(updatePaymentRequest) as UpdatePaymentRequest;
        data.updateWith(updatePaymentRequest);
    };

    const onShippingOptionChange = (data: GooglePayShippingOptionChangeEvent) => {
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
        <DigitalRiverContainer publicApiKey={defaultKey} locale={locale}>
            <GooglePay
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
        <GooglePayDemo/>
    </React.StrictMode>
)