import { Controller, Get, Post } from '@nestjs/common';
import * as fs from 'fs';
import { Lock } from './common/utils/lock.util';

@Controller()
export class AppController {
  constructor() {
    // this.testLockUtil()
  }

  counter: number = 1000;

  // testLockUtil() {

  //   const lock = new Lock();

  //   async function testFileOp(filename, data, resourceId) {
  //     await lock.waitUntilAvailable(resourceId); // Wait until the file is available
  //     await lock.lock(resourceId); // Lock the file

  //     try {
  //       // Read existing content from file
  //       let existingData = '';
  //       try {
  //         existingData = fs.readFileSync(filename, 'utf8');
  //       } catch (error) {
  //         // File doesn't exist yet
  //       }

  //       // Append new data to existing content
  //       const newData = existingData + data;

  //       // Write combined data back to file
  //       fs.writeFileSync(filename, newData);

  //       console.log(`Data '${data}' written to file '${filename}'`);
  //     } finally {
  //       lock.unlock(resourceId); // Unlock the file
  //     }
  //   }

  //   // Perform multiple asynchronous operations to read and write to different files
  //   async function run() {
  //     let i = 1;
  //     const filename = `file${i}.txt`;
  //     const resourceId = `file${i}`;
  //     const data = `Data ${i}\n`;

  //     testFileOp(filename, data, resourceId);
  //     setTimeout(() => {
  //       testFileOp(filename, data, resourceId);
  //     }, 1)

  //   }

  //   run();

  // }

  @Get()
  getHello(): any {
    return this.counter;
  }

  @Post('increment')
  increment(): any {
    this.counter++;
    return 'increased'

  }
  @Post('decrement')
  decrement(): any {
    this.counter--;

    return 'decreased'
  }
}
