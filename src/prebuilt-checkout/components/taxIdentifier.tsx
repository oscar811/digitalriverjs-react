import * as React from "react";
import {useEffect} from "react";
import {useDigitalRiverContext} from "../../digitalriver";
import type {DigitalRiverComponent} from "../../types";
import type {ComponentProps} from "./";
import {useComponentsContext} from "./";

const ELEMENT_TYPE = 'taxidentifier';
let taxIdentifier: DigitalRiverComponent | null;

/**
 * `TaxIdentifier` is a component for rendering the TaxIdentifier component.
 * It uses the Digital River context to create and manage the TaxIdentifier element.
 *
 * @component
 * @see https://docs.digitalriver.com/digital-river-api/integration-options/low-code-checkouts/implementing-a-components-checkout
 *
 * @param {ComponentProps} props - The properties that define the behavior of the TaxIdentifier component.
 * @param {string} [props.elementId='dr-tax-identifier'] - The ID of the HTML element where the TaxIdentifier component will be mounted. Defaults to 'dr-tax-identifier'.
 *
 * @returns {JSX.Element} A span element with the specified ID where the TaxIdentifier component will be mounted.
 */
export const TaxIdentifier = ({
                                  elementId = "dr-tax-identifier",
                              }: ComponentProps): JSX.Element => {
    const drContext = useDigitalRiverContext();
    const componentsContext = useComponentsContext();

    /**
     * Function to render the TaxIdentifier component.
     */
    const render = () => {
        const placeholder = document.getElementById(elementId);
        if (!taxIdentifier && componentsContext.components) {
            taxIdentifier = componentsContext.components.createComponent(ELEMENT_TYPE);
        }

        try {
            if (placeholder && taxIdentifier) {
                placeholder.replaceChildren();
                taxIdentifier.mount(elementId);
                drContext.setElement(ELEMENT_TYPE, taxIdentifier);
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
     * Function to clear the TaxIdentifier component.
     */
    const clear = () => {
        if (taxIdentifier) {
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


