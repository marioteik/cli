"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
exports.command = 'generateComponent <name>';
exports.desc = 'Generate a new React Native component';
const builder = (yargs) => {
    yargs.positional('name', {
        type: 'string',
        desc: 'The name of the component to generate',
    });
};
exports.builder = builder;
const handler = async (args) => {
    const componentName = args.name;
    console.log(`Generating component ${componentName}...`);
    const componentPath = path.join(__dirname, '../../', 'src', 'components', componentName, `${componentName}.tsx`);
    const componentDir = path.dirname(componentPath);
    // Create component directory
    fs.mkdirSync(componentDir, { recursive: true });
    // Create component file
    fs.writeFileSync(componentPath, `import React from 'react';
import { View, Text } from 'react-native';

interface I${componentName}Props {}

const ${componentName}: React.FC<I${componentName}Props> = (props) => {
  return (
    <View>
      <Text>${componentName} Component</Text>
    </View>
  );
};

export default ${componentName};
`);
    console.log(`Component ${componentName} generated successfully!`);
};
exports.handler = handler;
