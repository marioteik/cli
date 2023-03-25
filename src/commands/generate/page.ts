import { readFileSync, writeFileSync, existsSync } from "fs";
import { camelCase, capitalize, startCase } from "lodash";
import { createFolder } from "../../utils/create_folder";
import { createPageStructure } from "../../utils/createPageStructure/create_page_structure";
import { writeFileErrorHandler } from "../../utils/error_handler";
import prettier from "prettier";
import { addEndpointToPage } from "../../utils/addEndpointToPage/add_endpoint_to_page";
import { addFormToPage } from "../../utils/addFormToPage/add_form_to_page";

interface CreatePageConfig {
    pathList: string[];
    path: string;
    name: string;
    camelCase: string;
    pascalCase: string;
    endpoint: string;
    form: string;
    [key: string]: any;
}

interface Argv {
    name: string;
    "dry-run": boolean;
    endpoint?: string;
    form?: string;
}

export const command = "page <name>";

export const aliases = ["p"];

export const desc = "Add page named <name> to the pages folder.";

export const builder = {
    name: {
        alias: "n",
        describe: "Name of the page.",
    },
    "dry-run": {
        alias: "dry",
        describe: "Run the command without actually creating the page.",
    },
    endpoint: {
        alias: "e",
        describe: "Endpoint to use to retrieve info for the page.",
    },
    form: {
        alias: "f",
        describe: "Endpoint to generate form for the page.",
    },
};

export const handler = function (argv: Argv): void {
    // grab page name from terminal argument
    if (!argv.name) throw new Error("You must include a page name.");

    const pathList = `${argv.name}`.split("/");
    const name = pathList.pop() as string;

    const _camelCase = camelCase(name);
    const _pascalCase = startCase(_camelCase).replace(/ /g, "");
    const _endpointCamelCase = camelCase(argv.endpoint as string);
    const _endpointPascalCase = startCase(_endpointCamelCase).replace(/ /g, "");

    const createPageConfig: CreatePageConfig = {
        pathList,
        path: `./src/pages/${pathList.join("/")}/${_pascalCase}`,
        name,
        camelCase: _camelCase,
        pascalCase: _pascalCase,
        endpoint: argv.endpoint as string,
        form: argv.form as string,
        [argv.endpoint as string]: {
            path: `./src/api/${_endpointCamelCase}`,
            camelCase: _endpointCamelCase,
            pascalCase: _endpointPascalCase,
        },
    };

    if (existsSync(createPageConfig.path))
        throw new Error("A page with that name already exists.");

    try {
        const addPageStructure = [
            ...createFolder(createPageConfig.path),
            ...createPageStructure(createPageConfig),
        ];

        if (argv.endpoint) {
            addPageStructure.push(...addEndpointToPage(createPageConfig));
        }

        if (argv.form) {
            addPageStructure.push(...addFormToPage(createPageConfig));
        }

        if (!argv["dry-run"]) {
            console.log("Creating page...", createPageConfig.path);

            addPageStructure.forEach((branch) => {
                branch?.action?.();
            });

            addPageStructure.forEach((branch) => {
                if (branch.type === "create_file" && !branch.path.includes(".scss")) {
                    const formatted = prettier.format(
                        readFileSync
