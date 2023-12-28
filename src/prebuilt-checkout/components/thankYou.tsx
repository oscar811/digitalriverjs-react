import * as React from "react";
import {useEffect} from "react";
import {useDigitalRiverContext} from "../../digitalriver";
import type {DigitalRiverComponent} from "../../types";
import type {ComponentProps} from "./";
import {useComponentsContext} from "./";

const ELEMENT_TYPE = 'thankyou';
let thankYou: DigitalRiverComponent | null;

/**
 * `ThankYou` is a component for rendering the ThankYou component.
 * It uses the Digital River context to create and manage the ThankYou element.
 *
 * @component
 * @see https://docs.digitalriver.com/digital-river-api/integration-options/low-code-checkouts/implementing-a-components-checkout
 *
 * @param {ComponentProps} props - The properties that define the behavior of the ThankYou component.
 * @param {string} [props.elementId='dr-thank-you'] - The ID of the HTML element where the ThankYou component will be mounted. Defaults to 'dr-thank-you'.
 *
 * @returns {JSX.Element} A span element with the specified ID where the ThankYou component will be mounted.
 */
export const ThankYou = ({
                             elementId = "dr-thank-you",
                         }: ComponentProps): JSX.Element => {
    const drContext = useDigitalRiverContext();
    const componentsContext = useComponentsContext();

    /**
     * Function to render the ThankYou component.
     */
    const render = () => {
        const placeholder = document.getElementById(elementId);
        if (!thankYou && componentsContext.components) {
            thankYou = componentsContext.components.createComponent(ELEMENT_TYPE);
        }
        try {
            if (placeholder && thankYou) {
                placeholder.replaceChildren();
                thankYou.mount(elementId);
                drContext.setElement(ELEMENT_TYPE, thankYou);
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
     * Function to clear the ThankYou component.
     */
    const clear = () => {
        if (thankYou) {
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


