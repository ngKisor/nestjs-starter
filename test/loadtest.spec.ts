import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    scenarios: {
        constant_request_rate: {
            executor: 'constant-arrival-rate',
            rate: 1000,
            timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
            duration: '30s',
            preAllocatedVUs: 100, // how large the initial pool of VUs would be
            maxVUs: 200, // if the preAllocatedVUs are not enough, we can initialize more
        },
    },
};

export default function () {
    // GET request to fetch the initial counter value

    const resBefore = http.get('http://localhost:8080');
    const initialCounter = JSON.parse(resBefore.body);

    // POST request to increment the counter
    const incrementRes = http.post('http://localhost:8080/increment');

    // POST request to decrement the counter
    const decrementRes = http.post('http://localhost:8080/decrement');

    // GET request to fetch the counter value after modification
    const resAfter = http.get('http://localhost:8080');
    const updatedCounter = JSON.parse(resAfter.body);

    console.log('update counter is >>>>', updatedCounter)
    // Check if the counter remains unchanged
    if (initialCounter === updatedCounter) {
        console.log('Counter value remained unchanged');
    } 
    sleep(1);
}