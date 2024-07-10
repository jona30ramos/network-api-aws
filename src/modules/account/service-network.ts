import { Client } from 'pg'
//import { DataSet, Network } from 'vis-network/standalone';

// Definición de la estructura de los datos (similar a un DataFrame en Python)
export interface NetworkRow {
  sources: string
  targets: string
  Node_Color_Sources: string
  Node_Color_Target: string
  Outline_Node_Color_Sources: string
  Outline_Node_Color_Target: string
  sources_level: string
  target_level: string
  sources_creation_date: string
  target_creation_date: string
  sources_last_transaction: string
  target_last_transaction: string
  sources_activity_status: string
  targets_activity_status: string
}

const params = {
  username: 'hub_executor',
  password: '6dC@d7bip4BQDdRxmVpe',
  host: 'redshift-bi.csrthmbsnci7.ca-central-1.redshift.amazonaws.com',
  port: 5439,
  database: 'prod_app',
}

const connectionString = `postgresql://${params.username}:${params.password}@${params.host}:${params.port}/${params.database}`

export async function getDataFromDB(accountId: number) {
  const client = new Client({
    connectionString: connectionString,
  })

  try {
    await client.connect()
    const network_in = `
      SELECT * FROM prod_app.bi.network_analysis
      WHERE account_id IN (
        SELECT DISTINCT counterparty_account_id 
        FROM prod_app.bi.network_analysis
        WHERE account_id IN (${accountId}))`

    const res = await client.query(network_in)
    const df_network = res.rows

    // Mapas de color
    const type_to_color_node: { [key: string]: string } = {
      Comercio: '#ff914d',
      Persona: '#091264',
    }

    const status_to_color: { [key: string]: string } = {
      'Frozen&Locked': '#091264',
      'Active': '#009a34',
      'Frozen': '#39ABDC',
      'Locked': '#FFB500',
    }

    // Nodo central
    const central_node_id = 1890167
    const central_node_color = '#ff5757'

    // Manipular los datos
    df_network.forEach((row) => {
      row.sources = parseInt(row.sources)
      row.targets = parseInt(row.targets)

      // Asignar color basado en 'sources_type' y 'target_type'
      row.node_color_sources = type_to_color_node[row.sources_type] || ''
      row.node_color_target = type_to_color_node[row.target_type] || ''

      // Asignar color de contorno basado en 'sources_status' y 'target_status'
      row.node_color_sources = status_to_color[row.sources_status] || ''
      row.node_color_target = status_to_color[row.target_status] || ''

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
    await client.end()
    return df_network
  } catch (error) {
    console.error('Error executing query', error)
    await client.end()
    return { data: [] }
  } finally {
    await client.end()
  }
}

// Simulación de datos obtenidos (reemplaza con tus datos reales)
/* export async function processNetworkData(accountId: number): Promise<Network> {
    const container = document.getElementById('network') as HTMLElement;
    const grafico = new Network(container, {}, {
        physics: false,
        edges: {
            arrows: {
                to: {
                    enabled: true
                }
            }
        },
        interaction: {
            navigationButtons: true,
            keyboard: true
        }
    });
    const responseDB = await getDataFromDB(accountId)
    if(!("data" in responseDB)) {
        return grafico
    }
    const df_network = responseDB.data;
    // Creación de la red con física deshabilitada

    const nodes = new DataSet<{ id: string, label: string, title: string, color: { background: string, border: string }, borderWidth: number }>();
    const edges = new DataSet<{ id: string, to: string, color: string }>();

    // Añadir nodos y aristas
    df_network.forEach((row: { sources: any; targets: any; node_color_sources: any; node_color_target: any; outline_node_color_sources: any; outline_node_color_target: any; sources_level: any; target_level: any; sources_creation_date: any; target_creation_date: any; sources_last_transaction: any; target_last_transaction: any; sources_activity_status: any; targets_activity_status: any; }) => {
        const {
            sources,
            targets,
            node_color_sources,
            node_color_target,
            outline_node_color_sources,
            outline_node_color_target,
            sources_level,
            target_level,
            sources_creation_date,
            target_creation_date,
            sources_last_transaction,
            target_last_transaction,
            sources_activity_status,
            targets_activity_status
        } = row;

        // Añadir nodo de origen
        nodes.add({
            id: sources,
            label: sources,
            title: `VL: ${sources_level}\nCreation_account: ${sources_creation_date}\nLast_transaction: ${sources_last_transaction}\nActivity_status: ${sources_activity_status}`,
            borderWidth: 2,
            color: { background: node_color_sources, border: outline_node_color_sources }
        });

        // Añadir nodo de destino
        nodes.add({
            id: targets,
            label: targets,
            title: `VL: ${target_level}\nCreation_account: ${target_creation_date}\nLast_transaction: ${target_last_transaction}\nActivity_status: ${targets_activity_status}`,
            borderWidth: 2,
            color: { background: node_color_target, border: outline_node_color_target }
        });

        // Añadir arista bidireccional
        edges.add({ id: sources, to: targets, color: outline_node_color_target });
    });

    // Configuración de los datos
    grafico.setData({ nodes, edges });
    return grafico;
} */
