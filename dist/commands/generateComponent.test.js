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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const generateComponent_1 = require("./generateComponent");
describe('generateComponent handler', () => {
    const componentName = 'TestComponent';
    it('should generate a new component', async () => {
        await (0, generateComponent_1.handler)({ name: componentName });
        const componentPath = path.join(__dirname, '../../', 'src', 'components', componentName, `${componentName}.tsx`);
        // Check that the component file was created
        expect(fs.existsSync(componentPath)).toBe(true);
        // Check that the component file contents are correct
        const componentContents = fs.readFileSync(componentPath, 'utf8');
        expect(componentContents).toEqual(`import React from 'react';
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
    });
    afterEach(() => {
        // Clean up generated files after each test
        const componentPath = path.join(__dirname, '../../', 'src', 'components', componentName);
        if (fs.existsSync(componentPath)) {
            fs.rmSync(componentPath, { recursive: true, force: true });
        }
    });
});
