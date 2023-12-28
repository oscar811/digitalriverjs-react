import * as React from "react";
import {useEffect} from "react";
import {useDigitalRiverContext} from "../../digitalriver";
import type {DigitalRiverComponent} from "../../types";
import type {ComponentProps} from "./";
import {useComponentsContext} from "./";

const ELEMENT_TYPE = 'taxexemption';
let taxExemption: DigitalRiverComponent | null;

/**
 * `TaxExemption` is a component for rendering the TaxExemption component.
 * It uses the Digital River context to create and manage the TaxExemption element.
 *
 * @component
 * @see https://docs.digitalriver.com/digital-river-api/integration-options/low-code-checkouts/implementing-a-components-checkout
 *
 * @param {ComponentProps} props - The properties that define the behavior of the TaxExemption component.
 * @param {string} [props.elementId='dr-tax-identifier'] - The ID of the HTML element where the TaxExemption component will be mounted. Defaults to 'dr-tax-identifier'.
 *
 * @returns {JSX.Element} A span element with the specified ID where the TaxExemption component will be mounted.
 */
export const TaxExemption = ({
                                 elementId = "dr-tax-exemption",
                             }: ComponentProps): JSX.Element => {
    const drContext = useDigitalRiverContext();
    const componentsContext = useComponentsContext();

    /**
     * Function to render the TaxExemption component.
     */
    const render = () => {
        const placeholder = document.getElementById(elementId);
        if (!taxExemption && componentsContext.components) {
            taxExemption = componentsContext.components.createComponent(ELEMENT_TYPE);
        }

        try {
            if (placeholder && taxExemption) {
                placeholder.replaceChildren();
                taxExemption.mount(elementId);
                drContext.setElement(ELEMENT_TYPE, taxExemption);
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
     * Function to clear the TaxExemption component.
     */
    const clear = () => {
        if (taxExemption) {
            const placeholder = document.getElementById(elementId);
            if (placeholder) {
                placeholder.replaceChildren();
            }
            taxExemption = null;
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


