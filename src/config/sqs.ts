/* v8 ignore start */
import { SQSClient } from '@aws-sdk/client-sqs';

export const clientSQS = new SQSClient({ region: 'us-east-1' });
/* v8 ignore stop */
