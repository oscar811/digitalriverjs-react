import {DropInOptions} from "../dropin";
import React from "react";
import {ComponentConfiguration} from "../prebuilt-checkout/components";

export interface DigitalRiver {
    new(APIKey: string, options?: any): DigitalRiverObject;
}

/**
 * Interface for the DigitalRiverObject.
 * @interface
 */
export interface DigitalRiverObject {
    createSource: {
        apply(digitalRiver: DigitalRiverObject, sourceArgs: any[]): PaymentSourceData;
    }

    retrieveSource(sourceId: string, clientSecret: string): Promise<PaymentSource>;

    createElement(type: string, options?: any): DigitalRiverElement | DigitalRiverButtonElement;

    createDropin(dropInOptions: DropInOptions): DigitalRiverElement;

    authenticateSource(data: AuthenticateSourceData): AuthenticateSourceResponse;

    authenticateSource(element: DigitalRiverElement, data: AuthenticateSourceData): AuthenticateSourceResponse;

    updateSource(source: PaymentSource): PaymentSourceData;

    updateSource(element: DigitalRiverElement, source: PaymentSource): PaymentSourceData;

    paymentRequest(paymentRequest: PaymentRequest): PaymentRequest;

    components(configuration: ComponentConfiguration): DigitalRiverComponentObject;

    // handleNextAction()
    // retrieveOnlineBankingBanks()
    // retrieveAvailablePaymentMethods()
    // createSource()
    // createStoredPaymentSource()
}

export interface AuthenticateSourceData {
    sessionId: string;
    sourceId: string;
    sourceClientSecret: string;
    returnUrl: string;
}

export interface AuthenticateSourceResponse {
    status: string;
}

export interface PaymentRequest {
    sessionId?: string;
    country?: string;
    currency?: string;
    total?: {
        label: string;
        amount: number;
        isPending?: boolean;
    };
    displayItems?: PaymentRequestDisplayItem[];
    shippingOptions?: PaymentRequestShippingOption[];
    style?: any;
    waitOnClick?: boolean;
    requestShipping?: boolean;
}

export interface UpdatePaymentRequest {
    status: UpdatePaymentRequestStatus;
    total?: {
        label: string;
        amount: number;
        isPending?: boolean;
    };
    displayItems?: PaymentRequestDisplayItem[];
    shippingOptions?: PaymentRequestShippingOption[];
    error?: {
        message: string;
    }
}

export enum UpdatePaymentRequestStatus {
    Success = 'success',
    Failure = 'failure'
}

export interface DigitalRiverElement {
    mount(elementId: string | undefined): void;

    on(event: string, callback: ElementEventFunction): void;

    unmount(): void;

    destroy(): void;
}

export interface DigitalRiverButtonElement extends DigitalRiverElement {
    show(): void;

    update(paymentRequest: any): void;

    canMakePayment(): boolean;
}

export interface ElementEventArgument {
    elementType: string;
}

export interface ElementOptions {
    classes?: ElementClasses;
    style?: StyleOption;
}

export interface ElementOnChangeArgument extends ElementEventArgument {
    complete: boolean;
    empty: boolean;
    error: ErrorResponse;
}


export interface ElementSourceEventArgument extends PaymentSourceData {
    elementType: string;
    billingAddress?: AddressEntry;
    shippingAddress?: AddressEntry;
    contactInformation?: {
        name: string;
        phone: string;
        email: string;
    }

    complete(status: ElementSourceEventResponseStatus | string): void;
}

export enum ElementSourceEventResponseStatus {
    Success = 'success',
    Error = 'error'
}


export type ElementEventFunction = (data: Event | any) => void;

export interface DigitalRiverCheckout {
    new(APIKey: string): DigitalRiverCheckoutObject;
}

export interface DigitalRiverCheckoutObject {
    createCheckoutSessionWithUpstreamToken(upstreamToken: string): Promise<CheckoutSessionLink>;

    createModal(checkoutSessionId: string, config?: any): Promise<void>;

    renderButton(elementId: string, DigitalRiverCheckoutButtonOptions?: any): void;
}


export interface DigitalRiverComponentObject {
    createComponent(type: string): DigitalRiverComponent;
}

export interface DigitalRiverComponent {
    mount(elementId: string | undefined): void;

    destroy(): void;

    done(): Promise<void>;
}

export interface DynamicPricingObject {

}

export type ElementsMap = {
    [key: string]: DigitalRiverElement | DigitalRiverComponent
}

export type DigitalRiverContext = {
    publicApiKey: string | null;
    digitalRiver: DigitalRiverObject;
    digitalRiverCheckout: DigitalRiverCheckoutObject;
    dynamicPricing: DynamicPricingObject;
    setElement(name: string, element: DigitalRiverElement | DigitalRiverComponent): void;
    removeElement(name: string): void;
    elements: ElementsMap;
    clear(): void;
    guid: string;
}

export interface PaymentComponentProps {
    sessionId?: string;
    billingAddress?: AddressEntry;
    returnUrl?: string,
    cancelUrl?: string,
    currency?: string,
    country?: string,
    amount?: number,
    children?: React.ReactElement | React.ReactElement[];
}

export type PaymentComponentContext = {
    sessionId: string;
    billingAddress: AddressEntry;
    createSource(payment: string, sourceData?: any): Promise<PaymentSourceData>;
    country: string;
    currency: string;
    amount: number;
    returnUrl: string;
    cancelUrl: string;
}

export interface PaymentElement {

}

export interface ElementProps {
    elementId?: string;
    options?: {
        classes?: ElementClasses | any
        style?: StyleOption | any
    };

    onChange?(): void;
}

export interface PaymentRequestDisplayItem {
    label: string;
    amount: number;
}

export interface PaymentRequestShippingOption {
    id: string;
    label: string;
    amount: number;
    detail: string;
    selected?: boolean;
}

export interface DigitalRiverProps {
    publicApiKey: string | null | undefined;
    locale?: string;
    defaultCountry?: string | null | undefined;
    enableDigitalRiver?: boolean;
    enableDigitalRiverCheckout?: boolean;
    enableDynamicPricing?: boolean;
    currencySelectorElementId?: string;
    children?: React.ReactElement | React.ReactElement[];

    // sessionId?: string;
    // billingAddress?: BillingAddress;
    // sourceData?: PaymentSourceData;
    // refreshSource?: boolean;
    //
    // returnSource?(source: PaymentSourceData): Promise<PaymentSourceData> | Promise<null>;
    //

}

export interface ElementClasses {
    base?: string;
    complete?: string;
    empty?: string;
    focus?: string;
    invalid?: string;
}

export interface StyleOption {
    base?: {
        color?: string,
        height?: string,
        fontSize?: string,
        fontFamily?: string,
        ":hover"?: {
            color?: string,
        },
        "::placeholder"?: {
            color?: string
        },
        ":-webkit-autofill"?: {
            color?: string
        },
        ":focus"?: {
            color?: string
        }
    },
    focus?: {
        ":hover"?: {
            color?: string,
        }
    },
    invalid?: {
        color?: string,
        ":hover"?: {
            color?: string,
        },
        ":-webkit-autofill"?: {
            color?: string
        }
    },
    complete?: {
        color?: string,
        ":hover"?: {
            color?: string,
        },
        ":-webkit-autofill"?: {
            color?: string
        }
    },
    empty?: {
        color?: string,
        ":hover"?: {
            color?: string,
        },
        ":-webkit-autofill"?: {
            color?: string
        }
    },
}

export interface AddressEntry {
    firstName: string;
    lastName: string;
    email: string;
    organization?: string;
    phoneNumber: string;
    address: {
        line1: string;
        line2?: string;
        city?: string;
        state?: string;
        postalCode?: string;
        country: string;
    },
    additionalAddressInfo?: {
        phoneticFirstName?: string;
        phoneticLastName?: string;
        neighborhood?: string;
        division?: string;
        phoneticName?: string;
        title?: string;
    }
}

export interface PaymentSourceData {
    source: PaymentSource | null;
    error: ErrorResponse | null;
}

export interface ErrorResponse {
    type: string;
    errors: ErrorMessage[];
}

export interface ErrorMessage {
    code: string;
    message: string;
    parameter?: string;
}

export interface PaymentSource {
    id: string;
    clientSecret: string;
    clientId?: string;
    channelId?: string;
    type?: string;
    owner: {
        firstName: string;
        lastName: string;
        email: string;
        customerId?: string;
        upstreamId?: string;
        address: {
            line1: string;
            line2: string;
            city: string;
            state: string;
            country: string;
            postalCode: string;
        }
    },
    amount?: number;
    currency?: string;
    status?: string;
    creationIp?: string;
    creationDate?: string;
    language?: string;
    flow?: string;

    [type: string]: any;
}

export interface CheckoutSession {
    id?: string;
    upstreamId?: string;
    currency?: string;
    checkoutId?: string;
    customerId?: string;
    language?: string;
    email?: string;
    fingerprint?: string;
    taxInclusive?: boolean;
    items: CheckoutSessionItem[];
    shipTo?: AddressEntry;
    billTo?: AddressEntry;
    shipFrom?: AddressEntry;
    discount?: {
        amountOff?: number;
        percentOff?: number;
    }
    consents?: {
        emailPromotionsOptIn?: boolean;
    }
    billingAddressOnlySchema?: string;
    billingAddressSchema?: string;
    shippingAddressSchema?: string;
    browserIp?: string;
    locale?: string;
    customerType?: string;
    chargeType?: string;
    requiresShipping?: boolean;
    showTaxIdentifiers?: boolean;
    showInvoiceAttribute?: boolean;

    taxIdentifiers?: TaxIdentifierItem[];
    disclosures?: {}
    shippingChoice?: {
        amount: number;
        description: string;
        id: string;
        serviceLevel: string;
        taxAmount: number;
    };
    options: {
        consents?: any;
        customFields?: CustomField[];
        shippingMethods?: ShippingMethod[];
        customOptions?: {
            allowBusinessPurchases?: boolean;
        }
        paymentMethods?: PaymentMethod[];
        policies?: {
            refund?: {
                url?: string;
            }
            return?: {
                url?: string;
            }
        }
    };
    payment?: {
        session: {
            amountContributed: number;
            amountRemainingToBeContributed: number;
            clientSecret: string;
            id: string;
            state: string;
        }
    };
    redirects?: {
        cancelUrl?: string;
        successUrl?: string;
    };
    sellingEntity?: {
        id?: string;
        name?: string;
    };
    subtotal?: number;

    totalAmount?: number;
    totalDiscount?: number;
    totalDuty?: number;
    totalFees?: number;
    totalImporterTax?: number;
    totalShipping?: number;
    totalTax?: number;
    updatedTime?: string;

    metadata?: {
        [type: string]: string;
    };
}

export interface PaymentMethod {
    type: string;
}

export interface ShippingMethod {
    id: string;
    amount: number;
    description: string;
    serviceLevel: string;
}

export interface CustomField {
    key: string;
    label: string;
    required?: boolean;
    type?: string;
}

export interface CheckoutSessionItem {
    id: string;
    amount: number;
    duties: any;
    fees: {
        amount: number;
        taxAmount: number;
    };
    importerTax: any;
    quantity: number;
    sku: {
        id: string;
        name: string;
        eccn: string;
        taxCode: string;
        image: string;
        physical: boolean;
        weight: number;
        weightUnit: string;
    };
    tax: {
        amount: number;
    }
}

export interface TaxIdentifierItem {
    id: string;
}

export interface CheckoutSessionLink {
    error?: ErrorResponse;
    id: string;
    fingerprint?: string;
    link: string;
}