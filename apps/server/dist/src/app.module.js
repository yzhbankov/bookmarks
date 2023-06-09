"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const app_service_1 = require("./app.service");
const bookmarks_module_1 = require("./bookmarks/bookmarks.module");
const tags_module_1 = require("./tags/tags.module");
const spaces_module_1 = require("./spaces/spaces.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const configuration_1 = require("../config/configuration");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                ignoreEnvFile: true,
                isGlobal: true,
                load: [configuration_1.default],
            }),
            mongoose_1.MongooseModule.forRootAsync({
                useFactory: async (configService) => {
                    const dbUser = configService.get('database.user');
                    const dbPassword = configService.get('database.password');
                    const dbHost = configService.get('database.host');
                    const dbPort = configService.get('database.port');
                    const dbSchema = configService.get('database.schema');
                    return {
                        uri: `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbSchema}`,
                    };
                },
                inject: [config_1.ConfigService],
            }),
            bookmarks_module_1.BookmarksModule,
            tags_module_1.TagsModule,
            spaces_module_1.SpacesModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
        ],
        controllers: [],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map