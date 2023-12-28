import * as React from "react";
import {useEffect} from "react";
import {useDigitalRiverContext} from "../../digitalriver";
import type {DigitalRiverComponent} from "../../types";
import type {ComponentProps} from "./";
import {useComponentsContext} from "./";

const ELEMENT_TYPE = 'invoiceattribute';
let invoiceAttribute: DigitalRiverComponent | null;

/**
 * `InvoiceAttribute` is a component for rendering the InvoiceAttribute component.
 * It uses the Digital River context to create and manage the InvoiceAttribute element.
 *
 * @component
 * @see https://docs.digitalriver.com/digital-river-api/integration-options/low-code-checkouts/implementing-a-components-checkout
 *
 * @param {ComponentProps} props - The properties that define the behavior of the InvoiceAttribute component.
 * @param {string} [props.elementId='dr-invoice-attribute'] - The ID of the HTML element where the InvoiceAttribute component will be mounted. Defaults to 'dr-invoice-attribute'.
 *
 * @returns {JSX.Element} A span element with the specified ID where the InvoiceAttribute component will be mounted.
 */
export const InvoiceAttribute = ({
                                     elementId = "dr-invoice-attribute",
                                 }: ComponentProps): JSX.Element => {
    const drContext = useDigitalRiverContext();
    const componentsContext = useComponentsContext();

    /**
     * Function to render the InvoiceAttribute component.
     */
    const render = () => {
        const placeholder = document.getElementById(elementId);
        if (!invoiceAttribute && componentsContext.components) {
            invoiceAttribute = componentsContext.components.createComponent(ELEMENT_TYPE);
        }
        try {
            if (placeholder && invoiceAttribute) {
                placeholder.replaceChildren();
                invoiceAttribute.mount(elementId);
                drContext.setElement(ELEMENT_TYPE, invoiceAttribute);
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
     * Function to clear the InvoiceAttribute component.
     */
    const clear = () => {
        if (invoiceAttribute) {
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


