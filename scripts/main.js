// Crea objeto grafo. 
var grafo = {
    nodes_list: [],
    links_list: [],
    x_offset: 0,
    y_offset: 0,
    x_limit: 0,
    y_limit: 0  
}

// Crea objeto para la libreria de cytoscape. 
var cy = {};

// Posterior manejador del paso de registro de llamadas.
var step = 0;
// Estado de la simulación. Para conocer si se debe frenar o no.   
var stop = 0;

/* Lee el archivo XML que representa el grafo de llamadas. El codigo esta preparado 
para recibir un XML con "Nodos" y "Enlaces". 
Para los "Nodos", lee atributos de: Nro. de Tel. ("Atributo_1"), LocationX, 
LocationY e Id. 
Para los "Enlaces", lee atributos de: Fecha ("Atributo_1"), Id, From y To. 
*/
analyze_xml();

// Crea lista de enlaces a partir de un filtro de fechas, llamante, llamado, etc.
var filtered_links_list = [];

var active_nodes_queue = [];

// Dibuja el grafo con cytoscape.
draw_grafo();