import { Info } from './info.interface';
import { Server } from './server.interface';
import { Paths } from './path.interface';
import { Components } from './component.interface';
import { SecurityRequirement } from './security.interface';
import { Tag } from './tag.interface';
import { ExternalDocument } from './external-document.interface';

export type OpenApi = {
  openapi: string;
  info: Info;
  servers?: Server[];
  paths: Paths;
  components?: Components;
  security?: SecurityRequirement[];
  tags?: Tag[];
  externalDocs?: ExternalDocument;
};
