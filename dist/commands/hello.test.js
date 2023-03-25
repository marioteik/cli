"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hello_1 = require("./hello");
describe('hello command', () => {
    it('should print "Hello [name] duh!"', async () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        await (0, hello_1.handler)({ name: 'world' });
        expect(consoleSpy).toHaveBeenCalledWith('Hello world duh!');
        consoleSpy.mockRestore();
    });
});
