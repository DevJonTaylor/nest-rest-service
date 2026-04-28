import { NestApplication } from '@nestjs/core';
import { BootstrapPluginAbstract } from './bootstrap-plugin.abstract';

export class ShutdownHooksPlugin extends BootstrapPluginAbstract {
  public constructor(protected app: NestApplication) { super(); }

  protected async bootstrap() { this.app.enableShutdownHooks(); }
}
