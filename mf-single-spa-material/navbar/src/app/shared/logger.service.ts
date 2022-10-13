import { Injectable, isDevMode } from '@angular/core';

enum LogLevel {
  Debug = 0,
  Info = 1,
  Warn = 2,
  Error = 3,
  Fatal = 4,
}

class LogMessage {
  msg: string;
  logLevel: LogLevel;

  constructor(
    msg: string | number | object,
    logLevel: LogLevel,
    logWithDate: boolean
  ) {
    if (this.isObject(msg)) {
      msg = JSON.stringify(msg);
    }

    this.msg = this.buildLogMessage(msg, logLevel, logWithDate);
    this.logLevel = logLevel;
  }

  private buildLogMessage(
    msg: string | number | object,
    logLevel: LogLevel,
    logWithDate: boolean
  ): string {
    if (this.isObject(msg)) {
      msg = JSON.stringify(msg);
    }

    let logMessage: string = '';
    if (logWithDate) {
      logMessage = new Date() + ' - ';
    }
    logMessage += `Type: ${LogLevel[logLevel]} - Message: ${msg}`;
    return logMessage;
  }

  private isObject(msg: string | number | object): boolean {
    return typeof msg === 'object';
  }
}

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  debug(msg: string | number | object, logWithDate = false) {
    if (isDevMode()) {
      this.log(new LogMessage(msg, LogLevel.Debug, logWithDate));
    }
  }

  info(msg: string | number | object, logWithDate = false) {
    this.log(new LogMessage(msg, LogLevel.Info, logWithDate));
  }

  warn(msg: string | number | object, logWithDate = false) {
    this.log(new LogMessage(msg, LogLevel.Warn, logWithDate));
  }

  error(msg: string | number | object, logWithDate = false) {
    this.log(new LogMessage(msg, LogLevel.Error, logWithDate));
  }

  fatal(msg: string | number | object, logWithDate = false) {
    this.log(new LogMessage(msg, LogLevel.Fatal, logWithDate));
  }

  private log(logMessage: LogMessage) {
    switch (logMessage.logLevel) {
      case LogLevel.Warn:
        console.warn(logMessage.msg);
        break;
      case LogLevel.Error:
      case LogLevel.Fatal:
        console.error(logMessage.msg);
        break;
      default:
        console.log(logMessage.msg);
        break;
    }
  }
}
