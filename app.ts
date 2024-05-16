import* as readline from 'readline';
import { InputBuffer, Statement } from './src/types/model';
import {PrepareResult, MetaCommandResult } from './src/constants/commands';

const rl = readline.createInterface({
				input: process.stdin,
				output: process.stdout
})

const newInputBuffer = (): InputBuffer =>  {
				return {buffer: ''};
}

const printPrompt = () => {
				process.stdout.write('sql>>>');
}

const readInput = (inputBuffer: InputBuffer): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        rl.question('', (input) => {
            inputBuffer.buffer = input.trim();
            resolve();
        });
    });
}

const doMetaCommand = (inputBuffer: InputBuffer): MetaCommandResult => {
    if (inputBuffer.buffer[0] === '.') {
        switch (inputBuffer.buffer) {
            case '.exit':
                process.exit();
            default:
                console.log(`Unrecognized command '${inputBuffer.buffer}'`);
                return MetaCommandResult.UnRecognizedStatement;
        }
    }
    return MetaCommandResult.Success;
}

function prepareStatement(inputBuffer: InputBuffer, statement: Statement): PrepareResult {
    return PrepareResult.Success;
}

function executeStatement(statement: Statement) {
}

async function main() {
    const inputBuffer: InputBuffer = newInputBuffer();
    while (true) {
        printPrompt();
        await readInput(inputBuffer);

        const metaCommandResult = doMetaCommand(inputBuffer);
        if (metaCommandResult === MetaCommandResult.Success) {
            continue;
        }

        const statement: Statement = {};
        const prepareResult = prepareStatement(inputBuffer, statement);
        if (prepareResult === PrepareResult.Success) {
            executeStatement(statement);
            console.log('Executed.');
        } else {
            console.log(`Unrecognized keyword at start of '${inputBuffer.buffer}'.`);
        }
    }
}
console.log("Welcome to Brady's Typescript sqLite Clone");
console.log("Type 'exit' to exit");

main();
