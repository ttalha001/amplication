import { generateCode } from "./generate-code";
import { logger } from "./logging";
import { Tracing } from "./tracing";

if (require.main === module) {
  Tracing.init();
  generateCode().catch(async (err) => {
    logger.error(err);
    process.exit(1);
  });
}
