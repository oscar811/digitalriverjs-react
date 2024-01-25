/// <reference types="cypress-iframe" />
/// <reference types="../../cypress/cypress" />

import {mount} from "cypress/react18";
import {DigitalRiverContainer} from "./digitalRiverContainer";
import React from "react";
import demoConfigJson from "../../configuration/demo.config.json";

describe('DigitalRiverContainer Component', () => {

    it('initializes DigitalRiverCheckout library', () => {
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} enableDigitalRiverCheckout={true}/>
        );
        cy.window().its('DigitalRiverCheckout').should('exist');
    })

    it('initializes DigitalRiver library', () => {
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} enableDigitalRiver={true}/>
        );
        cy.window().its('DigitalRiver').should('exist')
    })

    it('initializes Dynamic Pricing library', () => {
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} enableDynamicPricing={true}>
                <span id="DR-currencySelector" />
            </DigitalRiverContainer>
        );
        cy.window().its('DynamicPricing').should('exist')
    })

})