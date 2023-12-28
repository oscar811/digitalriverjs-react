import {mount} from 'cypress/react18'

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
    namespace Cypress {
        interface Chainable {
            mount: typeof mount
            getPaymentSession: (apiKey: string, secretKey: string, type?: string, country?: string, recurring?: string) => Promise<any>
            getCheckoutSession: (apiKey: string, secretKey: string, type?: string, country?: string, recurring?: string) => Promise<any>
        }
    }
}