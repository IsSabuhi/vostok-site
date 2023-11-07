/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ParticipantsSchema } from '../models/ParticipantsSchema';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ParticipantsService {

    /**
     * Add Participants
     * @param requestBody 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static addParticipantsRegistrationPost(
requestBody: ParticipantsSchema,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/registration',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Получить Всех Участников
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getParticipantsGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Get_participants',
        });
    }

}
