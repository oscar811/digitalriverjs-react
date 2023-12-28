import {NextFunction, Request, Response} from 'express';
import demoConfigJson from "../../configuration/demo.config.json";

interface Query {
    type?: string;
    country?: string;
    currency?: string;
    apiKey?: string;
    secretApiKey?: string;
}

export const GET = async (req: Request, res: Response, next: NextFunction) => {

    const {
        type = 'digital',
        country = 'us',
        currency = 'USD',
        apiKey = demoConfigJson.publicApiKey,
        secretApiKey = demoConfigJson.secretApiKey
    } = req.query as Query;

    const checkoutSessionRequest: any = {
        "currency": currency,
        "items": [],
    };

    const sku = await fetch('https://api.digitalriver.com/skus', {
        headers: {
            'Authorization': 'Bearer ' + secretApiKey,
            'Content-Type': 'application/json',
        }
    });
    const skuData = await sku.json();

    let physical = false;
    let shipFrom;
    if (!demoConfigJson.defaultAddress.shipTo.hasOwnProperty(country)) {
        shipFrom = demoConfigJson.defaultAddress.shipTo['us'];
    } else {
        // @ts-ignore
        shipFrom = demoConfigJson.defaultAddress.shipTo[country];
    }
    if (type === 'physical') {
        physical = true;
        if (shipFrom) {
            checkoutSessionRequest["shipFrom"] = shipFrom;
        }
        checkoutSessionRequest["options"] = {
            "shippingMethods": [
                {
                    "amount": 5,
                    "description": "Standard",
                    "serviceLevel": "SG"
                },
                {
                    "amount": 15,
                    "description": "Express",
                    "serviceLevel": "EX"
                }
            ]
        }
    }
    const skuItem = skuData.data.find((sku: any) => {
        return sku.physical === physical;
    });
    if (skuItem) {
        checkoutSessionRequest.items.push({
            "skuId": skuItem.id,
            "quantity": 1,
            "price": 99,
        });
    }

    const checkoutSession = await fetch('https://api.digitalriver.com/drop-in/checkout-sessions', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + secretApiKey,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkoutSessionRequest),
    });
    const checkoutSessionData = await checkoutSession.json();
    console.log('checkoutSessionRequest', checkoutSessionRequest, 'checkoutSessionData', checkoutSessionData);

    res.setHeader('Content-Type', 'application/json');
    if (checkoutSessionData) {
        res.send(JSON.stringify(checkoutSessionData));
    } else {
        res.status(400);
        res.send(JSON.stringify({error: checkoutSessionData}));
    }
};