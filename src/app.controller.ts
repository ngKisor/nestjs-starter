import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): any {
    return {
      health_check:'ok'
    }
  }
}
