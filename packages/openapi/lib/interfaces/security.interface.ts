/**
 * @see {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#oauthFlowObject}
 */
export type OAuthFlow = {
  authorizationUrl: string;
  tokenUrl: string;
  refreshUrl?: string;
  scopes: Record<string, string>;
};

/**
 * @see {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#oauthFlowsObject}
 */
export type OAuthFlows = {
  implicit?: Omit<OAuthFlow, 'tokenUrl'>;
  password?: Omit<OAuthFlow, 'authorizationCode'>;
  clientCredentials?: Omit<OAuthFlow, 'authorizationCode'>;
  authorizationCode?: OAuthFlow;
};

/**
 * @see {@link https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#securitySchemeObject}
 */
export type SecuritySchema = (
  | {
      type: 'apiKey';
      name: string;
      in: 'query' | 'header' | 'cookie';
    }
  | {
      type: 'http';
      scheme: string;
      bearerFormat?: string;
    }
  | {
      type: 'oauth2';
      flows: OAuthFlows;
    }
  | {
      type: 'openIdConnect';
      openIdConnectUrl: string;
    }
) & {
  description?: string;
};

export type SecurityRequirement = Record<string, string[]>;
