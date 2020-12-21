import { PM2ENV } from "./pm2env";
import { PM2MONIT } from "./pm2monit";

export interface Process {
  pid;
  name;
  pm2_env: PM2ENV;
  pm_id;
  monit: PM2MONIT;
}
