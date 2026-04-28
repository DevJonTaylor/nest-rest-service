import { BootstrapPluginAbstract } from './bootstrap-plugin.abstract';
import { NestApplication } from '@nestjs/core';
import { Logger } from 'nestjs-pino';

export class PinoLoggerPlugin extends BootstrapPluginAbstract {
  public constructor(protected app: NestApplication) { super(); }

  protected async bootstrap() {
    const logger = this.app.get(Logger);
    this.app.useLogger(logger);
  }
}
