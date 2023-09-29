import { Tracing } from "./tracing";
import { generateCode } from "./generate-code";
import { logger } from "./logging";

if (require.main === module) {
  Tracing.init();

  void Tracing.wrapAsync(generateCode).catch(async (err) => {
    logger.error(err);
    process.exit(1);
  });
}
