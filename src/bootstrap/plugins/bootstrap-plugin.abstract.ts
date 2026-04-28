import { NestApplication } from "@nestjs/core";

export abstract class BootstrapPluginAbstract {
  protected abstract app: NestApplication;
  protected abstract bootstrap(): Promise<void>;

  public async run(): Promise<void> {
    await this.bootstrap();
  }
}
