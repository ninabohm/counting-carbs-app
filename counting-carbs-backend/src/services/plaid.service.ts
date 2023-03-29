import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { AxiosResponse } from 'axios';
import { PrismaService } from './prisma.service';
import { ActivitiesService } from './activities.service';

@Injectable()
export class PlaidService {
  constructor(
    private readonly httpService: HttpService,
    private prisma: PrismaService,
    private activitiesService: ActivitiesService,
  ) {}

  async checkToken(request) {
    let hasToken = false;
    const user = await this.prisma.user.findFirstOrThrow({
      where: { firebaseId: request.user.uid },
    });
    if (user.plaidAccessToken != '1') {
      hasToken = true;
    }
    return { hasToken: hasToken };
  }

  async createLinkToken() {
    const url = 'https://sandbox.plaid.com/link/token/create';
    const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
    const PLAID_SECRET = process.env.PLAID_SECRET;

    const linkToken = await firstValueFrom(
      this.httpService
        .post(url, {
          client_id: PLAID_CLIENT_ID,
          secret: PLAID_SECRET,
          user: { client_user_id: 'user-id' },
          client_name: 'Plaid App',
          products: ['transactions'],
          country_codes: ['DE'],
          language: 'de',
        })
        .pipe(
          map((axiosResponse: AxiosResponse) => {
            return axiosResponse.data;
          }),
        ),
    );
    return linkToken;
  }

  async exchangePublicTokenForAccessToken(publicToken, request) {
    const PUBLIC_TOKEN = publicToken.public_token;
    const url = 'https://sandbox.plaid.com/item/public_token/exchange';
    const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
    const PLAID_SECRET = process.env.PLAID_SECRET;

    const user = await this.prisma.user.findFirstOrThrow({
      where: {
        firebaseId: request.user.uid,
      },
    });

    const tokenResponse = await firstValueFrom(
      this.httpService
        .post(url, {
          client_id: PLAID_CLIENT_ID,
          secret: PLAID_SECRET,
          public_token: PUBLIC_TOKEN,
        })
        .pipe(
          map((axiosResponse: AxiosResponse) => {
            return axiosResponse.data;
          }),
        ),
    );
    const ACCESS_TOKEN = tokenResponse.access_token;
    const ITEM_ID = tokenResponse.item_id;
    const userToUpdate = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        plaidAccessToken: ACCESS_TOKEN,
        itemId: ITEM_ID,
      },
    });
    }

    async getAccessToken(user) {
        const accessToken = await this.prisma.user.findUnique({
            where: { id: user.id },
            select: {plaidAccessToken: true}
        });
        const token = accessToken.plaidAccessToken;
        return token;
    }

  async getTransactions(request) {
    const user = await this.prisma.user.findFirst({
        where: { firebaseId: request.user.uid }
    });
      if (user.id != 60) {
          const url = 'https://sandbox.plaid.com/transactions/sync';
          const cursor = await this.getCursor(request);
          const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
          const PLAID_SECRET = process.env.PLAID_SECRET;
          const ACCESS_TOKEN = await this.getAccessToken(user);
          console.log(1111, ACCESS_TOKEN);
          const response = await firstValueFrom(
              this.httpService
                  .post(url, {
                      client_id: PLAID_CLIENT_ID,
                      secret: PLAID_SECRET,
                      access_token: ACCESS_TOKEN,
                      cursor: null, //needs to be changed to cursor when we are not in sandbox anymore
                      count: 7,
                  })
                  .pipe(
                      map((axiosResponse: AxiosResponse) => {
                          return axiosResponse.data;
                      }),
                  ),
          );

          await this.setNextCursor(response.next_cursor, request);
          const added = response.added;
          try {
              for (const transaction of added) {
                  await this.activitiesService.addActivity(transaction, request);
              }
          } catch (error) {
              console.log(error);
              return error;
          }
          return response;
      }
  }

  async getCursor(request) {
    const user = await this.prisma.user.findFirst({
      where: {
        firebaseId: request.user.firebaseId,
      },
    });
    let cursor = user.cursor;
    if (cursor != '1') {
      return cursor;
    } else {
      cursor = null;
      return cursor;
    }
  }
  async setNextCursor(cursor: string, request) {
    const user = await this.prisma.user.findFirst({
      where: {
        firebaseId: request.user.firebaseId,
      },
    });
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        cursor: cursor,
      },
    });
  }
}
