/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CouponsService {

    /**
     * Создать Купон
     * @param couponNumber 
     * @param isUsed 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static createCouponPost(
couponNumber: string,
isUsed: boolean = false,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/Create_coupon',
            query: {
                'coupon_number': couponNumber,
                'is_used': isUsed,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Получить Все Купоны
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getCouponsGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/Get_coupons',
        });
    }

}
