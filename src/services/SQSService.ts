import {Injectable, Logger} from "@nestjs/common";
import {AppConfig} from "../configsettings/AppConfig";
import { ServiceResponse } from "../lib/ServiceResponse";
import {QueueService} from "./QueueService";
import {SQSEvent} from "aws-lambda";

@Injectable()
export class SQSService implements QueueService {
    private readonly logger = new Logger(SQSService.name);

    constructor(private readonly appConfig: AppConfig) {}

    process(event: SQSEvent): ServiceResponse | Promise<ServiceResponse> {
        Logger.log(event, "I will process the SQS Messages");
        return ServiceResponse.createSuccess({});
    }

}