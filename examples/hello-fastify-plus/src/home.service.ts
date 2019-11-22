import { Injectable } from 'fastify-plus';
import { HomeIndexRequest, HomeIndexResponse } from './home.dto';

@Injectable()
export class HomeService {
  getIndex(dto: HomeIndexRequest): HomeIndexResponse {
    return {
      name: `hello ${dto.id}, welcome to fastify plus`,
    };
  }
}
