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

const PAYMENT_METHOD_TYPE = 'applepay';
let applepay: DigitalRiverButtonElement | null = null;

/**
 * ApplePay component is used to create and manage the Apple Pay button.
 *
 * @component
 * @see https://docs.digitalriver.com/digital-river-api/general-resources/reference/elements/apple-pay-elements
 *
 * @param {ApplePayProps} props - Properties passed to the component.
 * @param {string} props.elementId - The ID of the HTML element where the Apple Pay button will be mounted.
 * @param {ApplePayPaymentRequest} props.paymentRequest - The payment request object for the Apple Pay session.
 * @param {function} props.onReady - Callback function that is called when the Apple Pay button is ready.
 * @param {function} props.onClick - Callback function that is called when the Apple Pay button is clicked.
 * @param {function} props.onCancel - Callback function that is called when the Apple Pay session is cancelled.
 * @param {function} props.onError - Callback function that is called when an error occurs.
 * @param {function} props.onShippingAddressChange - Callback function that is called when the shipping address is changed.
 * @param {function} props.onShippingOptionChange - Callback function that is called when the shipping option is changed.
 * @param {function} props.onSuccess - Callback function that is called when the payment is successful.
 * @returns {JSX.Element} A span element with the specified ID where the Apple Pay button will be mounted.
 */
export const ApplePay = ({
                             elementId = "dr-apple-pay",
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
                         }: ApplePayProps): JSX.Element => {
    const drContext = useDigitalRiverContext();

    /**
     * Function to render the Apple Pay button.
     */
    const render = () => {
        const placeholder = document.getElementById(elementId);

        if (!applepay && drContext.digitalRiver && placeholder && !drContext.elements[PAYMENT_METHOD_TYPE] && paymentRequest) {
            try {
                const paymentRequestData = drContext.digitalRiver.paymentRequest(paymentRequest);
                applepay = drContext.digitalRiver.createElement(PAYMENT_METHOD_TYPE, paymentRequestData) as DigitalRiverButtonElement;
                if (applepay.canMakePayment()) {
                    applepay.mount(elementId);
                    applepay.on('ready', onReady);
                    applepay.on('click', onClick);
                    applepay.on('cancel', onCancel);
                    applepay.on('shippingoptionchange', onShippingOptionChange);
                    applepay.on('shippingaddresschange', onShippingAddressChange);
                    applepay.on('source', onSuccess);
                    drContext.setElement(PAYMENT_METHOD_TYPE, applepay);
                } else {
                    onError(new Error("Apple Pay is not supported"));
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
     * Function to clear the Apple Pay button.
     */
    const clear = () => {
        const placeholder = document.getElementById(elementId);
        if(applepay) {
            applepay.destroy();
        }
        if (placeholder) {
            placeholder.replaceChildren();
        }
        drContext.removeElement(PAYMENT_METHOD_TYPE);
        applepay = null;
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
 * @typedef ApplePayProps
 * @property {string} elementId - The ID of the HTML element where the Apple Pay button will be mounted.
 * @property {ApplePayPaymentRequest} paymentRequest - The payment request object for the Apple Pay session.
 * @property {function} onReady - Callback function that is called when the Apple Pay button is ready.
 * @property {function} onClick - Callback function that is called when the Apple Pay button is clicked.
 * @property {function} onCancel - Callback function that is called when the Apple Pay session is cancelled.
 * @property {function} onError - Callback function that is called when an error occurs.
 * @property {function} onShippingAddressChange - Callback function that is called when the shipping address is changed.
 * @property {function} onShippingOptionChange - Callback function that is called when the shipping option is changed.
 * @property {function} onSuccess - Callback function that is called when the payment is successful.
 */
export interface ApplePayProps {
    elementId?: string | undefined;
    paymentRequest: ApplePayPaymentRequest;

    onReady?(data: ElementEventArgument): void;

    onCancel?(data: ElementEventArgument): void;

    onClick?(data: ApplePayClickEvent): void;

    onShippingOptionChange?(data: ApplePayShippingOptionChangeEvent): void;

    onShippingAddressChange?(data: ApplePayShippingAddressChangeEvent): void;

    onSuccess?(source: ElementSourceEventArgument): void;

    onError?(error: Error | any): void;
}

export interface ApplePayShippingOptionChangeEvent {
    shippingOption: PaymentRequestShippingOption;

    updateWith(data: UpdatePaymentRequest): void;
}

export interface ApplePayShippingAddressChangeEvent {
    shippingAddress: AddressEntry;

    updateWith(data: UpdatePaymentRequest): void;
}

export interface ApplePayClickEvent extends ElementEventArgument {
    updateWith(data: ApplePayPaymentRequest): void;
}

export interface ApplePayPaymentRequest extends PaymentRequest {
    style?: ApplePayStyle;
}

export interface ApplePayStyle {
    buttonType?: ApplePayButtonType | string;
    buttonColor?: ApplePayButtonColor | string;
    buttonLanguage?: string;
}

export enum ApplePayButtonColor {
    Dark = 'dark',
    Light = 'light',
    LightOutline = 'light-outline',
}

export enum ApplePayButtonType {
    Plain = 'plain',
    Buy = 'buy',
}

