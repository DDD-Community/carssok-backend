import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';

const env = process.env.NODE_ENV;
const logDir = __dirname + '/../../logs'; // log 파일을 관리할 폴더

// rfc5424를 따르는 winston만의 log level
// error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
export const logger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      level: env === 'production' ? 'http' : 'silly',
      // production 환경이라면 http, 개발환경이라면 모든 단계를 로그
      format:
        env === 'production'
          ? // production 환경은 자원을 아끼기 위해 simple 포맷 사용
            winston.format.simple()
          : winston.format.combine(
              winston.format.timestamp(),
              utilities.format.nestLike('Carssork-Dev', {
                prettyPrint: true, // nest에서 제공하는 옵션. 로그 가독성을 높여줌
                colors: true,
              }),
            ),
    }),
  ],
});
