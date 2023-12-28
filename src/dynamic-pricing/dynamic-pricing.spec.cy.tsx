/// <reference types="../../cypress/cypress" />

import {mount} from 'cypress/react18';
import demoConfigJson from "../../configuration/demo.config.json";
import {DigitalRiverContainer} from "../digitalriver";
import React from "react";

describe('Dynamic Pricing Component', () => {
    beforeEach(() => {

    })

    it('renders DynamicPricing with default props', () => {
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} enableDynamicPricing={true}>
                <span id="DR-currencySelector"/>
            </DigitalRiverContainer>
        );
        cy.get('#DR-currency-selector').should('exist');
    })

    it('renders DynamicPricing with custom elementId', () => {
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} enableDynamicPricing={true}
                                   currencySelectorElementId={"custom-id"}>
                <span id="custom-id"/>
            </DigitalRiverContainer>
        );
        cy.get('#DR-currency-selector').should('exist');
    });

})