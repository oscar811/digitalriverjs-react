import * as React from 'react';
import type {PaymentComponentContext, PaymentComponentProps} from "../types";
import {useDigitalRiverContext} from "./digitalRiverContainer";

const PaymentComponentInnerContext = React.createContext({});

/**
 * `PaymentContext` is a context provider for the payment component.
 * It provides a context that includes the billing address, session ID, country, currency, amount, return URL, and cancel URL.
 * It also provides a method to create a source for the payment.
 *
 * @param {PaymentComponentProps} props - The properties that define the behavior of the Payment Context.
 * @param {AddressEntry} props.billingAddress - The billing address for the payment.
 * @param {string} props.sessionId - The session ID for the payment.
 * @param {string} props.returnUrl - The return URL for the payment.
 * @param {string} props.cancelUrl - The cancel URL for the payment.
 * @param {string} props.country - The country for the payment.
 * @param {string} props.currency - The currency for the payment.
 * @param {number} props.amount - The amount for the payment.
 * @param {React.ReactElement | React.ReactElement[]} [props.children] - The child components to be rendered within this context.
 *
 * @returns {JSX.Element} A context provider wrapping the children components.
 */
export const PaymentContext = ({
                                   billingAddress,
                                   sessionId,
                                   returnUrl,
                                   cancelUrl,
                                   country,
                                   currency,
                                   amount,
                                   children,
                               }: PaymentComponentProps): JSX.Element => {

    const drContext = useDigitalRiverContext();

    const createSource = async (payment: string, sourceData?: any) => {
        const sourceArgs = [];
        let elementPayment = payment;
        switch (payment) {
            case 'creditCard':
                elementPayment = 'cardnumber';
                break;
        }
        if (drContext.elements && drContext.elements[elementPayment]) {
            sourceArgs.push(drContext.elements[elementPayment]);
        }
console.log('drContext.elements',drContext.elements);
        const sourceRequestPayload: any = {
            type: payment
        };
        sourceRequestPayload[payment] = {};
        if (returnUrl) {
            sourceRequestPayload[payment].returnUrl = returnUrl;
        }
        if (cancelUrl) {
            sourceRequestPayload[payment].cancelUrl = cancelUrl;
        }

        if (sessionId) {
            sourceRequestPayload.sessionId = sessionId;
        } else {
            if (billingAddress) {
                sourceRequestPayload.owner = billingAddress;
            }
            if (currency) {
                sourceRequestPayload.currency = currency;
            }
            if (country) {
                sourceRequestPayload.country = country;
            }
            if (amount) {
                sourceRequestPayload.amount = amount;
            }
        }


        const data = Object.assign(sourceRequestPayload, sourceData);
        sourceArgs.push(data);

        return drContext.digitalRiver.createSource.apply(drContext.digitalRiver, sourceArgs);
    };

    const sharedState = {
        billingAddress,
        sessionId,
        createSource,
        country,
        currency,
        amount,
        returnUrl,
        cancelUrl,
    };
    return (
        <PaymentComponentInnerContext.Provider value={sharedState}>
            {children}
        </PaymentComponentInnerContext.Provider>
    )
}
export const usePaymentContext = () => {
    return React.useContext(PaymentComponentInnerContext) as PaymentComponentContext;
}
