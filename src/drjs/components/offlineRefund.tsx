import * as React from "react";
import {useEffect} from "react";
import {useDigitalRiverContext} from "../../digitalriver";
import {
    DigitalRiverElement,
    ElementClasses,
    ElementEventArgument,
    ElementOnChangeArgument,
    ElementOptions,
    StyleOption
} from "../../types";

const PAYMENT_METHOD_TYPE = 'offlinerefund';
let offlinerefund: DigitalRiverElement | null;

/**
 * `OfflineRefund` is a component for rendering the OfflineRefund input field.
 * It uses the Digital River context to create and manage the OfflineRefund element.
 *
 * @component
 * @see https://docs.digitalriver.com/digital-river-api/general-resources/reference/elements/offline-refund-elements
 *
 * @param {OfflineRefundProps} props - The properties that define the behavior of the OfflineRefund component.
 * @param {string} [props.elementId='dr-offline-refund'] - The ID of the HTML element where the OfflineRefund component will be mounted. Defaults to 'dr-offline-refund'.
 * @param {OfflineRefundOptions} props.offlineRefundOptions - The options for the OfflineRefund component.
 * @param {function} [props.onChange=()=>{}] - The function to be called when the OfflineRefund component changes. Defaults to an empty function.
 * @param {function} [props.onReady=()=>{}] - The function to be called when the OfflineRefund component is ready. Defaults to an empty function.
 *
 * @returns {JSX.Element} A span element with the specified ID where the OfflineRefund component will be mounted.
 */
export const OfflineRefund = ({
                                  elementId = "dr-offline-refund",
                                  offlineRefundOptions,
                                  onChange = () => {
                                  },
                                  onReady = () => {
                                  }
                              }: OfflineRefundProps): JSX.Element => {
    const drContext = useDigitalRiverContext();

    /**
     * Function to render the OfflineRefund component.
     */
    const render = () => {
        const placeholder = document.getElementById(elementId);
        if (!offlinerefund && drContext.digitalRiver && placeholder) {
            try {
                placeholder.replaceChildren();
                offlinerefund = drContext.digitalRiver.createElement(PAYMENT_METHOD_TYPE, offlineRefundOptions);
                offlinerefund.mount(elementId);
                offlinerefund.on('change', onChange);
                offlinerefund.on('ready', onReady);
                drContext.setElement(PAYMENT_METHOD_TYPE, offlinerefund);
            } catch (e) {
                console.error(e);
                drContext.clear();
                clear();
            }
        }
    }

    /**
     * Function to clear the OfflineRefund component.
     */
    const clear = () => {
        if (offlinerefund) {
            offlinerefund.destroy();
        }
        offlinerefund = null;
    }

    useEffect(() => {
        if (drContext.digitalRiver) {
            render();
        }
    }, [drContext.digitalRiver]);

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
 * @typedef OfflineRefundProps
 * @property {string} elementId - The ID of the HTML element where the OfflineRefund component will be mounted.
 * @property {OfflineRefundOptions} offlineRefundOptions - The options for the OfflineRefund component.
 * @property {function} onChange - The function to be called when the OfflineRefund component changes.
 * @property {function} onReady - The function to be called when the OfflineRefund component is ready.
 */
export interface OfflineRefundProps {
    elementId?: string;
    offlineRefundOptions: OfflineRefundOptions | any;

    onChange?(data: ElementOnChangeArgument): void;

    onReady?(data: ElementEventArgument): void;
}

/**
 * @typedef OfflineRefundOptions
 * @property {ElementClasses} classes - The classes for the OfflineRefund component.
 * @property {StyleOption} style - The style options for the OfflineRefund component.
 * @property {string} refundToken - The refund token for the OfflineRefund component.
 */
export interface OfflineRefundOptions extends ElementOptions {
    refundToken: string;
}



