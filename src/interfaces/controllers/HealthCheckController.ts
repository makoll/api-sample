import { getManager } from 'typeorm';

export class HealthCheckController {
  public async check(): Promise<string> {
    await getManager().query(`SELECT 1;`);
    return 'Health Check OK.';
  }
}
