import * as React from "react";
import {useEffect} from "react";
import {useDigitalRiverContext} from "../../digitalriver";
import type {DigitalRiverComponent} from "../../types";
import type {ComponentProps} from "./";
import {useComponentsContext} from "./";

const ELEMENT_TYPE = 'ordersummary';
let orderSummary: DigitalRiverComponent | null;

/**
 * `OrderSummary` is a component for rendering the OrderSummary component.
 * It uses the Digital River context to create and manage the OrderSummary element.
 *
 * @component
 * @see https://docs.digitalriver.com/digital-river-api/integration-options/low-code-checkouts/implementing-a-components-checkout
 *
 * @param {ComponentProps} props - The properties that define the behavior of the OrderSummary component.
 * @param {string} [props.elementId='dr-order-summary'] - The ID of the HTML element where the OrderSummary component will be mounted. Defaults to 'dr-order-summary'.
 *
 * @returns {JSX.Element} A span element with the specified ID where the OrderSummary component will be mounted.
 */
export const OrderSummary = ({
                                 elementId = "dr-order-summary",
                             }: ComponentProps): JSX.Element => {
    const drContext = useDigitalRiverContext();
    const componentsContext = useComponentsContext();

    /**
     * Function to render the OrderSummary component.
     */
    const render = () => {
        const placeholder = document.getElementById(elementId);
        if (!orderSummary && componentsContext.components) {
            orderSummary = componentsContext.components.createComponent(ELEMENT_TYPE);
        }

        try {
            if (placeholder && orderSummary) {
                placeholder.replaceChildren();
                orderSummary.mount(elementId);
                drContext.setElement(ELEMENT_TYPE, orderSummary);
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
     * Function to clear the OrderSummary component.
     */
    const clear = () => {
        if (orderSummary) {
            const placeholder = document.getElementById(elementId);
            if (placeholder) {
                placeholder.replaceChildren();
            }
            //orderSummary = null;
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


