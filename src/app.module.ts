import { Injectable, Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { BlogsController } from './blogs/blogs.controller';
import { UserStore } from './store/user-store/user-store';
import { Store } from './store/store/store';
import { Config } from './store/config/config';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

// we have three types of injection scopes => DEFAULT, REQUEST & TRANSIENT
// Default scope = single shared provider
const IS_DEV_MODE = true;

@Injectable()
class EnvConfig {
  envType: 'DEV' | 'STAGE' | 'PROD';
  constructor() {
    this.envType = 'DEV';
  }
}

function creatConnection(options) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        message: 'CONNECTED',
        options,
      });
      // resolve('CONNECTED');
    }, 5000);
  });
}

@Module({
  imports: [],
  controllers: [UsersController, BlogsController],

  // Standard providers
  // providers: [UserStore],
  // OR
  // when injection token and class provider name is differnet then we use the below provider syntax and when both are same then use the above once
  // providers: [{ provide: UserStore, useClass: UserStore }], // here in (provide: UserStore) UserStore is injection token by which we can refer thsi provider and (useClass: UserStore) UserStore is provider instance in IOC container

  // when injection token is string and provider instance is a class
  // providers: [{ provide: 'STORE', useClass: UserStore }],

  // when injection token name is other class and provider instance is other class
  // providers: [{ provide: UserStore, useClass: Store }],

  // providers: [UserStore, { provide: Store, useExisting: UserStore }],
  // hamne UserStore class ka oper @Injectable decorator laga kar is ko as a dependency use karne ka kabil to bana dia but is ka instance create karne ka lia hamain isa yahan par provider ka array ka ander insert karna hoga and provider wohi cheez hoti hai jisko ham as a dependency use kar sakain

  providers: [
    // standard providers
    UserStore,
    { provide: Store, useExisting: UserStore },

    // value providers
    { provide: 'DATABASE_NAME', useValue: 'TEST_DB' },
    {
      provide: 'EMAILS',
      useValue: [
        'alihaiderdev2646@gmail.com',
        'ali.haider@sybrid.com',
        'ah1675179@gmail.com',
      ],
    },
    {
      provide: 'ENV_CONFIG',
      useValue: {
        type: 'Dev',
        node: '18',
      },
    },
    {
      provide: Config,
      useValue: {
        type: 'Dev',
        node: '18',
      },
    },
    // factory providers (when use any depndency conditionally or dynamically)
    // {
    //   provide: 'EVENT_STORE',
    //   useFactory: () => {
    //     const eventBus$ = IS_DEV_MODE
    //       ? new ReplaySubject(2)
    //       : new BehaviorSubject(null);
    //     return eventBus$;
    //   },
    // },
    // factory provider
    {
      provide: 'EVENT_STORE',
      useFactory: (config: EnvConfig, limit: number = 4) => {
        const eventBus$ =
          config.envType === 'DEV'
            ? new ReplaySubject(limit)
            : new BehaviorSubject(null);
        console.log(config, limit);

        return eventBus$;
      },
      // inject: ['LIMIT'],
      // optional dependency
      inject: [EnvConfig, { token: 'LIMIT', optional: true }],
    },
    // standard/class provider
    EnvConfig,
    // value provider
    {
      provide: 'LIMIT',
      useValue: 2,
    },
    // async factory provider
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async (options) => {
        const connection = await creatConnection(options);
        return connection;
      },
      inject: ['DB_OPTIONS'],
    },
    {
      provide: 'DB_OPTIONS',
      useValue: { url: 'localhost', user: 'admin', password: 'pwd' },
    },
  ],

  // imports: [],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
