import { NestApplication, NestFactory } from '@nestjs/core';
import { NestApplicationOptions, Type } from '@nestjs/common';
import { IEntryNestModule } from '@nestjs/core/nest-factory';
import { BootstrapPluginAbstract } from './plugins/bootstrap-plugin.abstract';

export class NestBootstrap {
  public constructor(private entry: IEntryNestModule, private options?: NestApplicationOptions) {}

  private app?: NestApplication;
  private plugins: Set<Type<BootstrapPluginAbstract>> = new Set();

  private async getApp(): Promise<NestApplication> {
    if(!this.app)
      this.app = await NestFactory.create(this.entry, this.options);

    return this.app;
  }

  private async runPlugins(): Promise<void> {
    const app = await this.getApp();
    for(const Plugin of this.plugins) {
      this.plugins.delete(Plugin);
      await new Plugin(app).run();
    }
  }

  public plugin(Plugin: Type<BootstrapPluginAbstract>): NestBootstrap {
    this.plugins.add(Plugin);

    return this;
  }

  public async run(FinalPlugin: Type<BootstrapPluginAbstract>): Promise<void> {
    try {
      const app = await this.getApp();
      await this.runPlugins()

      await new FinalPlugin(app).run();
    }

    catch(error: unknown) {
      console.error(error);
    }

    finally {
      if(this.app) await this.app.close();
    }
  }
}
