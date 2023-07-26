import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

enum MoveEnum {
  R,
  L,
  N,
}

interface ICommand {
  status: string;
  toRead: number | null;
  toWrite: number | null;
  toMove: MoveEnum;
  nextStatus: string;
}
interface IData {
  position: number;
  data: number;
}

let tapeData: Array<IData> = [];
let status = "";
let headPosition: number;
let loopCountMax: number;

const initialCallback = (input: string) => {
  const [statusRaw, tapeDataRaw, headPositionRaw, loopCountMaxRaw] = input
    .split(",")
    .map((e) => e.trim());

  if (!statusRaw) throw "초기상태가 입력되지 않았어요!";
  status = statusRaw;

  loopCountMax = Number(loopCountMaxRaw);
  if (isNaN(loopCountMax)) loopCountMax = Infinity;

  if (tapeDataRaw) {
    for (let i = 0; i < tapeDataRaw.length; i++) {
      if (tapeDataRaw[i] == "-") continue;
      const data = Number(tapeDataRaw[i]);
      if (isNaN(data)) throw "숫자가 아닌 데이터가 입력되었어요!";
      tapeData.push({ position: i, data: data });
    }
  }

  headPosition = headPositionRaw ? Number(headPositionRaw) - 1 : 0;
  if (isNaN(headPosition)) throw "헤드의 위치가 올바르지 않아요!";
};

const printAll = () => {
  let tapeMinPosition: number = NaN;
  let tapeMaxPosition: number = NaN;

  tapeData = tapeData.sort((a, b) => a.position - b.position);

  if (tapeData.length > 0) {
    tapeMinPosition = tapeData[0].position;
    tapeMaxPosition = tapeData[tapeData.length - 1].position;

    //Tape
    process.stdout.write(
      "-".repeat(Math.max(tapeMinPosition - headPosition, 0))
    );
    let lastPosition = tapeMinPosition - 1;
    tapeData.forEach((e) => {
      process.stdout.write("-".repeat(e.position - lastPosition - 1));
      process.stdout.write(String(e.data));
      lastPosition = e.position;
    });
    process.stdout.write(
      "-".repeat(Math.max(headPosition - tapeMaxPosition, 0))
    );
    process.stdout.write("\n");

    //Header
    process.stdout.write(
      "-".repeat(Math.max(headPosition - tapeMinPosition, 0))
    );
    process.stdout.write(status);
    process.stdout.write(
      "-".repeat(Math.max(tapeMaxPosition - headPosition, 0))
    );
    process.stdout.write("\n");
  } else {
    process.stdout.write("\n");
    process.stdout.write(status);
    process.stdout.write("\n");
  }
};
const commandsCallback = (input: string) => {
  printAll();
  let commandsRaw = input.split(";");
  if (commandsRaw[commandsRaw.length - 1] == "") {
    commandsRaw = commandsRaw.slice(0, commandsRaw.length - 1);
  }
  let commands = commandsRaw.map((e, i) => {
    const command = e
      .replace(/\(|\)/g, "")
      .split(",")
      .map((e) => e.trim());
    if (command.length != 5)
      throw `The number of elements in the ${i + 1}th command is not 5`;

    const toWrite = Number(command[2].slice(1));
    if (!(command[3] in MoveEnum))
      throw `${command[3]} is not available movement`;
    const toMove: MoveEnum = MoveEnum[command[3] as keyof typeof MoveEnum];

    const result: ICommand = {
      status: command[0],
      toRead: command[1] == "-" ? null : Number(command[1]),
      toWrite: isNaN(toWrite) ? null : toWrite,
      toMove: toMove,
      nextStatus: command[4],
    };
    return result;
  }) as Array<ICommand>;

  for (let i = 0; i < loopCountMax; i++) {
    const currentTapeDataIndex = tapeData.findIndex(
      (e) => e.position == headPosition
    );
    const currentTapeData = tapeData[currentTapeDataIndex];
    const currentCommand = commands.find(
      (e) =>
        e.status == status &&
        e.toRead == (currentTapeData == undefined ? null : currentTapeData.data)
    );

    if (!currentCommand) break;
    const { toWrite, toMove, nextStatus } = currentCommand;
    if (toWrite != null) {
      if (currentTapeData) {
        tapeData[currentTapeDataIndex].data = toWrite;
      } else {
        tapeData.push({ position: headPosition, data: toWrite });
      }
    } else {
      if (currentTapeData) {
        tapeData.splice(currentTapeDataIndex, 1);
      }
    }

    switch (toMove) {
      case MoveEnum.L: {
        headPosition -= 1;
        break;
      }
      case MoveEnum.R: {
        headPosition += 1;
        break;
      }
    }
    status = nextStatus;
    printAll();
  }
};

(async () => {
  const rlQuestion = (question: string): Promise<string> => {
    return new Promise<string>((resolve) => {
      rl.question(question, (input) => resolve(input));
    });
  };
  const forTrue = async (callback: () => Promise<void>) => {
    let result;

    do {
      try {
        await callback();
        result = true;
      } catch (error: any) {
        if (typeof error == "string") {
          console.log(error);
        } else {
          console.error(error);
        }
        result = false;
      }
    } while (!result);
  };
  let input: string;

  console.log("Turing Machine!");
  console.log("Use - to represent empty data");
  await forTrue(async () => {
    input = await rlQuestion(
      "Enter initial data (initial status, initial data without comma(optional), initial cursor position(optional), maximum number of repetition(optional))\n(Ex: X, 1121-, 1, 100) > "
    );
    initialCallback(input);
  });
  await forTrue(async () => {
    input = await rlQuestion(
      "Input commands\n(Ex: (X, 2, P-, R, X); (X, 1, P0, R, X); (X, -, P-, N, Y);) > "
    );
    commandsCallback(input);
  });

  rl.close();
})();
