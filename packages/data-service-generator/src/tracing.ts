import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { FsInstrumentation } from "@opentelemetry/instrumentation-fs";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";
import { SpanStatusCode, trace } from "@opentelemetry/api";

export class Tracing {
  static init() {
    registerInstrumentations({
      instrumentations: [
        new HttpInstrumentation({
          requireParentforIncomingSpans: true,
        }),
        new FsInstrumentation({
          requireParentSpan: true,
        }),
      ],
    });

    const resource = Resource.default().merge(
      new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: "data-service-generator",
      })
    );

    const provider = new NodeTracerProvider({
      resource: resource,
    });
    const traceExporter = new OTLPTraceExporter();
    const processor = new BatchSpanProcessor(traceExporter);
    provider.addSpanProcessor(processor);

    provider.register();
  }

  static getTracer() {
    return trace.getTracer("default");
  }

  static wrapAsync<T>(
    fn: (...args: any[]) => Promise<T>,
    ...args: any[]
  ): Promise<T> {
    const segmentName = fn.name;
    return Tracing.getTracer().startActiveSpan(segmentName, async (span) => {
      try {
        const result = await fn(...args);
        span.end();
        return result;
      } catch (error) {
        span.recordException(error);
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: error.message,
        });
        throw error;
      } finally {
        span.end();
      }
    });
  }

  static wrap<T>(fn: (...args: any[]) => T, ...args: any[]) {
    const segmentName = fn.name;

    return Tracing.getTracer().startActiveSpan(segmentName, (span) => {
      const result = fn(...args);
      span.end();
      return result;
    });
  }
}
