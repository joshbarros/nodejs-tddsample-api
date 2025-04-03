import winston from 'winston';
import chalk from 'chalk';

// Define custom log format with colors
const customFormat = winston.format.printf(({ level, message, timestamp, ...metadata }) => {
  let colorizedLevel: string;

  // Colorize log levels
  switch (level) {
    case 'error':
      colorizedLevel = chalk.red.bold('ERROR');
      break;
    case 'warn':
      colorizedLevel = chalk.yellow.bold('WARN');
      break;
    case 'info':
      colorizedLevel = chalk.green.bold('INFO');
      break;
    case 'debug':
      colorizedLevel = chalk.blue.bold('DEBUG');
      break;
    default:
      colorizedLevel = chalk.gray(level.toUpperCase());
  }

  // Format timestamp
  const timestampStr = timestamp ? chalk.gray(timestamp) : '';

  // Format metadata if exists
  const metadataStr = Object.keys(metadata).length
    ? `\n${chalk.gray('METADATA')}: ${chalk.cyan(JSON.stringify(metadata, null, 2))}`
    : '';

  // Format message based on type
  let formattedMessage: string;
  if (typeof message === 'object' && message instanceof Error) {
    formattedMessage = `${chalk.red(message.message)}\n${chalk.gray('STACK')}: ${message.stack?.split('\n').slice(1).join('\n')}`;
  } else if (typeof message === 'object') {
    formattedMessage = chalk.cyan(JSON.stringify(message, null, 2));
  } else {
    formattedMessage = String(message);
  }

  return `${timestampStr} [${colorizedLevel}] ${formattedMessage}${metadataStr}`;
});

// Create logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    customFormat
  ),
  transports: [
    new winston.transports.Console()
  ]
});

export default logger;