import { DefaultNamingStrategy } from 'typeorm';

export function snakeCase(str: string) {
    return str.replace(/(?:([a-z])([A-Z]))|(?:((?!^)[A-Z])([a-z]))/g, '$1_$3$2$4').toLowerCase();
}

/*
 * Use underscores for column names in Postgres,
 * instead of the default behavior of camelCase.
 *
 * For more info, see the typeorm source code.
 * src/naming-strategy/DefaultNamingStrategy.ts
 */
export class OrmNamingStrategy extends DefaultNamingStrategy {
    columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {
        const name = customName ? customName : propertyName;
        if (embeddedPrefixes.length) {
            // Handle "Embedded Entities"
            // https://typeorm.io/#/embedded-entities
            const compositeName = embeddedPrefixes.concat(name).join('_');
            return snakeCase(compositeName);
        }
        return snakeCase(name);
    }

    joinColumnName(relationName: string, referencedColumnName: string): string {
        return snakeCase(relationName + '_' + referencedColumnName);
    }

    joinTableColumnName(tableName: string, propertyName: string, columnName?: string): string {
        return snakeCase(tableName + '_' + (columnName ? columnName : propertyName));
    }
}
