import { Constructor, ErrorHandlerFunc } from '@ejshafran/types';

const ErrorHandle =
  (func: ErrorHandlerFunc) =>
  <T extends Constructor>(target: T) => {
    const properties = Object.getOwnPropertyNames(target.prototype);

    properties.forEach((key) => {
      if (key === 'constructor' || !(target.prototype[key] instanceof Function))
        return;
      const oldFunction = target.prototype[key];
      Object.defineProperty(target.prototype, key, {
        value: function (...args: any[]) {
          try {
            return oldFunction.apply(this, args);
          } catch (error: any) {
            const result = func(error);
            if (result) return result;
            throw error;
          }
        },
      });
    });

    return target;
  };

export default ErrorHandle;
