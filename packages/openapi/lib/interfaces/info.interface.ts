/**
 * @see {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#contactObject}
 */
export type Contact = {
  name?: string;
  url?: string;
  email?: string;
};

/**
 * @see {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#licenseObject}
 */
export type License = {
  name: string;
  url?: string;
};

/**
 * @see {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#infoObject}
 */
export type Info = {
  title: string;
  description?: string;
  termsOfService?: string;
  contact?: Contact;
  license?: License;
  version: string;
};
