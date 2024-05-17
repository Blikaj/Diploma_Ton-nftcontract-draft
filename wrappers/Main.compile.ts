import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'func',
    targets: ['stdlib.fc','ft/params.fc','ft/op-codes.fc','contracts/agitem.fc'],
};
