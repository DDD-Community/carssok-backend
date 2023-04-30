import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import * as Sentry from '@sentry/node';
import { IncomingWebhook } from '@slack/client';

@Injectable()
export class SentryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        Sentry.captureException(error);
        const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);
        webhook.send({
          attachments: [
            {
              color: 'danger',
              text: '🚨카쏙 버그 발생🚨',
              fields: [
                {
                  title: `Request Message: ${error.message}`,
                  value: error.stack,
                  short: false,
                },
              ],
              ts: Math.floor(new Date().getTime() / 1000).toString(),
            },
          ],
        });
        return throwError(() => error);
      }),
    );
  }
}
