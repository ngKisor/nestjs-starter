
import { Injectable } from '@nestjs/common';
import { Subject, Observable } from 'rxjs';
import { AppEventTypes } from 'src/common/enums/event.enums';

@Injectable()
export class EventService {
  private subjects: { [key in AppEventTypes]?: Subject<any> } = {};

  publish(topicName: AppEventTypes, msg?: any) {
    if (!this.subjects[topicName]) {
      this.subjects[topicName] = new Subject();
    }
    this.subjects[topicName]?.next(msg);
  }

  subscribe(topicName: AppEventTypes): Observable<any> {
    if (!this.subjects[topicName]) {
      this.subjects[topicName] = new Subject();
    }
    return this.subjects[topicName].asObservable();
  }

  unsubscribe(topicName: AppEventTypes) {
    if (this.subjects[topicName]) {
      this.subjects[topicName].unsubscribe();
      delete this.subjects[topicName];
    }
  }
}
