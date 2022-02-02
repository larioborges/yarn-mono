const commandLineArgs = require('command-line-args');
const child_process = require('child_process');

// Tasks
const TASKS = {
    CREATE_MIGRATION: 'create-migration',
    CREATE_SEEDER: 'create-seeder',
    MIGRATE_UP: 'migrate-up',
    MIGRATE_DOWN: 'migrate-down',
    SEED_UP: 'seed-up',
    SEED_DOWN: 'seed-down',
    MIGRATION_PENDING: 'migration-pending',
    MIGRATION_EXECUTED: 'migration-executed',
    SEED_PENDING: 'seed-pending',
    SEED_EXECUTED: 'seed-executed',
};
const TASK_NAMES = Object.keys(TASKS).map((key) => TASKS[key]);

const CODE_DIR = 'src';

// Command line arg validation funcs
const RERUN_OPTIONS = ['THROW', 'SKIP', 'ALLOW'];

const requiresFile = (task) => [TASKS.CREATE_MIGRATION, TASKS.CREATE_SEEDER].includes(task);
const validateOptions = (options, taskNames) => {
    if (!options.task) {
        return 'The task arguement is required. Please use the -t or -task.';
    }
    if (!taskNames.includes(options.task)) {
        return `You have provided an invalid task name. Please use one of: ${taskNames.join(
            ', ',
        )}'`;
    }
    if (requiresFile(options.task)) {
        if (!options.name) {
            return 'The name arguement is required for this task. Please use the -n or -name.';
        }
        if (options.name.endsWith('.js')) {
            return 'The name arguement should be the name of the file without the extension.';
        }
    }
    if (options.rerun && !RERUN_OPTIONS.includes(options.rerun)) {
        return `The rerun arguement you have provided is invalid. It has to be one of: ${RERUN_OPTIONS.join(
            ', ',
        )}`;
    }
};

// Command line arguement configuration
const optionDefinitions = [
    // Name of the task to be run
    { name: 'task', alias: 't', type: String },
    // Running env (e.g. staging)
    { name: 'env', alias: 'e', type: String, defaultValue: 'local' },
    // For create tasks: the name of the file that is created (without extension).
    // For up/down tasks: explicity declare migration name(s) to be applied.
    { name: 'name', alias: 'n', type: String },
    // For up/down tasks: Run this many migrations. If not specified, all will be applied.
    { name: 'step', alias: 's', type: String },
    // For up/down tasks: All migrations up to and including this one should be applied.
    { name: 'to', alias: 'o', type: String },
    // For up/down tasks: Specify what action should be taken when a migration that has already
    // been applied is passed to --name. The default value is "THROW". {THROW,SKIP,ALLOW}
    { name: 'rerun', alias: 'r', type: String },
    // Pending/executed: list migrations including names and paths, in a json array format
    { name: 'json', alias: 'j', type: Boolean },
];
const options = commandLineArgs(optionDefinitions);
const optionsErr = validateOptions(options, TASK_NAMES);
if (optionsErr) {
    console.error(optionsErr);
    return;
}

// Runs another node script, adding XO_ENV as an env variable if required
const runNode = (command, env) =>
    child_process.execSync(`cross-env XO_ENV=${env} node ${command}`, {
        stdio: [process.stdin, process.stdout, process.stderr],
    });

const createScriptArguements = (options, scriptFolder) => {
    return ` --folder ${CODE_DIR}/${scriptFolder} --prefix TIMESTAMP --allow-extension .js --name ${options.name}.js`;
};

const upDowmArgs = (options) => {
    let args = '';
    if (options.to) {
        args += ` --to ${options.to}`;
    }
    if (options.step) {
        args += ` --step ${options.step}`;
    }
    if (options.name) {
        args += ` --name ${options.name}`;
    }
    if (options.rerun) {
        args += ` --rerun ${options.rerun}`;
    }
    return args;
};

const listArguements = (options) => {
    if (options.json) return ' --json';
    return '';
};

// Run the task
switch (options.task) {
    case TASKS.CREATE_MIGRATION:
        runNode(
            `${CODE_DIR}/migrator create${createScriptArguements(options, 'migrations')}`,
            options.env,
        );
        break;
    case TASKS.CREATE_SEEDER:
        runNode(
            `${CODE_DIR}/seed create${createScriptArguements(options, `seeders/${options.env}`)}`,
            options.env,
        );
        break;
    case TASKS.MIGRATE_UP:
        runNode(`${CODE_DIR}/migrator up${upDowmArgs(options)}`, options.env);
        break;
    case TASKS.MIGRATE_DOWN:
        runNode(`${CODE_DIR}/migrator down${upDowmArgs(options)}`, options.env);
        break;
    case TASKS.SEED_UP:
        runNode(`${CODE_DIR}/seed up${upDowmArgs(options)}`, options.env);
        break;
    case TASKS.SEED_DOWN:
        runNode(`${CODE_DIR}/seed down${upDowmArgs(options)}`, options.env);
        break;
    case TASKS.MIGRATION_PENDING:
        runNode(`${CODE_DIR}/migrator pending${listArguements(options)}`, options.env);
        break;
    case TASKS.MIGRATION_EXECUTED:
        runNode(`${CODE_DIR}/migrator executed${listArguements(options)}`, options.env);
        break;
    case TASKS.SEED_PENDING:
        runNode(`${CODE_DIR}/seed pending${listArguements(options)}`, options.env);
        break;
    case TASKS.SEED_EXECUTED:
        runNode(`${CODE_DIR}/seed executed${listArguements(options)}`, options.env);
        break;
}
