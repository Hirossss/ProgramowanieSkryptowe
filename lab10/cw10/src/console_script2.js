import fs from "fs-extra";
import { exec } from "node:child_process";
import readline from "readline";

const counterFilePath = "counter.txt";

function readCounterSync() {
  try {
    const data = fs.readFileSync(counterFilePath, "utf8");
    return parseInt(data, 10);
  } catch (error) {
    return 0;
  }
}

function writeCounterSync(counter) {
  fs.writeFileSync(counterFilePath, counter.toString(), "utf8");
}

function readCounterAsync(callback) {
  fs.readFile(counterFilePath, "utf8", (err, data) => {
    if (err) {
      callback(0);
    } else {
      callback(parseInt(data, 10));
    }
  });
}

function writeCounterAsync(counter, callback) {
  fs.writeFile(counterFilePath, counter.toString(), "utf8", (err) => {
    if (err) {
      console.error("Error writing counter:", err);
    } else {
      callback();
    }
  });
}

function executeCommands() {
  console.log(
    "Wprowadź komendy — naciśnięcie Ctrl+D kończy wprowadzanie danych"
  );

  const rl = readline.createInterface({
    // eslint-disable-next-line no-undef
    input: process.stdin,
    // eslint-disable-next-line no-undef
    output: process.stdout,
    terminal: false
  });

  let infinite_user = () => {
    rl.question("", (cmd) => {
      if (cmd) {
        exec(cmd, (err, output) => {
          if (err) throw err;
          console.log(output);
        });
        infinite_user();
      }
    });
  };
  infinite_user();
}

function main() {
  // eslint-disable-next-line no-undef
  const option = process.argv[2];

  if (option === "--sync") {
    const counter = readCounterSync() + 1;
    console.log(`  Liczba uruchomień: ${counter}`);
    writeCounterSync(counter);
  } else if (option === "--async") {
    readCounterAsync((counter) => {
      const newCounter = counter + 1;
      console.log(`  Liczba uruchomień: ${newCounter}`);
      writeCounterAsync(newCounter, () => {});
    });
  } else {
    executeCommands();
  }
}

main();
