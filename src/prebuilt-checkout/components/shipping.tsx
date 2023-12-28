import * as React from "react";
import {useEffect} from "react";
import {useDigitalRiverContext} from "../../digitalriver";
import type {DigitalRiverComponent} from "../../types";
import type {ComponentProps} from "./";
import {useComponentsContext} from "./";

const ELEMENT_TYPE = 'shipping';
let shipping: DigitalRiverComponent | null;

/**
 * `Shipping` is a component for rendering the Shipping component.
 * It uses the Digital River context to create and manage the Shipping element.
 *
 * @component
 * @see https://docs.digitalriver.com/digital-river-api/integration-options/low-code-checkouts/implementing-a-components-checkout
 *
 * @param {ComponentProps} props - The properties that define the behavior of the Shipping component.
 * @param {string} [props.elementId='dr-shipping'] - The ID of the HTML element where the Shipping component will be mounted. Defaults to 'dr-shipping'.
 *
 * @returns {JSX.Element} A span element with the specified ID where the Shipping component will be mounted.
 */
export const Shipping = ({
                             elementId = "dr-shipping",
                         }: ComponentProps): JSX.Element => {
    const drContext = useDigitalRiverContext();
    const componentsContext = useComponentsContext();

    /**
     * Function to render the Shipping component.
     */
    const render = () => {
        const placeholder = document.getElementById(elementId);
        if (!shipping && componentsContext.components) {
            shipping = componentsContext.components.createComponent(ELEMENT_TYPE);
        }

        try {
            if (placeholder && shipping) {
                placeholder.replaceChildren();
                shipping.mount(elementId);
                drContext.setElement(ELEMENT_TYPE, shipping);
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
     * Function to clear the Shipping component.
     */
    const clear = () => {
        if (shipping) {
            const placeholder = document.getElementById(elementId);
            if (placeholder) {
                placeholder.replaceChildren();
            }
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


