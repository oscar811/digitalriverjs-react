import {useEffect} from 'react';
import {useDigitalRiverContext} from "../../digitalriver";
import {DigitalRiverElement, ElementEventArgument, ElementSourceEventArgument,} from "../../types";

const PAYMENT_METHOD_TYPE = 'paypal';
let paypal: PayPalButtonElement | null = null;

/**
 * `PayPal` is a component for rendering the PayPal button.
 * It uses the Digital River context to create and manage the PayPal button.
 * It also provides a method to create a source for the payment.
 *
 * @component
 * @see https://docs.digitalriver.com/digital-river-api/general-resources/reference/elements/paypal-elements
 *
 * @param {PaypalProps} props - The properties that define the behavior of the PayPal button.
 * @param {string} [props.elementId='dr-paypal'] - The ID of the HTML element where the PayPal button will be mounted. Defaults to 'dr-paypal'.
 * @param {PayPalPaymentRequest} props.paymentRequest - The payment request for the PayPal button.
 * @param {function} [props.onReady=()=>{}] - The function to be called when the PayPal button is ready. Defaults to an empty function.
 * @param {function} [props.onClick=()=>{}] - The function to be called when the PayPal button is clicked. Defaults to an empty function.
 * @param {function} [props.onCancel=()=>{}] - The function to be called when the PayPal button is cancelled. Defaults to an empty function.
 * @param {function} [props.onError=()=>{}] - The function to be called when there is an error. Defaults to an empty function.
 * @param {function} [props.onSuccess=()=>{}] - The function to be called when the payment is successful. Defaults to an empty function.
 *
 * @returns {JSX.Element} A span element with the specified ID where the PayPal button will be mounted.
 */
export const PayPal = ({
                           elementId = "dr-paypal",
                           paymentRequest,
                           onReady = () => {
                           },
                           onClick = () => {
                           },
                           onCancel = () => {
                           },
                           onError = () => {
                           },
                           onSuccess = () => {
                           },
                       }: PaypalProps): JSX.Element => {
    const drContext = useDigitalRiverContext();

    const render = () => {
        const placeholder = document.getElementById(elementId);

        if (!paypal && drContext.digitalRiver && placeholder && !drContext.elements[PAYMENT_METHOD_TYPE] && paymentRequest) {
            try {

                paypal = drContext.digitalRiver.createElement(PAYMENT_METHOD_TYPE, paymentRequest) as PayPalButtonElement;
                if (paypal) {
                    paypal.mount(elementId);
                    paypal.on('ready', onReady);
                    paypal.on('click', onClick);
                    paypal.on('cancel', onCancel);
                    paypal.on('source', onSuccess);
                    drContext.setElement(PAYMENT_METHOD_TYPE, paypal);
                }
            } catch (e) {
                console.error(e);
                drContext.clear();
                clear();
                onError(e);
            }
        }
    }

    const clear = () => {
        const placeholder = document.getElementById(elementId);
        if (placeholder) {
            placeholder.replaceChildren();
        }
        drContext.removeElement(PAYMENT_METHOD_TYPE);
        paypal = null;
    }

    useEffect(() => {
        if (drContext.digitalRiver && paymentRequest) {
            render();
        }
    }, [drContext.digitalRiver, paymentRequest]);

    useEffect(() => {
        return () => {
            clear();
        }
    }, []);

    return (
        <span id={elementId}/>
    );
}

/**
 * @typedef PaypalProps
 * @property {string} elementId - The ID of the HTML element where the PayPal button will be mounted.
 * @property {PayPalPaymentRequest} paymentRequest - The payment request for the PayPal button.
 * @property {function} onReady - The function to be called when the PayPal button is ready.
 * @property {function} onClick - The function to be called when the PayPal button is clicked.
 * @property {function} onCancel - The function to be called when the PayPal button is cancelled.
 * @property {function} onError - The function to be called when there is an error.
 * @property {function} onSuccess - The function to be called when the payment is successful.
 */
export interface PaypalProps {
    elementId?: string | undefined;
    paymentRequest: PayPalPaymentRequest;

    onReady?(data: ElementEventArgument): void;

    onCancel?(data: ElementEventArgument): void;

    onClick?(data: ElementEventArgument): void;

    onSuccess?(source: ElementSourceEventArgument): void;

    onError?(error: Error | any): void;
}

export interface PayPalPaymentRequest {
    style?: PayPalStyle;
    sourceData: {
        type: string;
        sessionId: string;
        payPal: {
            returnUrl: string;
            cancelUrl: string;
        }
    }
}

/**
 * @typedef PayPalButtonElement
 * @property {function} update - The function to update the payment request for the PayPal button.
 */
export interface PayPalButtonElement extends DigitalRiverElement {
    update(paymentRequest: PayPalPaymentRequest): void;
}

/**
 * @typedef PayPalStyle
 * @property {PaypalLabel} label - The label for the PayPal button.
 * @property {string} size - The size of the PayPal button.
 * @property {string} color - The color of the PayPal button.
 * @property {string} shape - The shape of the PayPal button.
 * @property {string} layout - The layout of the PayPal button.
 * @property {string} fundingicons - The funding icons for the PayPal button.
 * @property {string} tagline - The tagline for the PayPal button.
 */
export interface PayPalStyle {
    label?: PaypalLabel | string;
    size?: string;
    color?: string;
    shape?: string;
    layout?: string;
    fundingicons?: string;
    tagline?: string;
}

/**
 * @enum {string}
 * @readonly
 */
export enum PaypalLabel {
    Checkout = 'checkout',
    Blank = 'blank',
}


