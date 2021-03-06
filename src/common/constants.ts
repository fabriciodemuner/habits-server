export const defaultPagination = {
    limit: 50,
    offset: 0,
};

export enum Role {
    super_admin = 'super_admin',
    regular_user = 'regular_user',
}

export const PROD = process.env.NODE_ENV === 'production';
