import {useEffect} from 'react';
import {useDigitalRiverContext} from "../../digitalriver";
import {
    AddressEntry,
    DigitalRiverButtonElement,
    ElementEventArgument,
    ElementSourceEventArgument,
    PaymentRequest,
    PaymentRequestShippingOption,
    UpdatePaymentRequest,
} from "../../types";

const PAYMENT_METHOD_TYPE = 'googlepay';
let googlepay: DigitalRiverButtonElement | null = null;

/**
 * `GooglePay` is a component for rendering the GooglePay component.
 * It provides a method to create a source for the payment.
 *
 * @component
 * @see https://docs.digitalriver.com/digital-river-api/general-resources/reference/elements/google-pay-elements
 *
 * @param {GooglePayProps} props - The properties that define the behavior of the GooglePay component.
 * @param {string} [props.elementId='dr-google-pay'] - The ID of the HTML element where the GooglePay component will be mounted.
 * @param {GooglePayPaymentRequest} props.paymentRequest - The payment request for the GooglePay component.
 * @param {function} [props.onReady=()=>{}] - The function to be called when the GooglePay component is ready.
 * @param {function} [props.onClick=()=>{}] - The function to be called when the GooglePay component is clicked.
 * @param {function} [props.onCancel=()=>{}] - The function to be called when the GooglePay component is cancelled.
 * @param {function} [props.onShippingOptionChange=()=>{}] - The function to be called when the shipping option changes.
 * @param {function} [props.onShippingAddressChange=()=>{}] - The function to be called when the shipping address changes.
 * @param {function} [props.onSuccess=()=>{}] - The function to be called when the payment is successful.
 * @param {function} [props.onError=()=>{}] - The function to be called when there is an error.
 *
 * @returns {JSX.Element} A span element with the specified ID.
 */
export const GooglePay = ({
                              elementId = "dr-google-pay",
                              paymentRequest,
                              onReady = () => {
                              },
                              onClick = () => {
                              },
                              onCancel = () => {
                              },
                              onError = () => {
                              },
                              onShippingAddressChange = () => {
                              },
                              onShippingOptionChange = () => {
                              },
                              onSuccess = () => {
                              },
                          }: GooglePayProps): JSX.Element => {
    const drContext = useDigitalRiverContext();

    /**
     * Function to render the Google Pay button.
     */
    const render = () => {
        const placeholder = document.getElementById(elementId);

        if (!googlepay && drContext.digitalRiver && placeholder && !drContext.elements[PAYMENT_METHOD_TYPE] && paymentRequest) {
            try {
                const paymentRequestData = drContext.digitalRiver.paymentRequest(paymentRequest);
                googlepay = drContext.digitalRiver.createElement(PAYMENT_METHOD_TYPE, paymentRequestData) as DigitalRiverButtonElement;
                if (googlepay.canMakePayment()) {
                    googlepay.mount(elementId);
                    googlepay.on('ready', onReady);
                    googlepay.on('click', onClick);
                    googlepay.on('cancel', onCancel);
                    googlepay.on('shippingoptionchange', onShippingOptionChange);
                    googlepay.on('shippingaddresschange', onShippingAddressChange);
                    googlepay.on('source', onSuccess);
                    drContext.setElement(PAYMENT_METHOD_TYPE, googlepay);
                } else {
                    onError(new Error("Google Pay is not supported"));
                }
            } catch (e) {
                console.error(e);
                drContext.clear();
                clear();
                onError(e);
            }
        }
    }

    /**
     * Function to clear the Google Pay button.
     */
    const clear = () => {
        const placeholder = document.getElementById(elementId);
        if (placeholder) {
            placeholder.replaceChildren();
        }
        drContext.removeElement(PAYMENT_METHOD_TYPE);
        googlepay = null;
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
 * @typedef GooglePayProps
 * @property {string} elementId - The ID of the HTML element where the Google Pay button will be mounted.
 * @property {GooglePayPaymentRequest} paymentRequest - The payment request for the GooglePay component.
 * @property {function} onReady - The function to be called when the GooglePay component is ready.
 * @property {function} onClick - The function to be called when the GooglePay component is clicked.
 * @property {function} onCancel - The function to be called when the GooglePay component is cancelled.
 * @property {function} onShippingOptionChange - The function to be called when the shipping option changes.
 * @property {function} onShippingAddressChange - The function to be called when the shipping address changes.
 * @property {function} onSuccess - The function to be called when the payment is successful.
 * @property {function} onError - The function to be called when there is an error.
 */
export interface GooglePayProps {
    elementId?: string | undefined;
    paymentRequest: GooglePayPaymentRequest;

    onReady?(data: ElementEventArgument): void;

    onCancel?(data: ElementEventArgument): void;

    onClick?(data: GooglePayClickEvent): void;

    onShippingOptionChange?(data: GooglePayShippingOptionChangeEvent): void;

    onShippingAddressChange?(data: GooglePayShippingAddressChangeEvent): void;

    onSuccess?(source: ElementSourceEventArgument): void;

    onError?(error: Error | any): void;
}

export interface GooglePayShippingOptionChangeEvent {
    shippingOption: PaymentRequestShippingOption;

    updateWith(data: UpdatePaymentRequest): void;
}

export interface GooglePayShippingAddressChangeEvent {
    shippingAddress: AddressEntry;

    updateWith(data: UpdatePaymentRequest): void;
}

export interface GooglePayClickEvent extends ElementEventArgument {
    updateWith(data: GooglePayPaymentRequest): void;
}

export interface GooglePayPaymentRequest extends PaymentRequest {
    style?: GooglePayStyle;
}

export interface GooglePayStyle {
    buttonType?: GooglePayButtonType;
    buttonColor?: GooglePayButtonColor;
    buttonLanguage?: string;
}

export enum GooglePayButtonColor {
    Dark = 'dark',
    Light = 'light',
}

export enum GooglePayButtonType {
    Plain = 'plain',
    Long = 'long',
}

