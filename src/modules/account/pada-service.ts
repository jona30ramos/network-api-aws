import { clientSQL } from './connection'
//import * as dfd from 'danfojs-node';

export async function getData() {
  await clientSQL.connect()
  console.log('connected')
  try {
    // Consulta SQL
    const networkIn = `
        SELECT * FROM prod_app.bi.network_analysis
        WHERE account_id IN (SELECT DISTINCT counterparty_account_id FROM prod_app.bi.network_analysis
        WHERE account_id IN (1890167))
        `

    /*  // Define un mapa de tipos a colores de nodos
        const typeToColorNode: { [key: string]: string } = {
            Comercio: '#ff914d',
            Persona: '#091264',
        };

        // Define un mapa de estados a colores
        const statusToColor: { [key: string]: string } = {
            'Frozen&Locked': '#091264',
            'Active': '#009a34',
            'Frozen': '#39ABDC',
            'Locked': '#FFB500',
        };

        // Define el nodo central
        const centralNodeId = 1890167; // Reemplaza esto con tu ID de nodo central
        const centralNodeColor = '#ff5757'; // Color rojo para el nodo central
 */
    const res = await clientSQL.query(networkIn)
    await clientSQL.end()

    /* let dfNetwork = new dfd.DataFrame(res.rows);

        // Convierte las columnas sources y targets a enteros para una comparación adecuada
        dfNetwork.addColumn('sources', dfNetwork['sources'].astype('int32'));
        dfNetwork.addColumn('targets', dfNetwork['targets'].astype('int32'));

        // Agrega nuevas columnas basadas en sources_type y target_type
        dfNetwork.addColumn('Node_Color_Sources', dfNetwork['sources_type'].map((type: string) => typeToColorNode[type] || ''));
        dfNetwork.addColumn('Node_Color_Target', dfNetwork['target_type'].map((type: string) => typeToColorNode[type] || ''));

        // Agrega nuevas columnas basadas en sources_status y target_status
        dfNetwork.addColumn('Outline_Node_Color_Sources', dfNetwork['sources_status'].map((status: string) => statusToColor[status] || ''));
        dfNetwork.addColumn('Outline_Node_Color_Target', dfNetwork['target_status'].map((status: string) => statusToColor[status] || ''));

        // Filtra filas donde el nodo central está en sources o targets y actualiza colores
        dfNetwork.loc({ rows: dfNetwork['sources'].eq(centralNodeId) }).addColumn('Node_Color_Sources', [centralNodeColor]);
        dfNetwork.loc({ rows: dfNetwork['targets'].eq(centralNodeId) }).addColumn('Node_Color_Target', [centralNodeColor]);

        // Convierte las columnas sources y targets de nuevo a tipo string si es necesario
        dfNetwork.addColumn('sources', dfNetwork['sources'].astype('string'));
        dfNetwork.addColumn('targets', dfNetwork['targets'].astype('string'));
        console.log(dfNetwork) 
        // Muestra el DataFrame (opcional)
        console.log(dfNetwork.print()) 
        */

    // Cierra la conexión
    return { data: res.rows }
  } catch (error) {
    return { data: [] }
  }
}
