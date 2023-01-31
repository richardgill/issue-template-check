import { schemaToTypeAliasDeclaration } from '@openapi-codegen/typescript/lib/core/schemaToTypeAliasDeclaration'
import { OpenAPIObject, SchemaObject } from 'openapi3-ts'
import {
  createPrinter,
  createSourceFile,
  EmitHint,
  factory,
  isJSDoc,
  isTypeReferenceNode,
  NewLineKind,
  Node,
  ScriptTarget,
  visitNodes,
  Visitor
} from 'typescript'
const sourceFile = createSourceFile('index.ts', '', ScriptTarget.ES2020)

const printer = createPrinter({
  newLine: NewLineKind.LineFeed,
  removeComments: false
})

const printNodes = (nodes: Node[]) =>
  nodes
    .map((node: Node) => {
      return (
        printer.printNode(EmitHint.Unspecified, node, sourceFile) +
        (isJSDoc(node) ? '' : '\n')
      ).replace(/^export /gim, '')
    })
    .join('\n')

export const schemaToTypedef = ({
  schema,
  operationId,
  openAPIDocument
}: {
  schema: SchemaObject
  operationId: string
  openAPIDocument: Pick<OpenAPIObject, 'components'>
}) => {
  const nodes = schemaToTypeAliasDeclaration(operationId, schema, {
    openAPIDocument,
    currentComponent: 'schemas'
  })

  // 1. find the refs
  const dependencies = new Set<string>()
  extractDependencies(nodes, dependencies)

  dependencies.forEach((dep) => {
    if (!openAPIDocument.components?.schemas) return

    const depNodes = schemaToTypeAliasDeclaration(
      dep,
      openAPIDocument.components.schemas[dep],
      {
        openAPIDocument,
        currentComponent: 'schemas'
      }
    )

    nodes.push(...depNodes)
    extractDependencies(depNodes, dependencies)
  })

  return printNodes(nodes)
}

const extractDependencies = (nodes: Node[], dependencies: Set<string>) => {
  const visitor: Visitor = (node) => {
    if (isTypeReferenceNode(node)) {
      // @ts-ignore
      dependencies.add(node.typeName.escapedText)
    }
    return node.forEachChild(visitor)
  }
  visitNodes(factory.createNodeArray(nodes), visitor)
}
