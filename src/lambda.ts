import {NestFactory} from '@nestjs/core';
import {AppModule} from "./AppModule";
import {Context, SQSEvent} from 'aws-lambda';
import {HttpStatus, INestApplicationContext, Logger} from "@nestjs/common";
import {SQSService} from "./services/SQSService";
import {QueueService} from "./services/QueueService";

let cachedNestApp: INestApplicationContext;

async function init(): Promise<INestApplicationContext> {
  return NestFactory.createApplicationContext(AppModule);
}

export const handler = async (event: SQSEvent, context: Context): Promise<any> => {
  // Logger.log(event, "DEBUGGING EVENT!");
  cachedNestApp = cachedNestApp ?? (await init());
  const queueService:QueueService = cachedNestApp.get<SQSService>("QueueService");
  queueService.process(event);

  return {
    body: "Working!",
    statusCode: HttpStatus.OK,
  };
};
