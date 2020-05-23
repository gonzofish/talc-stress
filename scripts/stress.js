const { performance, PerformanceObserver } = require("perf_hooks");
const talc = require("talc");
const generate = require("./generate-posts");

const observer = new PerformanceObserver((items) => {
  const [{ duration, name }] = items.getEntries();
  console.log("%s: %d", name, duration);
  performance.clearMarks();
});

observer.observe({ entryTypes: ["measure"] });

performance.mark("Start");
performance.mark("Generate End");
generate(10000);
performance.mark("Generate End");
performance.measure("Posts Generated", "Generate Start", "Generate End");
performance.mark("Build Start");
talc("build");
performance.mark("Build End");
performance.measure("Built", "Build Start", "Build End");
performance.mark("End");
performance.measure("Done", "Start", "End");
