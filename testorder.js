import orderService from "./test.js";

setTimeout(() => {
    orderService.emit('payment_success', 'ORD-9981', 149.99);
}, 20);
setTimeout(() => {
    orderService.emit('payment_success', 'ORD-9982', 45.00);
}, 30);
