"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@bookmarks/env");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    console.log('Server port', configService.get('server.port'));
    await app.listen(configService.get('server.port'));
}
bootstrap();
//# sourceMappingURL=main.js.map