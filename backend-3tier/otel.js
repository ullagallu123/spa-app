// otel.js

const { NodeSDK } = require('@opentelemetry/sdk-node');
const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
const { MysqlInstrumentation } = require('@opentelemetry/instrumentation-mysql');

// Prometheus Exporter configuration
const prometheusExporter = new PrometheusExporter({
  startServer: true,
  port: 9464, // Prometheus scraping will happen here
}, () => {
  console.log('Prometheus metrics exposed at http://localhost:9464/metrics');
});

// Initialize OpenTelemetry SDK with the Prometheus exporter and required instrumentations
const sdk = new NodeSDK({
  traceExporter: prometheusExporter,
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
    new MysqlInstrumentation()  // Add MySQL instrumentation if you're using MySQL for database
  ],
});

sdk.start()
  .then(() => {
    console.log('OpenTelemetry is running...');
  })
  .catch((err) => {
    console.error('Error starting OpenTelemetry:', err);
  });
