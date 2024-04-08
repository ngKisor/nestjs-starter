import { Module } from '@nestjs/common';
import { EventService } from './events/event.service';

@Module({
    providers: [EventService],
    exports: [EventService]
})
export class ServicesModule { }
