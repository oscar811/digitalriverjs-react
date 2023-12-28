import * as React from "react";
import {useEffect} from "react";
import {useDigitalRiverContext} from "../../digitalriver";
import type {DigitalRiverComponent} from "../../types";
import type {ComponentProps} from "./";
import {useComponentsContext} from "./";

const ELEMENT_TYPE = 'compliance';
let compliance: DigitalRiverComponent | null;

/**
 * `Compliance` is a component for rendering the Compliance component.
 * It uses the Digital River context to create and manage the Compliance element.
 *
 * @component
 * @see https://docs.digitalriver.com/digital-river-api/general-resources/reference/elements/compliance-element
 *
 * @param {ComponentProps} props - The properties that define the behavior of the Compliance component.
 * @param {string} [props.elementId='dr-compliance'] - The ID of the HTML element where the Compliance component will be mounted. Defaults to 'dr-compliance'.
 *
 * @returns {JSX.Element} A span element with the specified ID where the Compliance component will be mounted.
 */
export const Compliance = ({
                               elementId = "dr-compliance",
                           }: ComponentProps): JSX.Element => {
    const drContext = useDigitalRiverContext();
    const componentsContext = useComponentsContext();

    /**
     * Function to render the Compliance component.
     */
    const render = () => {
        const placeholder = document.getElementById(elementId);
        if (!compliance && componentsContext.components) {
            compliance = componentsContext.components.createComponent(ELEMENT_TYPE);
        }
        try {
            if (placeholder && compliance) {
                placeholder.replaceChildren();
                compliance.mount(elementId);
                drContext.setElement(ELEMENT_TYPE, compliance);
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
     * Function to clear the Compliance component.
     */
    const clear = () => {
        if (compliance) {
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


