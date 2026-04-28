import { AppModule } from './app.module';
import {
  NestBootstrap,
  ListenPlugin,
  ShutdownHooksPlugin,
  nestOptions,
  PinoLoggerPlugin
} from './bootstrap';

new NestBootstrap(AppModule, nestOptions)
  .plugin(ShutdownHooksPlugin)
  .plugin(PinoLoggerPlugin)
  .run(ListenPlugin)
  .catch(console.error);
