/// <reference types="cypress-iframe" />

import {mount} from 'cypress/react18';
import {Compliance} from './compliance.tsx';
import demoConfigJson from "../../../configuration/demo.config.json";
import {DigitalRiverContainer} from "../../digitalriver";
import {AddressEntry} from "../../types";

const billingAddress = demoConfigJson.defaultAddress.billTo['us'] as AddressEntry;

describe('Compliance Component', () => {
    it('renders Compliance with default props', () => {
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"en-US"}>
                <Compliance/>
            </DigitalRiverContainer>
        );
        cy.get('#dr-compliance>div[id^="compliance-"]', {timeout: 10000}).should('exist');
    });

    it('renders Compliance with custom elementId', () => {
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"en-US"}>
                <Compliance elementId="custom-id"/>
            </DigitalRiverContainer>
        );
        cy.get('#custom-id', {timeout: 10000}).should('exist');
    });

});