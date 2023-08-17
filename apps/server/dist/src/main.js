"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@bookmarks/env");
const cookieParser = require("cookie-parser");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({ credentials: true, origin: true });
    const configService = app.get(config_1.ConfigService);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.enableVersioning({
        type: common_1.VersioningType.URI,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Bookmarks')
        .setDescription('The bookmarks API')
        .setVersion('1.0')
        .addTag('bookmarks')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    console.log(JSON.stringify(document));
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    app.use(cookieParser());
    await app.listen(configService.get('server.port'));
}
bootstrap();
//# sourceMappingURL=main.js.map