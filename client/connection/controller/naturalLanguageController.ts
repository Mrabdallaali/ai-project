import { Request, RequestHandler,  Response, NextFunction} from 'express';
import { ServerError } from '../types';

export const intakeNaturalLanguageQuery: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.body.naturalLanguageQuery) {
        const error: ServerError = {
            log: 'User natural language input does not exist',
            status: 400,
            message: { err: 'An error occurred while parsing user query'},
        };
        return next(error);
    }

    const { naturalLanguageQuery } = req.body;

    if ( typeof naturalLanguageQuery !== 'string' ) {
        const error: ServerError = {
            log: 'Given query is not a string',
            status: 400,
            message: { err: 'An error occurred while parsing user query'},
        };
        return next(error);
    }

    res.locals.naturalLanguageQuery = naturalLanguageQuery;
    return next();
}