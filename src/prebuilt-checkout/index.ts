import {StyleOption} from "../types";
import {ApplePayStyle, GooglePayStyle, PayPalStyle} from "../drjs/components";

export interface PrebuiltCheckoutConfiguration {
    options?: {
        expressCheckout?: string[],// array for listing express checkout. Values: applePay,payPal,googlePay
        language?: string;
        style?: {
            modal?: {
                logo?: string
                themeColor?: {
                    primary?: string;
                    highlight?: string;
                    headerBackground?: string;
                    mainBackground?: string;
                    orderSummaryBackground?: string;
                    linkTextColor?: string;
                    stepperBorder?: string;
                    footer?: {
                        background?: string;
                        linkText?: string;
                    }
                },
                borderRadius?: string;
                fontFamily?: string;
                fontVariant?: string;
                letterSpacing?: string;
            },
            textField?: {
                base?: {
                    color?: string;
                    fontFamily?: string;
                    fontSize?: string;
                    fontVariant?: string;
                    letterSpacing?: string;
                },
                borderRadius?: string;
            }
        }
    }
    paymentMethod?: {
        style?: StyleOption;
        creditCard?: {
            cardNumberPlaceholderText?: string;
            cardExpirationPlaceholderText?: string;
            cardCvvPlaceholderText?: string;
            style: StyleOption | any;
            mask: boolean;
        },
        onlineBanking?: {
            style?: StyleOption | any;
            placeholderText?: string;
        },
        googlePay?: {
            style?: GooglePayStyle | any;
        },
        applePay?: {
            style: ApplePayStyle | any;
        },
        payPal?: {
            style: PayPalStyle | any;
        },
        msts?: {
            enrollmentUrl?: string;
        },
        enabledPaymentMethods?: string[];
        disabledPaymentMethods?: string[];
    }


}