import { clientSQL } from './connection'
import { dataLocalFromDB } from './data-local'

export interface NetworkRow {
  account_id: number
  counterparty_account_id: number
  sources: string
  targets: string
  sources_level: number
  sources_status: string
  sources_type: string
  sources_creation_date: any
  sources_last_transaction: any
  sources_activity_status: string
  target_level: number
  target_status: string
  target_type: string
  target_creation_date: any
  target_last_transaction: any
  target_activity_status: string
  node_color_sources: string
  node_color_target: string
  outline_node_color_sources: string
  outline_node_color_target: string
}

export async function getDataFromDB(accountId: number, useLocalData?: boolean) {
  if (!useLocalData) {
    return dataLocalFromDB
  }

  console.log('connected')
  await clientSQL.connect()
  try {
    const network_in = `
    SELECT * FROM prod_app.bi.network_analysis
    WHERE account_id IN (
      SELECT DISTINCT counterparty_account_id 
      FROM prod_app.bi.network_analysis
      WHERE account_id IN (${accountId}))`

    const res = await clientSQL.query(network_in)

    const df_network = res.rows
    await clientSQL.end()
    console.log(df_network)

    // Mapas de color
    const type_to_color_node: { [key: string]: string } = {
      Comercio: '#ff914d',
      Persona: '#091264',
    }

    /* const status_to_color: { [key: string]: string } = {
      'Frozen&Locked': '#091264',
      'Active': '#009a34',
      'Frozen': '#39ABDC',
      'Locked': '#FFB500',
    }; */

    // Nodo central
    const central_node_id = accountId
    const central_node_color = '#93C5FD'
    console.log(df_network)

    // Manipular los datos
    df_network.forEach((row) => {
      row.sources = parseInt(row.sources)
      row.targets = parseInt(row.targets)

      // Asignar color basado en 'sources_type' y 'target_type'
      row.node_color_sources = type_to_color_node[row.sources_type] || ''
      row.node_color_target = type_to_color_node[row.target_type] || ''

      // Si el nodo central está en 'sources' o 'targets', actualizar los colores
      if (row.sources === central_node_id) {
        row.node_color_sources = central_node_color
      }
      if (row.targets === central_node_id) {
        row.node_color_target = central_node_color
      }
    })

    // Convertir de nuevo a string si es necesario
    df_network.forEach((row) => {
      row.sources = row.sources.toString()
      row.targets = row.targets.toString()
    })

    return df_network
  } catch (error) {
    await clientSQL.end()
    return { data: [] }
  }
}
