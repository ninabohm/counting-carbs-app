import { Module } from '@nestjs/common';
import { EmissionsModule } from './services/emissions.module';
import { UserModule } from './services/user.module';
import { FirebaseAuthStrategy } from './firebase/firebase-auth.strategy';
import { ActivitiesModule } from './services/activities.module';
import { PlaidModule } from './services/plaid.module';

@Module({
  imports: [
    EmissionsModule,
    ActivitiesModule,
    UserModule,
    PlaidModule,
  ],
  controllers: [],
  providers: [FirebaseAuthStrategy],
})
export class AppModule {}
