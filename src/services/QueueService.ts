import { ServiceResponse } from '../lib/ServiceResponse';
import {SQSEvent} from "aws-lambda";

export interface QueueService {
    process(event: SQSEvent): Promise<ServiceResponse> | ServiceResponse;
}