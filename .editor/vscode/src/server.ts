import {
    createConnection,
    TextDocuments,
    ProposedFeatures,
    CompletionItem,
    CompletionItemKind,
    TextDocumentPositionParams,
    InitializeParams,
    TextDocumentSyncKind
} from 'vscode-languageserver/node';

import {
    TextDocument
} from 'vscode-languageserver-textdocument';

// Create a connection for the server
const connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

connection.onInitialize((params: InitializeParams) => {
    return {
        capabilities: {
            textDocumentSync: TextDocumentSyncKind.Incremental,
            completionProvider: {
                resolveProvider: true
            }
        }
    };
});

// This handler provides the initial list of the completion items.
connection.onCompletion(
    (_textDocumentPosition: TextDocumentPositionParams): CompletionItem[] => {
        // Provide completion items
        return [
            {
                label: 'fn',
                kind: CompletionItemKind.Keyword,
                data: 1
            },
            {
                label: 'let',
                kind: CompletionItemKind.Keyword,
                data: 2
            },
            {
                label: 'use',
                kind: CompletionItemKind.Keyword,
                data: 3
            },
            {
                label: 'export',
                kind: CompletionItemKind.Keyword,
                data: 4
            },
            {
                label: 'implementation',
                kind: CompletionItemKind.Keyword,
                data: 5
            },
            {
                label: 'interface',
                kind: CompletionItemKind.Keyword,
                data: 6
            }
        ];
    }
);

// This handler resolves additional information for the item selected in the completion list.
connection.onCompletionResolve(
    (item: CompletionItem): CompletionItem => {
        if (item.data === 1) {
            item.detail = 'Objective-R Keyword';
            item.documentation = 'Defines a function';
        } else if (item.data === 2) {
            item.detail = 'Objective-R Keyword';
            item.documentation = 'Defines a variable';
        } else if (item.data === 3) {
            item.detail = 'Objective-R Keyword';
            item.documentation = 'Imports a module';
        } else if (item.data === 4) {
            item.detail = 'Objective-R Keyword';
            item.documentation = 'Exports a module';
        } else if (item.data === 5) {
            item.detail = 'Objective-R Keyword';
            item.documentation = 'Defines an implementation';
        } else if (item.data === 6) {
            item.detail = 'Objective-R Keyword';
            item.documentation = 'Defines an interface';
        }
        return item;
    }
);

// Make the text document manager listen on the connection
documents.listen(connection);

// Listen on the connection
connection.listen();