import { DynamicModule, Module, Provider, Scope } from '@nestjs/common';
import {
  createConnection,
  ConnectionOptions,
  Connection,
} from '@typedorm/core';

export const CONNECTION_PROVIDER = Symbol('CONNECTION_PROVIDER');
export const ENTITY_MANAGER_PROVIDER = Symbol('ENTITY_MANAGER_PROVIDER');

@Module({})
export class DynamodbModule {
  static forRoot(options: ConnectionOptions): DynamicModule {
    const connectionProvider: Provider = {
      provide: CONNECTION_PROVIDER,
      scope: Scope.DEFAULT,
      useFactory: () => {
        const connection = createConnection(options);

        console.log(connection);
        return connection;
      },
    };

    const entityManagerProvider = {
      provide: ENTITY_MANAGER_PROVIDER,
      useFactory: (connection: Connection) => connection.entityManager,
      inject: [CONNECTION_PROVIDER],
    };

    return {
      module: DynamodbModule,
      imports: [],
      exports: [connectionProvider, entityManagerProvider],
      providers: [connectionProvider, entityManagerProvider],
    };
  }
}
