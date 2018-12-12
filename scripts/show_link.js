function turn_on_nodes(link) {
    // Cambia el color de los nodos y enlaces a prender.

    // Obtiene el enlace del grafico que representa al enlace real que se esta quieriendo detallar. 
    var delegate_link = cy.$('#' + link.to).edgesWith('#' + link.from);

    // Indices para conocer el numero de telefono del nodo con un determinado ID. 
    var index1 = get_node_index(link.from);
    var index2 = get_node_index(link.to);

    // Color del nodo source.
    cy.$('#' + link.from).style('background-color', '#ff0000');
    // Posicion Z del nodo source.
    cy.$('#' + link.from).style('z-index', '1');
    // Etiqueta del nodo source.
    cy.$('#' + link.from).style('label', grafo.nodes_list[index1].number); 
    // Etiqueta del nodo source en negritas. 
    cy.$('#' + link.from).style('font-weight', 'bold');
    // Color del nodo target.
    cy.$('#' + link.to).style('background-color', '#ff0000');
    // Posicion Z del nodo target. 
    cy.$('#' + link.to).style('z-index', '1');
    // Etiqueta del nodo target.
    cy.$('#' + link.to).style('label', grafo.nodes_list[index2].number); 
    // Etiqueta del nodo target en negritas.
    cy.$('#' + link.to).style('font-weight', 'bold');
    // Color del enlace.
    cy.$('#' + delegate_link.id()).style('line-color', '#ff0000'); 
    // Color del enlace.
    cy.$('#' + delegate_link.id()).style('target-arrow-color', '#ff0000'); 
    // Posicion Z del enlace. 
    cy.$('#' + delegate_link.id()).style('z-index', '9999');
}

function turn_off_nodes(link) {
    // Cambia el color de los nodos  y enlaces a apagar. 

    // Obtiene el enlace del grafico que representa al enlace real que se esta quieriendo detallar. 
    var delegate_link = cy.$('#' + link.to).edgesWith('#' + link.from);
    // Posicion Z del nodo source.
    cy.$('#' + link.from).style('z-index', '0');
    // Color del nodo source
    cy.$('#' + link.from).style('background-color', '#DEB887');
    // Etiqueta del nodo source
    cy.$('#' + link.from).style('label', ''); 
    // Color del nodo target
    cy.$('#' + link.to).style('background-color', '#DEB887'); 
    // Posicion Z del nodo target. 
    cy.$('#' + link.to).style('z-index', '0');
    // Etiqueta del nodo target
    cy.$('#' + link.to).style('label', ''); 
    // Color del enlace
    cy.$('#' + delegate_link.id()).style('line-color', '#ccc'); 
    // Color del enlace
    cy.$('#' + delegate_link.id()).style('target-arrow-color', '#ccc');   
    // Posicion Z del enlace. 
    cy.$('#' + delegate_link.id()).style('z-index', '0');                                       
}

function refresh_active_nodes(index) {
	// Actualiza los nodos activos en el paso.

	// Vacia la cola de nodos activos y los apaga en el grafo. 
	empty_active_nodes_queue();

	// Link del paso. 
	step_link = grafo.links_list[index];
	step_link_date = new Date(step_link.date);

	// Prende el nodo del paso. 
	active_nodes_queue.push(step_link);
	turn_on_nodes(step_link);
	index--;
	end = false;
	// Prende el contexto en el que se realiza la llamada del paso. 
	while (index > 0 && !end) {
		previous_link_date = new Date(grafo.links_list[index].date);
		previous_link_date_duration = previous_link_date.getTime() + grafo.links_list[index].duration*1000;

		if (previous_link_date_duration > step_link_date.getTime()) {
			active_nodes_queue.unshift(grafo.links_list[index]);
			turn_on_nodes(grafo.links_list[index]);
		} else {
			end = true;
		}

		index--;
	}
}

function empty_active_nodes_queue() {
	// Vacia la cola de nodos activos y los apaga en el grafo. 

	length = active_nodes_queue.length;
	for (l = 0; l < length; l++) {
        link = active_nodes_queue.pop();
        turn_off_nodes(link);
    }
}

function update_delegate_link(link) {
    /* En el grafo solo se encuentra un enlace por cada par de nodos que se llaman. 
    Sin embargo, hay más de una llamada realizada por par de nodos. Esto se hace para mejorar 
    la visualización y performance del sistema. A causa de esto, hay que actualizar la información 
    contenida en el enlace que se muestra en pantalla, que es el representante de los demás. */

    // Obtiene el enlace del grafico que representa al enlace real que se esta quieriendo detallar. 
    var delegate_link = cy.$('#' + link.to).edgesWith('#' + link.from);

    delegate_link.data('date', link.date);
    delegate_link.data('duration', link.duration);
}   

function get_call_details(link, div) {
    // Genera el HTML de los detalles de la llamada. 

    // Transforma el atributo string "date" del link a objeto Date. 
    var date = new Date(link.date);
    
    // Busca el indice en la lista de nodos que conecta con el Id de la lista de enlaces. 
    var index1 = get_node_index(link.from);
    var index2 = get_node_index(link.to);

    // Genera el detalle de la llamada. 
    var text = '';
    text = '<b>Llamada nro: </b>' + step + '<br>';
    text += '<b>Llamante: </b>' + grafo.nodes_list[index1].number + '<br>';
    text += '<b>Llamado: </b>' + grafo.nodes_list[index2].number + '<br>';
    text += '<b>Fecha: </b>' + date.getDate() + '/' + (date.getMonth() + 1) + '/' 
            + date.getFullYear() + '<br>'; 
    text += '<b>Hora: </b>' + link.date.toString().slice(16, 21) + '<br>';
    text += '<b>Duraci&oacuten: </b>' + link.duration.toString() + 's';

    document.getElementById(div).innerHTML = text;
}

function get_node_index(value) {
    // Obtiene el indice en donde se encuentra el nodo buscado

    for (j = 0; j < grafo.nodes_list.length; j++) {
        if (grafo.nodes_list[j].id == value) {
            return j;
            break;
        }
    }     
}

function get_calls_list(list, which) {
    // Llena la lista select de llamadas. 
    // Se le indica cual se quiere vaciar, si la del Paso o la del Filtro. 

    empty_select_list(which);

    for (k = 0; k < list.length; k++) {
        // Transforma el atributo string "date" del link a objeto Date. 
        date = new Date(list[k].date);

        // Busca el indice en la lista de nodos que conecta con el Id de la lista de enlaces. 
        index1 = get_node_index(list[k].from);
        index2 = get_node_index(list[k].to);

        // Crea el item de la lista select y lo agrega. 
        option = document.createElement("option");

        option.value = list[k];
        option.text = 'Fecha: ' + date.getDate() + '/' + (date.getMonth() + 1) + '/' 
                        + date.getFullYear() + ' - Hora: ' 
                        + list[k].date.toString().slice(16, 21);
        option.style.fontSize = '14px';
        document.getElementById('select_calls' + which).appendChild(option);
    }
}

function empty_select_list(which) {
    // Vacia la lista select de llamadas. 
    // Se le indica cual se quiere vaciar, si la del Paso o la del Filtro.  

    length = document.getElementById('select_calls' + which).length;
    for (j = 0; j < length; j++) {
        document.getElementById('select_calls' + which)[0].remove();
    }
}