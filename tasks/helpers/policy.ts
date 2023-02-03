import {
  circuitBreaker,
  ConsecutiveBreaker,
  ExponentialBackoff,
  handleAll,
  retry,
  wrap,
} from "https://esm.quack.id/cockatiel@3.0.0";

export function createPolicy() {
  const retryPolicy = retry(handleAll, { maxAttempts: 5, backoff: new ExponentialBackoff() });
  const cbPolicy = circuitBreaker(handleAll, {
    halfOpenAfter: 15 * 1000,
    breaker: new ConsecutiveBreaker(3),
  });
  return wrap(retryPolicy, cbPolicy);
}
