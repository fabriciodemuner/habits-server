import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
/*
When we use expose() and do not provide a value for the corresponding field ,undefined is asssined by default
This PipeDto is used to prevent inserting undefined fields to database
*/
@Injectable()
export class DtoPipe implements PipeTransform {
    transform(value: any, _metadata: ArgumentMetadata) {
        if (value instanceof Object) {
            Object.keys(value).forEach(key => value[key] === undefined && delete value[key]);
            return value;
        } else {
            return value;
        }
    }
}
