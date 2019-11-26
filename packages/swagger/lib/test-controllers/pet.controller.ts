// import { Controller, Get, RequestBody } from '../decorators';
// import {
//   ApiConsumes,
//   ApiModelProperty,
//   ApiOkResponse,
//   ApiOperation,
//   ApiProduces,
//   ApiUseTags,
// } from '../decorators';
// export class Dto {
//   @ApiModelProperty({ description: '测试' })
//   str: string;
//
//   @ApiModelProperty()
//   num: string;
//
//   @ApiModelProperty()
//   id: number;
//
//   @ApiModelProperty()
//   date: Date;
// }
//
// @Controller()
// @ApiUseTags('宠物管理')
// export class PetController {
//   @Get('test')
//   @ApiOperation({
//     summary: 'test',
//     description: 'test method',
//   })
//   @ApiConsumes('application/json', 'application/xml')
//   @ApiProduces('application/json')
//   @ApiOkResponse({
//     type: Dto,
//     description: 'ok',
//   })
//   method(@RequestBody() body: Dto) {}
// }
