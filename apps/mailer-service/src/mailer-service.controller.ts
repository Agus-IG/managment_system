import { Controller, Get } from '@nestjs/common';
import { MailerServiceService } from './mailer-service.service';

@Controller()
export class MailerServiceController {
  constructor(private readonly mailerServiceService: MailerServiceService) {}

  @Get()
  getHello(): string {
    return this.mailerServiceService.getHello();
  }
}
