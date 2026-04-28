import { BootstrapPluginAbstract } from './bootstrap-plugin.abstract';
import { NestApplication } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Constants } from '../../constants';

export class ListenPlugin extends BootstrapPluginAbstract {

  public constructor(protected app: NestApplication) { super(); }

  private get cfg(): ConfigService {
    return this.app.get(ConfigService);
  }

  private get port() {
    return this.cfg.get('PORT', Constants.defaultPort);
  }

  protected async bootstrap(): Promise<void> {
    await this.app.listen(this.port);
  }
}
