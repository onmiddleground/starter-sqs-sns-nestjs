import {NestFactory} from "@nestjs/core";
import {AppModule} from "./AppModule";

async function bootstrap() {
  return NestFactory.createApplicationContext(AppModule);
}
bootstrap();
