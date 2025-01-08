import { mapObjProps } from "./map";
import { goku } from "./testObjs";

const obj = { name: "John", age: 30, city: "NY" };
const targets = ["name", "city"];

function functionBenchmark(
  fnCallback: Function,
  iterations: number,
  ...args: any[] // args will probably always have at least two params
): void {
  const start = performance.now();
  for (let i = 0; i < iterations; ++i) {
    if (args.length > 1) {
      fnCallback(args[0], args[1]);
    } else {
      fnCallback(args);
    }
  }
  const end = performance.now();

  console.log(
    `\nAverage execution time: ${((end - start) / iterations).toFixed(6)} ms`,
  );
}

//functionBenchmark(mapObjProps, 100000, [obj, targets]);
//functionBenchmark(mapObjProps, 99999999, [goku, ["personality", "powers"]]);

/**
 *"(=> === <> !==)"
 */
