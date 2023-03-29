import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { PlaidService } from '../services/plaid.service';

@Controller('transaction')
export class PlaidController {
  constructor(private readonly plaidService: PlaidService) {}
  @Get()
  getTransactions(@Request() request: Request) {
      return this.plaidService.getTransactions(request);
  }
  @Get('connection')
  createLinkToken() {
    return this.plaidService.createLinkToken();
  }

  @Get('token')
  checkToken(@Request() request: Request) {
    return this.plaidService.checkToken(request);
  }

  @Post('access')
  exchangePublicForAccessToken(
    @Body() publicToken: { publicToken: string },
    @Request() request: Request,
  ) {
    return this.plaidService.exchangePublicTokenForAccessToken(
      publicToken,
      request,
    );
  }
}
