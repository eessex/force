import { find, sortBy } from "lodash"

export const alphabetizeGenes = genes =>
  sortBy(genes, gene => gene.display_name || gene.name)

export const featuredGenesForFamily = (familyName, featuredGenesList) => {
  return find(
    featuredGenesList,
    featuredGenesFamily => featuredGenesFamily.name === familyName
  )
}

export const geneFamiliesFromConnection = connectionData =>
  connectionData.gene_families.edges.map(edge => edge.node)
