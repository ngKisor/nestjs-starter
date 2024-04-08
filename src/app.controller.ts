import { Controller, Get } from '@nestjs/common';

import { EventService } from './shared/services/events/event.service';
import { AppEventTypes } from './common/enums/event.enums';

@Controller()
export class AppController {
  constructor(private readonly eventService: EventService) { 

  }

  @Get()
  getHello(): any {
    this.eventService.publish(AppEventTypes.TEST_EVENT, { test: 'test data' });

    // Subscribe to a message
    this.eventService.subscribe(AppEventTypes.TEST_EVENT)
      .subscribe((msg) => {
        console.log('Received message:', msg);
      });

    // Unsubscribe from a message (if needed)
    // this.eventService.unsubscribe(AppEventTypes.TEST_EVENT);
    return 'ok!'
  }
}
