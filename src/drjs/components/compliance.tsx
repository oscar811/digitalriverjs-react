import * as React from "react";
import {useEffect} from "react";
import {useDigitalRiverContext} from "../../digitalriver";
import type {DigitalRiverElement, ElementClasses} from "../../types";

const PAYMENT_METHOD_TYPE = 'compliance';

/**
 * `Compliance` is a component for rendering the Compliance component.
 * It provides a method to create a source for the payment.
 *
 * @component
 * @see https://docs.digitalriver.com/digital-river-api/general-resources/reference/elements/compliance-elements
 *
 * @param {ComplianceProps} props - The properties that define the behavior of the Compliance component.
 * @param {string} [props.elementId='dr-compliance'] - The ID of the HTML element where the Compliance component will be mounted.
 * @param {ComplianceOptions} [props.complianceOptions] - The options for the Compliance component.
 *
 * @returns {JSX.Element} A span element with the specified ID.
 */
export const Compliance = ({
                               elementId = "dr-compliance",
                               complianceOptions
                           }: ComplianceProps): JSX.Element => {
    const drContext = useDigitalRiverContext();
    let compliance: DigitalRiverElement | null;

    /**
     * Function to render the Compliance component.
     */
    const render = () => {
        const placeholder = document.getElementById(elementId);
        if (drContext.digitalRiver && placeholder) {
            try {
                placeholder.replaceChildren();
                compliance = drContext.digitalRiver.createElement(PAYMENT_METHOD_TYPE, complianceOptions);
                compliance.mount(elementId);
                drContext.setElement(PAYMENT_METHOD_TYPE, compliance);
            } catch (e) {
                console.error(e);
                drContext.clear();
                clear();
            }
        }
    }

    /**
     * Function to clear the Compliance component.
     */
    const clear = () => {
        if (compliance) {
            compliance.destroy();
        }
        compliance = null;
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
 * @typedef ComplianceProps
 * @property {string} elementId - The ID of the HTML element where the Compliance component will be mounted.
 * @property {ComplianceOptions} complianceOptions - The options for the Compliance component.
 */
export interface ComplianceProps {
    elementId?: string;
    complianceOptions?: ComplianceOptions | any;
}

/**
 * @typedef ComplianceOptions
 * @property {ElementClasses} classes - The classes for the Compliance component.
 * @property {Object} compliance - The compliance options for the Compliance component.
 */
export interface ComplianceOptions {
    classes?: ElementClasses;
    compliance?: {
        businessEntityCode?: string;
        locale?: string;
        country?: string;
        language?: string;
        jpCommerceLawPageUrl?: string;
    }
}

