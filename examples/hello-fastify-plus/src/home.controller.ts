import { Controller, Get, RequestQuery, HttpRequest } from 'fastify-plus';
import { HomeService } from './home.service';
import { HomeIndexRequest, HomeIndexResponse } from './home.dto';

@Controller()
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  index(
    @RequestQuery() dto: HomeIndexRequest,
    request: HttpRequest,
  ): HomeIndexResponse {
    console.log(dto);
    return this.homeService.getIndex(dto);
  }
}
