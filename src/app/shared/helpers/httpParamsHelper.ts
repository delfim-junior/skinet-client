import {RequestParam} from '../models/request-param';
import {HttpParams} from '@angular/common/http';

export function httpParamsHelper(requestParam: RequestParam): HttpParams {
  return new HttpParams()
    .set('pageSize', requestParam.pageSize ? requestParam.pageSize.toString() : '')
    .set('pageIndex', requestParam.pageIndex ? requestParam.pageIndex.toString() : '')
    .set('brandId', requestParam.brandId ? requestParam.brandId.toString() : '')
    .set('typeId', requestParam.typeId ? requestParam.typeId.toString() : '')
    .set('sort', requestParam.sort ? requestParam.sort.toString() : '');
}
