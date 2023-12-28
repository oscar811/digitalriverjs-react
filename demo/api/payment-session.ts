import {NextFunction, Request, Response} from 'express';

export const GET = async (req: Request, res: Response, next: NextFunction) => {
    const {type = 'digital', country = 'US', recurring = 'false', apiKey, secretKey} = req.query;
    const response = await fetch(`https://tools.drapi.io/cm/drop-in/drRequestPaymentSession.php?type=${type}&country=${country}&recurring=${recurring}&apiKey=${apiKey}&secretKey=${secretKey}`);
    const session = await response.json();
    res.setHeader('Content-Type', 'application/json');
    if (session.key && session.key !== 'undefined') {
        res.send(JSON.stringify(session));
    } else {
        res.status(400);
        res.send(JSON.stringify({error: session}));
    }
};