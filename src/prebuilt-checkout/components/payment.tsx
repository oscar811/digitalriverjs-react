import * as React from "react";
import {useEffect} from "react";
import {useDigitalRiverContext} from "../../digitalriver";
import type {DigitalRiverComponent} from "../../types";
import type {ComponentProps} from "./";
import {useComponentsContext} from "./";

const ELEMENT_TYPE = 'payment';
let payment: DigitalRiverComponent | null;

/**
 * `Payment` is a component for rendering the Payment component.
 * It uses the Digital River context to create and manage the Payment element.
 *
 * @component
 * @see https://docs.digitalriver.com/digital-river-api/integration-options/low-code-checkouts/implementing-a-components-checkout
 *
 * @param {ComponentProps} props - The properties that define the behavior of the Payment component.
 * @param {string} [props.elementId='dr-payment'] - The ID of the HTML element where the Payment component will be mounted. Defaults to 'dr-payment'.
 *
 * @returns {JSX.Element} A span element with the specified ID where the Payment component will be mounted.
 */
export const Payment = ({
                            elementId = "dr-payment",
                        }: ComponentProps): JSX.Element => {
    const drContext = useDigitalRiverContext();
    const componentsContext = useComponentsContext();

    /**
     * Function to render the Payment component.
     */
    const render = () => {
        const placeholder = document.getElementById(elementId);
        if (!payment && componentsContext.components) {
            payment = componentsContext.components.createComponent(ELEMENT_TYPE);
        }
        try {
            if (placeholder && payment) {
                placeholder.replaceChildren();
                payment.mount(elementId);
                drContext.setElement(ELEMENT_TYPE, payment);
            }
        } catch (e) {
            console.error(e);
            drContext.clear();
        }
    }

    useEffect(() => {
        if (drContext.digitalRiver && componentsContext.components) {
            render();
        }
    }, [drContext.digitalRiver, componentsContext.components]);

    /**
     * Function to clear the Payment component.
     */
    const clear = () => {
        if (payment) {
            const placeholder = document.getElementById(elementId);
            if (placeholder) {
                placeholder.replaceChildren();
            }
            //payment = null;
        }
    }

    useEffect(() => {
        return () => {
            clear();
        }
    }, []);

    return (
        <span id={elementId}/>
    );
}


