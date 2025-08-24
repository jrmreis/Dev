function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function retryOperation(operation, maxAttempts = 3, baseDelayMs = 1000) {
  let lastError;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxAttempts) {
        break;
      }
      
      const delay = baseDelayMs * Math.pow(2, attempt - 1);
      console.log(`Retry attempt ${attempt}/${maxAttempts} after ${delay}ms`);
      await sleep(delay);
    }
  }
  
  throw lastError;
}

module.exports = {
  sleep,
  retryOperation
};
