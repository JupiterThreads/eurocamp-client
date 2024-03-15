import { Catch, HttpException, HttpStatus } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter {
  catch(exception, host) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    let statusCode = exception.getStatus();

    let responseMessage = exception.response.message;
    const { error } = exception.response;

    // handle odd errors from the eurocamp api
    if (statusCode === HttpStatus.BAD_GATEWAY) {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      responseMessage = 'Error accessing Eurocamp service';
    }

    response
      .status(statusCode)
      .json({ statusCode, message: responseMessage, error });
  }
}
