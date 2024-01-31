import {Logger, Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {AppConfig} from "./configsettings/AppConfig";
import {SQSService} from "./services/SQSService";
import {QueueService} from "./services/QueueService";

const envPaths = [".env"];
const stage = process.env["STAGE"];
if (stage) {
    console.log(`Using Stage ${stage} and trying to load .env.${stage} ...`);
    envPaths.push(`.env.${stage}`);
} else {
    console.log(
        "Hmmmm, it appears there is no stage that can be set to perform???!!!"
    );
}

console.log("Environments supported in this deployment ", envPaths);

const getQueueService = () => {
    if (stage === "__LOCAL_DEV__") {
        Logger.debug("Using Local Queue Service");
        return SQSService;
    } else {
        Logger.debug("Using AWS SQS Service");
        return SQSService;
    }
};

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: envPaths,
            isGlobal: true,
            expandVariables: true,
        })
    ],
    providers: [
        {
            provide: "QueueService",
            useClass: getQueueService(),
        },
        AppConfig
    ],
})
export class AppModule {}
