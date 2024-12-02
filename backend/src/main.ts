import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { I18nValidationPipe, I18nValidationExceptionFilter } from "nestjs-i18n";
import { GlobalExceptionFilter } from "./exceptions/errorException";
import { HttpAdapterHost } from "@nestjs/core";
import helmet from "helmet";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(
    new GlobalExceptionFilter(app.get(HttpAdapterHost)),
    new I18nValidationExceptionFilter()
  );
  app.use(helmet());
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  app.useGlobalPipes(
    new I18nValidationPipe({
      transform: true,
    })
  );

  await app.listen(3001);
}
bootstrap();
